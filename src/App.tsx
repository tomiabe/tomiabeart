import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ChevronLeft, 
  X, 
  Mail, 
  Twitter, 
  Github, 
  Linkedin, 
  Grid2X2, 
  Grid3X3, 
  LayoutGrid,
  ExternalLink,
  Sun,
  Moon,
  Menu
} from 'lucide-react';

// --- Types ---
interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  image: string;
  detailsImages: string[];
}

// --- Data ---
const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=2565&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2670&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=2574&auto=format&fit=crop',
];

const PROJECTS: Project[] = [
  {
    id: '01',
    title: 'Ethereal Logic',
    category: 'Generative Systems',
    description: 'An exploration of recursive algorithms and fluid dynamics in a digital void.',
    longDescription: 'Ethereal Logic is a series of generative artworks that utilize complex fluid simulation algorithms. By mapping mathematical recursion to visual outputs, the artist creates a bridge between cold logic and organic beauty.',
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=2000&auto=format&fit=crop',
    detailsImages: [
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2000&auto=format&fit=crop'
    ]
  },
  {
    id: '02',
    title: 'Signal & Noise',
    category: 'Computational Media',
    description: 'Transforming radio frequency interference into poetic visual tapestries.',
    longDescription: 'This project captures raw RF interference and processes it through a custom-built computational engine. The resulting waveforms are transformed into high-detail tapestries that visualize the invisible signals surrounding us.',
    image: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=2000&auto=format&fit=crop',
    detailsImages: [
      'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=2000&auto=format&fit=crop'
    ]
  },
  {
    id: '03',
    title: 'Neural Bloom',
    category: 'AI Art',
    description: 'A study of machine learning latent spaces through the lens of digital botany.',
    longDescription: 'Neural Bloom generates infinite varieties of fictional flora by navigating the latent space of a generative adversarial network (GAN) trained on thousands of botanical illustrations.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop',
    detailsImages: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=2000&auto=format&fit=crop'
    ]
  },
  {
    id: '04',
    title: 'Kinetic Geometry',
    category: 'Real-time 3D',
    description: 'Interactive sculptures that respond to audience proximity and environmental sound.',
    longDescription: 'These virtual kinetic sculptures use real-time WebGL rendering to create architectural forms that pulse and transform based on a feed of live audio and motion sensor data.',
    image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2000&auto=format&fit=crop',
    detailsImages: [
      'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2000&auto=format&fit=crop'
    ]
  },
  {
    id: '05',
    title: 'Silicon Threads',
    category: 'Creative Coding',
    description: 'Digital weaving patterns inspired by microchip architectures.',
    longDescription: 'Silicon Threads is a software-based loom that simulates traditional weaving techniques but uses the logic gates and tracing patterns of computer processors as its primary structural guide.',
    image: 'https://images.unsplash.com/photo-1620121692029-d088224efc74?q=80&w=2000&auto=format&fit=crop',
    detailsImages: [
      'https://images.unsplash.com/photo-1620121692029-d088224efc74?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop'
    ]
  },
  {
    id: '06',
    title: 'Data Monuments',
    category: 'Installation',
    description: 'Projecting massive data streams onto physical architectural surfaces.',
    longDescription: 'Large-scale projection mapping that visualizes city-wide energy consumption data in real-time, turning cold infrastructure into luminous reactive monuments.',
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2000&auto=format&fit=crop',
    detailsImages: [
      'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2000&auto=format&fit=crop'
    ]
  },
  {
    id: '07',
    title: 'Spectral Waves',
    category: 'Computational Media',
    description: 'Algorithmic spectrometry transforming live audio feeds into immersive laser formations.',
    longDescription: 'Spectral Waves maps real-time acoustic signal feeds to precise mathematical wave-interference models. It projects high-density volumetric laser formations that materialize the complex timber of acoustic frequencies.',
    image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=2000&auto=format&fit=crop',
    detailsImages: [
      'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2000&auto=format&fit=crop'
    ]
  },
  {
    id: '08',
    title: 'Generative Origami',
    category: 'Real-time 3D',
    description: 'Computational folding structures designed using interactive architectural folding rules.',
    longDescription: 'Generative Origami investigates procedural self-folding geometry in virtual space. Users can interact with physics parameters to manipulate custom digital paper materials, creating complex origami sculptures in high definition.',
    image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2000&auto=format&fit=crop',
    detailsImages: [
      'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=2000&auto=format&fit=crop'
    ]
  },
  {
    id: '09',
    title: 'Sensing Void',
    category: 'Installation',
    description: 'A responsive projection system mapping human traces into visual feedback streams.',
    longDescription: 'Sensing Void uses optical-flow tracking models combined with high-contrast particles to render live, abstract human silhouettes on large gallery surfaces, visualizing physical space and human memory.',
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2000&auto=format&fit=crop',
    detailsImages: [
      'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=2000&auto=format&fit=crop'
    ]
  },
  {
    id: '10',
    title: 'Synthetic Geologies',
    category: 'Generative Systems',
    description: 'Endless procedurally generated terrain maps built using custom vertex fragment shaders.',
    longDescription: 'Synthetic Geologies renders high-fidelity topological terrains that mutate endlessly. Built in pure WebGL with customized simplex noise layers, it questions the boundaries between organic earth formations and virtual architectures.',
    image: 'https://images.unsplash.com/photo-1620121692029-d088224efc74?q=80&w=2000&auto=format&fit=crop',
    detailsImages: [
      'https://images.unsplash.com/photo-1620121692029-d088224efc74?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop'
    ]
  },
];

