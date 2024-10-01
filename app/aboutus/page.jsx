"use client";

import TeamMemberShowcase from "../components/TeamMembers";

export default function AboutUs() {
  const videos = [
    "/images/about/life1.mp4",
    "/images/about/life2.mp4",
    "/images/about/life3.mp4",
    "/images/about/life4.mp4",
  ];
  return (
    <div className="bg-black text-purple-500 p-6 pt-36">
      <video
        src={"/images/about/group.mp4"}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-50 z-0"
      />
      <div className="max-w-6xl mx-auto space-y-20">
        <header className="relative z-10 h-[75svh] md:h-screen grid grid-cols-1 place-items-center md:grid-cols-2">
          <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold md:mr-auto md:pb-[25svh] md:text-left">
            GET TO
            <br />
            KNOW US
          </h1>
          <p className="text-lg text-center md:text-justify md:mr-auto text-white font-semibold">
            Bartergram was born out of a vision for better collaboration,
            innovation, and redefining partnerships. Our mission is to create a
            platform that empowers businesses to leverage their strengths,
            optimize resources, and drive mutual growth through strategic
            alliances. Together, we aim to forge a brighter, connected future
            where mutual growth and success thrive.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 place-items-center">
          <h2 className="text-4xl md:text-5xl xl:text-6xl md:pb-[25svh] font-black md:mr-auto">
            OUR STORY
          </h2>
          <p className="text-lg mb-4 md:text-justify">
            At Bartergram, we believe in the power of the content creators
            product. As a vital part of the Creator Community, we provide unique
            opportunities for creators to monetize their content and expand
            their audience base. Our expertise in social media management and
            marketing ensures a rewarding digital experience for everyone
            involved.
          </p>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 place-items-center">
          <h2 className="text-4xl md:text-5xl xl:text-6xl md:pb-[25svh] font-black md:mr-auto">
            MEET THE TEAM
          </h2>
          <p className="text-lg mb-4 md:text-justify">
            We are deeply connected to both creators and brands in this
            ever-evolving digital era, understanding their needs and ambitions.
          </p>
        </section>

        <TeamMemberShowcase />

        <LifeAtBartergram />
      </div>
    </div>
  );
}

function LifeAtBartergram() {
  const images = [
    "/images/about/life1.mp4",
    "/images/about/life2.mp4",
    "/images/about/life3.mp4",
    "/images/about/life4.mp4",
  ];

  return (
    <section className="relative py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <h2 className="md:scale-90 md:hidden text-center pb-10 text-3xl font-bold text-purple-800 leading-tight tracking-tighter">
          LIFE AT BARTER GRAM
        </h2>
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Left side: Image grid */}
          <div className="w-full lg:w-2/3 mb-12 lg:mb-0 md:scale-75">
            <div className="grid grid-cols-2 gap-4">
              {images.map((src, index) => (
                <div
                  key={index}
                  className="relative aspect-[9/16] rotate-6 rounded-lg overflow-hidden"
                >
                  <video src={src} autoPlay loop muted playsInline />
                </div>
              ))}
            </div>
          </div>

          {/* Right side: Text content */}
          <div className="hidden md:block lg:w-1/3 text-right">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-purple-800 leading-tight tracking-tighter">
              LIFE
              <br />
              AT
              <br />
              BARTER
              <br />
              GRAM
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
