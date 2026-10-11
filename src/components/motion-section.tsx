"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ComponentProps } from "react";

type MotionSectionProps = ComponentProps<typeof motion.section>;

export function MotionSection({ children, ...props }: MotionSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      {...props}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}
