// src/pages/HomePage.tsx
import React, { useState, useEffect } from 'react';
import type { Project } from '../types';
import { getAllProjects, trackClick } from '../services/projectService';
import {
  FaEnvelope, FaLinkedin, FaGithub, FaInstagram, FaGamepad
} from 'react-icons/fa';
import {
  SiUnity, SiGo, SiFlutter, SiLaravel, SiTypescript, SiReact,
  SiHtml5, SiCss3, SiJavascript, SiGit, SiPhp, SiDart
} from 'react-icons/si';

// --- About Section Component ---
const AboutSection: React.FC = () => (
    <section id="about" className="min-h-screen flex items-center py-20 container mx-auto px-6 about-section">
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-12">
            <div className="w-full md:w-1/2 flex justify-center">
                <img 
                    src="https://media.licdn.com/dms/image/v2/D5603AQFsBMD2ZqKX0g/profile-displayphoto-shrink_800_800/B56ZhdgwY5HUAc-/0/1753915525537?e=1762387200&v=beta&t=9b3d835UqxOk6cr6CAwYjNwZnyTn9Zh7PrS0Iw5qwTs" 
                    alt="Portrait of a professional software developer with a modern background" 
                    className="profile-pic w-full max-w-md"
                />
            </div>
            <div className="w-full md:w-1/2 space-y-6">
                <h3 className="text-lg font-semibold" style={{ color: 'var(--accent)' }}>Hello, I'm</h3>
                <h1 className="text-4xl md:text-6xl font-bold">Hidayatul Hayat</h1>
                <h2 className="text-2xl md:text-3xl" style={{ color: 'var(--primary)' }}>Full-Stack Developer</h2>
                <p className="text-lg leading-relaxed">
                    Fresh graduate in Informatics Engineering with a strong interest in backend systems, fullstack applications, and game development. Experienced in academic and personal projects using Golang, Laravel, Flutter, Unity, and TypeScript. Passionate about clean architecture, problem-solving, and building efficient, scalable solutions. Eager to learn, adapt, and contribute to real-world software development projects.

                </p>
                <div className="flex space-x-4 pt-4">
                    <a href="#contact" className="px-6 py-3 rounded-lg font-medium text-white" style={{ backgroundColor: 'var(--primary)' }}>Contact Me</a>
                    <a href="#projects" className="px-6 py-3 rounded-lg font-medium border-2" style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>View Work</a>
                </div>
            </div>
        </div>
    </section>
);
const TechStackSection: React.FC = () => {
  const techs = [
    // Platform/Game Engine
    { icon: <SiUnity className="text-5xl" style={{ color: '#222C37' }} />, name: 'Unity3D' },

    // Bahasa Pemrograman
    { icon: <SiGo className="text-5xl" style={{ color: '#00ADD8' }} />, name: 'Golang' },
    { icon: <SiPhp className="text-5xl" style={{ color: '#777BB4' }} />, name: 'PHP' },
    { icon: <SiDart className="text-5xl" style={{ color: '#0175C2' }} />, name: 'Dart' },
    { icon: <SiTypescript className="text-5xl" style={{ color: '#3178C6' }} />, name: 'TypeScript' },
    { icon: <SiJavascript className="text-5xl" style={{ color: '#F7DF1E' }} />, name: 'JavaScript' },

    // Framework / Library
    { icon: <SiFlutter className="text-5xl" style={{ color: '#02569B' }} />, name: 'Flutter' },
    { icon: <SiLaravel className="text-5xl" style={{ color: '#FF2D20' }} />, name: 'Laravel' },
    { icon: <SiReact className="text-5xl" style={{ color: '#61DAFB' }} />, name: 'ReactJS' },

    // Web related (markup & style)
    { icon: <SiHtml5 className="text-5xl" style={{ color: '#E34F26' }} />, name: 'HTML' },
    { icon: <SiCss3 className="text-5xl" style={{ color: '#1572B6' }} />, name: 'CSS' },

    // Tools / Version Control
    { icon: <SiGit className="text-5xl" style={{ color: '#F05032' }} />, name: 'Git' },
  ];
  

  return (
    <section id="techstack" className="py-20 bg-opacity-50" style={{ backgroundColor: 'var(--card)' }}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Tech Stack</h2>
          <p className="max-w-2xl mx-auto">Technologies I've worked with</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {techs.map((t, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center tech-icon hover:scale-110 transition">
              {t.icon}
              <span className="mt-2">{t.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
// --- Projects Section Component ---
interface ProjectsSectionProps {
  projects: Project[];
  isLoading: boolean;
}
const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects, isLoading }) => {
  // HAPUS: useRef dan fungsi scrollProjects tidak lagi dibutuhkan untuk layout grid
  // const carouselRef = useRef<HTMLDivElement>(null);
  // const scrollProjects = (offset: number) => { ... };

  return (
    <section id="projects" className="py-20" style={{backgroundColor: 'var(--bg)'}}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
          <p className="max-w-2xl mx-auto">A selection of my recent work and contributions</p>
        </div>
        
        {/*
          PERUBAHAN UTAMA DI SINI:
          - Mengganti 'flex overflow-x-auto' dengan 'grid'.
          - Menambahkan 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' untuk layout responsif.
          - Menghapus atribut 'ref' dan inline style 'scrollSnapType'.
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          
          {isLoading && <p className="w-full text-center col-span-full">Loading projects...</p>}
          
          {!isLoading && projects.map(project => (
            <div 
              key={project.id} 
              // HAPUS: 'flex-shrink-0' dihapus agar kartu bisa diatur oleh grid
              className="project-card rounded-xl overflow-hidden flex flex-col" 
              style={{backgroundColor: 'var(--card)' /* HAPUS: scrollSnapAlign dihapus */}}
            >
              <div className="h-48 overflow-hidden">
                  <img src={project.image_url} alt={`${project.title} preview`} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
              </div>
              
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div className="flex-grow">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="mb-4 text-sm">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech_stack.split(',').map(tech => (
                      <span key={tech} className="px-2 py-1 text-xs rounded-full text-white" style={{backgroundColor: 'var(--primary)', opacity: 0.8}}>{tech.trim()}</span>
                    ))}
                  </div>
                </div>
                <div className="flex space-x-3 mt-4">
                    {project.source_code_url && (
                      <a
                        href={project.source_code_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 text-sm rounded text-white"
                        style={{ backgroundColor: 'var(--primary)' }}
                      >
                        View Repo
                      </a>
                    )}
                    <a href={project.project_url} onClick={() => trackClick(project.id)} target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-sm rounded border" style={{borderColor: 'var(--primary)', color: 'var(--primary)'}}>Try it!</a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        
      </div>
    </section>
  );
};

