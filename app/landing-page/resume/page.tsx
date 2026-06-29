// Updated Resume Page with ShadCN Dropdown Filters
// (Full TSX Code)

"use client"

import React, { useState } from "react"
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
    title: "Full-Stack Web Development Training",
    date: "Professional Training",
    description:
      "Comprehensive training covering frontend development, backend engineering, databases, REST API development, deployment workflows, and modern software engineering practices.",
    starred: true,
  },
  {
    title: "Software Engineering Fundamentals",
    date: "Practical Learning",
    description:
      "Built strong foundations in application architecture, debugging, performance optimization, responsive design principles, and scalable software development.",
  },
];

const experience: TimelineItem[] = [
  {
    title: "Independent Full-Stack Developer",
    date: "2020 – Present",
    description:
      "Design, develop, deploy, and maintain modern web applications for personal projects and client-focused solutions. Build full-stack applications using React, Next.js, TypeScript, Node.js, and modern frontend technologies.",
    starred: true,
  },
  {
    title: "API & Backend Development",
    date: "2020 – Present",
    description:
      "Designed and integrated REST APIs, implemented authentication systems, protected routes, and managed scalable backend workflows using Node.js, Express, MySQL, and MongoDB.",
  },
  {
    title: "Deployment & Production Engineering",
    date: "2020 – Present",
    description:
      "Managed deployments using Docker, Vercel, and Render while improving application reliability, performance optimization, and debugging production issues.",
    starred: true,
  },
  {
    title: "Web3 Application Development",
    date: "2021 – Present",
    description:
      "Built and explored blockchain-focused applications involving wallet integrations, authentication systems, task/reward workflows, and decentralized user experiences.",
  },
];

const skills: Skill[] = [

  // Frontend

  {
    name: "HTML5",
    value: 95,
    category: "frontend",
  },

  {
    name: "CSS",
    value: 95,
    category: "frontend",
  },

  {
    name: "JavaScript",
    value: 90,
    category: "frontend",
  },

  {
    name: "TypeScript",
    value: 88,
    category: "frontend",
  },

  {
    name: "React.js",
    value: 92,
    category: "frontend",
  },

  {
    name: "Next.js",
    value: 95,
    category: "frontend",
  },

  {
    name: "Tailwind CSS",
    value: 95,
    category: "frontend",
  },

  {
    name: "ShadCN UI",
    value: 90,
    category: "frontend",
  },

  {
    name: "Responsive Design",
    value: 95,
    category: "frontend",
  },



  // Backend

  {
    name: "Node.js",
    value: 92,
    category: "backend",
  },

  {
    name: "Express.js",
    value: 90,
    category: "backend",
  },

  {
    name: "REST API Development",
    value: 95,
    category: "backend",
  },

  {
    name: "Authentication",
    value: 90,
    category: "backend",
  },

  {
    name: "Python",
    value: 80,
    category: "backend",
  },

  {
    name: "Wallet Integration",
    value: 85,
    category: "backend",
  },

  {
    name: "Web3 Authentication",
    value: 85,
    category: "backend",
  },



  // Tools

  {
    name: "Git & GitHub",
    value: 90,
    category: "tools",
  },

  {
    name: "Docker",
    value: 85,
    category: "tools",
  },

  {
    name: "Postman",
    value: 92,
    category: "tools",
  },

  {
    name: "VS Code",
    value: 100,
    category: "tools",
  },

  {
    name: "Directus CMS",
    value: 80,
    category: "tools",
  },

  {
    name: "Vercel Deployment",
    value: 95,
    category: "tools",
  },

  {
    name: "Render Deployment",
    value: 95,
    category: "tools",
  },

  {
    name: "AI-Assisted Development",
    value: 90,
    category: "tools",
  },


// Database
{
  name: "MySQL",
  value: 85,
  category: "Database",
},
{
  name: "MongoDB",
  value: 100,
  category: "Database",
},
{
  name: "PostgreSQL",
  value: 84,
  category: "Database",
},
{
  name: "SQLite",
  value: 82,
  category: "Database",
},
{
  name: "Redis",
  value: 80,
  category: "Database",
},
{
  name: "Firebase Firestore",
  value: 86,
  category: "Database",
},
{
  name: "Supabase",
  value: 85,
  category: "Database",
},
{
  name: "Prisma ORM",
  value: 90,
  category: "Database",
},
{
  name: "Mongoose",
  value: 100,
  category: "Database",
},
]
export default function ResumePage() {
  const [filter, setFilter] = useState<string>("all")

  const filteredSkills =
    filter === "all" ? skills : skills.filter((s) => s.category === filter)

  return (
    <>
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
                <DropdownMenuItem onClick={() => setFilter("Database")}>
   Database
</DropdownMenuItem>
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
    </>
  )
}
