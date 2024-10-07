import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "../page";

const SocialIcon = ({ platform, href }) => {
  const icons = {
    facebook: Facebook,
    twitter: Twitter,
    linkedIn: Linkedin,
    instagram: Instagram,
  };
  const Icon = icons[platform];
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-purple-400 hover:text-purple-300 transition-colors bg-purple-200 rounded-full p-2"
    >
      <Icon size={32} />
    </a>
  );
};

export default function ProjectDetailPage({ params }) {
  const { id } = params;
  const project = projects.find((p) => p.id === parseInt(id));

  if (!project) return <div>Project not found</div>;

  return (
    <main className="bg-black text-white min-h-screen">
      <div className="relative w-full h-[65svh]">
        <Image
          src={project.image}
          alt={project.title}
          layout="fill"
          objectFit="cover"
          className="brightness-50"
        />
      </div>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h2 className="text-purple-400 text-2xl mb-4">
            Client: <span className="font-sans">{project.client}</span>
          </h2>
          <h1 className="text-purple-300 text-5xl font-bold mb-8 font-sans">
            Amplifying awareness and
            <br />
            social for
          </h1>
          <div className="flex space-x-6 mb-12 ">
            {Object.entries(project.socials).map(([platform, url]) => (
              <SocialIcon key={platform} platform={platform} href={url} />
            ))}
          </div>
        </div>

        <section className="mb-12">
          <h3 className="text-2xl font-semibold text-purple-400 mb-4 font-sans">
            The Client
          </h3>
          <p className="text-gray-300">{project.aboutClient}</p>
        </section>

        <section className="mb-12">
          <h3 className="text-2xl font-semibold text-purple-400 mb-4 font-sans">
            The Brief
          </h3>
          <p className="text-gray-300">{project.aboutCampaign}</p>
        </section>

        <section className="grid grid-cols-3 gap-4 mb-12 bg-gradient-to-r from-purple-600 to-pink-500 p-6 rounded-lg">
          {Object.entries(project.count).map(([key, value]) => (
            <div key={key} className="text-center">
              <div className="text-4xl font-bold">{value}</div>
              <div className="text-sm uppercase">{key}</div>
            </div>
          ))}
        </section>

        <section className="mb-12">
          <h3 className="text-2xl font-semibold text-purple-400 mb-4 font-sans">
            What We Did
          </h3>
          <p className="text-gray-300">{project.effect}</p>
        </section>

        <section className="mb-12">
          <h3 className="text-2xl font-semibold text-purple-400 mb-4 font-sans">
            The Result
          </h3>
          <p className="text-gray-300 mb-4">{project.result[0]}</p>
          <ul className="list-disc list-inside my-4 text-gray-300">
            {project.result[1].map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <p className="text-gray-300">{project.result[2]}</p>
        </section>

        <section>
          <h3 className="text-2xl font-semibold text-purple-400 mb-4 font-sans">
            More Projects
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {projects
              .filter((p) => p.id !== project.id)
              .slice(0, 3)
              .map((p) => (
                <Link key={p.id} href={`/projects/${p.id}`} className="block">
                  <Image
                    src={p.image}
                    alt={p.title}
                    width={200}
                    height={150}
                    unoptimized
                    className="rounded-lg w-full"
                  />
                </Link>
              ))}
          </div>
        </section>
      </div>
    </main>
  );
}
