"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollVideoWithGSAP({ source }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let src = video.currentSrc || video.src;

    // Helper function for one-time event listeners
    const once = (el, event, fn, opts) => {
      const onceFn = function (e) {
        el.removeEventListener(event, onceFn);
        fn.call(this, e);
      };
      el.addEventListener(event, onceFn, opts);
    };

    // iOS play-pause workaround for video activation
    once(document.documentElement, "touchstart", () => {
      video.play().then(() => video.pause());
    });

    const createTimeline = () => {
      if (!containerRef.current) return;

      let tl = gsap.timeline({
        defaults: { duration: 1 },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      // Timeline control based on video duration
      once(video, "loadedmetadata", () => {
        tl.fromTo(
          video,
          { currentTime: 0 },
          { currentTime: video.duration || 1, ease: "none" }
        );
      });
    };

    createTimeline();

    // Blob URL setup to avoid video playback issues
    const setupBlobURL = () => {
      if (window.fetch) {
        fetch(src)
          .then((response) => response.blob())
          .then((blob) => {
            const blobURL = URL.createObjectURL(blob);
            const currentTime = video.currentTime;

            once(document.documentElement, "touchstart", () => {
              video.play().then(() => video.pause());
            });

            video.src = blobURL;
            video.currentTime = currentTime + 0.01;
          })
          .catch((error) => console.error("Error setting up Blob URL:", error));
      }
    };

    const timer = setTimeout(setupBlobURL, 1000);

    // Set up event listener for when the video is loaded
    const handleLoadedData = () => {
      setIsLoaded(true);
    };

    video.addEventListener("loadeddata", handleLoadedData);

    return () => {
      clearTimeout(timer);
      video.removeEventListener("loadeddata", handleLoadedData);
      if (containerRef.current) {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      }
    };
  }, [source]);

  return (
    <div className="relative">
      {!isLoaded && (
        <div className="fixed h-screen w-screen grid place-items-center z-40">
          <div className="bg-white/10 rounded-xl animate-pulse w-[90%] h-[90%]"></div>
        </div>
      )}
      <video
        ref={videoRef}
        src={source}
        playsInline
        muted
        preload="auto"
        className={`fixed top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover ${
          isLoaded ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
      />
      <div ref={containerRef} className="h-[300svh]" />
    </div>
  );
}
