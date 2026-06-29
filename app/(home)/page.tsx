"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useState } from "react";

export default function HomePage() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  const testimonials = [
    {
      name: "Daniel Lewis",
      avatar: "https://i.postimg.cc/zGDHfn3G/avatar-1.png",
      date: "14 June, 2023",
      text:
        "Kingsley was hired to create a corporate identity. It's modern, clean and with a beautiful design that got a lot of praises from colleagues and visitors. We were very pleased with the work done. He has a lot of experience and is very concerned about client needs.",
    },
    {
      name: "Jessica Miller",
      avatar: "https://i.postimg.cc/DwY0yHtx/avatar-2.png",
      date: "22 July, 2023",
      text:
        "Working with Kingsley has been an absolute pleasure. I was impressed with his attention to detail and professional approach to development.",
    },
    {
      name: "Michael Scott",
      avatar: "https://i.postimg.cc/fRFWhX9F/avatar-3.png",
      date: "2 September, 2023",
      text:
        "Kingsley is an exceptional developer who consistently delivers above expectations. His problem-solving skills made our project successful.",
    },
    {
      name: "Sophia Turner",
      avatar: "https://i.postimg.cc/zXv1Xv81/avatar-4.png",
      date: "10 October, 2023",
      text:
        "Kingsley's professionalism and technical expertise transformed our ideas into a scalable and beautiful product.",
    },
  ];

  return (
    <>
      <article>
        <header className="mb-3">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            About Me
          </h2>
          <div className="h-[3px] w-20 bg-primary rounded-full"></div>
        </header>

        {/* About Content */}
        <section className="space-y-4 text-muted-foreground leading-relaxed">

          <p>
            I'm <span className="font-medium text-foreground">
              Kingsley Ezeaka Chidera
            </span>, a passionate Full-Stack Software Engineer focused on
            building scalable, responsive, and production-ready web
            applications. I enjoy transforming ideas and complex problems into
            fast, intuitive, and user-friendly digital experiences.
          </p>

          <p>
            Over the years, I've worked across the entire development
            lifecycle — from frontend interfaces to backend systems, database
            design, authentication workflows, API integrations, and deployment
            pipelines. I primarily work with React, Next.js, TypeScript,
            Node.js, Express, MySQL, MongoDB, Python and modern deployment platforms etc.
          </p>

          <p>
            I love building reusable architectures, optimizing application
            performance, integrating modern technologies, and creating products
            that solve real-world problems. Whether it's Web3 platforms,
            business solutions, marketplaces, or custom applications, my goal
            is always delivering reliable and scalable software.
          </p>

         {/* Resume button positioned naturally */}
<div className="pt-4">
  <a
    href="/ShillmongerCV.pdf"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex px-8 py-2.5 rounded-lg text-lg font-semibold cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] transition-all duration-200 shadow-md hover:shadow-lg"
  >
    View My Resume
  </a>
