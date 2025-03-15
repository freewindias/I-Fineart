"use client";

import React, { useEffect, useState } from "react";
import logoIcon from "@/assets/icons/i.svg";
import Image from "next/image";
import Link from "next/link";
import Button from "./ui/Button";
import { motion, useAnimate } from "motion/react";

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
const navLinks = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "about",
    label: "About",
  },
  {
    href: "exhibition",
    label: "Exhibitons",
  },
  {
    href: "collection",
    label: "Collection",
  },
  {
    href: "store",
    label: "Store",
  },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [topLineScope, topLineAnimate] = useAnimate();
  const [bottomLineScope, bottomLineAnimate] = useAnimate();

  useEffect(() => {
    if (isOpen) {
      topLineAnimate([
        [
          topLineScope.current,
          {
            translateY: 4,
          },
        ],
        [
          topLineScope.current,
          {
            rotate: 45,
          },
        ],
      ]);
      bottomLineAnimate([
        [
          bottomLineScope.current,
          {
            translateY: -4,
          },
        ],
        [
          bottomLineScope.current,
          {
            rotate: -45,
          },
        ],
      ]);
    } else {
      topLineAnimate([
        [
          topLineScope.current,
          {
            rotate: 0,
          },
        ],
        [
          topLineScope.current,
          {
            translateY: 0,
          },
        ],
      ]);
      bottomLineAnimate([
        [
          bottomLineScope.current,
          {
            rotate: 0,
          },
        ],
        [
          bottomLineScope.current,
          {
            translateY: 0,
          },
        ],
      ]);
    }
  }, [
    isOpen,
    topLineAnimate,
    topLineScope,
    bottomLineAnimate,
    bottomLineScope,
  ]);
  return (
    <header>
      <div className="fixed left-0 top-0 w-full backdrop-blur-md z-50">
        <div className="container !max-w-full">
          <div className="flex justify-between h-20 items-center">
            <div>
              <Link href="/">
                <Image src={logoIcon} alt="logo" className="h-12 w-auto" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed left-0 top-0 w-full z-50">
        <div className="container !max-w-full">
          <div className="flex justify-end h-20 items-center">
            <div className=" flex items-center gap-4">
              <div className="size-11 border border-stone-400 rounded-full inline-flex items-center justify-center bg-stone-200" onClick={() => setIsOpen(!isOpen)}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <motion.rect
                    x="3"
                    y="7"
                    width="18"
                    height="2"
                    fill="currentColor"
                    ref={topLineScope}
                    style={{
                      transformOrigin: "12px 8px",
                    }}
                  />
                  <motion.rect
                    x="3"
                    y="15"
                    width="18"
                    height="2"
                    fill="currentColor"
                    ref={bottomLineScope}
                    style={{
                      transformOrigin: "12px 16px",
                    }}
                  />
                </svg>
              </div>
              <Button variant="primary" className="hidden md:inline-flex">
                <Link href="contact">Contact Me!</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
