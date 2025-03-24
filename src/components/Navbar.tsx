"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import LetterSwapForward from "./fancy/components/text/letter-swap-forward-anim"
import Image from "next/image"
import logoIcon from "@/assets/icons/i.svg";
import Button from "./ui/GGButton"
import { motion } from "framer-motion"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect for glass navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <motion.header className="fixed top-0 left-0 right-0 z-50 md:px-4 md:py-2"
        initial={{ opacity: 0, y: "-100%" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
            duration: 0.5,
            delay: 1.0,
        }}>
      <div className="max-w-7xl mx-auto">
        {/* Desktop/Tablet Navbar */}
        <nav
          className={`hidden md:flex items-center justify-between bg-gradient-to-br from-white/20 to-white/5 backdrop-blur rounded-lg px-3 py-2 transition-all duration-300 ${
            scrolled ? "shadow-lg" : ""
          }`}
        >

            <Link href="/">
                <div className="flex items-center text-lg md:text-2xl lg:text-2xl">
                    <Image src={logoIcon} alt="logo" className="h-12 w-auto" />
                    <Button variant="text">Fineart</Button>
                </div>
            </Link>

          <div className="flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-gray-300">
                <LetterSwapForward label="Home" staggerFrom={"first"}/>
            </Link>
            <Link href="/about" className="text-white hover:text-gray-300">
                <LetterSwapForward label="About" staggerFrom={"first"}/>
            </Link>
            <Link href="/exhibition" className="text-white hover:text-gray-300">
                <LetterSwapForward label="Exhibitions" staggerFrom={"center"}/>
            </Link>
            <Link href="/collection" className="text-white hover:text-gray-300">
                <LetterSwapForward label="Collection" staggerFrom={"center"}/>
            </Link>
            <Link href="/store" className="text-white hover:text-gray-300">
                <LetterSwapForward label="Store" staggerFrom={"last"}/>
            </Link>
            <Link href="/contact" className="text-white hover:text-gray-300">
                <LetterSwapForward label="Contact" staggerFrom={"last"}/>
            </Link>
          </div>

          {/* Right side buttons */}
          <div className="space-x-4">
            <Link href="/contact" className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-lg">
              Contact Me!
            </Link>
          </div>
        </nav>

        {/* Mobile Navbar */}
        <nav
          className={`md:hidden flex items-center justify-between bg-gradient-to-br from-white/20 to-white/5 backdrop-blur  px-4 py-3 transition-all duration-300 ${
            scrolled ? "shadow-lg" : ""
          }`}
        >
          {/* Logo */}
            <Link href="/">
                <div className="flex items-center text-xl md:text-2xl lg:text-2xl">
                    <Image src={logoIcon} alt="logo" className="h-12 w-auto" />
                    <Button variant="text">Fineart</Button>
                </div>
            </Link>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            <Link href="/contact" className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-lg">
              Contact
            </Link>

            {/* Mobile menu button */}
            <button className="text-white" onClick={toggleMenu} aria-label="Toggle menu">
              <Menu size={24} />
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="border-b-2 border-white/50 md:hidden bg-black/50 backdrop-blur-md px-6 py-4">
            <div className="flex flex-col space-y-3">
                <Link href="/" className="text-white hover:text-gray-300">
                    <motion.div
                        initial={{ opacity: 0, y: "100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.5,
                            delay: 0.2,
                        }}>
                            Home
                    </motion.div>
                </Link>
                <Link href="/about" className="text-white hover:text-gray-300">
                    <motion.div
                        initial={{ opacity: 0, y: "100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.5,
                            delay: 0.3,
                        }}>
                            About
                    </motion.div>
                </Link>
                <Link href="/exhibition" className="text-white hover:text-gray-300">
                    <motion.div
                        initial={{ opacity: 0, y: "100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.5,
                            delay: 0.4,
                        }}>
                            Exhibitions
                    </motion.div>
                </Link>
                <Link href="/collection" className="text-white hover:text-gray-300">
                    <motion.div
                        initial={{ opacity: 0, y: "100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.5,
                            delay: 0.5,
                        }}>
                            Collection
                    </motion.div>
                </Link>
                <Link href="/store" className="text-white hover:text-gray-300">
                    <motion.div
                        initial={{ opacity: 0, y: "100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.5,
                            delay: 0.6,
                        }}>
                            Store
                    </motion.div>
                </Link>
                <Link href="/contact" className="text-white hover:text-gray-300">
                    <motion.div
                        initial={{ opacity: 0, y: "100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.5,
                            delay: 0.7,
                        }}>
                            Contact
                    </motion.div>
                </Link>
            </div>
          </div>
        )}
      </div>
    </motion.header>
  )
}

