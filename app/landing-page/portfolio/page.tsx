"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Eye, ChevronDown } from "lucide-react"
import Sidebar from "@/components/landing-page/Sidebar"
import Nav from "@/components/landing-page/Nav"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

interface Project {
  title: string
  category: string
  image: string
  link: string
  description: string
}

const projects: Project[] = [
  {
    title: "Melons",
    category: "Meme Project",
    image: "https://i.postimg.cc/RZTjTdw4/Screenshot-2025-11-05-173047.jpg",
    link: "https://melons.onrender.com",
    description:
      "A meme-sharing community where creativity meets humor. Users can create, post, and explore the funniest trends of the day with ease and style.",
  },
  {
    title: "MPC Server",
    category: "Web Development",
    image: "https://i.postimg.cc/Y218g962/Screenshot-2025-11-05-173007.jpg",
    link: "https://de-mcp-server.onrender.com",
    description:
      "A secure, high-performance backend server setup designed for decentralized applications. Optimized for scalability, speed, and seamless API management.",
  },
  {
    title: "Investmentz",
    category: "Web Application",
    image: "https://i.postimg.cc/y6DdDgcr/Screenshot-2025-11-05-165430.jpg",
    link: "https://regalinvestmentz.com",
    description:
      "An elegant financial web application offering real-time investment tracking and performance analytics. Designed for modern investors with usability in mind.",
  },
{
  title: "Moon Chad",
  category: "Meme Project",
  image: "https://i.postimg.cc/tT6sXpJg/Screenshot-2025-11-06-153321.jpg",
  link: "moonchad.onrender.com",
  description:
"A Meme Coin Project built on a decentralized web platform. This project focuses on the initial launch and distribution phase for a new cryptocurrency token.",},
  {
    title: "Dynamiqerra",
    category: "Web Development",
    image: "https://i.postimg.cc/dVHmjZNG/Screenshot-2025-11-05-164936.jpg",
    link: "https://dynamiqerra.com",
    description:
      "A dynamic digital agency crafting fast, reliable, and scalable web solutions. Focused on performance, responsive design, and next-gen user experiences.",
  },
  {
    title: "Catooony",
    category: "Meme Project",
    image: "https://i.postimg.cc/v8gTSgqy/Screenshot-2025-11-05-173723.jpg",
    link: "https://catooony.onrender.com/",
    description:
      "A cartoon-style meme generator built for fun and expression. Users can create animated memes in seconds with vibrant visuals and humor-driven tools.",
  },
  {
    title: "Poplox",
    category: "Web Development",
    image: "https://i.postimg.cc/d1KBhPxs/Screenshot-2025-11-05-165835.jpg",
    link: "https://poplox.com",
    description:
      "An advanced eCommerce web development project offering speed, reliability, and engaging product showcases to enhance the online shopping experience.",
  },
 {
  title: "Cyber Yearn",
  category: "Web Application",
  image: "https://i.postimg.cc/fbqJr44Q/cyberyearn.png",
  link: "https://cy-frontend-beta.vercel.app/",
  description:
    "An educational cyber platform where people learn about cybersecurity, ethical hacking, and digital defense. Built to empower users with real-world knowledge and hands-on skills.",
},

  {
    title: "Troll Meme",
    category: "Meme Project",
    image: "https://i.postimg.cc/jqc8D8S9/Screenshot-2025-04-25-222845.jpg",
    link: "https://troll0.onrender.com",
    description:
      "A classic meme platform dedicated to the golden era of internet humor. Create, remix, and share troll memes with an intuitive and fun UI.",
  },
  {
    title: "Viral Vault",
    category: "Web Development",
    image: "https://i.postimg.cc/fbnJxw76/Screenshot-2025-11-05-172913.jpg",
    link: "https://viralvault.onrender.com",
    description:
      "A viral content hub built for scalability and engagement. Optimized for meme creators, marketers, and social brands seeking rapid reach.",
  },
 {
  title: "Task Kash",
  category: "Web Application",
  image: "https://i.postimg.cc/FRpYBGBG/Screenshot-2025-11-06-151959.jpg",
  link: "https://taskkash-project.onrender.com/",
  description:
    "A platform designed to connect users with large-scale social media projects (e.g., promotional campaigns, engagement drives). Users can perform specific tasks and earn money.",
},
  {
    title: "Boost Media",
    category: "Web Development",
    image: "https://i.postimg.cc/9MWdVhZf/four-smm-onrender-com.png",
    link: "https://four-smm.onrender.com/",
    description:
      "A marketing automation platform empowering brands to grow their audience. Offers social scheduling, analytics, and campaign management tools.",
  },
  {
    title: "BTC Desider",
    category: "Meme Project",
    image: "https://i.postimg.cc/2SScFDGH/Screenshot-2025-11-05-171443.jpg",
    link: "https://sib-btc.onrender.com",
    description:
      "A crypto-themed meme generator where blockchain meets banter. Perfect for traders who like humor with their market charts.",
  },
{
  title: "Gods Eye",
  category: "Web Development",
  image: "https://i.postimg.cc/SK8004M7/Screenshot-2025-11-05-170556.jpg",
  link: "https://gods-eye-0.onrender.com",
  description:
    "Platform dedicated to ethical cybersecurity training. Users can learn and practice the methods used to build phishing websites and generate fake receipts, gaining critical knowledge for understanding, identifying.",
},
  {
    title: "Gift Castle",
    category: "Web Development",
    image: "https://i.postimg.cc/pTYWHNxq/gift-castle-onrender-com-2.png",
    link: "https://gift-castle.onrender.com/",
    description:
"A secure and user-friendly marketplace for buying and selling gift cards. The platform facilitates fast, reliable transactions, allowing users to instantly exchange unwanted gift cards for cash.",  },
 {
  title: "Trust Loan",
  category: "Web Application",
  image: "https://i.postimg.cc/hGk98C79/Screenshot-2025-11-06-154256.jpg",
  link: "https://trustloaneth.onrender.com/",
  description:
    "A Decentralized Finance (DeFi) platform built to provide short-term crypto loans specifically tailored for active traders. It allows users to borrow digital assets, enabling them to leverage their trading positions.",
},
  {
    title: "Wizard Meme",
    category: "Meme Project",
    image: "https://i.postimg.cc/bwkktJRJ/wizard0-onrender-com-1.png",
    link: "https://wizard0.onrender.com/",
    description:
      "A fantasy-inspired meme creation portal. Users can summon wizard-themed humor and share spellbinding content across the web.",
  },
{
  title: "Library",
  category: "Web Application",
  image: "https://i.postimg.cc/MTrLFgby/Screenshot-2025-11-07-072746.jpg",
  link: "https://library-ukj1.onrender.com/",
  description:
    "This platform allows people to read important books, view helpful screenshots and PDFs, and watch instructional videos, serving as a comprehensive resource for knowledge and learning.",
},
]

