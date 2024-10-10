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
    if (!video || !containerRef.current) return;

    let tl;

    const initializeVideo = () => {
      video.currentTime = 0;
      video.pause();
      setIsLoaded(true);
    };

    const createScrollTrigger = () => {
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1, // Increased scrub value for smoother scrolling
        },
      });

      tl.to(video, {
        currentTime: video.duration || 1,
        ease: "none",
        duration: 1,
      });
    };

    const loadVideo = async () => {
      try {
        video.src = source;
        video.load();

        video.addEventListener(
          "loadedmetadata",
          () => {
            initializeVideo();
            createScrollTrigger();
          },
          { once: true }
        );

        // Add canplay event listener to ensure video is ready
        video.addEventListener(
          "canplay",
          () => {
            setIsLoaded(true);
          },
          { once: true }
        );
      } catch (error) {
        console.error("Error loading video:", error);
      }
    };

    loadVideo();

    return () => {
      if (tl) tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [source]);

  return (
    <div className="relative">
      {!isLoaded && (
        <div className="fixed inset-0 grid place-items-center z-40 bg-black">
          <div className="bg-white/10 rounded-xl animate-pulse w-[90%] h-[90%]" />
        </div>
      )}
      <video
        ref={videoRef}
        playsInline
        muted
        preload="auto"
        className={`fixed inset-0 w-full h-full object-cover ${
          isLoaded ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
      />
      <div ref={containerRef} className="h-[300vh]" />
    </div>
  );
}
