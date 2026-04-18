"use client"

import * as React from "react"
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export interface MagicTextProps {
  text: string;
}

interface WordProps {
  children: string;
  progress: any;
  range: number[];
}

const Word: React.FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, [18, 0]);
 
  return (
    <span className="relative mt-[12px] mr-2 text-2xl font-semibold sm:text-3xl lg:text-4xl">
      <span className="absolute opacity-[0.06]">{children}</span>
      <motion.span style={{ opacity: opacity, y }}>{children}</motion.span>
    </span>
  );
};

export const MagicText: React.FC<MagicTextProps> = ({ text }) => {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,

    offset: ["start 0.92", "end 0.82"],
  });

  text;
  const words = text.split(" ");

  return (
    <p ref={container} className="flex flex-wrap p-4 leading-[1.2] sm:leading-[1.15]">
      {words.map((word, i) => {
        const start = i / words.length;

        const end = start + 1 / words.length;

        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
};
