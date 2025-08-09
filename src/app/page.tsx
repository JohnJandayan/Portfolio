"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { FaPython, FaReact, FaDocker } from "react-icons/fa";
import { SiDjango, SiPostgresql, SiC, SiNeo4J, SiNextdotjs, SiPandas } from "react-icons/si";
import { RiAiGenerate, RiRobot2Line } from "react-icons/ri";
import { TbApi, TbBrain } from "react-icons/tb";
import Image from "next/image";
import useIntersectionObserver from "@/hooks/use-intersection-observer";
import { useEffect, useState } from "react";
import { getGitHubProjects, Portfolio } from "@/lib/github";
import { PortfolioCard } from "@/components/portfolio/portfolio-card";
import Link from "next/link";
import { useCursorGlow } from "@/components/ui/cursor-glow";
import { ContactForm } from "@/components/contact/contact-form";

export default function Home() {
  // For mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // GitHub projects state
  const [projects, setProjects] = useState<Portfolio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Animation on scroll
  const [heroRef, heroVisible] = useIntersectionObserver();
  const [aboutRef, aboutVisible] = useIntersectionObserver();
  const [portfolioRef, portfolioVisible] = useIntersectionObserver();
  const [skillsRef, skillsVisible] = useIntersectionObserver();
  const [contactRef, contactVisible] = useIntersectionObserver();
  
  // Fetch GitHub projects
  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getGitHubProjects('JohnJandayan');
        setProjects(data);
      } catch (error) {
        console.error('Failed to fetch GitHub projects:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchProjects();
  }, []);

  // Smooth scroll function for navigation links
  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Initialize cursor glow effect
  useCursorGlow();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center">
            <a className="mr-6 flex items-center space-x-2 font-bold" href="/">
              <span className="text-primary">JOHN JANDAYAN</span>
            </a>
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              <button onClick={() => scrollToSection('about')} className="transition-colors hover:text-primary">
                About
              </button>
              <button onClick={() => scrollToSection('portfolio')} className="transition-colors hover:text-primary">
                Portfolio
              </button>
              <button onClick={() => scrollToSection('skills')} className="transition-colors hover:text-primary">
                Skills
              </button>
              <button onClick={() => scrollToSection('contact')} className="transition-colors hover:text-primary">
                Contact
              </button>
            </nav>
          </div>
          
          <div className="flex items-center gap-2">
            <ThemeToggle />
            
            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
              )}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="container py-4 flex flex-col space-y-4">
              <button 
                className="text-sm font-medium transition-colors hover:text-primary text-left" 
                onClick={() => scrollToSection('about')}
              >
                About
              </button>
              <button 
                className="text-sm font-medium transition-colors hover:text-primary text-left" 
                onClick={() => scrollToSection('portfolio')}
              >
                Portfolio
              </button>
              <button 
                className="text-sm font-medium transition-colors hover:text-primary text-left" 
                onClick={() => scrollToSection('skills')}
              >
                Skills
              </button>
              <button 
                className="text-sm font-medium transition-colors hover:text-primary text-left" 
                onClick={() => scrollToSection('contact')}
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section 
          ref={heroRef}
          className="container py-12 md:py-24 lg:py-32"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className={`flex flex-col items-start gap-2 ${heroVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl lg:text-5xl">
                Hello, I&#39;m <span className="text-primary">JOHN JANDAYAN</span>.<br className="hidden sm:inline" />
                I build things for the web.
              </h1>
              <p className="max-w-[700px] text-lg text-muted-foreground mt-2">
                I&#39;m John Vianney Jandayan, an aspiring Computer Scientist currently enrolled in Caraga State University. 
                Recently, I&#39;m focused on building accessible and helpful projects. 


              </p>
              
              {/* Social Media Icons */}
              <div className="flex gap-4 mt-4">
                <a 
                  href="https://github.com/JohnJandayan" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-muted-foreground hover:text-primary transition-colors animate-pulse-on-hover"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                </a>
                <a 
                  href="https://www.linkedin.com/in/john-vianney-jandayan-b04584267/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-muted-foreground hover:text-primary transition-colors animate-pulse-on-hover"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
                <a 
                  href="https://www.instagram.com/jandy_jv/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-muted-foreground hover:text-primary transition-colors animate-pulse-on-hover"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
                <a 
                  href="https://www.facebook.com/john.jandy.1" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-muted-foreground hover:text-primary transition-colors animate-pulse-on-hover"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
              </div>
              
              <div className={`flex gap-4 mt-6 ${heroVisible ? 'animate-slide-up delay-200' : 'opacity-0'}`}>
                <Button 
                  className="bg-primary hover:bg-primary/90 transition-all transform hover:scale-105 cursor-glow"
                  onClick={() => scrollToSection('portfolio')}
                >
                  View My Work
                </Button>
                <Button 
                  variant="outline" 
                  className="transition-all transform hover:scale-105 hover:border-primary cursor-glow"
                  onClick={() => scrollToSection('contact')}
                >
                  Contact Me
                </Button>
              </div>
            </div>
            
            {/* Your Photo */}
            <div className={`flex justify-center ${heroVisible ? 'animate-slide-in-right delay-300' : 'opacity-0'}`}>
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary">
                <Image 
                  src="/profile-photo.png" 
                  alt="John Jandayan" 
                  fill 
                  style={{ objectFit: 'cover' }} 
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section 
          id="about" 
          ref={aboutRef}
          className="container py-12 md:py-24 lg:py-32"
        >
          <div className={`mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center ${aboutVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-6xl">
              About <span className="text-primary">Me</span>
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7 mt-4">
              I&#39;m a passionate developer with expertise in React and Django for web development. I also specialize in Python, C, and SQL.
              With a keen eye for design and a commitment to writing clean, efficient code, I desire to create and amplify memorable user experiences.
            </p>
            
            {/* Modern About Section with Education & Experience */}
            <div className="mt-12 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Education Column */}
                <div className={`${aboutVisible ? 'animate-slide-in-right delay-100' : 'opacity-0'}`}>
                  <div className="flex flex-col h-full">
                    <div className="flex items-center mb-4">
                      <div className="p-2 rounded-full bg-primary/20 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>
                      </div>
                      <h3 className="text-2xl font-bold">Education</h3>
                    </div>
                    
                    <div className="border-l-2 border-primary/30 pl-6 space-y-8 py-2 flex-1">
                      <div className="relative">
                        <div className="absolute -left-[31px] mt-1.5 h-4 w-4 rounded-full border-2 border-primary bg-background"></div>
                        <h4 className="text-xl font-semibold">Bachelor of Science in Computer Science</h4>
                        <p className="text-sm text-muted-foreground">Caraga State University, 2023-Ongoing</p>
                        <p className="mt-2">Potential Specialization in Machine Learning. Aspiring Graduate.</p>
                      </div>
                      
                      <div className="relative">
                        <div className="absolute -left-[31px] mt-1.5 h-4 w-4 rounded-full border-2 border-primary bg-background"></div>
                        <h4 className="text-xl font-semibold">IBM AI Developer Certification</h4>
                        <p className="text-sm text-muted-foreground">IBM | Coursera, 2024</p>
                        <p className="mt-2">A course focusing on AI technologies, generative AI models, and programming to build AI-powered chatbots and apps.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Experience Column */}
                <div className={`${aboutVisible ? 'animate-slide-in-right delay-300' : 'opacity-0'}`}>
                  <div className="flex flex-col h-full">
                    <div className="flex items-center mb-4">
                      <div className="p-2 rounded-full bg-primary/20 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                      </div>
                      <h3 className="text-2xl font-bold">Experience</h3>
                    </div>
                    
                    <div className="border-l-2 border-primary/30 pl-6 space-y-8 py-2 flex-1">
                      <div className="relative">
                        <div className="absolute -left-[31px] mt-1.5 h-4 w-4 rounded-full border-2 border-primary bg-background"></div>
                        <h4 className="text-xl font-semibold">Project Leader</h4>
                        <p className="text-sm text-muted-foreground">The League System, 2025-Present</p>
                        <p className="mt-2">Project leader and lead developer for a Debate Tabing System using React-Django.</p>
                      </div>
                      
                      <div className="relative">
                        <div className="absolute -left-[31px] mt-1.5 h-4 w-4 rounded-full border-2 border-primary bg-background"></div>
                        <h4 className="text-xl font-semibold">Curatorial Intern</h4>
                        <p className="text-sm text-muted-foreground">National Museum of the Philippines (Butuan City), 2020-2021</p>
                        <p className="mt-2">Monitoring and encoding various data, designing tarpulins and signages.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section (Renamed from Projects) */}
        <section 
          id="portfolio" 
          ref={portfolioRef}
          className="container py-12 md:py-24 lg:py-32 bg-muted/40"
        >
          <div className={`mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center ${portfolioVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-6xl">
              <span className="text-primary">Portfolio</span>
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7 mb-8">
              Take a look at some of my recent work. These projects are auto-updated from my GitHub repositories.
            </p>
          </div>
          
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : projects.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <div 
                  key={project.id}
                  className={`${portfolioVisible ? `animate-slide-up delay-${(index % 5 + 1) * 100}` : 'opacity-0'}`}
                >
                  <PortfolioCard project={project} />
                </div>
              ))}
            </div>
          ) : (
            <div className={`text-center py-12 ${portfolioVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              <div className="inline-flex items-center justify-center p-4 bg-muted rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M7 8h10"/><path d="M7 12h10"/><path d="M7 16h5"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">No Projects Found</h3>
              <p className="text-muted-foreground">
                Please check your GitHub username in the configuration or try again later.
              </p>
            </div>
          )}
          <div className="flex justify-center mt-8">
            <Button asChild variant="outline" className="hover:border-primary transition-all transform hover:scale-105 hover:glow-on-hover">
              <Link href="https://github.com/JohnJandayan" target="_blank" rel="noopener noreferrer">
                View All Projects
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="ml-2"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
            </Button>
          </div>
        </section>

        {/* Skills Section with react-icons */}
        <section 
          id="skills" 
          ref={skillsRef}
          className="container py-12 md:py-24 lg:py-32"
        >
          <div className={`mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center ${skillsVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-6xl">
              <span className="text-primary">Skills</span>
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7 mb-8">
              Technologies I&#39;ve been working with recently
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-8 justify-items-center">
            {/* Python */}
            <div className={`flex flex-col items-center gap-2 transition-transform hover:scale-110 ${skillsVisible ? 'animate-slide-up delay-100' : 'opacity-0'}`}>
              <div className="rounded-full bg-muted border border-primary p-4 shadow-sm hover:shadow-md transition-all cursor-glow">
                <FaPython className="text-primary w-6 h-6" />
              </div>
              <span className="text-sm font-medium">Python</span>
            </div>
            
            {/* C */}
            <div className={`flex flex-col items-center gap-2 transition-transform hover:scale-110 ${skillsVisible ? 'animate-slide-up delay-200' : 'opacity-0'}`}>
              <div className="rounded-full bg-muted border border-primary p-4 shadow-sm hover:shadow-md transition-all cursor-glow">
                <SiC className="text-primary w-6 h-6" />
              </div>
              <span className="text-sm font-medium">C</span>
            </div>
            
            {/* React */}
            <div className={`flex flex-col items-center gap-2 transition-transform hover:scale-110 ${skillsVisible ? 'animate-slide-up delay-300' : 'opacity-0'}`}>
              <div className="rounded-full bg-muted border border-primary p-4 shadow-sm hover:shadow-md transition-all cursor-glow">
                <FaReact className="text-primary w-6 h-6" />
              </div>
              <span className="text-sm font-medium">React</span>
            </div>
            
            {/* PostgreSQL */}
            <div className={`flex flex-col items-center gap-2 transition-transform hover:scale-110 ${skillsVisible ? 'animate-slide-up delay-400' : 'opacity-0'}`}>
              <div className="rounded-full bg-muted border border-primary p-4 shadow-sm hover:shadow-md transition-all cursor-glow">
                <SiPostgresql className="text-primary w-6 h-6" />
              </div>
              <span className="text-sm font-medium">PostgreSQL</span>
            </div>
            
            {/* Django */}
            <div className={`flex flex-col items-center gap-2 transition-transform hover:scale-110 ${skillsVisible ? 'animate-slide-up delay-500' : 'opacity-0'}`}>
              <div className="rounded-full bg-muted border border-primary p-4 shadow-sm hover:shadow-md transition-all cursor-glow">
                <SiDjango className="text-primary w-6 h-6" />
              </div>
              <span className="text-sm font-medium">Django</span>
            </div>

            {/* ML/AI */}
            <div className={`flex flex-col items-center gap-2 transition-transform hover:scale-110 ${skillsVisible ? 'animate-slide-up delay-600' : 'opacity-0'}`}>
              <div className="rounded-full bg-muted border border-primary p-4 shadow-sm hover:shadow-md transition-all cursor-glow">
                <TbBrain className="text-primary w-6 h-6" />
              </div>
              <span className="text-sm font-medium">ML/AI</span>
            </div>

            {/* Neo4j */}
            <div className={`flex flex-col items-center gap-2 transition-transform hover:scale-110 ${skillsVisible ? 'animate-slide-up delay-700' : 'opacity-0'}`}>
              <div className="rounded-full bg-muted border border-primary p-4 shadow-sm hover:shadow-md transition-all cursor-glow">
                <SiNeo4J className="text-primary w-6 h-6" />
              </div>
              <span className="text-sm font-medium">Neo4j</span>
            </div>

            {/* Next.js */}
            <div className={`flex flex-col items-center gap-2 transition-transform hover:scale-110 ${skillsVisible ? 'animate-slide-up delay-800' : 'opacity-0'}`}>
              <div className="rounded-full bg-muted border border-primary p-4 shadow-sm hover:shadow-md transition-all cursor-glow">
                <SiNextdotjs className="text-primary w-6 h-6" />
              </div>
              <span className="text-sm font-medium">Next.js</span>
            </div>

            {/* Docker */}
            <div className={`flex flex-col items-center gap-2 transition-transform hover:scale-110 ${skillsVisible ? 'animate-slide-up delay-900' : 'opacity-0'}`}>
              <div className="rounded-full bg-muted border border-primary p-4 shadow-sm hover:shadow-md transition-all cursor-glow">
                <FaDocker className="text-primary w-6 h-6" />
              </div>
              <span className="text-sm font-medium">Docker</span>
            </div>

            {/* GenAI */}
            <div className={`flex flex-col items-center gap-2 transition-transform hover:scale-110 ${skillsVisible ? 'animate-slide-up delay-1000' : 'opacity-0'}`}>
              <div className="rounded-full bg-muted border border-primary p-4 shadow-sm hover:shadow-md transition-all cursor-glow">
                <RiAiGenerate className="text-primary w-6 h-6" />
              </div>
              <span className="text-sm font-medium">GenAI</span>
            </div>

            {/* REST APIs */}
            <div className={`flex flex-col items-center gap-2 transition-transform hover:scale-110 ${skillsVisible ? 'animate-slide-up delay-1100' : 'opacity-0'}`}>
              <div className="rounded-full bg-muted border border-primary p-4 shadow-sm hover:shadow-md transition-all cursor-glow">
                <TbApi className="text-primary w-6 h-6" />
              </div>
              <span className="text-sm font-medium">REST APIs</span>
            </div>

            {/* Pandas */}
            <div className={`flex flex-col items-center gap-2 transition-transform hover:scale-110 ${skillsVisible ? 'animate-slide-up delay-1200' : 'opacity-0'}`}>
              <div className="rounded-full bg-muted border border-primary p-4 shadow-sm hover:shadow-md transition-all cursor-glow">
                <SiPandas className="text-primary w-6 h-6" />
              </div>
              <span className="text-sm font-medium">Pandas</span>
            </div>

            {/* NLP */}
            <div className={`flex flex-col items-center gap-2 transition-transform hover:scale-110 ${skillsVisible ? 'animate-slide-up delay-1300' : 'opacity-0'}`}>
              <div className="rounded-full bg-muted border border-primary p-4 shadow-sm hover:shadow-md transition-all cursor-glow">
                <RiRobot2Line className="text-primary w-6 h-6" />
              </div>
              <span className="text-sm font-medium">NLP</span>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section 
          id="contact" 
          ref={contactRef}
          className="container py-12 md:py-24 lg:py-32 bg-muted/40"
        >
          <div className={`mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center ${contactVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-6xl">
              Get In <span className="text-primary">Touch</span>
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7 mb-8">
              Feel free to reach out if you&#39;re looking for a developer, have a question, or just want to connect.
            </p>
            
            <div className={`w-full max-w-[500px] ${contactVisible ? 'animate-slide-up delay-100' : 'opacity-0'}`}>
              <ContactForm />
            </div>
            
            {/* Social Media Icons - Contact Section */}
            <div className={`flex gap-6 mt-8 ${contactVisible ? 'animate-slide-up delay-300' : 'opacity-0'}`}>
              <a 
                href="https://github.com/JohnJandayan" 
                target="_blank" 
                rel="noreferrer" 
                className="text-muted-foreground hover:text-primary transition-colors animate-pulse-on-hover"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </a>
              <a 
                href="https://www.linkedin.com/in/john-vianney-jandayan-b04584267/" 
                target="_blank" 
                rel="noreferrer" 
                className="text-muted-foreground hover:text-primary transition-colors animate-pulse-on-hover"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a 
                href="https://www.instagram.com/jandy_jv/" 
                target="_blank" 
                rel="noreferrer" 
                className="text-muted-foreground hover:text-primary transition-colors animate-pulse-on-hover"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a 
                href="https://www.facebook.com/john.jandy.1" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-muted-foreground hover:text-primary transition-colors animate-pulse-on-hover"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
              </div>
            </div>
          </section>
        </main>
  
        <footer className="border-t py-6 md:py-0">
          <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} John Jandayan. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    );
  }
