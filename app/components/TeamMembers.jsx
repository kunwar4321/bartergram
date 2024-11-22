"use client";

import { Linkedin } from "lucide-react";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

const teamMembers = [
  {
    name: "BALRAJ",
    fullName: "KHAKHAR",
    pronoun: "He/Him",
    role: "CFO & Co-Founder",
    description:
      "Balraj is the financial backbone of our company, ensuring that our operations run smoothly and efficiently. He is a master of numbers and a wizard with finance utilization.",
    video: "https://d1kk659jf5ewui.cloudfront.net/about/balraj.mp4",
  },
  {
    name: "FARHAN",
    fullName: "RAJANI",
    pronoun: "He/Him",
    role: "CEO & Co-Founder",
    description:
      "Leading our team with innovative strategies and a passion for digital marketing. Farhan brings years of experience in building successful online platforms.",
    video: "https://d1kk659jf5ewui.cloudfront.net/about/farhan.mp4",
  },
  {
    name: "KASHISH",
    fullName: "SINGH DEO",
    pronoun: "She/Her",
    role: "Community Lead & Co-Founder",
    description:
      "A creative powerhouse with a keen eye for branding and marketing trends. Kashish drives our content strategy and ensures our message resonates with our audience.",
    video: "https://d1kk659jf5ewui.cloudfront.net/about/kashish.mp4",
  },
  {
    name: "SHUBHAM",
    fullName: "SRIVASTAV",
    pronoun: "He/Him",
    role: "COO & Co-Founder",
    description:
      "Our ever-growing team is a powerful mix of social media moguls, content creators, designers, account managers, copywriters, developers, and very good doggo.",
    video: "https://d1kk659jf5ewui.cloudfront.net/about/shubham.mp4",
  },
  {
    name: "APARNA",
    fullName: "BHARDWAJ",
    pronoun: "She/Her",
    role: "Brand Solutions",
    description:
      "With extensive experience and an ever-connected phone, Aparna is our business development expert. She ensures our accounts are always managed efficiently and with care.",
    video: "https://d1kk659jf5ewui.cloudfront.net/about/aparna.mp4",
  },
  {
    name: "ATIKA",
    fullName: "PATNI",
    pronoun: "She/Her",
    role: "SMM Lead",
    description: `As the head of our social media team, Atika is fully immersed in the latest trends. Her expertise lies in translating the "now" into effective digital campaigns.`,
    video: "https://d1kk659jf5ewui.cloudfront.net/about/atika.mp4",
  },
];

export default function TeamMemberShowcase() {
  return (
    <div className="bg-black text-purple-500">
      {teamMembers.map((member, index) => (
        <TeamMember
          key={member.name}
          member={member}
          isEven={index % 2 === 0}
        />
      ))}
    </div>
  );
}

function TeamMember({ member, isEven }) {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  const videoRef = useRef(null);

  useEffect(() => {
    if (inView && videoRef.current) {
      videoRef.current.play();
    } else if (videoRef.current) {
      videoRef.current.pause();
    }
  }, [inView]);

  return (
    <div
      ref={ref}
      className="h-[100svh] snap-start snap-always flex items-center justify-center px-4 md:px-0 overflow-hidden"
    >
      <div
        className={`max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center ${
          isEven ? "md:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div
          className={`space-y-4 transition-all duration-500 ease-in-out ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-5xl font-bold font-sans text-[#FFFF00]">
            {member.name}
          </h2>
          <p className="text-xl md:text-2xl">
            {member.fullName} {member.pronoun}
          </p>
          <p className="text-base md:text-lg opacity-80">
            {member.description}
          </p>
          <div className="flex items-center space-x-4">
            <span className="bg-purple-500 text-black px-4 py-2 rounded-full text-sm md:text-base">
              {member.role}
            </span>
            <button className="bg-purple-500 text-black p-2 rounded-full">
              <Linkedin size={20} />
            </button>
          </div>
        </div>

        <div
          className={`relative w-full aspect-[3/4] rounded-lg overflow-hidden transition-all duration-500 ease-in-out ${
            inView ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <video
            ref={videoRef}
            src={member.video}
            loop
            muted
            playsInline
            className="w-full h-full object-cover rounded-lg"
            preload="metadata"
          />
        </div>
      </div>
    </div>
  );
}
