"use client";

import Image from "next/image";
import heroImage from "@/assets/images/hero.jpg";
import SplitType from "split-type";
import { useAnimate, motion, stagger } from "motion/react";
import { useEffect } from "react";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function Home() {
  const [titleScope, titleAnimate] = useAnimate();

  useEffect(() => {
    new SplitType(titleScope.current, {
      types: "lines,words",
      tagName: "span",
    });
    titleAnimate(
      titleScope.current.querySelectorAll(".word"),
      {
        transform: "translateY(0)",
      },
      {
        duration: 0.5,
        delay: stagger(0.2),
      }
    );
  }, [titleScope, titleAnimate]);
  return (
    <div className="h-screen !max-w-full flex items-center justify-center relative">
      <Image
        src={heroImage}
        alt="hero"
        className="object-cover w-full h-full filter"
      />
      <div className="container absolute text-white text-center lg:text-center">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-5xl md:text-7xl lg:text-7xl font-light"
          ref={titleScope}
        >
          Every canvas is a journey all its own.
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 1.75,
          }}
        >
          <Button variant="primary" className="mt-8 lg:mx-auto">
            <Link href="collection">View My Collection</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
