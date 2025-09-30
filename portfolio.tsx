"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useTheme } from "next-themes"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image";
import {
    Github,
    Mail,
    Server,
    Code,
    GraduationCap,
    MapPin,
    Calendar,
    ChevronDown,
    Menu,
    X,
    ArrowRight,
    Sun,
    Moon,
    Database,
    GitBranch,
} from "lucide-react"

export default function Component() {
    const { setTheme, theme } = useTheme()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState("home")
    const [isLoading, setIsLoading] = useState(true)

    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

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
        { name: "Spring Boot", level: 90, category: "Backend" },
        { name: "Java", level: 90, category: "Backend" },
        { name: "MySQL", level: 85, category: "RDBMS" },
        { name: "React", level: 70, category: "Frontend" },
        { name: "HTML5 & CSS3", level: 80, category: "Frontend" },
        { name: "Git/Github", level: 88, category: "DevOps" },
        { name: "Docker", level: 60, category: "DevOps" },
        { name: "Oracle", level: 65, category: "RDBMS" },
    ]

    const projects = [
        {
            title: "로스트아크 레이드 숙제 관리 페이지",
            description:
                "국내 MMORPG 로스트아크에서 제공하는 API를 이용해 개인 원정대 모든 캐릭터 레벨을 불러와서 상위 6개 캐릭터 레벨별 알맞은 레이드 종류를 자동으로 매칭해서 관리 폼을 만들어주는 웹페이지입니다.",
            tech: ["JSP/Servlet", "HTML", "Bootstrap", "MySQL"],
            image: "/images/lostark1.png",
            github: "https://github.com/F3ZLoV/LostArkRaidManager",
            notion: "https://www.notion.so/1e9a55bf89ae807b81e4d9b702e49169?v=1e9a55bf89ae805086c1000c4ce3ab41&pvs=74&cookie_sync_completed=true",
        },
        {
            title: "병원(이비인후과) EMR 프로젝트",
            description:
                "Spring Boot와 Thymeleaf 기반의 병원 의료 정보 시스템(EMR)입니다. 간호사, 의사, 환자별 페이지에서 진료 접수, 데이터 기록, 예약 관리 등의 기능을 구현했습니다. 진단명/처방 자동완성 기능을 위해 CSV 파싱을 적용했습니다.",
            tech: ["Spring Boot", "Thymeleaf", "MySQL", "JPA"],
            image: "/images/EMR.png",
            github: "https://github.com/F3ZLoV/Hospital_EMR",
            notion: "https://www.notion.so/Start-up-1ada55bf89ae80c8804bf36af1a7da83?pvs=74",
        },
        {
            title: "Hi-Fi 사용자 커뮤니티 게시판",
            description:
                "Hi-Fi 애호가들을 위한 커뮤니티 게시판으로 CRUD, 페이징, 검색, 파일 검증, 댓글/대댓글, 유튜브 링크 인식 등의 기능을 개발하고 AWS EC2에 배포했습니다.",
            tech: ["JSP/Servlet", "HTML", "CSS", "Bootstrap", "MySQL", "AWS EC2"],
            image: "/images/commu.png",
            github: "https://github.com/F3ZLoV/JSPProject-HiFi_Community",
            notion: "https://www.notion.so/S-W-7bd042a39cbc459ca5bac2af3379e39d?pvs=74",
        },
        {
            title: "은행 계좌 관리 시뮬레이터",
            description:
                "Java Window Programming을 이용한 간단한 은행 계좌 관리 프로그램입니다. 계좌 생성 및 관리, 잔액 조회, 입출금 기능을 구현했습니다.",
            tech: ["Java", "MySQL", "WindowBuilder"],
            image: "/images/bank_accound.png",
            github: "https://github.com/F3ZLoV/BankAccountManage-WindowApp",
            notion: "notion.so/1e9a55bf89ae80ce9578d1eb6b9dfd1b?pvs=74",
        },
    ]

    const navItems = ["home", "about", "skills", "projects", "contact"]

    if (isLoading) {
        return (
            <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: [0.8, 1.2, 1], opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="relative"
                >
                    <div className="w-24 h-24 rounded-full border-4 border-primary/50 border-t-primary animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Code className="w-10 h-10 text-primary" />
                    </div>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background text-foreground overflow-hidden">
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-primary z-50"
                style={{ scaleX, transformOrigin: "0%" }}
            />

            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className="fixed top-0 w-full z-40 bg-background/30 backdrop-blur-xl border-b border-border/50"
            >
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <motion.div whileHover={{ scale: 1.05 }} className="text-2xl font-bold text-foreground">
                            Tae-joon's Portfolio
                        </motion.div>

                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex space-x-8">
                                {navItems.map((item) => (
                                    <motion.a
                                        key={item}
                                        href={`#${item}`}
                                        whileHover={{ scale: 1.1 }}
                                        className={`capitalize ${
                                            activeSection === item ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
                                        } transition-colors`}
                                    >
                                        {item}
                                        {activeSection === item && (
                                            <motion.div layoutId="activeSection" className="h-0.5 bg-primary mt-1 rounded-full" />
                                        )}
                                    </motion.a>
                                ))}
                            </div>

                            <Button
                                variant="outline"
                                size="icon"
                                className="hidden md:inline-flex rounded-full bg-background/50 border-border"
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            >
                                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                <span className="sr-only">Toggle theme</span>
                            </Button>

                            <button className="md:hidden text-foreground p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                {isMenuOpen ? <X /> : <Menu />}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            <section id="home" ref={sectionRefs.home} className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(128,128,128,0.1),rgba(0,0,0,0)_50%)]" />
                </div>

                <div className="text-center z-10 px-4">
                    <motion.div
                        className="relative w-60 h-60 mx-auto mb-12"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            className="absolute inset-0 rounded-full border-2 border-primary/20"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        />
                        <motion.div
                            className="absolute inset-4 rounded-full border-2 border-primary/20"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        />
                        <div className="absolute inset-8 rounded-full bg-primary/10 p-1">
                            <div className="w-full h-full rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                                <img src="/images/hamter.png" alt="박태준 프로필" className="w-full h-full object-cover rounded-full" />
                            </div>
                        </div>
                    </motion.div>

                    <motion.h1
                        className="text-5xl md:text-7xl font-bold text-foreground"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        박태준
                    </motion.h1>
                    <motion.h2
                        className="text-3xl md:text-5xl font-bold text-primary mt-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        Backend Developer
                    </motion.h2>

                    <motion.p
                        className="text-lg md:text-xl text-muted-foreground mt-6 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        컴퓨터 게임을 좋아하는 게이머로서 항상 사용자의 입장을 생각합니다. <br />
                        백엔드 뿐 아니라 프론트엔드 개발도 경험하며 성장하고 싶습니다.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="mt-8"
                    >
                        <div className="flex flex-wrap justify-center gap-3 text-sm">
                            {["Java", "Spring Boot", "React", "MySQL", "Docker"].map((tech) => (
                                <Badge key={tech} variant="secondary" className="px-3 py-1 text-sm">{tech}</Badge>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.0 }}
                        className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Button size="lg" asChild>
                            <a href="#projects">
                                View My Work <ArrowRight className="ml-2 w-4 h-4" />
                            </a>
                        </Button>
                        <Button size="lg" variant="outline">
                            Download CV
                        </Button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                        className="mt-16"
                    >
                        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
                            <ChevronDown className="w-8 h-8 text-muted-foreground mx-auto" />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <section id="about" ref={sectionRefs.about} className="py-32 px-4">
                <div className="container mx-auto">
                    <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">About Me</h2>
                        <div className="w-24 h-1 bg-primary mx-auto"></div>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <GraduationCap className="w-6 h-6 text-primary" />
                                        Education
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <h3 className="font-semibold text-lg">인하공업전문대학 (공학사)</h3>
                                        <p className="text-primary">컴퓨터정보과</p>
                                        <p className="text-sm text-muted-foreground mt-1">2026.03 - 2027.02 (예정)</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">인하공업전문대학 (전문학사)</h3>
                                        <p className="text-primary">컴퓨터정보과</p>
                                        <p className="text-sm text-muted-foreground mt-1">2020.03 - 2026.02</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                사용자의 입장에서 생각하는 것을 중요하게 여기는 개발자 박태준입니다. Java와 Spring Boot를 사용한 백엔드 개발에 익숙하며, React와 TypeScript를 학습하여 프론트엔드 역량도 키워나가고 있습니다.
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                다양한 게임을 즐기는 것 외에도 혼자 조용한 곳에서 음악 감상하는 것도 좋아하며, 이러한 성향은 차분하게 문제 해결에 집중하는 개발 역량의 밑거름이 되었습니다.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section id="skills" ref={sectionRefs.skills} className="py-32 px-4 bg-secondary">
                <div className="container mx-auto">
                    <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Skills & Tools</h2>
                        <div className="w-24 h-1 bg-primary mx-auto"></div>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <Card>
                            <CardHeader><CardTitle className="flex items-center gap-2"><Server className="w-6 h-6 text-primary" />Backend</CardTitle></CardHeader>
                            <CardContent className="flex flex-wrap gap-2">
                                <Badge>Spring Boot</Badge><Badge>Java</Badge><Badge>C/C++</Badge>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader><CardTitle className="flex items-center gap-2"><Code className="w-6 h-6 text-primary" />Frontend</CardTitle></CardHeader>
                            <CardContent className="flex flex-wrap gap-2">
                                <Badge>React</Badge><Badge>HTML5</Badge><Badge>CSS3</Badge>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader><CardTitle className="flex items-center gap-2"><Database className="w-6 h-6 text-primary" />RDBMS</CardTitle></CardHeader>
                            <CardContent className="flex flex-wrap gap-2">
                                <Badge>MySQL</Badge><Badge>Oracle</Badge><Badge>MariaDB</Badge>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader><CardTitle className="flex items-center gap-2"><GitBranch className="w-6 h-6 text-primary" />DevOps</CardTitle></CardHeader>
                            <CardContent className="flex flex-wrap gap-2">
                                <Badge>Git/Github</Badge><Badge>Docker</Badge>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            <section id="projects" ref={sectionRefs.projects} className="py-32 px-4">
                <div className="container mx-auto">
                    <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Projects</h2>
                        <div className="w-24 h-1 bg-primary mx-auto"></div>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {projects.map((project, index) => (
                            <motion.div key={index} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.2 }}>
                                <Card className="h-full flex flex-col">
                                    <div className="relative overflow-hidden h-56 bg-muted">
                                        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                                    </div>
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <CardTitle>{project.title}</CardTitle>
                                            <div className="flex items-center gap-2">
                                                <Button variant="outline" size="icon" asChild>
                                                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                                                        <Github className="w-4 h-4" />
                                                    </a>
                                                </Button>
                                                <Button variant="outline" size="icon" asChild>
                                                    <a href={project.notion} target="_blank" rel="noopener noreferrer">
                                                        <Image src="/images/notion.png" alt="Notion" width={16} height={16} />
                                                    </a>
                                                </Button>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <p className="text-muted-foreground mb-4">{project.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tech.map((tech) => (
                                                <Badge key={tech} variant="secondary">{tech}</Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="contact" ref={sectionRefs.contact} className="py-32 px-4 bg-secondary">
                <div className="container mx-auto">
                    <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Get In Touch</h2>
                        <div className="w-24 h-1 bg-primary mx-auto"></div>
                    </motion.div>

                    <div className="max-w-lg mx-auto text-center">
                        <div className="flex justify-center items-center gap-8 mb-8">
                            <a href="mailto:fsirtru@gmail.com" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                                <Mail className="w-5 h-5" />
                                fsirtru@gmail.com
                            </a>
                            <a href="https://github.com/F3ZLoV" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                                <Github className="w-5 h-5" />
                                GitHub
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="py-8 px-4 border-t border-border">
                <div className="container mx-auto text-center text-muted-foreground">
                    <p>© 2025 Park Tae-joon. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}