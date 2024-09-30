'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Linkedin } from 'lucide-react'

const teamMembers = [
  {
    name: "SHUBHAM",
    fullName: "SRIVASTAV",
    pronoun: "He/Him",
    role: "COO & Co-Founder",
    description: "Our ever-growing team is a powerful mix of social media moguls, content creators, designers, account managers, copywriters, developers, and very good doggo.",
    video: "/images/about/shubham.mp4"
  },
  {
    name: "FARHAN",
    fullName: "LAST NAME",
    pronoun: "He/Him",
    role: "CEO & Co-Founder",
    description: "Leading our team with innovative strategies and a passion for digital marketing. Farhan brings years of experience in building successful online platforms.",
    video: "/images/about/farhan.mp4"
  },
  {
    name: "KASHISH",
    fullName: "LAST NAME",
    pronoun: "She/Her",
    role: "CMO",
    description: "A creative powerhouse with a keen eye for branding and marketing trends. Kashish drives our content strategy and ensures our message resonates with our audience.",
    video: "/images/about/kashish.mp4"
  },
  {
    name: "BALRAJ",
    fullName: "LAST NAME",
    pronoun: "He/Him",
    role: "CTO",
    description: "With a wealth of technical expertise, Balraj leads our development team in creating cutting-edge solutions for our clients and platform.",
    video: "/images/about/balraj.mp4"
  },
]

export default function TeamMemberShowcase() {
  const [currentMember, setCurrentMember] = useState(0)
  const [ref, inView] = useInView({
    threshold: 0.5,
  })

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const newIndex = Math.floor(scrollPosition / windowHeight)
      if (newIndex !== currentMember && newIndex < teamMembers.length) {
        setCurrentMember(newIndex)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [currentMember])

  return (
    <div className="bg-black text-purple-500">
      {teamMembers.map((member, index) => (
        <div key={index} className="h-screen snap-start" ref={index === currentMember ? ref : null}>
          <TeamMember member={member} isActive={index === currentMember} isEven={index % 2 === 0} />
        </div>
      ))}
    </div>
  )
}

function TeamMember({ member, isActive, isEven }) {
  const videoRef = useRef(null)

  useEffect(() => {
    if (isActive && videoRef.current) {
      videoRef.current.play()
    } else if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }, [isActive])

  return (
    <div className="h-full flex items-center justify-center px-4 md:px-0">
      <div className={`max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${isEven ? 'md:grid-flow-col' : 'md:grid-flow-col-dense'}`}>
        <AnimatePresence mode="wait">
          {isActive && (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, x: isEven ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isEven ? 50 : -50 }}
              transition={{ duration: 0.5 }}
              className={`space-y-4 ${isEven ? 'md:order-1' : 'md:order-2'}`}
            >
              <h2 className="text-5xl font-bold">{member.name}</h2>
              <p className="text-2xl">{member.fullName} {member.pronoun}</p>
              <p className="text-lg opacity-80">{member.description}</p>
              <div className="flex items-center space-x-4">
                <span className="bg-purple-500 text-black px-4 py-2 rounded-full">
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
              key={member.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className={`relative w-full aspect-[3/4] rounded-lg overflow-hidden ${isEven ? 'md:order-2' : 'md:order-1'}`}
            >
              <video
                ref={videoRef}
                src={member.video}
                loop
                muted
                playsInline
                className="w-full h-full object-cover rounded-lg"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}