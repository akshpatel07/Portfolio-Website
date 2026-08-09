# Modular Component Structure

For larger projects, split the main portfolio into reusable components. Here's the recommended file structure:

```
components/
├── Navigation.jsx           # Fixed header + mobile menu
├── Hero.jsx                 # Hero section with typing effect
├── About.jsx                # About + stats section
├── Skills.jsx               # Skills grid by category
├── Projects.jsx             # Projects grid with cards
├── Experience.jsx           # Timeline section
├── Contact.jsx              # Contact CTA section
├── Footer.jsx               # Footer
└── shared/
    ├── ProjectCard.jsx      # Reusable project card
    ├── SkillTag.jsx         # Reusable skill tag
    ├── TimelineItem.jsx     # Reusable timeline entry
    └── SectionTitle.jsx     # Reusable section header
```

## Component Breakdown

### Navigation.jsx
```jsx
import { Menu, X, Code } from 'lucide-react';
import { useState } from 'react';

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const navItems = ['home', 'about', 'projects', 'experience', 'contact'];

  return (
    <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-700 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('home')}>
          <Code className="w-6 h-6 text-emerald-400" />
          <span className="font-bold text-lg">Aksh Patel</span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          {navItems.map(item => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className="capitalize text-sm text-slate-300 hover:text-emerald-400 transition-colors"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
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
          {navItems.map(item => (
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
  );
}
```

### Hero.jsx
```jsx
import { useState, useEffect } from 'react';
import { TestTube, Github, Linkedin, Mail } from 'lucide-react';

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const [testsPassed, setTestsPassed] = useState(0);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setTestsPassed(prev => (prev + Math.random() * 15) % 2847);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-4xl mx-auto text-center">
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
          with a focus on scalable test design, defect management, and sprint-based QA delivery.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
          <button className="button-primary">View Projects</button>
          <button className="button-secondary">Download Resume</button>
        </div>

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

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <p className="text-slate-400 text-sm">Scroll to explore</p>
        </div>
      </div>
    </section>
  );
}
```

### ProjectCard.jsx
```jsx
import { Github, ExternalLink } from 'lucide-react';

export default function ProjectCard({ project }) {
  return (
    <div className="bg-slate-700/40 border border-slate-600 rounded-lg overflow-hidden hover:border-emerald-400/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="h-48 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-6xl">
        {project.image}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
        <p className="text-slate-300 text-sm mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech, i) => (
            <span key={i} className="px-2 py-1 bg-slate-600/50 text-slate-300 rounded text-xs font-mono">
              {tech}
            </span>
          ))}
        </div>

        <p className="text-emerald-400 text-sm font-semibold mb-4">✓ {project.outcome}</p>

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
  );
}
```

### Skills.jsx
```jsx
import { Database } from 'lucide-react';

const skillsData = [
  {
    category: 'Test Automation',
    items: ['Playwright', 'Selenium WebDriver', 'Page Object Model', 'Test Script Development']
  },
  {
    category: 'QA & Testing',
    items: ['Manual Testing', 'Test Case Design', 'Functional Testing', 'Regression Testing']
  },
  {
    category: 'Programming',
    items: ['Python', 'C', 'JavaScript']
  },
  {
    category: 'Data & Tools',
    items: ['MySQL', 'SQL', 'Git', 'GitHub', 'Docker', 'JIRA']
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-section-title">Skills & Tech Stack</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {skillsData.map((skillGroup, i) => (
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
  );
}
```

### TimelineItem.jsx
```jsx
export default function TimelineItem({ experience }) {
  return (
    <div className="border-l-2 border-emerald-400 pl-8 pb-8 relative">
      <div className="absolute -left-3 top-0 w-4 h-4 bg-emerald-400 rounded-full"></div>

      <div className="mb-3">
        <h3 className="text-xl font-semibold">{experience.role}</h3>
        <p className="text-emerald-400 font-semibold text-sm">{experience.company}</p>
        <p className="text-slate-400 text-sm">{experience.period}</p>
      </div>

      <p className="text-slate-300 mb-4">{experience.description}</p>

      <div className="flex flex-wrap gap-2">
        {experience.tech.map((t, j) => (
          <span key={j} className="px-2 py-1 bg-slate-700 text-emerald-400 rounded text-xs font-mono">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
```

### SectionTitle.jsx
```jsx
export default function SectionTitle({ children, id }) {
  return (
    <div id={id} className="mb-12">
      <h2 className="text-section-title">{children}</h2>
    </div>
  );
}
```

## Usage in Main App

```jsx
// app/page.jsx
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-50 font-sans">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </main>
  );
}
```

## Benefits of Modular Structure

1. **Maintainability**: Each component has a single responsibility
2. **Reusability**: Components like `ProjectCard` can be used in multiple places
3. **Scalability**: Easy to add new components or features
4. **Testing**: Individual components can be tested in isolation
5. **Team Collaboration**: Developers can work on separate components
6. **Code Organization**: Easier navigation and file structure

## Tips for Implementation

- Keep shared components in a `shared/` folder
- Use prop destructuring for clarity
- Create a `constants.js` file for static data (projects, skills, experience)
- Use `useContext` for theme/layout preferences if needed
- Consider using `zustand` or `jotai` for state management if it grows

## Performance Optimization

- Lazy load components that aren't in viewport
- Memoize components to prevent unnecessary re-renders
- Use Next.js Image component for images
- Implement code splitting per route

```jsx
// Dynamic imports
const Projects = dynamic(() => import('@/components/Projects'), {
  loading: () => <div>Loading...</div>,
});
```

---

This modular structure makes the portfolio scalable and maintainable for future updates!