const PortfolioPage = () => {
  const [filter, setFilter] = useState<string>("All")
  const categories = ["All", "Web Application", "Web Development", "Meme Project"]

  const filteredProjects =
    filter === "All" ? projects : projects.filter((p) => p.category === filter)

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300 p-3 md:py-10 md:px-40 flex flex-col md:flex-row gap-6">
      {/* Sidebar */}
      <aside>
        <Sidebar />
      </aside>

      {/* Main Section */}
      <section className="flex-1 bg-card border border-border rounded-3xl p-4 md:p-10 shadow-lg overflow-y-auto mb-25 sm:mb-0 transition-colors duration-300">
        <Nav />

        {/* Header */}
        <header className="mb-10">
          <h2 className="text-3xl font-bold text-foreground mb-2">Portfolio</h2>
          <div className="h-[3px] w-20 bg-primary rounded-full"></div>
        </header>

        {/* Filter Section */}
        <div className="mb-8">
          {/* Desktop Buttons */}
          <div className="hidden sm:flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-lg cursor-pointer border text-sm font-medium transition-colors duration-200
                  ${
                    filter === cat
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border hover:bg-card hover:text-foreground"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Mobile Dropdown */}
          <div className="flex sm:hidden w-full">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between bg-card text-foreground border border-border hover:bg-background transition-colors"
                >
                  {filter}
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-[var(--radix-dropdown-menu-trigger-width)] bg-card text-foreground border border-border shadow-md rounded-lg"
              >
                {categories.map((cat) => (
                  <DropdownMenuItem
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`cursor-pointer px-4 py-2 text-sm font-medium transition-colors
                      ${
                        filter === cat
                          ? "bg-primary text-primary-foreground font-semibold"
                          : "hover:bg-card hover:text-foreground"
                      }`}
                  >
                    {cat}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Project Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden border border-border bg-muted rounded-2xl shadow-md"
            >
              <figure className="relative w-full h-52 md:h-56 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 dark:bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                  <Eye className="w-8 h-8 text-primary" />
                </div>
              </figure>
              <div className="p-5">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
                  <p className="text-sm text-muted-foreground">{project.category}</p>
                </div>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>
            </a>
          ))}
        </section>
      </section>
    </main>
  )
}

export default PortfolioPage
