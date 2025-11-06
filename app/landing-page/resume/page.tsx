"use client"

import React from "react"
import Sidebar from "@/components/landing-page/Sidebar";
import Nav from "@/components/landing-page/Nav";
import { IoBookOutline, IoBriefcaseOutline, IoBarChartOutline } from "react-icons/io5"

interface TimelineItem {
  title: string
  date: string
  description: string
  starred?: boolean
}

interface Skill {
  name: string
  value: number
}

const education: TimelineItem[] = [
  {
    title: "University",
    date: "2013 – 2014",
    description:
      "There I learnt a wide range of topics that are essential to understanding both the theory and practical aspects of computing. This involved programming fundamentals, computer architecture, operating systems, databases, software engineering, problem solving collaboration and communication soft skills.",
  },
  {
    title: "Art And Design",
    date: "2015 – 2016",
    description:
      "There I learnt foundational courses and computer sciences fundamentals, in the institution chose my specialization in web-development involving front- and back-end technologies, user interface designs and content management systems front-and back-end.",
    starred: true,
  },
 {
  title: "Verbum Networks lmt",
  date: "2014 – 2015",
  description:
    "I learned Web Development here, focusing on foundational skills and practical application. I later returned to collect my CV and continue building my career prospects in the competitive tech field.",
  starred: true,
},
]

const experience: TimelineItem[] = [
  {
    title: "Web Development",
    date: "2018 – Present",
    description:
      "Skilled in bringing technical and creative disciplines, ensuring project feasibility while maintaining a strong focus on user experience and aesthetics.",
  },
  {
    title: "Forex",
    date: "2019 – Present",
    description:
      "I analyze and develop strategic trading concepts that align with market goals, overseeing the execution of trading strategies and managing timelines and budgets for investment portfolios.",
    starred: true,
  },
  {
    title: "Airdrop Specialist",
    date: "2018 – Present",
    description:
      "I organize and manage crypto airdrops, ensuring airdrop tokens eligibility and fair distribution. Additionally, I educate individuals on how to find, participate in, and maximize benefits from airdrops while avoiding scams.",
    starred: true,
  },
]

const skills: Skill[] = [
  { name: "Forex Trading", value: 35 },
  { name: "Reply Guy", value: 60 },
  { name: "Web Design", value: 80 },
  { name: "Web Development", value: 85 },
  { name: "Airdrop Specialist", value: 100 },
]

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300 p-3 md:py-10 md:px-40 flex flex-col md:flex-row gap-6">
      {/* Sidebar */}
      <aside>
        <Sidebar />
      </aside>

      {/* Main Content */}
      <section className="flex-1 bg-card border border-border rounded-3xl p-4 md:p-10 shadow-lg overflow-y-auto mb-25 sm:mb-0 transition-colors duration-300">
        {/* Navigation */}
        <Nav />

        {/* Resume Header */}
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Resume</h2>
          <div className="h-[3px] w-20 bg-primary rounded-full"></div>
        </header>

        {/* Education Section */}
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

        {/* Experience Section */}
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
          <div className="flex items-center gap-3 mb-6">
            <h3 className="text-2xl font-semibold text-foreground">My Skills</h3>
          </div>

          <ul className="space-y-5">
            {skills.map((skill) => (
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
