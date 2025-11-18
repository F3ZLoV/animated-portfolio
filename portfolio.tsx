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
    Sun,
    Moon,
    Award,
    FileText,
    Loader2,
    Phone,
    MapPin,
} from "lucide-react"

// 아이콘 라이브러리
import {
    SiSpringboot, SiReact, SiHtml5, SiCss3, SiMysql, SiOracle,
    SiMariadb, SiGit, SiGithub, SiDocker, SiCplusplus, SiNextdotjs, SiPython
} from "react-icons/si";
import { FaJava, FaAws } from "react-icons/fa";

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// 이미지 Static Import
import hamterImage from './public/images/hamter.png';
import lostarkImage from './public/images/lostark1.png';
import emrImage from './public/images/EMR.png';
import commuImage from './public/images/commu.png';
import bankImage from './public/images/bank_account.png';
import notionImage from './public/images/notion.png';
import profileImage from './public/images/profile.jpg';

// 애니메이션 Variants 설정
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    },
};

export default function Component() {
    const { setTheme, theme } = useTheme()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState("home")
    const [isLoading, setIsLoading] = useState(true)
    const [isExporting, setIsExporting] = useState(false)

    const portfolioRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

    const sectionRefs = {
        home: useRef<HTMLElement>(null),
        about: useRef<HTMLElement>(null),
        projects: useRef<HTMLElement>(null),
        contact: useRef<HTMLElement>(null),
    }

    type SectionId = keyof typeof sectionRefs;
    const navItems: SectionId[] = ["home", "about", "projects", "contact"];

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2000)
        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;
            if (isAtBottom) {
                setActiveSection("contact");
                return;
            }
            const scrollPosition = window.scrollY + 150
            let currentSection: SectionId = "home";
            for (const section of navItems) {
                const element = sectionRefs[section].current
                if (element && scrollPosition >= element.offsetTop) {
                    currentSection = section;
                }
            }
            setActiveSection(currentSection);
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // PDF 새 탭에서 열기 및 인쇄 유도
    const handleExportPdf = async () => {
        const targetSections: SectionId[] = ["home", "about"];
        setIsExporting(true);

        // [수정] 상태 업데이트 후 화면이 다시 그려질 때까지 충분히 대기 (100ms -> 500ms)
        // 애니메이션이 꺼지고 요소가 보일 때까지 기다려야 함
        await new Promise(resolve => setTimeout(resolve, 500));

        try {
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            for (let i = 0; i < targetSections.length; i++) {
                const sectionKey = targetSections[i];
                const element = sectionRefs[sectionKey].current?.querySelector('.a4-page') as HTMLElement;

                if (element) {
                    const canvas = await html2canvas(element, {
                        scale: 2,
                        useCORS: true,
                        logging: false,
                        backgroundColor: null
                    });

                    const imgData = canvas.toDataURL('image/png');
                    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

                    if (i < targetSections.length - 1) {
                        pdf.addPage();
                    }
                }
            }

            pdf.autoPrint();
            const blob = pdf.output('blob');
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');

        } catch (error) {
            console.error("PDF extraction failed:", error);
            alert("PDF 변환 중 오류가 발생했습니다.");
        } finally {
            setIsExporting(false);
        }
    };

    // 숙련도 렌더링 헬퍼 함수
    const renderSkillBadge = (icon: React.ReactNode, name: string, level: number) => {
        let levelText = "";
        let levelColorClass = "";

        switch (level) {
            case 3:
                levelText = "상";
                levelColorClass = "text-green-600 dark:text-green-400 font-bold";
                break;
            case 2:
                levelText = "중";
                levelColorClass = "text-blue-600 dark:text-blue-400 font-bold";
                break;
            case 1:
                levelText = "하";
                levelColorClass = "text-yellow-600 dark:text-yellow-400 font-bold";
                break;
            default:
                levelText = "-";
                levelColorClass = "text-muted-foreground";
        }

        return (
            <Badge variant="outline" className="gap-1.5 px-2 py-1 text-foreground flex items-center">
                {icon}
                <span>{name}</span>
                <span className={`ml-1 text-xs ${levelColorClass}`}>
                    ({levelText})
                </span>
            </Badge>
        );
    };

    const projects = [
        {
            title: "로스트아크 레이드 숙제 관리 페이지",
            description: "국내 MMORPG 로스트아크 API 활용 캐릭터/레이드 매칭 관리 서비스",
            tech: ["JSP/Servlet", "HTML", "Bootstrap", "MySQL"],
            image: lostarkImage,
            github: "https://github.com/F3ZLoV/LostArkRaidManager",
            notion: "https://www.notion.so/1e9a55bf89ae807b81e4d9b702e49169",
        },
        {
            title: "병원(이비인후과) EMR 프로젝트",
            description: "Spring Boot/JPA 기반 병원 진료/예약/데이터 관리 시스템 (EMR)",
            tech: ["Spring Boot", "Thymeleaf", "MySQL", "JPA"],
            image: emrImage,
            github: "https://github.com/F3ZLoV/Hospital_EMR",
            notion: "https://www.notion.so/Start-up-1ada55bf89ae80c8804bf36af1a7da83",
        },
        {
            title: "Hi-Fi 사용자 커뮤니티 게시판",
            description: "AWS EC2 배포, 댓글/파일첨부 등 풀스택 커뮤니티 기능 구현",
            tech: ["JSP/Servlet", "HTML", "AWS EC2", "MySQL"],
            image: commuImage,
            github: "https://github.com/F3ZLoV/JSPProject-HiFi_Community",
            notion: "https://www.notion.so/S-W-7bd042a39cbc459ca5bac2af3379e39d",
        },
        {
            title: "은행 계좌 관리 시뮬레이터",
            description: "Java GUI 기반 계좌 생성/송금/관리 데스크탑 애플리케이션",
            tech: ["Java", "MySQL", "WindowBuilder"],
            image: bankImage,
            github: "https://github.com/F3ZLoV/BankAccountManage-WindowApp",
            notion: "https://www.notion.so/1e9a55bf89ae80ce9578d1eb6b9dfd1b",
        },
    ]

    if (isLoading) {
        return (
            <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: [0.8, 1.2, 1], opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                >
                    <Loader2 className="w-16 h-16 text-primary animate-spin" />
                </motion.div>
            </div>
        )
    }

    return (
        <div ref={portfolioRef} className="min-h-screen bg-background text-foreground overflow-x-hidden font-sans transition-colors duration-300">
            <motion.div className="fixed top-0 left-0 right-0 h-1 bg-primary z-50" style={{ scaleX, transformOrigin: "0%" }} />

            {/* Navigation Bar */}
            <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} className="fixed top-0 w-full z-40 bg-background/80 backdrop-blur-md border-b border-border/40 shadow-sm">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <div className="text-xl font-bold text-primary">Tae-joon's Resume</div>
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex space-x-6 text-sm font-medium">
                            {navItems.map((item) => (
                                <div key={item} className="relative">
                                    <a
                                        href={`#${item}`}
                                        className={`capitalize transition-colors hover:text-primary ${
                                            activeSection === item ? "text-primary" : "text-muted-foreground"
                                        }`}
                                    >
                                        {item}
                                    </a>
                                    {activeSection === item && (
                                        <motion.div
                                            layoutId="activeSection"
                                            className="absolute -bottom-[1.2rem] left-0 right-0 h-0.5 bg-primary rounded-full"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        </Button>
                        <Button size="sm" onClick={handleExportPdf} disabled={isExporting} className="gap-2">
                            {isExporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
                            {isExporting ? "Generating..." : "Print / Save PDF"}
                        </Button>
                        <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* --- PAGE 1: HOME (Resume Style) --- */}
            <section id="home" ref={sectionRefs.home} className="pt-28 pb-16 flex justify-center px-4">
                {/* [수정] isExporting이 true일 때 variants와 initial을 해제하여 강제로 보이게 함 */}
                <motion.div
                    className="a4-page bg-background text-foreground p-12 flex flex-col gap-8 max-w-[794px] w-full min-h-[1123px] relative overflow-hidden mx-auto box-border transition-colors duration-300"
                    variants={isExporting ? undefined : containerVariants}
                    initial={isExporting ? undefined : "hidden"}
                    whileInView={isExporting ? undefined : "visible"} // Export 중일 때는 whileInView 무시
                    viewport={{ once: true }}
                    style={{ opacity: 1 }} // 강제 투명도 설정 (안전장치)
                >

                    {/* 1. Header & Contact */}
                    <motion.div variants={isExporting ? undefined : itemVariants} className="flex items-center justify-between border-b-2 border-foreground pb-6">
                        <div className="space-y-2">
                            <h1 className="text-5xl font-extrabold tracking-tight text-foreground">박태준</h1>
                            <p className="text-xl font-semibold text-muted-foreground">Backend Developer & Cloud Engineer</p>
                            <div className="flex flex-col gap-1 text-sm text-muted-foreground pt-2">
                                <div className="flex items-center gap-2"><Phone className="w-3 h-3"/> 010-2483-5726</div>
                                <div className="flex items-center gap-2"><Mail className="w-3 h-3"/> fsirtru@gmail.com</div>
                                <div className="flex items-center gap-2"><Github className="w-3 h-3"/> github.com/F3ZLoV</div>
                                <div className="flex items-center gap-2"><MapPin className="w-3 h-3"/> 인천시 서구</div>
                            </div>
                        </div>
                        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-muted shadow-inner relative">
                            <Image src={profileImage} alt="Profile" fill className="object-cover" />
                        </div>
                    </motion.div>

                    {/* 2. Profile Summary */}
                    <motion.div variants={isExporting ? undefined : itemVariants}>
                        <h2 className="text-xl font-bold text-foreground mb-2 uppercase border-l-4 border-foreground pl-3">Profile</h2>
                        <p className="text-sm leading-relaxed text-muted-foreground text-justify">
                            컴퓨터 게임을 좋아하는 게이머로서 항상 사용자의 입장을 생각합니다.
                            단순한 기능 구현을 넘어 안정적인 백엔드 시스템 구축과 효율적인 클라우드 엔지니어링까지 경험하며,
                            모르는 것을 두려워하지 않고 끊임없이 성장하는 개발자가 되고 싶습니다.
                        </p>
                    </motion.div>

                    {/* 3. Main Content Grid (50:50 Split) */}
                    <div className="grid grid-cols-2 gap-10 flex-grow">

                        {/* Left Column */}
                        <div className="space-y-8">
                            <motion.div variants={isExporting ? undefined : itemVariants}>
                                <h2 className="text-xl font-bold text-foreground mb-4 uppercase border-l-4 border-foreground pl-3">Education</h2>
                                <div className="space-y-4">
                                    <div className="relative pl-4 border-l-2 border-muted-foreground/20">
                                        <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-muted-foreground"></div>
                                        <h3 className="font-bold text-base text-foreground">가좌고등학교</h3>
                                        <p className="text-xs text-muted-foreground">~ 2020.02</p>
                                    </div>
                                    <div className="relative pl-4 border-l-2 border-muted-foreground/20">
                                        <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-muted-foreground"></div>
                                        <h3 className="font-bold text-base text-foreground">인하공업전문대학</h3>
                                        <p className="text-sm font-medium text-muted-foreground">컴퓨터정보과 (공학사)</p>
                                        <p className="text-xs text-muted-foreground">2026.03 ~ 2027.02 (예정)</p>
                                    </div>
                                    <div className="relative pl-4 border-l-2 border-muted-foreground/20">
                                        <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-muted-foreground"></div>
                                        <h3 className="font-bold text-base text-foreground">인하공업전문대학</h3>
                                        <p className="text-sm font-medium text-muted-foreground">컴퓨터정보과 (전문학사)</p>
                                        <p className="text-xs text-muted-foreground">2020.03 ~ 2026.02</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div variants={isExporting ? undefined : itemVariants}>
                                <h2 className="text-xl font-bold text-foreground mb-4 uppercase border-l-4 border-foreground pl-3">Certification</h2>
                                <div className="space-y-3 text-sm border-t border-border pt-2 text-muted-foreground">
                                    <div className="flex justify-between border-b border-border pb-1">
                                        <span className="font-semibold text-foreground">정보처리산업기사</span>
                                        <span>2025.12</span>
                                    </div>
                                    <div className="flex justify-between border-b border-border pb-1">
                                        <span className="font-semibold text-foreground">리눅스 마스터 2급</span>
                                        <span>2026.03</span>
                                    </div>
                                    <div className="flex justify-between border-b border-border pb-1">
                                        <span className="font-semibold text-foreground">AWS Cloud Practitioner</span>
                                        <span>2026.04</span>
                                    </div>
                                    <div className="flex justify-between border-b border-border pb-1">
                                        <span className="font-semibold text-foreground">AWS Solution Associate</span>
                                        <span>2026.08</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Column: Skills & Tools */}
                        <div className="space-y-8">
                            <motion.div variants={isExporting ? undefined : itemVariants}>
                                <h2 className="text-xl font-bold text-foreground mb-4 uppercase border-l-4 border-foreground pl-3">Skills & Tools</h2>

                                <div className="space-y-5">
                                    {/* Backend */}
                                    <div>
                                        <h3 className="text-sm font-bold text-muted-foreground mb-2">Backend</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {renderSkillBadge(<FaJava className="text-red-500 text-base"/>, "Java", 3)}
                                            {renderSkillBadge(<SiSpringboot className="text-green-600 text-base"/>, "Spring Boot", 3)}
                                            {renderSkillBadge(<SiPython className="text-yellow-500 text-base"/>, "Python", 2)}
                                            {renderSkillBadge(<SiCplusplus className="text-blue-700 text-base"/>, "C++", 1)}
                                        </div>
                                    </div>

                                    {/* Frontend */}
                                    <div>
                                        <h3 className="text-sm font-bold text-muted-foreground mb-2">Frontend</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {renderSkillBadge(<SiReact className="text-blue-400 text-base"/>, "React", 2)}
                                            {renderSkillBadge(<SiNextdotjs className="text-foreground text-base"/>, "Next.js", 2)}
                                            {renderSkillBadge(<SiHtml5 className="text-orange-600 text-base"/>, "HTML5", 2)}
                                            {renderSkillBadge(<SiCss3 className="text-blue-600 text-base"/>, "CSS3", 2)}
                                        </div>
                                    </div>

                                    {/* Database */}
                                    <div>
                                        <h3 className="text-sm font-bold text-muted-foreground mb-2">Database</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {renderSkillBadge(<SiMysql className="text-blue-600 text-base"/>, "MySQL", 3)}
                                            {renderSkillBadge(<SiOracle className="text-red-600 text-base"/>, "Oracle", 1)}
                                            {renderSkillBadge(<SiMariadb className="text-brown-600 text-base"/>, "MariaDB", 3)}
                                        </div>
                                    </div>

                                    {/* DevOps */}
                                    <div>
                                        <h3 className="text-sm font-bold text-muted-foreground mb-2">DevOps</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {renderSkillBadge(<FaAws className="text-orange-500 text-base"/>, "AWS", 2)}
                                            {renderSkillBadge(<SiDocker className="text-blue-500 text-base"/>, "Docker", 2)}
                                            {renderSkillBadge(<SiGit className="text-red-500 text-base"/>, "Git", 3)}
                                            {renderSkillBadge(<SiGithub className="text-foreground text-base"/>, "GitHub", 3)}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* --- PAGE 2: ABOUT (Resume Page 2) --- */}
            <section id="about" ref={sectionRefs.about} className="py-16 flex justify-center px-4">
                {/* [수정] isExporting이 true일 때 애니메이션 해제 */}
                <motion.div
                    className="a4-page bg-background text-foreground p-12 flex flex-col gap-10 max-w-[794px] w-full min-h-[1123px] relative overflow-hidden mx-auto box-border transition-colors duration-300"
                    variants={isExporting ? undefined : containerVariants}
                    initial={isExporting ? undefined : "hidden"}
                    whileInView={isExporting ? undefined : "visible"}
                    viewport={{ once: true }}
                    style={{ opacity: 1 }}
                >

                    <motion.div variants={isExporting ? undefined : itemVariants} className="border-b border-border pb-4">
                        <h2 className="text-3xl font-bold text-foreground">About Me</h2>
                    </motion.div>

                    {/* 나의 여정 */}
                    <motion.div variants={isExporting ? undefined : itemVariants} className="space-y-4">
                        <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                            <span className="w-2 h-8 bg-primary rounded-full inline-block"></span>
                            나의 여정
                        </h3>
                        <p className="text-sm leading-7 text-muted-foreground text-justify">
                            저는 컴퓨터라곤 게임을 위한 도구로 밖에 모르던 고등학교 2학년 때, 친구와 함께 호기심으로 참가한
                            <b> UNIST 슈퍼컴퓨팅 청소년 캠프</b>를 통해 인생의 터닝포인트를 맞이했습니다.
                            4박 5일간의 짧은 시간이었지만 수준 높은 실습과 특강을 통해 처음으로 프로그래밍이라는 세계에 매료되었고,
                            '내가 만드는 코드가 직접 동작한다'는 경험에 큰 흥미를 느꼈습니다.
                            <br className="mb-2 block"/>
                            당시에는 막연한 흥미였지만, 진로를 고민하던 시기에 그때의 강렬한 경험이 떠올라 주저 없이 컴퓨터공학 전공을 선택하였습니다.
                            대학에서는 컴퓨터 구조, 운영체제, 네트워크 등 전공 이론과 함께 다양한 팀/개인 프로젝트를 진행하며 실력을 쌓았고,
                            문서 작성과 협업 경험을 통해 문제 해결 중심의 사고 방식과 실무 역량을 키워나갔습니다.
                        </p>
                    </motion.div>

                    {/* 기술과 도전 */}
                    <motion.div variants={isExporting ? undefined : itemVariants} className="space-y-4">
                        <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                            <span className="w-2 h-8 bg-primary rounded-full inline-block"></span>
                            기술과 도전
                        </h3>
                        <p className="text-sm leading-7 text-muted-foreground text-justify">
                            저는 <b>'모르는 것을 두려워하지 않는 개발자'</b>가 되고 싶습니다.
                            3학년 1학기에 <b>병원 EMR 시스템</b> 개발을 개인 프로젝트로 진행하려 할 때, Java 스킬만 다져놓은 상태였고 Spring에 대해서는 전무했습니다.
                            그러나 병원 업무 시스템을 제대로 구현하기 위해서는 백엔드 프레임워크가 필수적이라고 판단했고,
                            결국 <b>Spring Boot</b>의 기본부터 하나하나 독학해가며 시스템을 직접 구축하는 도전을 선택했습니다.
                            <br className="mb-2 block"/>
                            처음에는 REST API 설계조차 생소했지만, 관련 강의와 공식 문서를 참고해가며 기초를 다지고 작은 기능부터 직접 구현했습니다.
                            결과적으로 데이터베이스 연동부터 병원 예약 처리, 진료 이력 관리 등 하나의 완성된 시스템을 만들어 낼 수 있었고,
                            이 과정에서 <b>'개발은 문제를 해결해나가는 과정'</b>이라는 사실을 깊이 체감했습니다.
                            이런 경험을 토대로, 앞으로 마주할 새로운 기술이나 난관도 두려워하지 않고 부딪혀 내 것으로 만드는 사람이 될 것입니다.
                        </p>
                    </motion.div>

                    {/* 미래로의 도약 */}
                    <motion.div variants={isExporting ? undefined : itemVariants} className="space-y-4">
                        <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                            <span className="w-2 h-8 bg-primary rounded-full inline-block"></span>
                            미래로의 도약
                        </h3>
                        <p className="text-sm leading-7 text-muted-foreground text-justify">
                            저는 대학에서의 다양한 강의와 과제 활동, 프로젝트를 통해 실무에서 필요한 기초 역량을 쌓는 귀중한 경험을 하였습니다.
                            이러한 경험들은 개발자로서의 토대를 다지는 데 큰 도움이 되었지만, 동시에 아직 배워야 할 것이 차고 넘친다는 사실도 깨달았습니다.
                            <br className="mb-2 block"/>
                            앞으로는 학교라는 울타리를 넘어 <b>직접 현장에서 부딪혀 보며</b> 실전 경험을 쌓고 싶습니다.
                            실패를 두려워하지 않고 그 속에서 교훈을 얻으며, 부족한 점을 스스로 파악해 끊임없이 성장해 나갈 것입니다.
                            단순히 빠른 결과만을 추구하기보다는, 시행착오를 겪고 스스로 고민하고 해결하는 과정들을 저의 소중한 자산이라 여기며
                            한 걸음씩 단단하게 전진하는 개발자가 되겠습니다.
                        </p>
                    </motion.div>
                </motion.div>
            </section>

            {/* Projects Section (Web Style) */}
            <section id="projects" ref={sectionRefs.projects} className="py-24 px-4 bg-background">
                <div className="container mx-auto max-w-5xl">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-foreground mb-4">Projects</h2>
                        <div className="w-20 h-1.5 bg-primary mx-auto rounded-full"></div>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {projects.map((project, index) => (
                            <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                                <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300 border-border/50">
                                    <div className="relative h-56 bg-muted overflow-hidden rounded-t-lg group">
                                        <Image src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" width={500} height={300} />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                            <Button variant="secondary" size="sm" asChild>
                                                <a href={project.github} target="_blank" rel="noopener noreferrer"><Github className="w-4 h-4 mr-2"/>GitHub</a>
                                            </Button>
                                            <Button variant="secondary" size="sm" asChild>
                                                <a href={project.notion} target="_blank" rel="noopener noreferrer">
                                                    <Image src={notionImage} alt="Notion" width={16} height={16} className="mr-2" />
                                                    Notion
                                                </a>
                                            </Button>
                                        </div>
                                    </div>
                                    <CardHeader>
                                        <CardTitle className="text-xl">{project.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-grow flex flex-col justify-between">
                                        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{project.description}</p>
                                        <div className="flex flex-wrap gap-2 mt-auto">
                                            {project.tech.map((tech) => (
                                                <Badge key={tech} variant="outline" className="bg-secondary/50 text-xs font-normal">{tech}</Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section (Web Style) */}
            <section id="contact" ref={sectionRefs.contact} className="py-24 px-4 bg-secondary/50">
                <div className="container mx-auto text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
                        <h2 className="text-4xl font-bold text-foreground mb-4">Get In Touch</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            새로운 기회와 도전을 언제나 환영합니다. 궁금한 점이 있거나 협업 제안이 있다면 언제든 연락주세요.
                        </p>
                    </motion.div>

                    <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                        <Button size="lg" className="w-full md:w-auto gap-2" asChild>
                            <a href="mailto:fsirtru@gmail.com">
                                <Mail className="w-5 h-5" /> Send Email
                            </a>
                        </Button>
                        <Button size="lg" variant="outline" className="w-full md:w-auto gap-2" asChild>
                            <a href="https://github.com/F3ZLoV" target="_blank" rel="noopener noreferrer">
                                <Github className="w-5 h-5" /> Visit GitHub
                            </a>
                        </Button>
                    </div>
                </div>
            </section>

            <footer className="py-8 border-t border-border bg-background">
                <div className="container mx-auto text-center text-sm text-muted-foreground">
                    <p>© 2025 Park Tae-joon. Designed with Next.js & Tailwind CSS.</p>
                </div>
            </footer>
        </div>
    )
}