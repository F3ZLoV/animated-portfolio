"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Linkedin,
  Mail,
  Phone,
  Code,
  Palette,
  TrendingUp,
  GraduationCap,
  MapPin,
  Calendar,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
} from "lucide-react"

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")
  const [isLoading, setIsLoading] = useState(true)

  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  const cursorRef = useRef(null)
  const sectionRefs = {
    home: useRef(null),
    about: useRef(null),
    skills: useRef(null),
    projects: useRef(null),
    contact: useRef(null),
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      for (const section in sectionRefs) {
        const element = sectionRefs[section].current
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const skills = [
    { name: "React/Next.js", level: 95, category: "Frontend" },
    { name: "Node.js/Express", level: 90, category: "Backend" },
    { name: "TypeScript", level: 88, category: "Language" },
    { name: "SEO", level: 85, category: "Marketing" },
    { name: "MongoDB/PostgreSQL", level: 87, category: "Database" },
    { name: "UI/UX Design", level: 92, category: "Design" },
    { name: "Digital Marketing", level: 88, category: "Marketing" },
    { name: "WordPress", level: 85, category: "Frontend" },
  ]

  const projects = [
    {
      title: "VR-Integrated E-commerce Platform",
      description:
        "Revolutionary clothing e-commerce website with virtual reality try-on features, built with Next.js, Three.js, and WebXR APIs.",
      tech: ["Next.js", "Three.js", "WebXR", "Stripe", "MongoDB"],
      image: "/images/ecommerce-platform.png",
    },
    {
      title: "Fast Food Delivery App",
      description:
        "Full-stack food delivery application with real-time tracking, payment integration, and admin dashboard.",
      tech: ["React Native", "Node.js", "Socket.io", "PayPal API", "Firebase"],
      image: "/images/food-delivery-app.png",
    },
    {
      title: "Digital Marketing Dashboard",
      description:
        "Comprehensive analytics platform for tracking marketing campaigns across multiple channels with AI-powered insights.",
      tech: ["React", "D3.js", "Python", "TensorFlow", "AWS"],
      image: "/images/digital-marketing-dashboard.jpeg",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  const cursorVariants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
    },
    button: {
      x: mousePosition.x - 30,
      y: mousePosition.y - 30,
      height: 60,
      width: 60,
      backgroundColor: "rgba(147, 51, 234, 0.3)",
      mixBlendMode: "difference",
    },
    text: {
      x: mousePosition.x - 75,
      y: mousePosition.y - 75,
      height: 150,
      width: 150,
      backgroundColor: "rgba(147, 51, 234, 0.1)",
      mixBlendMode: "difference",
    },
  }

  const enterButton = () => setCursorVariant("button")
  const enterText = () => setCursorVariant("text")
  const leaveButton = () => setCursorVariant("default")
  const leaveText = () => setCursorVariant("default")

  const navItems = ["home", "about", "skills", "projects", "contact"]

  // Text animation variants
  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
      },
    }),
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [0.8, 1.2, 1], opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="relative"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 animate-spin opacity-75"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Code className="w-10 h-10 text-white" />
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] overflow-hidden">
      {/* Custom Cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full bg-purple-500 mix-blend-difference pointer-events-none z-50 hidden md:block"
        variants={cursorVariants}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-cyan-500 to-purple-600 z-50"
        style={{ scaleX, transformOrigin: "0%" }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full z-40 bg-black/30 backdrop-blur-xl border-b border-white/10"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent"
              onMouseEnter={enterButton}
              onMouseLeave={leaveButton}
            >
              Portfolio
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <motion.a
                  key={item}
                  href={`#${item}`}
                  whileHover={{ scale: 1.1 }}
                  className={`capitalize ${
                    activeSection === item ? "text-white font-medium" : "text-white/60 hover:text-white"
                  } transition-colors`}
                  onMouseEnter={enterButton}
                  onMouseLeave={leaveButton}
                >
                  {item}
                  {activeSection === item && (
                    <motion.div
                      layoutId="activeSection"
                      className="h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mt-1 rounded-full"
                    />
                  )}
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white p-2 rounded-full bg-white/5 backdrop-blur-md"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 space-y-4 overflow-hidden"
              >
                {navItems.map((item) => (
                  <motion.a
                    key={item}
                    href={`#${item}`}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`block py-2 capitalize ${
                      activeSection === item
                        ? "text-white font-medium border-l-2 border-purple-500 pl-4"
                        : "text-white/60 hover:text-white pl-4"
                    } transition-colors`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </motion.a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Floating Navigation Indicator */}
      <div className="fixed right-10 top-1/2 transform -translate-y-1/2 z-30 hidden xl:block">
        <div className="flex flex-col items-center space-y-6">
          {navItems.map((item) => (
            <a key={item} href={`#${item}`} className="group relative">
              <div
                className={`w-3 h-3 rounded-full ${
                  activeSection === item ? "bg-gradient-to-r from-purple-500 to-cyan-500" : "bg-white/20"
                } transition-all duration-300`}
              />
              <span className="absolute left-0 transform -translate-x-full -translate-y-1/2 top-1/2 pr-4 opacity-0 group-hover:opacity-100 text-white text-sm capitalize transition-opacity">
                {item}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section
        id="home"
        ref={sectionRefs.home}
        className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.15),rgba(0,0,0,0)_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(45,212,191,0.15),rgba(0,0,0,0)_50%)]" />
        </div>

        {/* Animated Particles */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 md:w-2 md:h-2 rounded-full bg-white/20"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              transition={{
                duration: Math.random() * 10 + 20,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>

        <div className="text-center z-10 px-4">
          <motion.div className="mb-8">
            <div className="relative w-60 h-60 mx-auto mb-6">
              {/* Animated rings */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-purple-500/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-2 rounded-full border-2 border-cyan-500/30"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-4 rounded-full border-2 border-purple-400/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />

              {/* Profile image container */}
              <motion.div
                className="absolute inset-6 rounded-full bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500 p-1"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                whileHover={{ scale: 1.1 }}
              >
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(147,51,234,0.3),rgba(0,0,0,0)_70%)]" />
                  <img
                    src="/images/profile.jpeg"
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full relative z-10"
                  />
                </div>
              </motion.div>

              {/* Floating particles around profile */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full"
                  style={{
                    top: `${20 + Math.sin((i * Math.PI) / 4) * 60}%`,
                    left: `${20 + Math.cos((i * Math.PI) / 4) * 60}%`,
                  }}
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 2 + i * 0.2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.3,
                  }}
                />
              ))}

              {/* Glow effect */}
              <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-purple-500/20 via-cyan-400/20 to-purple-500/20 blur-xl animate-pulse" />
            </div>
          </motion.div>

          {/* Animated text for "Full Stack" */}
          <div className="overflow-hidden mb-2">
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white inline-block"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              onMouseEnter={enterText}
              onMouseLeave={leaveText}
            >
              {"Full Stack".split("").map((char, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h1>
          </div>

          {/* Animated text for "Developer" */}
          <div className="overflow-hidden mb-6">
            <motion.h1
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent inline-block"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              onMouseEnter={enterText}
              onMouseLeave={leaveText}
            >
              {"Developer".split("").map((char, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>
          </div>

          <motion.p
            className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            onMouseEnter={enterText}
            onMouseLeave={leaveText}
          >
            {"Crafting digital experiences through code, design, and innovation.".split(" ").map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                className="inline-block mr-1"
              >
                {word}
              </motion.span>
            ))}
          </motion.p>

          <motion.p
            className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            onMouseEnter={enterText}
            onMouseLeave={leaveText}
          >
            {"Specializing in full-stack development, UI/UX design, and digital marketing."
              .split(" ")
              .map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                  className="inline-block mr-1"
                >
                  {word}
                </motion.span>
              ))}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.0 }}
            className="mb-8"
          >
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {["React", "Next.js", "Node.js", "WordPress", "SEO"].map((tech, index) => (
                <motion.span
                  key={tech}
                  className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white/80 border border-white/20"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2.0 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(147, 51, 234, 0.3)" }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 border-0 relative group overflow-hidden text-white font-semibold shadow-2xl"
                onMouseEnter={enterButton}
                onMouseLeave={leaveButton}
              >
                <span className="relative z-10 flex items-center font-medium">
                  View My Work
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </motion.div>
                </span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-purple-700 to-cyan-600"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm font-semibold shadow-lg hover:border-white/50 transition-all duration-300 bg-transparent"
                onMouseEnter={enterButton}
                onMouseLeave={leaveButton}
              >
                <span className="font-medium">Download CV</span>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.4 }}
            className="mt-12"
          >
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
              <ChevronDown className="w-8 h-8 text-white/60 mx-auto" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={sectionRefs.about} className="py-32 px-4 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(147,51,234,0.15),rgba(0,0,0,0)_50%)]" />
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              onMouseEnter={enterText}
              onMouseLeave={leaveText}
            >
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-md relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg blur opacity-30 group-hover:opacity-70 transition duration-1000"></div>
                <CardHeader className="relative">
                  <CardTitle className="text-white flex items-center gap-2">
                    <GraduationCap className="w-6 h-6 text-purple-400" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-white/80 relative">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg text-white">Bachelor of Science in Computer Science</h3>
                      <p className="text-purple-300">University of Engineering and Technology</p>
                      <div className="flex items-center gap-4 mt-2 text-sm">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          2021 - 2025
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          Pakistan
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="text-center p-6 bg-white/5 rounded-lg border border-white/10 relative group"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-300"></div>
                  <div className="relative">
                    <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                      10+
                    </div>
                    <div className="text-white/60">Projects Completed</div>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="text-center p-6 bg-white/5 rounded-lg border border-white/10 relative group"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-300"></div>
                  <div className="relative">
                    <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                      1+
                    </div>
                    <div className="text-white/60">Years Experience</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="relative" onMouseEnter={enterText} onMouseLeave={leaveText}>
                <p className="text-lg text-white/80 leading-relaxed">
                  I'm a passionate full-stack developer with a strong foundation in computer science from the University
                  of Engineering and Technology. My expertise spans across multiple domains including web development,
                  UI/UX design, and digital marketing.
                </p>

                <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent my-6 opacity-50"></div>

                <p className="text-lg text-white/80 leading-relaxed">
                  I specialize in creating innovative solutions that bridge the gap between technology and user
                  experience. From VR-integrated e-commerce platforms to intuitive web applications, I bring ideas to
                  life through clean code and thoughtful design.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="p-5 rounded-lg bg-gradient-to-br from-purple-900/40 to-cyan-900/40 backdrop-blur-sm border border-white/5"
                >
                  <Code className="w-8 h-8 text-purple-400 mb-3" />
                  <h3 className="text-lg font-medium text-white mb-2">Clean Code</h3>
                  <p className="text-white/70 text-sm">
                    Writing maintainable, efficient, and scalable code is my passion.
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="p-5 rounded-lg bg-gradient-to-br from-cyan-900/40 to-purple-900/40 backdrop-blur-sm border border-white/5"
                >
                  <Palette className="w-8 h-8 text-cyan-400 mb-3" />
                  <h3 className="text-lg font-medium text-white mb-2">Creative Design</h3>
                  <p className="text-white/70 text-sm">Crafting beautiful, intuitive interfaces that users love.</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" ref={sectionRefs.skills} className="py-32 px-4 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(45,212,191,0.15),rgba(0,0,0,0)_50%)]" />
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              onMouseEnter={enterText}
              onMouseLeave={leaveText}
            >
              Skills & Expertise
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto"></div>
          </motion.div>

          <div className="mb-20">
            <Tabs defaultValue="all" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="bg-white/5 backdrop-blur-md border border-white/10">
                  <TabsTrigger
                    value="all"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
                    onMouseEnter={enterButton}
                    onMouseLeave={leaveButton}
                  >
                    All Skills
                  </TabsTrigger>
                  <TabsTrigger
                    value="frontend"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
                    onMouseEnter={enterButton}
                    onMouseLeave={leaveButton}
                  >
                    Frontend
                  </TabsTrigger>
                  <TabsTrigger
                    value="backend"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
                    onMouseEnter={enterButton}
                    onMouseLeave={leaveButton}
                  >
                    Backend
                  </TabsTrigger>
                  <TabsTrigger
                    value="other"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
                    onMouseEnter={enterButton}
                    onMouseLeave={leaveButton}
                  >
                    Other
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="all" className="mt-0">
                <div className="grid md:grid-cols-2 gap-8">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-white font-medium">{skill.name}</span>
                        <Badge
                          variant="secondary"
                          className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-white/80 border-0"
                        >
                          {skill.category}
                        </Badge>
                      </div>
                      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                      <div className="text-right text-sm text-white/60">{skill.level}%</div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="frontend" className="mt-0">
                <div className="grid md:grid-cols-2 gap-8">
                  {skills
                    .filter((s) => s.category === "Frontend" || s.category === "Design")
                    .map((skill, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="space-y-2"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-white font-medium">{skill.name}</span>
                          <Badge
                            variant="secondary"
                            className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-white/80 border-0"
                          >
                            {skill.category}
                          </Badge>
                        </div>
                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                          />
                        </div>
                        <div className="text-right text-sm text-white/60">{skill.level}%</div>
                      </motion.div>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="backend" className="mt-0">
                <div className="grid md:grid-cols-2 gap-8">
                  {skills
                    .filter((s) => s.category === "Backend" || s.category === "Database" || s.category === "Language")
                    .map((skill, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="space-y-2"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-white font-medium">{skill.name}</span>
                          <Badge
                            variant="secondary"
                            className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-white/80 border-0"
                          >
                            {skill.category}
                          </Badge>
                        </div>
                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                          />
                        </div>
                        <div className="text-right text-sm text-white/60">{skill.level}%</div>
                      </motion.div>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="other" className="mt-0">
                <div className="grid md:grid-cols-2 gap-8">
                  {skills
                    .filter((s) => s.category === "Marketing" || s.category === "Mobile")
                    .map((skill, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="space-y-2"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-white font-medium">{skill.name}</span>
                          <Badge
                            variant="secondary"
                            className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-white/80 border-0"
                          >
                            {skill.category}
                          </Badge>
                        </div>
                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                          />
                        </div>
                        <div className="text-right text-sm text-white/60">{skill.level}%</div>
                      </motion.div>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Code, title: "Full Stack Development", desc: "End-to-end web applications" },
              { icon: Palette, title: "UI/UX Design", desc: "User-centered design solutions" },
              { icon: Code, title: "WordPress Development", desc: "Custom themes and plugins" },
              { icon: TrendingUp, title: "Digital Marketing", desc: "Growth-driven strategies" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.03 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg blur opacity-0 group-hover:opacity-50 transition duration-300"></div>
                <Card className="bg-white/5 border-white/10 backdrop-blur-md h-full relative">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
                      <item.icon className="w-8 h-8 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-white/60">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" ref={sectionRefs.projects} className="py-32 px-4 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(147,51,234,0.15),rgba(0,0,0,0)_50%)]" />
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              onMouseEnter={enterText}
              onMouseLeave={leaveText}
            >
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto"></div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg blur opacity-0 group-hover:opacity-50 transition duration-300"></div>
                <Card className="bg-white/5 border-white/10 backdrop-blur-md overflow-hidden h-full relative">
                  <div className="relative overflow-hidden h-56">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-xl font-bold text-white">{project.title}</h3>
                    </div>
                  </div>

                  <CardContent className="space-y-4 p-6">
                    <p className="text-white/90">{project.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="secondary"
                          className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-white border-0 font-medium"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={sectionRefs.contact} className="py-32 px-4 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.15),rgba(0,0,0,0)_50%)]" />
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              onMouseEnter={enterText}
              onMouseLeave={leaveText}
            >
              Get In Touch
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto"></div>
            <p className="text-xl text-white/80 mt-6 max-w-2xl mx-auto">
              Ready to bring your ideas to life? Let's collaborate and create something amazing together.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <motion.div whileHover={{ x: 5 }} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full flex items-center justify-center relative group">
                  <Mail className="w-6 h-6 text-white relative z-10" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 blur opacity-50 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Email</h3>
                  <p className="text-white/70">ijazh9027@gmail.com</p>
                </div>
              </motion.div>

              <motion.div whileHover={{ x: 5 }} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full flex items-center justify-center relative group">
                  <Phone className="w-6 h-6 text-white relative z-10" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 blur opacity-50 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Phone</h3>
                  <p className="text-white/70">304 9546008</p>
                </div>
              </motion.div>

              <motion.div whileHover={{ x: 5 }} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full flex items-center justify-center relative group">
                  <MapPin className="w-6 h-6 text-white relative z-10" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 blur opacity-50 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Location</h3>
                  <p className="text-white/70">Pakistan</p>
                </div>
              </motion.div>

              <div className="flex gap-4 pt-4">
                <motion.a
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  href="https://www.linkedin.com/in/hamzaejaz12/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors relative group"
                  onMouseEnter={enterButton}
                  onMouseLeave={leaveButton}
                >
                  <Linkedin className="w-6 h-6 text-white relative z-10" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/50 to-cyan-500/50 blur opacity-0 group-hover:opacity-70 transition-opacity"></div>
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg blur opacity-30 group-hover:opacity-70 transition duration-1000"></div>
              <Card className="bg-white/5 border-white/10 backdrop-blur-md relative">
                <CardContent className="p-6">
                  <form className="space-y-4">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        onMouseEnter={enterText}
                        onMouseLeave={leaveText}
                      />
                      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-purple-500 to-cyan-500 transform scale-x-0 group-focus-within:scale-x-100 transition-transform origin-left"></div>
                    </div>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="Your Email"
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        onMouseEnter={enterText}
                        onMouseLeave={leaveText}
                      />
                      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-purple-500 to-cyan-500 transform scale-x-0 group-focus-within:scale-x-100 transition-transform origin-left"></div>
                    </div>
                    <div className="relative">
                      <textarea
                        rows={5}
                        placeholder="Your Message"
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                        onMouseEnter={enterText}
                        onMouseLeave={leaveText}
                      />
                      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-purple-500 to-cyan-500 transform scale-x-0 group-focus-within:scale-x-100 transition-transform origin-left"></div>
                    </div>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 border-0 relative group overflow-hidden text-white font-semibold shadow-2xl w-full"
                      onMouseEnter={enterButton}
                      onMouseLeave={leaveButton}
                    >
                      <span className="relative z-10 flex items-center justify-center font-medium">
                        Send Message
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                        >
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </motion.div>
                      </span>
                      <motion.span
                        className="absolute inset-0 bg-gradient-to-r from-purple-700 to-cyan-600"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "0%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 border-t border-white/10 relative bg-black/40">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(45,212,191,0.1),rgba(0,0,0,0)_70%)]" />
        </div>

        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 p-0.5">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mt-4">Portfolio</h3>
                <p className="text-white/60 mt-2">Crafting digital experiences through code, design, and innovation.</p>
              </motion.div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item}>
                    <motion.a
                      href={`#${item}`}
                      whileHover={{ x: 5 }}
                      className="text-white/60 hover:text-white transition-colors capitalize"
                    >
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-white/60 hover:text-white transition-colors">
                    Web Development
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/60 hover:text-white transition-colors">
                    WordPress Development
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/60 hover:text-white transition-colors">
                    UI/UX Design
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/60 hover:text-white transition-colors">
                    Digital Marketing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/60 hover:text-white transition-colors">
                    Consulting
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-white/60">
                  <Mail className="w-4 h-4" /> ijazh9027@gmail.com
                </li>
                <li className="flex items-center gap-2 text-white/60">
                  <Phone className="w-4 h-4" /> 304 9546008
                </li>
                <li className="flex items-center gap-2 text-white/60">
                  <MapPin className="w-4 h-4" /> Pakistan
                </li>
              </ul>

              <div className="flex gap-4 mt-4">
                <motion.a
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  href="https://www.linkedin.com/in/hamzaejaz12/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <Linkedin className="w-5 h-5 text-white" />
                </motion.a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60">© 2025 Portfolio. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-white/60 hover:text-white text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-white/60 hover:text-white text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-white/60 hover:text-white text-sm">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