interface LabItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

const LAB_ITEMS: LabItem[] = [
  {
    id: 'Lab-01',
    title: 'Ethereal Logic Prototype',
    description: 'A study of recursive systems using randomized cellular grids.',
    image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'Lab-02',
    title: 'Quantum Shaders v0.3',
    description: 'Dynamic math-driven color fields rendered strictly in GLSL shaders.',
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'Lab-03',
    title: 'Noise Fields in 2D Space',
    description: 'Simulating complex flowing rivers using raw Simplex Noise formulas.',
    image: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'Lab-04',
    title: 'Procedural Botanical Matrix',
    description: 'Simulating L-Systems to generate computational tree and leaf patterns.',
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'Lab-05',
    title: 'Digital Signal Deconstruction',
    description: 'Glighting sound streams in real-time onto an RGB pixel matrix.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'Lab-06',
    title: 'Mathematical Geometry Study',
    description: 'A representation of organic patterns through strict crystalline rules.',
    image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'Lab-07',
    title: 'City-wide Grid Processing',
    description: 'Generating visual abstract shapes mimicking London transport lines.',
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'Lab-08',
    title: 'Automated Weaving Loom Mock',
    description: 'Programming traditional threads to respond to software logical states.',
    image: 'https://images.unsplash.com/photo-1620121692029-d088224efc74?q=80&w=800&auto=format&fit=crop'
  }
];

