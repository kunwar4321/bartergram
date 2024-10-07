"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const teamMembers = [
  {
    name: "BALRAJ",
    fullName: "KHAKHAR",
    pronoun: "He/Him",
    role: "CFO & Co-Founder",
    description:
      "Balraj is the financial backbone of our company, ensuring that our operations run smoothly and efficiently. He is a master of numbers and a wizard with finance utilization.",
    video: "/images/about/balraj.mp4",
  },
  {
    name: "FARHAN",
    fullName: "RAJANI",
    pronoun: "He/Him",
    role: "CEO & Co-Founder",
    description:
      "Leading our team with innovative strategies and a passion for digital marketing. Farhan brings years of experience in building successful online platforms.",
    video: "/images/about/farhan.mp4",
  },
  {
    name: "KASHISH",
    fullName: "SINGH DEO",
    pronoun: "She/Her",
    role: "Community Lead & Co-Founder",
    description:
      "A creative powerhouse with a keen eye for branding and marketing trends. Kashish drives our content strategy and ensures our message resonates with our audience.",
    video: "/images/about/kashish.mp4",
  },
  {
    name: "SHUBHAM",
    fullName: "SRIVASTAV",
    pronoun: "He/Him",
    role: "COO & Co-Founder",
    description:
      "Our ever-growing team is a powerful mix of social media moguls, content creators, designers, account managers, copywriters, developers, and very good doggo.",
    video: "/images/about/shubham.mp4",
  },
  {
    name: "Aparna",
    fullName: "Bhardwaj",
    pronoun: "She/Her",
    role: "Brand Solutions",
    description:
      "With extensive experience and an ever-connected phone, Aparna is our business development expert. She ensures our accounts are always managed efficiently and with care.",
    video: "/images/about/aparna.mp4",
  },
  {
    name: "Atika",
    fullName: "Patni",
    pronoun: "She/Her",
    role: "SMM Lead",
    description: `As the head of our social media team, Atika is fully immersed in the latest trends. Her expertise lies in translating the "now" into effective digital campaigns.`,
    video: "/images/about/atika.mp4",
  },
  {
    name: "Adelbert",
    fullName: "",
    pronoun: "He/Him",
    role: "Production Lead",
    description:
      "Our Creative Director, Adelbert, excels in taking ideas beyond their initial scope and executing them flawlessly. With a subtle, precise approach and an extraordinary talent, we are fortunate to have him on our team.",
    video: "/images/about/adel.mp4",
  },
];

export default function TeamMemberShowcase() {
  const [currentMember, setCurrentMember] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentMember(Number(entry.target.dataset.index));
          }
        });
      },
      { threshold: 0.5 }
    );

    container
      .querySelectorAll(".team-member")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="bg-black text-purple-500">
      {teamMembers.map((member, index) => (
        <div
          key={index}
          data-index={index}
          className="team-member h-[100svh] snap-start snap-always"
        >
          <TeamMember
            member={member}
            isActive={index === currentMember}
            isEven={index % 2 === 0}
          />
        </div>
      ))}
    </div>
  );
}

function TeamMember({ member, isActive, isEven }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (isActive && videoRef.current) {
      videoRef.current.play();
    } else if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isActive]);

  return (
    <div className="h-full flex items-center justify-center px-4 md:px-0 overflow-hidden">
      <div className="max-w-6xl w-full flex flex-col md:grid md:grid-cols-2 gap-8 items-center">
        <AnimatePresence mode="wait">
          {isActive && (
            <motion.div
              key={`${member.name}-text`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6 }}
              className={`space-y-4 ${isEven ? "md:order-1" : "md:order-2"}`}
            >
              <h2 className="text-3xl md:text-5xl font-bold">{member.name}</h2>
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
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {isActive && (
            <motion.div
              key={`${member.name}-video`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6 }}
              className={`relative w-full aspect-[3/4] rounded-lg overflow-hidden ${
                isEven ? "md:order-2" : "md:order-1"
              }`}
            >
              <video
                ref={videoRef}
                src={member.video}
                loop
                muted
                playsInline
                className="w-full md:h-full object-cover max-md:aspect-square rounded-lg"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