// --- Contact Section Component ---
const ContactSection: React.FC = () => {
    return (
        <section id="contact" className="py-20" style={{ backgroundColor: 'var(--card)' }}>
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
                    <p className="max-w-2xl mx-auto">Feel free to reach out for collaborations or just a friendly hello</p>
                </div>
                
                <div className="max-w-lg mx-auto text-center">
                    <div className="flex justify-center space-x-8">
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12">
                          <a href="https://www.linkedin.com/in/hidayatul-hayat-441b6b278/" className="social-icon hover:scale-125 transition" target='_blank'><FaLinkedin className="text-3xl" /></a>
                          <a href="mailto:hayathidayat673@gmail.com" className="social-icon hover:scale-125 transition" target='_blank'><FaEnvelope className="text-3xl" /></a>
                          <a href="https://github.com/Hdytalhayat" className="social-icon hover:scale-125 transition" target='_blank'><FaGithub className="text-3xl" /></a>
                          <a href="https://instagram.com/hdytalhayat" className="social-icon hover:scale-125 transition" target='_blank'><FaInstagram className="text-3xl" /></a>
                          <a href="https://hdytalhayat.itch.io/" className="social-icon hover:scale-125 transition" target='_blank'><FaGamepad className="text-3xl" /></a>
                        </div>
                    </div>
                  
                </div>
            </div>
        </section>
    );
};

// --- HomePage Main Component ---
const HomePage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const data = await getAllProjects();
        setProjects(data);
      } catch (err) {
        console.error("Failed to load projects", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <>
      <AboutSection />
      <TechStackSection />
      <ProjectsSection projects={projects} isLoading={isLoading} />
      <ContactSection />
    </>
  );
};

export default HomePage;
