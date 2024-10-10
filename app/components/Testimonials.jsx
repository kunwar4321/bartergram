"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const testimonials = [
  { id: 1, image: "amazon", alt: "Amazon Pay logo" },
  { id: 2, image: "diageo", alt: "Diageo logo" },
  { id: 3, image: "icc", alt: "ICC logo" },
  { id: 4, image: "wow", alt: "Wow logo" },
  { id: 5, image: "xiaomi", alt: "Xiaomi logo" },
];

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const moveCarousel = useCallback((newDirection) => {
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex + newDirection;
      if (newIndex < 0) newIndex = testimonials.length - 1;
      if (newIndex >= testimonials.length) newIndex = 0;
      return newIndex;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      moveCarousel(1);
    }, 5000);
    return () => clearInterval(interval);
  }, [moveCarousel]);

  const getVisibleTestimonials = () => {
    const visibleIndices = [
      (currentIndex - 1 + testimonials.length) % testimonials.length,
      currentIndex,
      (currentIndex + 1) % testimonials.length,
    ];
    return visibleIndices.map((index) => testimonials[index]);
  };

  const getImageSize = () => {
    if (windowWidth < 640) return 200; // Small screens
    if (windowWidth < 1024) return 300; // Medium screens
    return 400; // Large screens
  };

  const imageSize = getImageSize();

  return (
    <div className="relative w-full h-[60vh] lg:h-[80vh] overflow-hidden mt-8">
      <h2 className="text-2xl lg:text-4xl font-bold text-center text-purple-600 px-10 font-sans">
        We've got the facts! <br /> Hear what our clients say about us.
      </h2>
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence initial={false}>
          {getVisibleTestimonials().map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: (index - 1) * (imageSize + 20),
                rotateY: (index - 1) * 15,
                zIndex: index === 1 ? 2 : 1,
              }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              className="absolute"
              style={{ width: imageSize, height: imageSize }}
            >
              <Image
                src={`https://d1kk659jf5ewui.cloudfront.net/testimonials/${testimonial.image}.png`}
                alt={testimonial.alt}
                fill
                unoptimized
                sizes={`${imageSize}px`}
                className="object-contain rounded-3xl shadow-xl"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
