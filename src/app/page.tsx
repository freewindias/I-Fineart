import Image from "next/image";
import heroImage from "@/assets/images/hero.jpg";

export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center relative">
      <Image
        src={heroImage}
        alt="hero"
        className="object-cover w-full h-full filter grayscale"
      />
      <div className="absolute text-white text-3xl">
        hello Freind besto
      </div>
    </div>
  );
}
