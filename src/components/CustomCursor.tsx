"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDeviceMode } from "./DeviceModeProvider";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const { isPhone } = useDeviceMode();

  useEffect(() => {
    if (isPhone) return;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor-hover]")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isPhone]);

  if (isPhone) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 bg-white rounded-full pointer-events-none z-[10000] mix-blend-difference flex items-center justify-center text-black font-bold text-[8px] tracking-widest overflow-hidden"
        animate={{
          x: mousePosition.x - (isHovered ? 24 : 6),
          y: mousePosition.y - (isHovered ? 24 : 6),
          width: isHovered ? 48 : 12,
          height: isHovered ? 48 : 12,
        }}
        transition={{ type: "tween", ease: "circOut", duration: 0.15 }}
      >
        <motion.span 
          initial={{ opacity: 0 }} 
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          VIEW
        </motion.span>
      </motion.div>
    </>
  );
}
