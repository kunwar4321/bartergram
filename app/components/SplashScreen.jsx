"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const hasPlayed = sessionStorage.getItem("splashPlayed");
    if (hasPlayed) {
      setShow(false);
    } else {
      const timer = setTimeout(() => {
        setShow(false);
        sessionStorage.setItem("splashPlayed", "true");
      }, 2000); // The splash screen will disappear after 2 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <div className="bg-black fixed grid place-items-center z-50 inset-0">
          <motion.div
            className="fixed inset-0 flex bg-black items-center justify-center z-50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              scale: 1.2,
              transition: {
                duration: 0.8,
                ease: [0.32, 0, 0.67, 0],
              },
            }}
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-purple-600 via-purple-800 to-yellow-600">
                Paisa Hee,
              </span>{" "}
              <br />{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-purple-600 via-purple-800 to-yellow-600">
                Barter Hai
              </span>
            </h1>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
