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

const Footer: FC = () => {
  return (
    <footer className="bg-stone-900 text-white">
      <div className="container">
        <div className="section">
          <div className="grid md:grid-cols-3 md:items-center pt-16">
            <div className="md:col-span-2">
              <h2 className="text-4xl pt-8 font-extralight md:text-7xl lg:text-8xl">
                Enough talk. Lets make something great together.
              </h2>
              <Button variant="primary" className="mt-8">
                Contact Me!
              </Button>
            </div>
            <div>
              <nav className="flex flex-col md:items-end gap-8 mt-16 md:mt-0">
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
        <p className="mt-10 py-5 text-white/40 text-sm">
          Copyright &copy; RODIAS &bull; All rights reserved
        </p>
        <div className="flex gap-2 items-center pb-10">
          <p className="text-[#fff]">Designed By</p>
          <Image src={rodiasLogo} alt="rodias" width={150} height={150} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
