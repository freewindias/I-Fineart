"use client";

import Image from "next/image";
import heroImage from "@/assets/images/hero.jpg";
import SplitType from "split-type";
import { useAnimate, motion, stagger } from "motion/react";
import { useEffect } from "react";

export default function Home() {
  const [titleScope, titleAnimate] = useAnimate();

  useEffect(() => {
    new SplitType(titleScope.current, {
      types: 'lines,words',
      tagName: 'span',
    });
    titleAnimate(titleScope.current.querySelectorAll('.word'),{
      transform: 'translateY(0)'
    }, {
      duration: 0.5,
      delay: stagger(0.2)
    })
  }, [])
  return (
    <div className="h-screen flex items-center justify-center relative">
      <Image
        src={heroImage}
        alt="hero"
        className="object-cover w-full h-full filter grayscale"
      />
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute text-white text-4xl"
        ref={titleScope}>
        Every canvas is a journey all its own.
      </motion.h1>
    </div>
  );
}
