"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Eye, ChevronDown, Link } from "lucide-react";
import Sidebar from "@/components/landing-page/Sidebar";
import Nav from "@/components/landing-page/Nav";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface Project {
  title: string;
  category: string;
  image: string;
  link: string;
  description: string;
}

const projects: Project[] = [
  {
    title: "Trust Wallet XP",
    category: "BOT",
    image:
      "https://i.postimg.cc/DydDq71b/Screenshot-2026-04-21-150326.jpg",
    link: "https://t.me/trustwalletxp_bot",
    description:
      "Telegram bot for Trust Wallet XP, This bot helps users earn XP points by completing simple tasks. XP can unlock bonuses, features, and rewards inside the BOT",
  },
  {
    title: "CETADEL ASSETS",
    category: "Web Application",
    image:
      "https://i.postimg.cc/XJnghKKj/Cetadel.png",
    link: "https://citadel-assets.vercel.app",
    description:
      "CETADEL ASSETS is a leading financial services company specializing in asset management and investment solutions.",
  },
  {
    title: "PRINTER FX",
    category: "Web Application",
    image:
      "https://i.postimg.cc/28R4wm2r/Screenshot-2026-04-21-135728.jpg",
    link: "https://printer-fx.vercel.app/",
    description:
  "PRINTER FX is a forex mentorship platform designed to help traders master the markets through proven strategies, live sessions, and real-time trade insights.",
  },
  {
    title: "GINGOMART",
    category: "Web Application",
    image:
      "https://i.postimg.cc/ydHhW2Wq/Screenshot-2026-03-02-100833.jpg",
    link: "https://shopdotfun.vercel.app/",
    description:
      "Gingo Mart is a modern marketplace where people can buy and sell any digital product and get paid securely in cryptocurrency.",
  },
  {
    title: "Task Kash",
    category: "Web Application",
    image: "https://i.postimg.cc/xjKQXyZy/Screenshot-2026-04-21-134941.jpg",
    link: "https://taskkash.xyz/",
    description:
      "A platform designed to connect users with large-scale social media projects (e.g., promotional campaigns, engagement drives). Users can perform specific tasks and earn money.",
  },
  {
    title: "Melons",
    category: "Meme Project",
    image: "https://i.postimg.cc/RZTjTdw4/Screenshot-2025-11-05-173047.jpg",
    link: "https://melons-opal.vercel.app/",
    description:
      "A meme-sharing community where creativity meets humor. Users can create, post, and explore the funniest trends of the day with ease and style.",
  },
  {
    title: "CRIMINOLOGY",
    category: "Web Application",
    image:
      "https://i.postimg.cc/tCjDgN06/Screenshot-2026-01-10-131302-crop-2026-01-10-13-23-44.jpg",
    link: "https://criminology.vercel.app/",
    description:
      "A modern library web application designed to provide easy access to curated content. Features include intuitive navigation, clean design, and seamless browsing, making it simple for users to discover and engage with resources.",
  },
  {
    title: "MCP Server",
    category: "Web Development",
    image: "https://i.postimg.cc/Y218g962/Screenshot-2025-11-05-173007.jpg",
    link: "https://mcp-server-seven-tau.vercel.app/",
    description:
      "A secure, high-performance backend server setup designed for decentralized applications. Optimized for scalability, speed, and seamless API management.",
  },
  {
    title: "Moon Chad",
    category: "Meme Project",
    image: "https://i.postimg.cc/tT6sXpJg/Screenshot-2025-11-06-153321.jpg",
    link: "https://moon-chad.vercel.app/",
    description:
      "A Meme Coin Project built on a decentralized web platform. This project focuses on the initial launch and distribution phase for a new cryptocurrency token.",
  },
  {
    title: "Investmentz",
    category: "Web Application",
    image: "https://i.postimg.cc/cJM7Kzfj/Screenshot-2026-04-21-135409.jpg",
    link: "https://regalinvestmentz.com",
    description:
      "An elegant financial web application offering real-time investment tracking and performance analytics. Designed for modern investors with usability in mind.",
  },
  {
    title: "Dynamiqerra",
    category: "Web Development",
    image: "https://i.postimg.cc/dVHmjZNG/Screenshot-2025-11-05-164936.jpg",
    link: "https://dynamiqerra.com",
    description:
      "A dynamic digital agency crafting fast, reliable, and scalable web solutions. Focused on performance, responsive design, and next-gen user experiences.",
  },
  {
    title: "Catoony",
    category: "Meme Project",
    image: "https://i.postimg.cc/v8gTSgqy/Screenshot-2025-11-05-173723.jpg",
    link: "https://catoony.vercel.app/",
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
    link: "https://troll-rouge.vercel.app/",
    description:
      "A classic meme platform dedicated to the golden era of internet humor. Create, remix, and share troll memes with an intuitive and fun UI.",
  },
  {
    title: "BTC Desider",
    category: "Meme Project",
    image: "https://i.postimg.cc/2SScFDGH/Screenshot-2025-11-05-171443.jpg",
    link: "https://btc-decider.vercel.app/",
    description:
      "A crypto-themed meme generator where blockchain meets banter. Perfect for traders who like humor with their market charts.",
  },
  {
    title: "NFT SWAP",
    category: "Web Development",
    image: "https://i.postimg.cc/13KTG5hr/Screenshot-2026-01-10-145519.jpg",
    link: "https://nft-swap-sage.vercel.app/",
    description:
      "An NFT swapping platform where users can trade, exchange, and manage their NFTs seamlessly. Connect wallets, discover unique assets, and swap NFTs securely on the blockchain.",
  },
  {
    title: "Gods Eye",
    category: "Web Development",
    image: "https://i.postimg.cc/SK8004M7/Screenshot-2025-11-05-170556.jpg",
    link: "https://gods-eye-mu.vercel.app/",
    description:
      "Platform dedicated to ethical cybersecurity training. Users can learn and practice the methods used to build phishing websites and generate fake receipts, gaining critical knowledge for understanding, identifying.",
  },
  {
    title: "Gift Card wave",
    category: "Web Development",
    image: "https://i.postimg.cc/pTYWHNxq/gift-castle-onrender-com-2.png",
    link: "https://gift-card-wave.vercel.app/",
    description:
      "A secure and user-friendly marketplace for buying and selling gift cards. The platform facilitates fast, reliable transactions, allowing users to instantly exchange unwanted gift cards for cash.",
  },
  {
    title: "Trust Loan",
    category: "Web Application",
    image: "https://i.postimg.cc/85MNhq1M/Screenshot-2026-04-21-144534.jpg",
    link: "https://trustloaneth.com/",
    description:
      "A Decentralized Finance (DeFi) platform built to provide short-term crypto loans specifically tailored for active traders. It allows users to borrow digital assets, enabling them to leverage their trading positions.",
  },
  {
    title: "Wizard Meme",
    category: "Meme Project",
    image: "https://i.postimg.cc/bwkktJRJ/wizard0-onrender-com-1.png",
    link: "https://wizard-beryl-nine.vercel.app/",
    description:
      "A fantasy-inspired meme creation portal. Users can summon wizard-themed humor and share spellbinding content across the web.",
  },
  {
    title: "ASTRO TRADE",
    category: "Web Development",
    image: "https://i.postimg.cc/wTk8VkD7/Screenshot-2026-01-10-150327.jpg",
    link: "https://astro-trade-iota.vercel.app/",
    description:
      "A platform that connects clients with professional traders who manage trades on their behalf. Users can securely hire experienced traders, track trading performance, and let experts handle buying and selling efficiently.",
  },
];