// --- Components ---

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [gridCols, setGridCols] = useState(3);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [selectedLabItem, setSelectedLabItem] = useState<LabItem | null>(null);
  const [isLoadedMore, setIsLoadedMore] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Toggle Theme via '.' key
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key === '.') {
      setIsDarkMode(prev => !prev);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  // Close Lab item lightbox and Project lightbox on Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedLabItem(null);
        setExpandedProject(null);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Apply theme class to body
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Lock body scroll when a lightbox/modal is active
  useEffect(() => {
    if (expandedProject || selectedLabItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [expandedProject, selectedLabItem]);

  // Hero Slider logic
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % HERO_IMAGES.length);
  const prevSlide = () => setActiveSlide((prev) => (prev === 0 ? HERO_IMAGES.length - 1 : prev - 1));

  const toggleProject = (id: string) => {
    setExpandedProject(id);
  };

  return (
    <div className={`min-h-screen selection:bg-orange-500 selection:text-white ${isDarkMode ? 'dark' : 'light'}`}>
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-gray-100 dark:border-neutral-900 bg-white/80 dark:bg-black/80 backdrop-blur-md">
        <div className="container-wide h-16 flex items-center justify-between">
          <a href="#" className="font-bold text-lg tracking-tighter text-black dark:text-white">TOMI ABE ART</a>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#home" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:text-white transition-colors">Home</a>
            <a href="#projects" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:text-white transition-colors">Projects</a>
            <a href="#lab" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:text-white transition-colors">Lab</a>
            <a href="#info" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:text-white transition-colors">Info</a>
            <a href="#connect" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:text-white transition-colors">Connect</a>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-transparent hover:bg-gray-100 dark:hover:bg-neutral-900 transition-colors clickable cursor-pointer"
              title="Toggle Theme (Press '.' key)"
            >
              {isDarkMode ? (
                <Sun size={18} className="text-neutral-200" />
              ) : (
                <Moon size={18} className="text-neutral-800" />
              )}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-neutral-900 transition-colors clickable cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              <Menu size={20} className="text-black dark:text-white" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-x-0 top-16 bottom-0 bg-white dark:bg-black z-40 border-t border-gray-100 dark:border-neutral-900 flex flex-col justify-between p-8 md:hidden"
          >
            <div className="flex flex-col gap-6 text-base tracking-normal pt-8">
              {[
                { label: 'Home', href: '#home' },
                { label: 'Projects', href: '#projects' },
                { label: 'Lab', href: '#lab' },
                { label: 'Info', href: '#info' },
                { label: 'Connect', href: '#connect' },
              ].map((link, idx) => (
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:text-white transition-colors flex items-center justify-between border-b border-gray-100 dark:border-neutral-900 pb-4 font-normal"
                >
                  {link.label}
                  <ChevronRight size={16} className="opacity-40" />
                </motion.a>
              ))}
            </div>

            <div className="text-[10px] tracking-widest uppercase opacity-40 text-left pb-8 pt-4 border-t border-gray-100 dark:border-neutral-900">
              © 2026 Tomi Abe Art Practice
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <img 
              src={HERO_IMAGES[activeSlide]} 
              alt="Digital Art" 
              className="w-full h-full object-cover grayscale-[0.2]"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 flex items-center justify-center container-wide pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="bg-white dark:bg-black p-8 md:p-12 max-w-2xl pointer-events-auto shadow-2xl"
          >
            <h1 className="text-2xl md:text-3xl font-medium leading-tight tracking-tight">
              Tomi Abe Art is a digital art practice exploring systems, stories, and signals through generative and computational media.
            </h1>
          </motion.div>
        </div>

        {/* Hero Controls */}
        <div className="absolute bottom-12 left-0 right-0 container-wide flex justify-between items-center z-10">
          <div className="flex gap-4">
            <button onClick={prevSlide} className="p-3 border border-white/20 hover:bg-white/10 backdrop-blur-sm text-white rounded-full transition-colors clickable">
              <ChevronLeft size={20} />
            </button>
            <button onClick={nextSlide} className="p-3 border border-white/20 hover:bg-white/10 backdrop-blur-sm text-white rounded-full transition-colors clickable">
              <ChevronRight size={20} />
            </button>
          </div>
          <div className="flex gap-2">
            {HERO_IMAGES.map((_, i) => (
              <div 
                key={i} 
                className={`h-1 transition-all duration-500 ${activeSlide === i ? 'w-8 bg-white' : 'w-2 bg-white/30'}`} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid Section */}
      <section id="projects" className="py-24 md:py-32 bg-white dark:bg-black">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <p className="text-xs uppercase tracking-widest font-bold opacity-30 mb-2">Projects</p>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">Selected Works</h2>
            </div>
            
            {/* Grid Controls (Hidden on mobile) */}
            <div className="hidden md:flex items-center gap-4 border border-gray-100 dark:border-neutral-800 p-1 rounded-lg">
              <button 
                onClick={() => setGridCols(2)}
                className={`p-2 rounded ${gridCols === 2 ? 'bg-gray-100 dark:bg-neutral-800' : 'opacity-40 hover:opacity-100'}`}
              >
                <Grid2X2 size={18} />
              </button>
              <button 
                onClick={() => setGridCols(3)}
                className={`p-2 rounded ${gridCols === 3 ? 'bg-gray-100 dark:bg-neutral-800' : 'opacity-40 hover:opacity-100'}`}
              >
                <Grid3X3 size={18} />
              </button>
              <button 
                onClick={() => setGridCols(4)}
                className={`p-2 rounded ${gridCols === 4 ? 'bg-gray-100 dark:bg-neutral-800' : 'opacity-40 hover:opacity-100'}`}
              >
                <LayoutGrid size={18} />
              </button>
            </div>
          </div>

          <div className={`grid gap-x-8 gap-y-12 transition-all duration-500 ${
            gridCols === 2 ? 'grid-cols-1 md:grid-cols-2' : 
            gridCols === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 
            'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
          }`}>
            {PROJECTS.slice(0, isLoadedMore ? PROJECTS.length : (gridCols === 4 ? 8 : 6)).map((project) => (
              <ProjectItem 
                key={project.id}
                project={project}
                isActive={expandedProject === project.id}
                onClick={() => toggleProject(project.id)}
              />
            ))}
          </div>

          {/* Load More Button */}
          <div className="mt-16 flex justify-center">
            {!isLoadedMore ? (
              <button
                onClick={() => setIsLoadedMore(true)}
                className="px-8 py-3 font-medium text-sm tracking-tight border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 rounded-full cursor-pointer clickable flex items-center gap-2"
              >
                Load More Projects
                <ChevronRight size={16} />
              </button>
            ) : (
              <button
                onClick={() => setIsLoadedMore(false)}
                className="px-8 py-3 font-medium text-sm tracking-tight border border-gray-200 dark:border-neutral-800 hover:border-black dark:hover:border-white transition-all duration-300 rounded-full cursor-pointer clickable"
              >
                Show Less
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Lab / Experimental Section */}
      <section id="lab" className="py-24 bg-gray-50 dark:bg-neutral-950 border-y border-gray-100 dark:border-neutral-900">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs uppercase tracking-widest font-bold opacity-30 mb-2">Lab</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">Experimental Playground</h2>
              <p className="text-lg opacity-60 mb-8 max-w-lg">
                The Lab is a space for raw explorations, failed experiments, and serendipitous discoveries. This is where I test new algorithms and push the boundaries of creative technology.
              </p>
              <div className="flex flex-wrap gap-4">
                {['Processing', 'p5.js', 'ShaderArt', 'OpenCV', 'Stable Diffusion', 'TouchDesigner'].map(tool => (
                  <span key={tool} className="px-4 py-2 bg-white dark:bg-black border border-gray-100 dark:border-neutral-800 text-xs font-mono rounded-full">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Continuous Vertical Marquee Container */}
            <div className="relative h-[550px] overflow-hidden marquee-vertical-container rounded-2xl border border-gray-200/40 dark:border-neutral-800 p-2 bg-white/5 dark:bg-white/[0.01]">
              {/* Fade overlays for smooth edges */}
              <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-gray-50 via-gray-50/80 to-transparent dark:from-neutral-950 dark:via-neutral-950/80 z-20 pointer-events-none" />
              <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-gray-50 via-gray-50/80 to-transparent dark:from-neutral-950 dark:via-neutral-950/80 z-20 pointer-events-none" />
              
              <div className="grid grid-cols-2 gap-4 h-full">
                {/* Continuous Scroll Column A */}
                <div className="flex flex-col gap-4 animate-vertical-marquee-fast">
                  {[...LAB_ITEMS.slice(0, 4), ...LAB_ITEMS.slice(0, 4)].map((item, idx) => (
                    <div 
                      key={`colA-${item.id}-${idx}`}
                      onClick={() => setSelectedLabItem(item)}
                      className="aspect-square bg-gray-200 dark:bg-neutral-900 rounded-xl overflow-hidden relative group clickable cursor-pointer border border-transparent hover:border-orange-500/50 transition-all duration-300 shadow-sm"
                    >
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        referrerPolicy="no-referrer" 
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4 text-white">
                        <p className="font-mono text-[10px] tracking-widest text-orange-400 uppercase mb-1">{item.id}</p>
                        <p className="font-bold text-sm tracking-tight leading-none mb-1">{item.title}</p>
                        <p className="text-[10px] opacity-75 line-clamp-1">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Continuous Scroll Column B */}
                <div className="flex flex-col gap-4 animate-vertical-marquee-slow">
                  {[...LAB_ITEMS.slice(4, 8), ...LAB_ITEMS.slice(4, 8)].map((item, idx) => (
                    <div 
                      key={`colB-${item.id}-${idx}`}
                      onClick={() => setSelectedLabItem(item)}
                      className="aspect-square bg-gray-200 dark:bg-neutral-900 rounded-xl overflow-hidden relative group clickable cursor-pointer border border-transparent hover:border-orange-500/50 transition-all duration-300 shadow-sm"
                    >
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        referrerPolicy="no-referrer" 
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4 text-white">
                        <p className="font-mono text-[10px] tracking-widest text-orange-400 uppercase mb-1">{item.id}</p>
                        <p className="font-bold text-sm tracking-tight leading-none mb-1">{item.title}</p>
                        <p className="text-[10px] opacity-75 line-clamp-1">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox / Expanded modal view for Lab Items */}
      <AnimatePresence>
        {selectedLabItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedLabItem(null)}
            className="fixed inset-0 bg-black/90 backdrop-blur-lg z-[100] flex items-center justify-center p-6 md:p-12 cursor-zoom-out"
          >
            <button 
              onClick={(e) => { e.stopPropagation(); setSelectedLabItem(null); }}
              className="absolute top-6 right-6 p-3 border border-white/20 bg-white/5 rounded-full hover:bg-white/10 text-white transition-all clickable cursor-pointer z-50"
            >
              <X size={24} />
            </button>

            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full flex flex-col gap-6 text-white cursor-default bg-neutral-900 border border-neutral-800 p-6 md:p-8 rounded-2xl shadow-2xl"
            >
              <div className="aspect-video w-full overflow-hidden bg-neutral-900 rounded-xl relative group">
                <img 
                  src={selectedLabItem.image} 
                  alt={selectedLabItem.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer" 
                />
              </div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-xs text-orange-400 tracking-wider uppercase mb-1">{selectedLabItem.id}</p>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight">{selectedLabItem.title}</h3>
                </div>
                <p className="text-sm text-neutral-400 max-w-md leading-relaxed">
                  {selectedLabItem.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox / Expanded modal view for Project Items */}
      <AnimatePresence>
        {expandedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedProject(null)}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[100] flex items-center justify-center p-4 md:p-12 overflow-y-auto cursor-zoom-out"
          >
            <button 
              onClick={(e) => { e.stopPropagation(); setExpandedProject(null); }}
              className="absolute top-6 right-6 p-3 border border-white/20 bg-white/5 rounded-full hover:bg-white/10 text-white transition-all clickable cursor-pointer z-[110]"
            >
              <X size={24} />
            </button>

            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl w-full text-white cursor-default bg-neutral-900 border border-neutral-800 p-6 md:p-10 rounded-2xl shadow-2xl relative my-auto scrollbar-none overflow-y-auto max-h-[90vh]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
                <div className="lg:col-span-5 space-y-6">
                  <div>
                    <span className="font-mono text-xs text-orange-400 tracking-wider uppercase mb-2 block">
                      {PROJECTS.find(p => p.id === expandedProject)?.category}
                    </span>
                    <h3 className="text-3xl md:text-5xl font-bold tracking-tighter leading-tight mb-4 text-white">
                      {PROJECTS.find(p => p.id === expandedProject)?.title}
                    </h3>
                    <p className="text-sm md:text-base text-neutral-400 leading-relaxed font-light">
                      {PROJECTS.find(p => p.id === expandedProject)?.longDescription}
                    </p>
                  </div>
                  
                  <div className="pt-6 border-t border-neutral-800 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[10px] uppercase font-mono tracking-widest text-neutral-500 mb-1">Year / Medium</p>
                        <p className="font-medium text-sm text-neutral-200">2024 — {PROJECTS.find(p => p.id === expandedProject)?.category}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-mono tracking-widest text-neutral-500 mb-1">Artist</p>
                        <p className="font-medium text-sm text-neutral-200">Tomi Abe</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 pt-2">
                      <a 
                        href="#connect"
                        onClick={() => setExpandedProject(null)}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-black font-medium text-xs tracking-wider rounded-lg hover:bg-neutral-200 transition-colors cursor-pointer clickable"
                      >
                        Inquire Edition <ExternalLink size={14} />
                      </a>
                      <a 
                        href="#connect"
                        onClick={() => setExpandedProject(null)}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700/80 font-medium text-xs tracking-wider rounded-lg text-white transition-colors cursor-pointer clickable"
                      >
                        Launch Simulator
                      </a>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-6">
                  {PROJECTS.find(p => p.id === expandedProject)?.detailsImages.map((img, i) => (
                    <div 
                      key={`${img}-${i}`}
                      className="aspect-video bg-neutral-900 overflow-hidden rounded-xl border border-neutral-900 shadow-inner group"
                    >
                      <img 
                        src={img} 
                        alt="Project detailed illustration" 
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700" 
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info Section */}
      <section id="info" className="py-32 bg-white dark:bg-black">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
            <div className="md:col-span-5 md:sticky md:top-32">
              <div className="aspect-[3/4] bg-gray-100 dark:bg-neutral-900 overflow-hidden relative group">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop" 
                  alt="Tomi Abe" 
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 border-[20px] border-white dark:border-black pointer-events-none" />
              </div>
            </div>
            <div className="md:col-span-7">
               <p className="text-xs uppercase tracking-widest font-bold opacity-30 mb-2">Info</p>
               <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-12 leading-[0.9]">Artist & Technologist</h2>
               <div className="space-y-6 text-xl md:text-2xl opacity-60 leading-relaxed font-light">
                 <p>
                   Tomi Abe is a Japanese-born artist and technologist based in London. His practice sits at the intersection of complex systems and human storytelling.
                 </p>
                 <p>
                   With a background in computer science and fine arts, Tomi uses custom code as his primary brush, building generative systems that explore the beauty of mathematical signals and the chaos of digital noise.
                 </p>
                 <p>
                   His work has been exhibited at various digital art festivals and galleries, focusing on the immersive potential of real-time computational media.
                 </p>
               </div>
               
               <div className="mt-16 grid grid-cols-2 gap-8 pt-16 border-t border-gray-100 dark:border-neutral-900">
                  <div>
                    <h4 className="font-bold mb-4">Focus</h4>
                    <ul className="space-y-2 text-sm opacity-50">
                      <li>Generative Art</li>
                      <li>Computational Design</li>
                      <li>Installation Art</li>
                      <li>Creative Technology</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-4">Exhibitions</h4>
                    <ul className="space-y-2 text-sm opacity-50">
                      <li>Digital Signals (2024)</li>
                      <li>Systemic Voids (2023)</li>
                      <li>Algorithm Poetics (2022)</li>
                      <li>Code as Form (2021)</li>
                    </ul>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section id="connect" className="py-16 md:py-24 bg-black text-white relative overflow-hidden">
        {/* Background signal detail */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {[...Array(20)].map((_, i) => (
              <line key={i} x1="0" y1={i * 5} x2="100" y2={i * 5 + 2} stroke="white" strokeWidth="0.1" />
            ))}
          </svg>
        </div>

        <div className="container-wide relative z-10">
          <div className="max-w-4xl">
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-12">Let's connect.</h2>
            <p className="text-xl md:text-2xl mb-16 opacity-60 leading-tight">
              Looking for collaborations, commissions, or just a chat about the future of computational media.
            </p>
            
            <div className="flex flex-col md:flex-row gap-12 md:items-center">
              <a 
                href="mailto:tomi@abeart.com" 
                className="text-2xl md:text-4xl font-medium border-b-2 border-white/20 pb-4 hover:border-white transition-all clickable flex items-center gap-4"
              >
                tomi@abeart.com <ChevronRight size={32} strokeWidth={1} />
              </a>

              <div className="flex gap-6">
                {[
                  { icon: Twitter, href: "#" },
                  { icon: Github, href: "#" },
                  { icon: Linkedin, href: "#" }
                ].map((social, i) => (
                  <a 
                    key={i} 
                    href={social.href} 
                    className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all clickable"
                  >
                    <social.icon size={24} />
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 opacity-40 text-xs tracking-widest uppercase text-left">
            <p>© 2026 Tomi Abe Art Practice</p>
          </div>
        </div>
      </section>
    </div>
  );
}

interface ProjectItemProps {
  project: Project;
  isActive: boolean;
  onClick: () => void;
  key?: string | number;
}

function ProjectItem({ project, isActive, onClick }: ProjectItemProps) {
  return (
    <motion.div 
      layout
      className={`group relative clickable ${isActive ? 'ring-2 ring-black dark:ring-white p-2' : ''}`}
      onClick={onClick}
    >
      <div className="aspect-square overflow-hidden bg-gray-100 dark:bg-neutral-900 mb-6 relative">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
           <span className="text-white text-xs font-bold uppercase tracking-widest border border-white/40 px-4 py-2 backdrop-blur-md">View Details</span>
        </div>
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-widest font-bold opacity-30 mb-1">{project.category}</p>
        <h3 className="text-xl font-bold tracking-tight mb-2 group-hover:translate-x-1 transition-transform">{project.title}</h3>
        <p className="text-sm opacity-50 line-clamp-2 leading-relaxed">{project.description}</p>
      </div>
    </motion.div>
  );
}


