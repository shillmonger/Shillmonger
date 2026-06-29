"use client"

import React, { useState } from "react"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

interface BlogPost {
  title: string
  date: string
  category: "portfolio" | "nextjs" | "backend" | "react" | "database"
  readTime: string
  description: string
  image: string
  content: string[]
}

const blogPosts: BlogPost[] = [
  {
    title: "How I Built My Portfolio",
    date: "June 2025",
    category: "portfolio",
    readTime: "6 min read",
    description:
      "A behind-the-scenes breakdown of how I designed and built my personal portfolio using Next.js, Tailwind CSS, and ShadCN UI — from concept to deployment.",
    image: "https://i.postimg.cc/RZvM2hNC/Screenshot-2026-06-29-194334.png",
    content: [
      "Building my portfolio was one of the most rewarding projects I've undertaken. I wanted something that wasn't just a static page but a living reflection of my skills, personality, and growth as a developer.",
      "I chose Next.js 14 as the foundation because of its App Router, built-in performance optimizations, and the flexibility it gives between server and client components. Paired with Tailwind CSS and ShadCN UI, I was able to move fast without sacrificing design quality.",
      "The design philosophy was simple: clean, dark-mode-first, and professional. I used CSS variables for theming so the entire palette could shift with a single toggle. Every section — from the Resume page to the Projects showcase — shares the same layout primitives, keeping the experience consistent.",
      "One key decision was storing the navigation and layout in a shared shell component, so each page just focuses on its own content. Framer Motion handles the subtle entrance animations, keeping things smooth without being distracting.",
      "Deployment was straightforward with Vercel. The entire CI/CD pipeline is automated — pushing to main triggers a production build within seconds. The result is a portfolio that's fast, accessible, and easy to maintain.",
    ],
  },
  {
    title: "Next.js Authentication Done Right",
    date: "May 2025",
    category: "nextjs",
    readTime: "8 min read",
    description:
      "A practical guide to implementing secure, scalable authentication in Next.js using JWT, protected API routes, and middleware — without relying on third-party auth libraries.",
    image: "https://i.postimg.cc/hG4H17hj/Next-Js.jpg",
    content: [
      "Authentication is one of those things that looks simple until you actually build it properly. In Next.js, there are several approaches — third-party providers like NextAuth, fully custom JWT systems, or session-based auth. I went fully custom, and here's why.",
      "The core of the system is a JWT-based flow: the user submits credentials, the server validates them against a hashed password in MongoDB, and if successful, signs a JSON Web Token using a secret key. That token is returned and stored in an HttpOnly cookie — never in localStorage.",
      "Next.js middleware is the real power here. By adding a `middleware.ts` file at the root, you can intercept every request before it hits your pages or API routes. I use it to verify the JWT on every protected route, redirecting unauthenticated users instantly.",
      "On the API side, each protected endpoint extracts the token from the cookie, verifies it, and only proceeds if it's valid. This pattern keeps auth logic centralized and easy to audit.",
      "The result is a lightweight, dependency-free auth system that gives you full control — no black boxes, no surprise billing, and complete ownership of your user data.",
    ],
  },
  {
    title: "Building REST APIs with Node.js & Express",
    date: "April 2025",
    category: "backend",
    readTime: "7 min read",
    description:
      "A step-by-step walkthrough of designing and building production-ready REST APIs using Node.js, Express, and MongoDB — including error handling, validation, and folder structure.",
    image: "https://i.postimg.cc/HWJ1N5z0/Node-js.jpg",
    content: [
      "REST APIs are the backbone of almost every web application I build. Getting the architecture right from the start saves enormous amounts of time down the road, so I've developed a structure and set of conventions I use consistently across projects.",
      "The foundation is Express.js running on Node.js. I organize the codebase into `routes/`, `controllers/`, `models/`, and `middleware/` folders. Routes are thin — they just map HTTP methods and paths to controller functions. Controllers hold the actual logic. This separation keeps things testable and easy to navigate.",
      "For validation, I use a combination of custom middleware and schema-level validation in Mongoose. Before any data hits the database, it's been sanitized and validated. This prevents a whole class of bugs and security issues before they can occur.",
      "Error handling is centralized in a single Express middleware at the bottom of the app. Every async controller is wrapped so that unhandled errors bubble up to this handler, which formats them into consistent JSON responses with the right HTTP status codes.",
      "I also implement rate limiting, CORS configuration, and helmet for HTTP headers on every API. These aren't optional extras — they're the baseline for anything running in production.",
    ],
  },
  {
    title: "React Tips That Actually Matter in Production",
    date: "March 2025",
    category: "react",
    readTime: "5 min read",
    description:
      "Beyond the basics — practical React patterns and performance techniques I've learned from building real-world applications, not just tutorial projects.",
    image: "https://i.postimg.cc/QCF4nQZ2/React.jpg",
    content: [
      "After building production React apps for several years, I've collected a set of patterns that consistently make codebases cleaner, faster, and easier to work with. These aren't tricks — they're habits.",
      "The most impactful one is co-locating state as close to where it's used as possible. Global state is a trap that beginners fall into early. Not everything needs to be in context or a state manager. If only one component needs a piece of state, it should live there — full stop.",
      "Custom hooks are underused by most developers. Every time I find myself copy-pasting logic between components, that's a signal to extract a hook. Whether it's `useFetch`, `useDebounce`, or a domain-specific hook like `useUserSession`, they make components dramatically cleaner.",
      "On the performance side, `useMemo` and `useCallback` are often applied too aggressively. The real wins come from proper key usage in lists, lazy loading heavy components with `React.lazy`, and avoiding unnecessary re-renders by keeping component trees shallow.",
      "Finally, TypeScript is non-negotiable for any serious React project. The upfront investment in typing props, API responses, and state pays back tenfold in caught bugs and developer confidence.",
    ],
  },
  {
    title: "MongoDB Tutorials: From Zero to Production",
    date: "February 2025",
    category: "database",
    readTime: "9 min read",
    description:
      "A comprehensive guide to MongoDB — covering schema design with Mongoose, indexing strategies, aggregation pipelines, and the best practices I use in every production project.",
    image: "https://i.postimg.cc/k5NkxvnP/mongo-DB.jpg",
    content: [
      "MongoDB is my most-used database, and for good reason. Its document model maps naturally to the JSON data structures JavaScript developers already think in. But using it well requires understanding more than just basic CRUD operations.",
      "Schema design is where most developers go wrong. Even though MongoDB is schema-less, defining schemas in Mongoose is essential for data integrity. I always define required fields, set defaults, add validators, and use `timestamps: true` so every document automatically tracks creation and update times.",
      "Indexing is the single biggest lever for query performance. I create indexes on every field that appears in a `find()` query filter or sort. For text search, MongoDB's built-in text indexes are surprisingly powerful without needing a separate search service.",
      "The aggregation pipeline is MongoDB's most powerful feature and the most underused. Instead of fetching documents and manipulating them in JavaScript, you can push complex filtering, grouping, sorting, and joining logic directly to the database — orders of magnitude faster for large datasets.",
      "In production, I always enable connection pooling, set appropriate timeout values, and use environment variables for the connection string. I also run MongoDB Atlas with automated backups enabled. Data loss is not a risk worth taking.",
    ],
  },
  {
    title: "Docker for Developers: A Practical Guide",
    date: "January 2025",
    category: "backend",
    readTime: "10 min read",
    description:
      "Learn how to containerize your applications with Docker — from writing Dockerfiles to multi-stage builds and docker-compose for local development.",
    image: "https://i.postimg.cc/KvzxxwmF/Docker.jpg",
    content: [
      "Docker has become an essential tool in my development workflow. It solves the 'it works on my machine' problem by ensuring that applications run consistently across any environment — from a developer's laptop to production servers.",
      "The journey starts with a Dockerfile. I always start with an official base image like `node:alpine` for Node.js applications to keep images small. Multi-stage builds are a game-changer — they allow you to separate build dependencies from runtime dependencies, dramatically reducing the final image size.",
      "For local development, docker-compose is indispensable. I define services for the app, database, Redis, and any other dependencies in a single file. One command spins up the entire stack, making onboarding new team members trivial.",
      "In production, I use Docker orchestration platforms like Render or Kubernetes. The same container that runs locally runs in production, eliminating environment-specific bugs. Health checks and restart policies ensure that services recover automatically from failures.",
      "The learning curve is worth it. Once you understand Docker basics, you'll wonder how you ever developed without it.",
    ],
  },
  {
    title: "TypeScript Best Practices I Wish I Knew Earlier",
    date: "December 2024",
    category: "react",
    readTime: "7 min read",
    description:
      "Advanced TypeScript patterns and techniques that will level up your code — from utility types to generic components and strict type safety.",
    image: "https://i.postimg.cc/Gm6cMKwh/Type-Script.jpg",
    content: [
      "TypeScript is more than just typed JavaScript — it's a tool for building robust, maintainable codebases. After years of using it in production, I've developed patterns that catch bugs at compile time and make refactoring fearless.",
      "Utility types like `Pick`, `Omit`, `Partial`, and `Record` are incredibly powerful. They let you transform types without rewriting them. I use them extensively for API request/response types and form data structures.",
      "Generic components are where TypeScript really shines. Instead of passing props as `any`, I define generic type parameters that ensure type safety throughout the component tree. This catches errors that would otherwise only appear at runtime.",
      "I always enable `strict` mode in `tsconfig.json`. It's painful at first, but it forces you to think about types properly. The payoff is fewer null reference errors, better IDE autocomplete, and more self-documenting code.",
      "Discriminated unions are a pattern I use frequently for handling different data shapes. By adding a common discriminant property to each type, TypeScript can narrow types automatically in conditional blocks.",
    ],
  },
  {
    title: "Web3 Development: Building Your First DApp",
    date: "November 2024",
    category: "nextjs",
    readTime: "12 min read",
    description:
      "A complete introduction to decentralized application development — from smart contracts to frontend integration using ethers.js and Next.js.",
    image: "https://i.postimg.cc/pdndx7Yk/web3.jpg",
    content: [
      "Web3 development represents a paradigm shift in how we think about applications. Instead of centralized servers, we have decentralized networks. Instead of trusting a company, we trust code. It's complex, but the possibilities are fascinating.",
      "Every Web3 journey starts with smart contracts. I write mine in Solidity for Ethereum-compatible chains. The key principles are immutability — once deployed, code can't be changed — and transparency — anyone can verify the logic.",
      "Connecting a frontend to a smart contract requires a library like ethers.js or viem. These libraries abstract away the complexity of blockchain interactions, letting you read contract state, send transactions, and listen to events just like you would with any API.",
      "Wallet integration is critical. MetaMask is the standard, but I always build for multiple wallets including WalletConnect and Coinbase Wallet. The experience should be seamless — connect, sign, transact.",
      "Security is paramount in Web3. Smart contract bugs can result in irreversible financial loss. I always audit my contracts, use established patterns like OpenZeppelin, and test extensively on testnets before any mainnet deployment.",
    ],
  },
  {
    title: "Git Workflow Strategies for Teams",
    date: "October 2024",
    category: "portfolio",
    readTime: "6 min read",
    description:
      "Comparing Git workflows — from Git Flow to trunk-based development — and finding the right strategy for your team's size and velocity.",
    image: "https://i.postimg.cc/SR4Rgr9s/gitgub.jpg",
    content: [
      "Git is the backbone of modern software development, but how teams use it varies wildly. The right workflow depends on team size, release cadence, and risk tolerance. I've used several approaches and learned when each makes sense.",
      "Git Flow is the classic approach with long-lived feature branches, develop branches, and release branches. It's great for teams that ship on a schedule and need strict version control. The downside is merge conflicts and delayed integration.",
      "GitHub Flow is simpler — a single main branch with short-lived feature branches. Every feature is a pull request, and CI runs on every PR. This encourages small, frequent changes and continuous integration. It's my default for most projects.",
      "Trunk-based development takes this further — developers commit directly to main with feature flags toggling new functionality. It requires strong discipline and comprehensive automated testing, but it maximizes velocity.",
      "Regardless of workflow, the principles are the same: small commits, clear messages, code reviews, and automated testing. These practices catch bugs early and keep the codebase healthy.",
    ],
  },
  {
    title: "PostgreSQL vs MongoDB: Choosing the Right Database",
    date: "September 2024",
    category: "database",
    readTime: "8 min read",
    description:
      "A practical comparison of relational and document databases — when to use PostgreSQL, when to use MongoDB, and how to make the right architectural decision.",
    image: "https://i.postimg.cc/XYs5XT53/database.jpg",
    content: [
      "Choosing between PostgreSQL and MongoDB is one of the first architectural decisions you'll make for a new project. Both are excellent databases, but they excel in different scenarios. Understanding their strengths is key to building scalable applications.",
      "PostgreSQL is a relational database with ACID compliance, complex queries, and mature tooling. It's the right choice when data relationships are complex, when you need strong consistency guarantees, or when you're building traditional applications with well-defined schemas.",
      "MongoDB is a document database that excels at flexibility and horizontal scaling. It's ideal when your data structure evolves frequently, when you need to store nested documents naturally, or when you're building applications that benefit from eventual consistency.",
      "I've used both extensively. For e-commerce platforms with complex product catalogs and transactional integrity, PostgreSQL wins. For content management systems, user activity logs, or real-time analytics where schema flexibility matters, MongoDB is the better fit.",
      "The good news is that you don't have to choose exclusively. Many successful applications use both — PostgreSQL for transactional data and MongoDB for flexible document storage. Polyglot persistence is a valid and often necessary strategy.",
    ],
  },
]

