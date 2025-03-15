import React from 'react'

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
const navItems = [
    {
      href: "#",
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
    {
      href: "contact",
      label: "Contact",
    },
  ];

export default function Footer() {
  return (
    <footer>
        <div className="sticky z-0 bottom-0 left-0 w-full h-80 bg-gray-700 flex justify-center items-center">
        <div className="relative overflow-hidden w-full h-full flex justify-end px-12 text-right items-start py-12 text-[#ff5941]">
          <div className="flex flex-row space-x-12 sm:pace-x-16  md:space-x-24 text-sm sm:text-lg md:text-xl">
            <ul>
              <li className="hover:underline cursor-pointer">Home</li>
              <li className="hover:underline cursor-pointer">Docs</li>
              <li className="hover:underline cursor-pointer">Comps</li>
            </ul>
            <ul>
              <li className="hover:underline cursor-pointer">Github</li>
              <li className="hover:underline cursor-pointer">Instagram</li>
              <li className="hover:underline cursor-pointer">X (Twitter)</li>
            </ul>
          </div>
          <h2 className="absolute bottom-0 left-0  translate-y-1/3 sm:text-[192px]  text-[80px] text-[#ff5941] font-calendas">
            fancy
          </h2>
        </div>
      </div>
    </footer>
  )
}
