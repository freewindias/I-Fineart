"use client";

import Image from "next/image";
import heroImage from "@/assets/images/hero.jpg";
import { motion } from "motion/react";
import Button from "@/components/ui/Button";
import Link from "next/link";
import useTextRevealAnimation from "@/hooks/useTextRevealAnimation";
import { useEffect } from "react";

export default function Home() {
  const { scope, entranceAnimation } = useTextRevealAnimation();

  useEffect(() => {
    entranceAnimation();
  },[entranceAnimation])

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
          ref={scope}
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