const categoryLabels: Record<string, string> = {
  portfolio: "Portfolio",
  nextjs: "Next.js",
  backend: "Backend",
  react: "React",
  database: "Database",
}

const categoryColors: Record<string, string> = {
  portfolio: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  nextjs: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  backend: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  react: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  database: "bg-green-500/10 text-green-400 border-green-500/20",
}

export default function BlogPage() {
  const [filter, setFilter] = useState<string>("all")
  const [expanded, setExpanded] = useState<string | null>(null)

  const filteredPosts =
    filter === "all" ? blogPosts : blogPosts.filter((p) => p.category === filter)

  return (
    <>
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Blog</h2>
        <div className="h-[3px] w-20 bg-primary rounded-full"></div>
        <p className="mt-4 text-muted-foreground">
          Thoughts, tutorials, and deep dives from my journey as a full-stack developer.
        </p>
      </header>

      {/* Filter Dropdown */}
      {/* <div className="flex justify-end mb-8">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              Filter: {filter === "all" ? "All" : categoryLabels[filter]}
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-card border border-border text-foreground">
            <DropdownMenuLabel>Filter Posts</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setFilter("all")}>All</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("portfolio")}>Portfolio</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("nextjs")}>Next.js</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("backend")}>Backend</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("react")}>React</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("database")}>Database</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div> */}

      {/* Blog Posts */}
      <section className="space-y-10">
        {filteredPosts.map((post) => {
          const isOpen = expanded === post.title

          return (
            <article
              key={post.title}
              className="bg-card border border-border rounded-2xl shadow-md overflow-hidden transition-colors duration-300"
            >
              {/* Cover Image */}
              <div className="relative w-full h-52 sm:h-64">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                {/* Meta */}
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full border ${categoryColors[post.category]}`}
                  >
                    {categoryLabels[post.category]}
                  </span>
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                  <span className="text-xs text-muted-foreground">· {post.readTime}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 leading-snug">
                  {post.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed mb-4">{post.description}</p>

                {/* Expanded Content */}
                {isOpen && (
                  <div className="space-y-4 mb-6 border-l-3 border-primary pl-4">
                    {post.content.map((para, i) => (
                      <p key={i} className="text-muted-foreground leading-relaxed">
                        {para}
                      </p>
                    ))}
                  </div>
                )}

                {/* Toggle Button */}
                <button
                  onClick={() => setExpanded(isOpen ? null : post.title)}
                  className="text-primary cursor-pointer font-semibold text-sm hover:underline underline-offset-4 transition"
                >
                  {isOpen ? "← Show Less" : "Read More →"}
                </button>
              </div>
            </article>
          )
        })}
      </section>
    </>
  )
}