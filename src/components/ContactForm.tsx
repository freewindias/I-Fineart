"use client";

import type React from "react";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { VelocityScroll } from "./magicui/scroll-based-velocity";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    budget: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

  return (
    <div className="min-h-screen w-full mt-20 pb-20">
      <div className="container mx-auto">
        <div className="overflow-hidden">
          <div className="relative text-red-orange-500 flex w-full flex-col items-center justify-center overflow-hidden uppercase py-2">
            <VelocityScroll>Contact Us /</VelocityScroll>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
          </div>
        </div>

        <div className=" grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-16 mt-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-4xl md:text-5xl font-bold leading-tight">
                Let&apos;s unlock together the next level of possibilities!
              </h3>
              <p className="text-4xl md:text-5xl font-bold mt-2">Reach out.</p>
            </div>

            <div className="mt-16">
              <h4 className="text-lg text-gray-400 uppercase mb-4">
                Social Media
              </h4>
              <div className="flex flex-wrap items-center gap-3">
                <a href="#" className="hover:text-[#FF5C35] transition-colors">
                  TWITTER
                </a>
                <span>—</span>
                <a href="#" className="hover:text-[#FF5C35] transition-colors">
                  INSTAGRAM
                </a>
                <span>—</span>
                <a href="#" className="hover:text-[#FF5C35] transition-colors">
                  GITHUB
                </a>
                <span>—</span>
                <a href="#" className="hover:text-[#FF5C35] transition-colors">
                  TWITCH
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-1 gap-8 mt-16">
              <div>
                <h4 className="text-lg text-gray-400 uppercase mb-4">
                  Get in touch
                </h4>
                <a
                  href="mailto:HELLO@BASEMENT.STUDIO"
                  className="hover:text-[#FF5C35] transition-colors"
                >
                  CONTACT@I-FINEART.COM
                </a>
              </div>
              <div>
                <h4 className="text-lg text-gray-400 uppercase mb-4">
                  Location
                </h4>
                <p>MUMBAI - INDIA</p>
              </div>
            </div>
          </div>

            <div className="mt-10">
                <form onSubmit={handleSubmit} className="space-y-8">
                <div className="">
                    <div className="space-y-2">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className="w-full bg-transparent border-b border-gray-700 py-2 focus:outline-none focus:border-[#FF5C35] transition-colors"
                        required
                    />
                    </div>
                </div>

                <div className="">
                    <div className="space-y-2">
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-full bg-transparent border-b border-gray-700 py-2 focus:outline-none focus:border-[#FF5C35] transition-colors"
                        required
                    />
                    </div>
                </div>

                <div className="space-y-2">
                    <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message"
                    rows={5}
                    className="w-full bg-transparent border-b border-gray-700 py-2 focus:outline-none focus:border-[#FF5C35] transition-colors resize-none"
                    required
                    />
                </div>

                <div className="flex justify-between items-center pt-8 mt-4">
                    <button
                    type="submit"
                    className="group flex items-center text-5xl font-bold hover:text-[#FF5C35] transition-colors"
                    >
                    SUBMIT
                    <span className="ml-4 transform transition-transform group-hover:translate-x-2">
                        <ArrowRight size={40} />
                    </span>
                    </button>
                </div>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
}