const PortfolioPage = () => {
  const [filter, setFilter] = useState<string>("All");
  const categories = [
    "All",
    "Web Application",
    "Web Development",
    "Meme Project",
    "BOT",
  ];

  const filteredProjects =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300 p-3 md:py-10 md:px-30 flex flex-col md:flex-row gap-6">
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
      className="group relative overflow-hidden rounded-2xl border border-border bg-muted/40 backdrop-blur-xl  transition-all duration-500"
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10 blur-2xl" />
      </div>

      {/* Image */}
      <figure className="relative w-full h-52 md:h-56 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover scale-100 group-hover:scale-110 transition-transform duration-700 ease-out"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80" />

        {/* Hover Icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
          <div className="bg-primary/90 p-3 rounded-lg shadow-lg scale-75 group-hover:scale-100 transition">
            <Link className="w-6 h-6 text-white" />
          </div>
        </div>
      </figure>

      {/* Content */}
      <div className="p-5 space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-lg md:text-xl font-semibold text-foreground group-hover:text-primary transition">
            {project.title}
          </h3>
          <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
            {project.category}
          </span>
        </div>

        <p className="text-sm md:text-base text-muted-foreground leading-relaxed line-clamp-4">
          {project.description}
        </p>

        {/* CTA */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-sm text-primary font-medium group-hover:underline">
            View Project →
          </span>

          <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition">
            <Link className="w-5 h-5 text-primary" />
          </div>
        </div>
      </div>
    </a>
  ))}
</section>
      </section>
    </main>
  );
};

export default PortfolioPage;
