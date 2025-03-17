import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import rodiasLogo from "@/assets/images/rodias.jpeg";

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
    label: "Exhibition",
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

const Footer: FC = () => {
  return (
    <footer className="bg-stone-900 text-white sticky bottom-0 -z-0">
      <div className="container">
        <div className="section">
          <div className="grid md:grid-cols-3 md:items-center pt-0">
            <div className="md:col-span-2">
              <h2 className="text-4xl pt-6 font-extralight md:text-7xl lg:text-8xl">
                Enough talk. Lets make something great together.
              </h2>
            </div>
            <div>
              <nav className="flex flex-col md:items-end gap-4 mt-10 md:mt-6">
                {navItems.map(({ href, label }) => (
                  <Link href={href} key={label}>
                    <Button variant="text" className="text-lg">
                      {label}
                    </Button>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <div className="mt-10 pb-10 border border-t-stone-700 border-l-0 border-r-0 border-b-0 ">
          <div className="mt-4 md:flex md:justify-between md:items-center">
            <p className="py-5 text-white/40 text-sm">
              Copyright &copy; RODIAS &bull; All rights reserved
            </p>
            <div className="flex gap-2 items-center">
              <p className="text-[#fff]">Designed By</p>
              <Image src={rodiasLogo} alt="rodias" width={150} height={150} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
