'use client'

import Image from 'next/image'
import { Linkedin } from 'lucide-react'
import { useState, useEffect } from 'react'
import TeamMemberShowcase from '../components/TeamMembers'

export default function AboutUs() {
    return (
        <div className="min-h-screen bg-black text-purple-500 p-6 pt-36">
            <div className="max-w-6xl mx-auto space-y-20">
                <header className="text-center">
                    <h1 className="text-5xl font-bold mb-4">GET TO KNOW US :</h1>
                    <p className="text-lg max-w-6xl mx-auto">
                        Bartergram was born out of a vision for better collaboration, innovation, and redefining partnerships. Our mission is to
                        create a platform that empowers businesses to leverage their strengths, optimize resources, and drive mutual growth through
                        strategic alliances. Together, we aim to forge a brighter, connected future where mutual growth and success thrive.
                    </p>
                </header>

                <section>
                    <h2 className="text-4xl font-bold mb-4">OUR STORY</h2>
                    <p className="text-lg mb-4">
                        At Bartergram, we believe in the power of the content creators product. As a vital part of the Creator Community, we provide unique opportunities for creators to monetize their content and expand their audience base. Our expertise in social media management and marketing ensures a rewarding digital experience for everyone involved.
                    </p>
                    <p className="text-lg">
                        We are deeply connected to both creators and brands in this ever-evolving digital era, understanding their needs and ambitions.
                    </p>
                </section>

                <section>
                    {/* <h2 className="text-4xl font-bold mb-6">Meet The Team</h2>
                    <p className="text-lg mb-8">
                        We're a diverse group of creative minds and digital strategists, all dedicated to making the business of creators and brands our collaborative art form. Each member of our team brings a unique set of skills and expertise to every project, ensuring that everyone in our community thrives.
                    </p>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <TeamMember
                            name="FARHAN"
                            role="FOUNDER"
                            description="An accomplished leader in product and UX development strategy, he has extensive experience in structuring complex financial deals, mergers, and acquisitions, with a focus on maximizing value for clients. His expertise spans product development, strategic planning, and strategic advisory services."
                            imageSrc="/images/about/farhan.mp4"
                        />
                        <TeamMember
                            name="SHUBHAM"
                            role="DIRECTOR"
                            description="A professional with expertise in digital marketing and business operations. Utilizing innovative strategies with a focus on driving growth and optimizing performance."
                            imageSrc="/images/about/shubham.mp4"
                        />
                        <TeamMember
                            name="KASHISH"
                            role="BRAND CEO"
                            description="Mastering the art of branding and talent management. She brings a unique perspective to influencer marketing and social media management and focuses on enhancing audience culture & driving engagement. She is committed to nurturing talent and brand stories."
                            imageSrc="/images/about/kashish.mp4"
                        />
                        <TeamMember
                            name="Balraj"
                            role="Advisor"
                            description="An accomplished leader in wealth management and financial planning. He specializes in crafting high-net-worth financial strategies, tax planning, and investment management. His expertise helps creators and businesses make informed financial decisions."
                            imageSrc="/images/about/balraj.mp4"
                        />
                    </div>
                     */}
                     <TeamMemberShowcase/>
                </section>

                <section>
                    <h2 className="text-4xl font-bold mb-6">LIFE AT BARTERGRAM</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <video
                            src={'/images/about/life1.mp4'}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover rounded-lg"
                        />
                        <video
                            src={'/images/about/life2.mp4'}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover rounded-lg"
                        />
                        <video
                            src={'/images/about/life3.mp4'}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover rounded-lg"
                        />
                        <video
                            src={'/images/about/life4.mp4'}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                </section>
            </div>
        </div>
    )
}

function TeamMember({ name, role, description, imageSrc }) {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false)

    useEffect(() => {
        const video = document.createElement('video')
        video.src = imageSrc
        video.onloadeddata = () => setIsVideoLoaded(true)
    }, [imageSrc])

    return (
        <div className="flex flex-col items-start space-y-4">
            {isVideoLoaded ? (
                <video
                    src={imageSrc}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-80 object-cover rounded-lg"
                />
            ) : (
                <div className="w-full h-80 bg-gray-300 rounded-lg animate-pulse" />
            )}
            <div className="flex-1">
                <h3 className="text-2xl font-bold">{name}</h3>
                <p className="text-xl mb-2">{role}</p>
                <p className="text-sm mb-4">{description}</p>
                <button className="bg-purple-500 text-black p-2 rounded-full">
                    <Linkedin size={20} />
                </button>
            </div>
        </div>
    )
}