</div>

        </section>

        {/* What I'm Doing */}
        <section className="mt-10">
          <h3 className="text-2xl font-semibold mb-4 text-foreground">
            What I'm Doing
          </h3>

          <ul className="grid sm:grid-cols-2 gap-3 sm:gap-5">
            {[
              {
                title: "Frontend Development",
                text: "Building modern responsive interfaces using React, Next.js, TypeScript, Tailwind CSS and reusable component architectures.",
              },
              {
                title: "Backend Development",
                text: "Designing scalable server-side systems, REST APIs, authentication workflows and application logic using Node.js and Express.",
              },
              {
                title: "Full-Stack Applications",
                text: "Developing complete end-to-end solutions from database design to deployment using MySQL, MongoDB and production-ready workflows.",
              },
              {
                title: "Deployment & Optimization",
                text: "Deploying, debugging and optimizing applications using Docker, Vercel, Render and performance-focused development practices.",
              },
            ].map((item) => (
              <li
                key={item.title}
                className="bg-card border border-border p-4 sm:py-4 sm:px-5 rounded-2xl shadow-md hover:scale-[1.03] transition-transform cursor-pointer"
              >
                <div className="flex flex-col gap-4">
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-1">
                      {item.title}
                    </h4>

                    <p className="text-base text-muted-foreground">
                      {item.text}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Troubleshooting & Problem Solving */}
        <section className="mt-10">
          <h3 className="text-2xl font-semibold mb-4 text-foreground">
            Problem Solving
          </h3>

          <section className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Throughout my development journey, I've encountered and resolved countless errors — from CORS issues and database connection failures to deployment pipeline breaks and memory leaks. Each challenge has been an opportunity to deepen my understanding of how systems work.
            </p>

            <p>
              When debugging, I follow a systematic approach: isolate the problem, reproduce the error consistently, analyze logs and stack traces, and implement targeted fixes. I've learned that the most frustrating bugs often stem from the simplest oversights — missing environment variables, incorrect API endpoints, or race conditions in async operations.
            </p>

            <p>
              Deployment challenges have taught me the importance of thorough testing, proper environment configuration, and monitoring. Whether it's fixing build failures on Vercel, resolving Docker container issues, or optimizing database queries for production, I approach each problem with patience and a commitment to finding the root cause rather than applying temporary patches.
            </p>

            <p>
              Performance optimization is another area where I've gained significant experience. I've tackled slow page loads, unoptimized images, inefficient database queries, and bundle size issues. Using tools like Lighthouse, Chrome DevTools, and Web Vitals, I systematically identify bottlenecks and implement solutions such as code splitting, lazy loading, caching strategies, and CDN integration to ensure applications run smoothly at scale.
            </p>

            <p>
              Security vulnerabilities are errors I take very seriously. From XSS and CSRF attacks to SQL injection and authentication bypasses, I've learned to implement security best practices from the start of development. Regular security audits, dependency updates, and following OWASP guidelines help me build applications that are not only functional but also secure for users and their data.
            </p>
          </section>
        </section>

        {/* Testimonials */}
        <section className="mt-10">
          <h3 className="text-2xl font-semibold mb-4 text-foreground">
            Testimonials
          </h3>

          <div
            id="testimonial-scroll"
            className="flex gap-6 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory scroll-smooth"
            onScroll={(e) => {
              const el = e.currentTarget;

              const progress =
                (el.scrollLeft /
                  (el.scrollWidth - el.clientWidth)) *
                100;

              const bar =
                document.getElementById(
                  "scroll-progress-bar"
                );

              if (bar)
                bar.style.width = `${progress}%`;
            }}
          >
            {testimonials.map((t) => (
              <div
                key={t.name}
                onClick={() => {
                  setSelected(t);
                  setOpen(true);
                }}
                className="relative cursor-pointer bg-card border border-border p-5 rounded-2xl shadow-md transition-all w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(50%-0.75rem)] snap-center flex-shrink-0 overflow-visible"
              >
                <div className="absolute top-2 right-4 w-13 h-13 rounded-xl overflow-hidden border border-border bg-muted">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-1 pr-14">
                    {t.name}
                  </h4>

                  <span className="text-xs text-muted-foreground block mb-3 italic">
                    {t.date}
                  </span>

                  <p className="text-base text-muted-foreground leading-relaxed line-clamp-4">
                    {t.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-2 h-[3px] w-full bg-border rounded-full overflow-hidden flex justify-center">
            <div
              id="scroll-progress-bar"
              className="h-full bg-neutral-900 dark:bg-white rounded-full transition-all duration-300 ease-linear w-[0%]"
            />
          </div>
        </section>
      </article>

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-card border border-border text-foreground rounded-xl md:rounded-3xl transition-colors shadow-xl w-[90%] max-w-lg mx-auto p-6 sm:w-auto sm:mx-0 cursor-pointer">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-foreground flex items-center gap-3">
                  <Image
                    src={selected.avatar}
                    alt={selected.name}
                    width={70}
                    height={70}
                    className="rounded-lg bg-muted border border-border"
                  />
                  {selected.name}
                </DialogTitle>

                <DialogDescription className="text-sm text-muted-foreground">
                  {selected.date}
                </DialogDescription>
              </DialogHeader>

              <p className="text-muted-foreground leading-relaxed mt-4">
                {selected.text}
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}