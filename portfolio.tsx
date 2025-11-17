"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { useTheme } from "next-themes"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image";
import {
    Github,
    Mail,
    Code,
    GraduationCap,
    ChevronDown,
    Menu,
    X,
    ArrowRight,
    Sun,
    Moon,
    Award,
    FileText, // PDF 아이콘 추가
} from "lucide-react"
import { SiSpringboot } from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { SiCplusplus } from "react-icons/si";
import { SiReact } from "react-icons/si";
import { SiHtml5 } from "react-icons/si";
import { SiCss3 } from "react-icons/si";
import { SiMysql } from "react-icons/si";
import { SiOracle } from "react-icons/si";
import { SiMariadb } from "react-icons/si";
import { SiGit } from "react-icons/si";
import { SiGithub } from "react-icons/si";
import { SiDocker } from "react-icons/si";
import jsPDF from 'jspdf'; // jspdf import
import html2canvas from 'html2canvas'; // html2canvas import


export default function Component() {
    const { setTheme, theme } = useTheme()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState("home")
    const [isLoading, setIsLoading] = useState(true)
    const portfolioRef = useRef<HTMLDivElement>(null); // 전체 포트폴리오 div를 위한 ref 추가

    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

    // [수정 1] useRef에 HTMLElement 타입을 명시합니다.
    const sectionRefs = {
        home: useRef<HTMLElement>(null),
        info: useRef<HTMLElement>(null),
        about: useRef<HTMLElement>(null),
        projects: useRef<HTMLElement>(null),
        contact: useRef<HTMLElement>(null),
    }

    // [수정 1] sectionRefs의 키를 기반으로 타입을 정의합니다.
    type SectionId = keyof typeof sectionRefs;

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 2000)

        return () => clearTimeout(timer)
    }, [])

    // [수정 2] 스크롤 이벤트 핸들러 로직을 수정합니다.
    useEffect(() => {
        const handleScroll = () => {
            // 페이지 맨 아래에 도달했는지 확인 (10px 여유)
            const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;

            if (isAtBottom) {
                setActiveSection("contact"); // 맨 아래면 'contact'로 강제 설정
                return;
            }

            const scrollPosition = window.scrollY + 100
            const sections: SectionId[] = ["home", "info", "about", "projects", "contact"];
            let currentSection: SectionId = "home"; // 기본값

            for (const section of sections) {
                const element = sectionRefs[section].current
                if (element && scrollPosition >= element.offsetTop) {
                    currentSection = section; // 스크롤 위치가 섹션의 시작점보다 크거나 같으면 이 섹션으로 업데이트
                } else {
                    // 다음 섹션은 아직 스크롤 위치에 도달하지 않았으므로 중단
                    break;
                }
            }
            setActiveSection(currentSection);
        }

        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, []) // 의존성 배열은 기존대로 비워둡니다.

    // PDF 내보내기 함수
    const handleExportPdf = async () => {
        const element = portfolioRef.current;
        if (!element) return;

        // PDF 생성 전 스크롤바 숨기기 등 스타일 조정 (선택 사항)
        const originalStyle = element.style.overflow;
        element.style.overflow = 'visible'; // 전체 콘텐츠가 보이도록

        const canvas = await html2canvas(element, {
            scale: 2, // 해상도 향상
            useCORS: true, // 외부 이미지 로드 허용
            scrollY: -window.scrollY // 현재 스크롤 위치 반영
        });

        // 스타일 복원
        element.style.overflow = originalStyle;

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4'); // A4 용지, 세로 방향
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = imgProps.width;
        const imgHeight = imgProps.height;

        // 이미지 비율 계산
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

        // 이미지 크기 및 위치 계산 (가운데 정렬)
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        // const imgY = (pdfHeight - imgHeight * ratio) / 2; // 세로 가운데 정렬 시 사용
        const imgY = 0; // 페이지 상단부터 시작

        // 페이지 크기에 맞춰 이미지 높이 계산
        const scaledHeight = imgHeight * ratio;

        pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, scaledHeight);
        pdf.save('portfolio.pdf');

        // 새 탭에서 PDF 열기 (Blob URL 사용)
        const pdfBlob = pdf.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl, '_blank');
        URL.revokeObjectURL(pdfUrl); // 메모리 해제
    };

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
            image: "/images/bank_account.png",
            github: "https://github.com/F3ZLoV/BankAccountManage-WindowApp",
            notion: "notion.so/1e9a55bf89ae80ce9578d1eb6b9dfd1b?pvs=74",
        },
    ]

    const navItems = ["home", "info", "about", "projects", "contact"]

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
        // 전체 컨텐츠를 portfolioRef로 감싸줍니다.
        <div ref={portfolioRef} className="min-h-screen bg-background text-foreground overflow-x-hidden"> {/* overflow-x-hidden 추가 */}
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
                                        {/* [수정 3] 'info'를 'Skills'로 변경 */}
                                        {item === 'info' ? 'Skills' : item}
                                        {activeSection === item && (
                                            <motion.div layoutId="activeSection" className="h-0.5 bg-primary mt-1 rounded-full" />
                                        )}
                                    </motion.a>
                                ))}
                            </div>

                            {/* 다크모드 버튼 */}
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

                            {/* PDF 내보내기 버튼 */}
                            <Button
                                variant="outline"
                                size="icon"
                                className="hidden md:inline-flex rounded-full bg-background/50 border-border"
                                onClick={handleExportPdf}
                                title="Export as PDF"
                            >
                                <FileText className="h-[1.2rem] w-[1.2rem]" />
                                <span className="sr-only">Export as PDF</span>
                            </Button>

                            <button className="md:hidden text-foreground p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                {isMenuOpen ? <X /> : <Menu />}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Home Section */}
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

            {/* Info Section (Education, Certification, Skills & Tools) */}
            <section id="info" ref={sectionRefs.info} className="py-32 px-4">
                <div className="container mx-auto">
                    <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                        {/* [수정 4] h2 태그 수정 */}
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Skills & Info</h2>
                        <div className="w-24 h-1 bg-primary mx-auto"></div>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Education Card */}
                        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <Card className="h-full">
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

                        {/* Certification Card */}
                        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <Card className="h-full">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Award className="w-6 h-6 text-primary" />
                                        Certification
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <h3 className="font-semibold text-lg">정보처리산업기사</h3>
                                        <p className="text-primary">한국산업인력공단</p>
                                        <p className="text-sm text-muted-foreground mt-1">2025.12</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">리눅스 마스터 2급</h3>
                                        <p className="text-primary">KAIT 검정</p>
                                        <p className="text-sm text-muted-foreground mt-1">2026.03</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">AWS Cloud Practional</h3>
                                        <p className="text-primary">Amazon AWS</p>
                                        <p className="text-sm text-muted-foreground mt-1">2026.04</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">AWS Cloud Associate</h3>
                                        <p className="text-primary">Amazon AWS</p>
                                        <p className="text-sm text-muted-foreground mt-1">2026.06</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Skills & Tools Card */}
                        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <Card className="h-full">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Code className="w-6 h-6 text-primary" />
                                        Skills & Tools
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <h3 className="font-semibold text-lg">Backend</h3>
                                        <div className="flex flex-wrap gap-4 mt-2 text-2xl">
                                            {/* 각 아이콘을 div로 감싸고 텍스트 추가 */}
                                            <div className="flex flex-col items-center">
                                                <SiSpringboot title="Spring Boot" />
                                                <span className="text-xs mt-1">Spring Boot</span>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <FaJava title="Java" />
                                                <span className="text-xs mt-1">Java</span>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <SiCplusplus title="C++" />
                                                <span className="text-xs mt-1">C++</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Frontend</h3>
                                        <div className="flex flex-wrap gap-4 mt-2 text-2xl">
                                            <div className="flex flex-col items-center">
                                                <SiReact title="React" />
                                                <span className="text-xs mt-1">React</span>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <SiHtml5 title="HTML5" />
                                                <span className="text-xs mt-1">HTML5</span>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <SiCss3 title="CSS3" />
                                                <span className="text-xs mt-1">CSS3</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">RDBMS</h3>
                                        <div className="flex flex-wrap gap-4 mt-2 text-2xl">
                                            <div className="flex flex-col items-center">
                                                <SiMysql title="MySQL" />
                                                <span className="text-xs mt-1">MySQL</span>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <SiOracle title="Oracle" />
                                                <span className="text-xs mt-1">Oracle</span>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <SiMariadb title="MariaDB" />
                                                <span className="text-xs mt-1">MariaDB</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">DevOps</h3>
                                        <div className="flex flex-wrap gap-4 mt-2 text-2xl">
                                            <div className="flex flex-col items-center">
                                                <SiGit title="Git" />
                                                <span className="text-xs mt-1">Git</span>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <SiGithub title="GitHub" />
                                                <span className="text-xs mt-1">GitHub</span>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <SiDocker title="Docker" />
                                                <span className="text-xs mt-1">Docker</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* New About Me Section */}
            <section id="about" ref={sectionRefs.about} className="py-32 px-4 bg-secondary">
                <div className="container mx-auto max-w-4xl">
                    <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
                        <h3 className="text-3xl font-bold text-foreground mb-4">나의 여정</h3>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            저는 컴퓨터 게임을 위한 도구 제작에 빠져있던 고등학교 2학년 때 친구와 함께 UNIST에서 진행하는 슈퍼컴퓨팅 청소년 캠프에 참가한 것을 계기로 프로그래밍의 방향을 바꾸게 되었습니다. 4박 5일간의 짧은 시간이었지만 수준 높은 실습과 특강 등 다양한 활동 속에서 프로그래밍이라는 세계에 매료되었고, '내가 만든 프로그램이 직접 동작한다'는 경험에 큰 흥미를 느꼈습니다. 당시에는 프로그래밍에 대한 확신이나 별다른 비전이 없었지만, 이후 여러 전공을 선택할까 하다가 이 경험이 떠올라 컴퓨터공학 전공을 선택하게 되었습니다.
                            대학에서는 컴퓨터 구조, 운영체제, 네트워크 등 전공 이론과 함께 다양한 팀/개인 프로젝트를 진행하며 실력을 쌓았고, 문서 작성과 협업 경험을 통해 문제 해결 중심의 사고 방식과 실무 역량을 키워나갔습니다.
                        </p>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="mb-12">
                        <h3 className="text-3xl font-bold text-foreground mb-4">기술과 도전</h3>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            '모르는 것을 두려워하지 않는 개발자'가 되고 싶습니다. 3학년 1학기에 병원 EMR 시스템 개발 개인 프로젝트를 진행하며 Java 스킬만으로는 부족함을 느꼈고, Spring에 대해서는 전혀 모르는 상태였습니다. 그러나 병원 업무 시스템 구현을 위해 백엔드 프레임워크가 필요했고, 결국 Spring Boot의 기본부터 하나하나 독학해나가며 시스템을 직접 구축해보았습니다. 처음에는 REST API 설계조차 생소했지만, 관련 강의와 공식 문서를 참고해가며 기능을 기초부터 직접 구현했습니다. 결과적으로 데이터베이스 연동부터 병원 예약 처리, 진료 이력 관리 등 하나의 시스템을 만들어 볼 수 있었고, 이 과정에서 개발의 재미를 다시 한번 체감했습니다. 이런 경험을 토대로 앞으로 모르는 것에 어렵고 두려워 않고 모자란 점을 고치고 채워나가는 사람이 되어 나갈 것입니다.
                        </p>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
                        <h3 className="text-3xl font-bold text-foreground mb-4">미래로의 도약</h3>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            저는 대학에서의 다양한 강의와 과제 활동, 프로젝트를 통해 실제 실무에서 필요한 기초 역량을 쌓는 귀중한 경험을 하였습니다. 이러한 경험들은 개발자로서의 토대를 다지는 데 큰 도움이 되었지만, 동시에 아직 배워야 할 것이 많다는 사실도 깨달았습니다. 앞으로는 직접 현장에서 부딪혀 보면서 부족한 점을 스스로 파악하고, 실패를 두려워하지 않고 그 속에서 교훈을 얻으며 성장해 나가고 싶습니다. 단순히 빠른 결과만을 추구하기보다, 시행착오를 겪고 스스로 고민하며 해결해나가는 과정의 나의 소중한 자산이라 여기며 한 걸음씩 전진할 것입니다.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" ref={sectionRefs.projects} className="py-32 px-4"> {/* Removed bg-secondary */}
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

            {/* Contact Section */}
            <section id="contact" ref={sectionRefs.contact} className="py-32 px-4 bg-secondary"> {/* Added bg-secondary */}
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