import React from 'react'
import Image from 'next/image'

const projects = [
  { id: 1, title: '', image: '/images/projects/ts.gif', isGif: false },
  { id: 2, title: '', image: '/images/projects/bruno.gif', isGif: false },
  { id: 3, title: '', image: '/images/projects/icc.gif', isGif: false },
  { id: 4, title: '', image: '/images/projects/predator.png', isGif: false },
  { id: 5, title: '', image: '/images/projects/jhonnie.png', isGif: false },
  { id: 6, title: '', image: '/images/projects/signature.png', isGif: false },
  { id: 7, title: '', image: '/images/projects/boldcare.png', isGif: false },
  { id: 8, title: '', image: '/images/projects/rapido.png', isGif: false },
]

const ProjectCard = ({ project }) => (
  <div className="relative overflow-hidden rounded-lg shadow-lg">
    {project.isGif ? (
      <video autoPlay loop muted playsInline className="w-full h-full object-cover">
        <source src={project.image} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    ) : (
      <Image
        src={project.image}
        alt={project.title}
        width={400}
        height={300}
        layout="responsive"
        className="w-full h-full object-cover"
      />
    )}
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
      <h3 className="text-white text-xl font-bold">{project.title}</h3>
    </div>
  </div>
)

export default function ProjectGrid() {
  const gifProjects = projects.filter(project => project.isGif)
  const staticProjects = projects.filter(project => !project.isGif)

  return (
    <section className="bg-gray-900 py-16 px-4 sm:px-6 lg:px-8 pt-32">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold text-purple-500 mb-2">ALL PROJECTS</h2>
        <h3 className="text-2xl sm:text-3xl font-semibold text-purple-300 mb-6">A BRAND AFFAIR</h3>
        <p className="text-purple-200 mb-12 max-w-2xl">
          We've worked with numerous brands on diverse campaigns, bringing in impressions, insights, and the
          top influencers across every niche.
        </p>
        
        {/* GIF Projects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          {gifProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        
        {/* Static Image Projects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {staticProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}