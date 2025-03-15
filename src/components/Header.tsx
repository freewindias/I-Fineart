"use client";

import React, { useEffect, useState } from "react";
import logoIcon from "@/assets/icons/i.svg";
import Image from "next/image";
import Link from "next/link";
import Button from "./ui/Button";
import { motion, useAnimate } from "motion/react";

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
const navItems = [
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
  const [navScope, navAnimate] = useAnimate();

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
      navAnimate
      (
        navScope.current,
        {
          height: "100%",
        },
        {
          duration: 0.7,
        }
      );
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
      navAnimate
      (
        navScope.current,
        {
          height: 0,
        },
        {
          duration: 0.7,
        }
      );
    }
  }, [
    isOpen,
    topLineAnimate,
    topLineScope,
    bottomLineAnimate,
    bottomLineScope,
    navScope,
    navAnimate,
  ]);
  return (
    <header className="mb-20 relative z-50">
      <div className=" fixed top-0 left-0 w-full h-0 overflow-hidden bg-stone-900" ref={navScope}>
        <nav className="mt-20 flex flex-col">
          {navItems.map(({ label, href }) => (
            <Link
              href={href}
              key={label}
              className="text-stone-200 border-t last:border-b border-stone-800 py-8 group/nav-item relative isolate"
              onClick={() => setIsOpen(false)}
            >
              <div className="container !max-w-full flex items-center justify-between">
                <span className="text-3xl group-hover/nav-item:pl-4 transition-all duration-500">{label}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                  />
                </svg>
              </div>
              <div className="absolute w-full h-0 bg-stone-800 group-hover/nav-item:h-full transition-all duration-500 bottom-0 -z-10"></div>
            </Link>
          ))}
        </nav>
      </div>
      <div className="fixed left-0 top-0 w-full backdrop-blur-md z-50">
        <div className="container !max-w-full">
          <div className="flex justify-between h-20 items-center">
            <div>
              <Link href="/">
                <Image
                  src={logoIcon}
                  alt="logo"
                  className="h-12 w-auto"
                ></Image>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed left-0 top-0 w-full z-50">
        <div className="container !max-w-full">
          <div className="flex justify-end h-20 items-center">
            <div className=" flex items-center gap-4">
              <Button variant="primary" className=" md:inline-flex">
                <Link href="contact">Contact Me!</Link>
              </Button>
              <div
                className="size-11 border border-stone-400 rounded-full inline-flex items-center justify-center bg-stone-200"
                onClick={() => setIsOpen(!isOpen)}
              >
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
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
