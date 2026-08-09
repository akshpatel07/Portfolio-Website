"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, Code, TestTube, Database } from 'lucide-react';

const Portfolio = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [typedText, setTypedText] = useState('');
  const [testsPassed, setTestsPassed] = useState(0);

  // Typing effect for hero
  const roles = ['QA Automation Engineer', 'Playwright Specialist', 'Test Architecture Builder'];
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const speed = isDeleting ? 50 : 100;
    const timer = setTimeout(() => {
      const currentRole = roles[roleIndex];
      
      if (!isDeleting && charIndex < currentRole.length) {
        setTypedText(currentRole.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        setTypedText(currentRole.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (!isDeleting && charIndex === currentRole.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && charIndex === 0) {
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setIsDeleting(false);
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, roleIndex]);

  // Animate test counter
  useEffect(() => {
    const interval = setInterval(() => {
      setTestsPassed(prev => (prev + Math.random() * 15) % 2847);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const projects = [
    {
      id: 1,
      title: 'Multi-Document Q&A System',
      description: 'Built a Streamlit RAG application enabling natural-language Q&A across multiple PDFs using LangChain and FAISS embeddings.',
      tech: ['Streamlit', 'LangChain', 'FAISS', 'Python', 'RAG'],
      github: 'https://github.com',
      demo: '#',
      outcome: 'Reduced document review time by 60% for knowledge workers',
      image: '🤖'
    },
    {
      id: 2,
      title: 'RL-Based Cyber Threat Detection',
      description: 'Reinforcement learning model with Deep Q-Network and NASIM to simulate and detect real-time cyberattacks with knowledge graphs.',
      tech: ['Deep Q-Learning', 'NASIM', 'Neo4j', 'Streamlit', 'Groq'],
      github: 'https://github.com',
      demo: '#',
      outcome: 'Achieved 89% attack detection accuracy in edge environments',
      image: '🛡️'
    },
    {
      id: 3,
      title: 'Playwright Regression Suite - Lumos Learning',
      description: 'Designed and automated 100+ test cases using Playwright with structured execution strategies, locators, and browser actions for web applications.',
      tech: ['Playwright', 'JavaScript', 'Page Object Model', 'CI/CD'],
      github: 'https://github.com',
      demo: 'https://lumoslearning.com',
      outcome: 'Reduced regression testing cycle from 8h to 2h per sprint',
      image: '✅'
    }
  ];

  const skills = [
    {
      category: 'Test Automation',
      items: ['Playwright', 'Selenium WebDriver', 'Page Object Model', 'Test Script Development']
    },
    {
      category: 'QA & Testing',
      items: ['Manual Testing', 'Test Case Design', 'Functional Testing', 'Regression Testing', 'Smoke Testing', 'Defect Management']
    },
    {
      category: 'Programming',
      items: ['Python', 'C', 'JavaScript']
    },
    {
      category: 'Data & Tools',
      items: ['MySQL', 'SQL', 'Git', 'GitHub', 'Docker', 'JIRA']
    },
    {
      category: 'AI/ML (Additional)',
      items: ['LangChain', 'RAG', 'Streamlit', 'FAISS', 'Pandas']
    }
  ];

  const experience = [
    {
      role: 'Software Testing Associate',
      company: 'Lumos Learning',
      period: 'May 2026 – Present',
      description: 'Designing and executing automated test suites, managing sprint-based QA cycles, and building Playwright automation for faster regression testing.',
      tech: ['Playwright', 'Selenium', 'Agile']
    },
    {
      role: 'Software Testing Intern',
      company: 'Lumos Learning',
      period: 'January 2026 – March 2026',
      description: 'Executed 100+ manual test cases, built Selenium automation scripts with Page Object Model patterns, and contributed to test strategy.',
      tech: ['Selenium', 'Manual Testing', 'Test Design']
    }
  ];

  const scrollToSection = (id) => {
    setActiveSection(id);
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-50 font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-700 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('home')}>
            <Code className="w-6 h-6 text-emerald-400" />
            <span className="font-bold text-lg">Aksh Patel</span>
          </div>
          
          <div className="hidden md:flex gap-8">
            {['home', 'about', 'projects', 'experience', 'contact'].map(item => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`capitalize text-sm transition-colors ${
                  activeSection === item ? 'text-emerald-400' : 'text-slate-300 hover:text-emerald-400'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-slate-300 hover:text-emerald-400"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-slate-800/90 border-t border-slate-700 px-6 py-4 flex flex-col gap-4">
            {['home', 'about', 'projects', 'experience', 'contact'].map(item => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-left capitalize text-slate-300 hover:text-emerald-400 transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Test Counter Animation */}
          <div className="inline-block mb-8 px-4 py-2 bg-emerald-400/10 border border-emerald-400/30 rounded-lg">
            <p className="text-emerald-400 text-sm font-mono">
              <TestTube className="inline w-4 h-4 mr-2" />
              {Math.floor(testsPassed)} Tests Passed
            </p>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
            Hi, I'm Aksh
          </h1>
          
          <div className="h-24 md:h-20 mb-8">
            <p className="text-2xl md:text-4xl text-emerald-400 font-mono min-h-16">
              {typedText}
              <span className="animate-pulse">|</span>
            </p>
          </div>

          <p className="text-lg text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            I build robust test automation frameworks and quality infrastructure. Specialized in Playwright & Selenium, 
            with a focus on scalable test design, defect management, and sprint-based QA delivery at Lumos Learning.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => scrollToSection('projects')}
              className="px-8 py-3 bg-emerald-400 text-slate-900 rounded-lg font-semibold hover:bg-emerald-300 transition-colors"
            >
              View Projects
            </button>
            <a
              href="#"
              className="px-8 py-3 border border-emerald-400 text-emerald-400 rounded-lg font-semibold hover:bg-emerald-400/10 transition-colors"
            >
              Download Resume
            </a>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6">
            <a href="https://github.com" className="text-slate-400 hover:text-emerald-400 transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com" className="text-slate-400 hover:text-emerald-400 transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="mailto:akshbpatel1172004@gmail.com" className="text-slate-400 hover:text-emerald-400 transition-colors">
              <Mail className="w-6 h-6" />
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <p className="text-slate-400 text-sm">Scroll to explore</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-slate-800/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-12">About Me</h2>
          
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-emerald-400">Current Role</h3>
              <p className="text-slate-300 mb-6">
                Software Testing Associate at <span className="text-emerald-400 font-semibold">Lumos Learning</span>, 
                building production-grade test automation and quality infrastructure for web-based educational platforms.
              </p>
              <p className="text-slate-300">
                Transitioned from hands-on testing to automation architecture, designing test frameworks that scale 
                across sprint cycles and reduce regression testing overhead by up to 75%.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-emerald-400">Background</h3>
              <p className="text-slate-300 mb-6">
                B.E. in Computer Science & Engineering (AI & ML) from The National Institute of Engineering, Mysore. 
                Built ML models and RAG systems in parallel, bringing analytical rigor to test strategy and automation design.
              </p>
              <p className="text-slate-300">
                <span className="text-emerald-400 font-semibold">1.5+ years</span> across STLC/SDLC, manual testing, 
                test design, and automation across Agile sprints.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { label: 'Test Cases Executed', value: '100+' },
              { label: 'Automation Scripts Built', value: '50+' },
              { label: 'Years in QA', value: '1.5+' },
              { label: 'Projects Delivered', value: '5+' }
            ].map((stat, i) => (
              <div key={i} className="bg-slate-700/50 border border-slate-600 rounded-lg p-6 text-center">
                <p className="text-3xl font-bold text-emerald-400 mb-2">{stat.value}</p>
                <p className="text-slate-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-12">Skills & Tech Stack</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skillGroup, i) => (
              <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-emerald-400 mb-4 flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, j) => (
                    <span
                      key={j}
                      className="px-3 py-1 bg-emerald-400/20 border border-emerald-400/50 text-emerald-300 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 bg-slate-800/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-12">Featured Projects</h2>
          
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-slate-700/40 border border-slate-600 rounded-lg overflow-hidden hover:border-emerald-400/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Project Image/Icon */}
                <div className="h-48 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-6xl">
                  {project.image}
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                  <p className="text-slate-300 text-sm mb-4">{project.description}</p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-slate-600/50 text-slate-300 rounded text-xs font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Outcome */}
                  <p className="text-emerald-400 text-sm font-semibold mb-4">✓ {project.outcome}</p>

                  {/* Links */}
                  <div className="flex gap-3">
                    <a
                      href={project.github}
                      className="flex-1 px-4 py-2 bg-slate-600/50 hover:bg-slate-600 rounded text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
                    >
                      <Github className="w-4 h-4" /> GitHub
                    </a>
                    <a
                      href={project.demo}
                      className="flex-1 px-4 py-2 bg-emerald-400/20 hover:bg-emerald-400/30 border border-emerald-400/50 rounded text-sm font-semibold text-emerald-300 flex items-center justify-center gap-2 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" /> Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="https://github.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold transition-colors"
            >
              View More on GitHub <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12">Experience</h2>
          
          <div className="space-y-8">
            {experience.map((exp, i) => (
              <div key={i} className="border-l-2 border-emerald-400 pl-8 pb-8 relative">
                {/* Timeline dot */}
                <div className="absolute -left-3 top-0 w-4 h-4 bg-emerald-400 rounded-full"></div>

                <div className="mb-3">
                  <h3 className="text-xl font-semibold">{exp.role}</h3>
                  <p className="text-emerald-400 font-semibold text-sm">{exp.company}</p>
                  <p className="text-slate-400 text-sm">{exp.period}</p>
                </div>

                <p className="text-slate-300 mb-4">{exp.description}</p>

                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((t, j) => (
                    <span key={j} className="px-2 py-1 bg-slate-700 text-emerald-400 rounded text-xs font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-slate-800/50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Let's Build Something Great</h2>
          <p className="text-slate-300 mb-12">
            Open to full-time roles, consulting projects, and collaborations. 
            I typically respond within 24 hours.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="mailto:akshbpatel1172004@gmail.com"
              className="px-8 py-3 bg-emerald-400 text-slate-900 rounded-lg font-semibold hover:bg-emerald-300 transition-colors flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5" /> Send Email
            </a>
            <a
              href="https://linkedin.com"
              className="px-8 py-3 border border-emerald-400 text-emerald-400 rounded-lg font-semibold hover:bg-emerald-400/10 transition-colors flex items-center justify-center gap-2"
            >
              <Linkedin className="w-5 h-5" /> LinkedIn
            </a>
          </div>

          {/* Email Link */}
          <p className="text-slate-400 text-sm">
            Email: <a href="mailto:akshbpatel1172004@gmail.com" className="text-emerald-400 hover:underline">
              akshbpatel1172004@gmail.com
            </a>
          </p>
          <p className="text-slate-400 text-sm mt-2">
            Phone: <a href="tel:+919483772764" className="text-emerald-400 hover:underline">
              +91 9483772764
            </a>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 py-8 px-6 text-center text-slate-400 text-sm">
        <p>© 2026 Aksh Patel. Designed with focus on quality and automation.</p>
      </footer>
    </div>
  );
};

export default Portfolio;
