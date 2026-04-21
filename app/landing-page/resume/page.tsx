// Updated Resume Page with ShadCN Dropdown Filters
// (Full TSX Code)

"use client"

import React, { useState } from "react"
import Sidebar from "@/components/landing-page/Sidebar"
import Nav from "@/components/landing-page/Nav"
import { IoBookOutline, IoBriefcaseOutline } from "react-icons/io5"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

interface TimelineItem {
  title: string
  date: string
  description: string
  starred?: boolean
}

interface Skill {
  name: string
  value: number
  category: "frontend" | "backend" | "tools" | "Database"
}

const education: TimelineItem[] = [
  {
    title: "Computer Science Studies",
    date: "2013 – 2014",
    description:
      "Studied core computer science concepts including programming fundamentals, computer architecture, operating systems, databases, and software engineering. Developed problem-solving skills and gained experience working on collaborative technical projects.",
  },
  {
    title: "Art & Design (Digital Focus)",
    date: "2015 – 2016",
    description:
      "Learned visual design principles and user interface design with a focus on digital products. Explored front-end development concepts, responsive layouts, and the relationship between design, usability, and modern web technologies.",
    starred: true,
  },
  {
    title: "Web Development Training – Verbum Networks Ltd",
    date: "2014 – 2015",
    description:
      "Completed practical training in web development, learning HTML, CSS, JavaScript, and foundational backend concepts. Built early web projects while gaining hands-on experience with real development workflows.",
    starred: true,
  },
];

const experience: TimelineItem[] = [
  {
    title: "Full-Stack Web Development",
    date: "2018 – Present",
    description:
      "Building responsive and scalable web applications using modern technologies such as JavaScript, React, Node.js, and REST APIs. Focused on clean architecture, performance optimization, and delivering user-friendly digital experiences.",
  },
  {
    title: "Technical Research & Algorithmic Trading",
    date: "2019 – Present",
    description:
      "Applying data analysis and technical indicators to study financial markets. Developing structured trading strategies and using analytical tools to evaluate market trends and risk management.",
    starred: true,
  },
  {
    title: "Blockchain & Web3 Research",
    date: "2018 – Present",
    description:
      "Exploring blockchain ecosystems, token distribution models, and decentralized platforms. Educating communities on identifying legitimate crypto opportunities, participating in airdrops, and maintaining security in the Web3 space.",
    starred: true,
  },
];

// 🔥 Updated Skill Stack With Categories
const skills: Skill[] = [
    // Frontend skills // 
    { name: "CSS", value: 100, category: "frontend" },
    { name: "HTML", value: 100, category: "frontend" },
    { name: "React.js", value: 90, category: "frontend" },
    { name: "Next.js", value: 95, category: "frontend" },
    { name: "ShadCN UI", value: 85, category: "frontend" },
    { name: "Bootstrap", value: 100, category: "frontend" },
    { name: "JavaScript", value: 80, category: "frontend" },
    { name: "TypeScript", value: 80, category: "frontend" },
    { name: "Tailwind CSS", value: 100, category: "frontend" },
    { name: "React Native", value: 70, category: "frontend" },

  // Backend skills // 
  { name: "MySQL", value: 70, category: "backend" },
  { name: "REST APIs", value: 90, category: "backend" },
  { name: "Node EJS", value: 100, category: "backend" },
  { name: ".NET", value: 80, category: "backend" },
  { name: "Node JS", value: 100, category: "backend" },
  { name: "Express", value: 100, category: "backend" },
  
  // Dev tool skills // 
  { name: "Docker", value: 70, category: "tools" },
  { name: "Postman", value: 90, category: "tools" },
  { name: "VS Code", value: 100, category: "tools" },
  { name: "Git & GitHub", value: 90, category: "tools" },
  { name: "Render Deployment", value: 100, category: "tools" },
  { name: "Vercel Deployment", value: 100, category: "tools" },
  { name: "Directus (Headless CMS)", value: 80, category: "tools" },

  // Database skills // 
  { name: "MySQL", value: 70, category: "Database" },
  { name: "MongoDB", value: 85, category: "Database" },
  { name: "PostgreSQL", value: 90, category: "Database" },
]

export default function ResumePage() {
  const [filter, setFilter] = useState<string>("all")

  const filteredSkills =
    filter === "all" ? skills : skills.filter((s) => s.category === filter)

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300 p-3 md:py-10 md:px-30 flex flex-col md:flex-row gap-6">
      {/* Sidebar */}
      <aside>
        <Sidebar />
      </aside>

      {/* Main Content */}
      <section className="flex-1 bg-card border border-border rounded-3xl p-4 md:p-10 shadow-lg overflow-y-auto mb-25 sm:mb-0 transition-colors duration-300">
        <Nav />

        <header className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Resume</h2>
          <div className="h-[3px] w-20 bg-primary rounded-full"></div>
        </header>

        {/* Education */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-primary text-primary-foreground rounded-lg font-bold">
              <IoBookOutline className="text-2xl" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground">Education</h3>
          </div>

          <ol className="space-y-6">
            {education.map((item) => (
              <li key={item.title} className="border-l-3 border-primary pl-4 relative">
                <h4 className="text-lg font-semibold text-foreground flex items-center gap-1">
                  {item.starred && <span className="text-primary text-2xl pr-2">★</span>}
                  {item.title}
                </h4>
                <span className="text-sm text-muted-foreground">{item.date}</span>
                <p className="mt-2 text-muted-foreground leading-relaxed">{item.description}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Experience */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-primary text-primary-foreground rounded-lg font-bold">
              <IoBriefcaseOutline className="text-2xl" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground">Experience</h3>
          </div>

          <ol className="space-y-6">
            {experience.map((item) => (
              <li key={item.title} className="border-l-3 border-primary pl-4 relative">
                <h4 className="text-lg font-semibold text-foreground flex items-center gap-1">
                  {item.starred && <span className="text-primary text-2xl pr-2">★</span>}
                  {item.title}
                </h4>
                <span className="text-sm text-muted-foreground">{item.date}</span>
                <p className="mt-2 text-muted-foreground leading-relaxed">{item.description}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Skills Section */}
        <section className="p-5 sm:p-6 bg-muted border border-border rounded-2xl shadow-md transition-colors duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold text-foreground">My Skills</h3>

            {/* 🔥 Filter Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  Filter: {filter === "all" ? "All" : filter}
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="bg-card border border-border text-foreground">
                <DropdownMenuLabel>Filter Skills</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => setFilter("all")}>All</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("frontend")}>Frontend</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("backend")}>Backend</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("tools")}>Dev Tools</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("general")}>General Experience</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <ul className="space-y-5">
            {filteredSkills.map((skill) => (
              <li key={skill.name}>
                <div className="flex justify-between items-center mb-2">
                  <h5 className="text-sm sm:text-lg font-medium text-foreground">{skill.name}</h5>
                  <span className="text-primary font-semibold">{skill.value}%</span>
                </div>

                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${skill.value}%` }}
                  ></div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </main>
  )
}
