"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const logos = [
  "Pee Safe Original.png",
  "Predator OG.png",
  "Prime OG.png",
  "R city.png",
  "Rapido OG.png",
  "Signature OG.png",
  "Sunburn.png",
  "Tanqueray OG.png",
  "TATA IPL OG.png",
  "TVS.png",
  "World Class White.png",
  "World Class.png",
  "ZIRO OG.png",
  "Zomato OG.png",
  "50 Cent OG.png",
  "Adidas OG.png",
  "Amazon pay.png",
  "Bacardi OG.png",
  "Bacardi Weekend OG.png",
  "Backstreet Boys OG.png",
  "Belgian Waffle OG.png",
  "Bold Care OG.png",
  "DapperlyTamed_logo_Maroon.png",
  "Dhan.png",
  "Diageo OG.png",
  "Dubai OG.png",
  "Dyson White.png",
  "Exceed.png",
  "Fun Republic.png",
  "G-Eazy White .png",
  "GIN explorers club OG.png",
  "Good Flippin Burgers.png",
  "Greenwipes OG.png",
  "Happydent OG.png",
  "ICC OG.png",
  "Johnnie-Walker OG.png",
  "MI OG.png",

  "Monster Energy OG.png",
  "NOBO .png",
  "Nope OG.png",

  "OML White.png",
];

const PartnersCarousel = () => {
  const halfLength = Math.ceil(logos.length / 2);
  const firstHalf = logos.slice(0, halfLength);
  const secondHalf = logos.slice(halfLength);

  const Carousel = ({ items, direction }) => {
    const scrollRef = useRef(null);
    const [isInteracting, setIsInteracting] = useState(false);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);
    const animationRef = useRef(null);
    const lastScrollPosition = useRef(0);

    const animate = useCallback(() => {
      const scrollContainer = scrollRef.current;
      if (!scrollContainer || isInteracting) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const currentScrollPosition = scrollContainer.scrollLeft;
      if (currentScrollPosition !== lastScrollPosition.current) {
        lastScrollPosition.current = currentScrollPosition;
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const pixelsToScroll = direction === "left" ? 1 : -1;
      let newScrollLeft = currentScrollPosition + pixelsToScroll;

      if (direction === "left") {
        if (newScrollLeft >= scrollContainer.scrollWidth / 3) {
          newScrollLeft -= scrollContainer.scrollWidth / 3;
        }
      } else {
        if (newScrollLeft <= 0) {
          newScrollLeft += scrollContainer.scrollWidth / 3;
        }
      }

      scrollContainer.scrollLeft = newScrollLeft;
      lastScrollPosition.current = newScrollLeft;
      animationRef.current = requestAnimationFrame(animate);
    }, [direction, isInteracting]);

    useEffect(() => {
      animationRef.current = requestAnimationFrame(animate);
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }, [animate]);

    const handleInteractionStart = useCallback(() => {
      setIsInteracting(true);
    }, []);

    const handleInteractionEnd = useCallback(() => {
      setIsInteracting(false);
    }, []);

    const handleMouseDown = useCallback(
      (e) => {
        isDragging.current = true;
        startX.current = e.pageX - scrollRef.current.offsetLeft;
        scrollLeft.current = scrollRef.current.scrollLeft;
        handleInteractionStart();
      },
      [handleInteractionStart]
    );

    const handleMouseUp = useCallback(() => {
      isDragging.current = false;
      handleInteractionEnd();
    }, [handleInteractionEnd]);

    const handleMouseMove = useCallback((e) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const x = e.pageX - scrollRef.current.offsetLeft;
      const walk = (x - startX.current) * 2;
      scrollRef.current.scrollLeft = scrollLeft.current - walk;
    }, []);

    return (
      <div
        ref={scrollRef}
        className="flex overflow-x-scroll whitespace-nowrap scrollbar-hide"
        onMouseEnter={handleInteractionStart}
        onMouseLeave={handleInteractionEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {[...items, ...items, ...items].map((logo, index) => (
          <div key={index} className="grid place-items-center p-4 bg-white/5">
            <Image
              src={`https://bartergram-static-bucket.s3.ap-south-1.amazonaws.com/partners/${logo}`}
              alt={`Partner logo ${logo}`}
              width={100}
              height={100}
              unoptimized
              className="max-w-[100px] h-auto mx-4"
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full overflow-hidden my-8">
      <h2 className="text-2xl lg:text-4xl font-bold text-center mb-8 text-purple-600 px-10 font-sans">
        Worked with the best, eyeing for greatness
      </h2>
      <div className="mb-8">
        <Carousel items={firstHalf} direction="left" />
      </div>
      <div>
        <Carousel items={secondHalf} direction="right" />
      </div>
    </div>
  );
};

export default PartnersCarousel;
