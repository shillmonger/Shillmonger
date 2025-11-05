"use client";

import Sidebar from "@/components/landing-page/Sidebar";
import Nav from "@/components/landing-page/Nav";
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
      text: "Kingsley was hired to create a corporate identity. It's modern, clean and with a beautiful design that got a lot of praises from colleagues and visitors. We were very pleased with the work done. He has a lot of experience and is very concerned about the needs of client.",
    },
    {
      name: "Jessica Miller",
      avatar: "https://i.postimg.cc/DwY0yHtx/avatar-2.png",
      date: "22 July, 2023",
      text: "Working with Kingsley has been an absolute pleasure. I was impressed with his attention to detail and professional approach to web design and development.",
    },
    {
      name: "Michael Scott",
      avatar: "https://i.postimg.cc/fRFWhX9F/avatar-3.png",
      date: "2 September, 2023",
      text: "Kingsley is an exceptional developer who always delivers above expectations. His creativity and problem-solving skills made our project a great success.",
    },
    {
      name: "Sophia Turner",
      avatar: "https://i.postimg.cc/zXv1Xv81/avatar-4.png",
      date: "10 October, 2023",
      text: "Kingsley’s professionalism and skillset are outstanding. He transformed our vague ideas into a stunning and functional design. Highly recommend!",
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground p-3 md:py-10 md:px-40 flex flex-col md:flex-row gap-6 transition-colors duration-300">
      {/* Sidebar */}
      <aside>
        <Sidebar />
      </aside>

      {/* Right content */}
      <section className="flex-1 bg-card border border-border rounded-3xl p-4 md:p-10 shadow-lg overflow-y-auto transition-colors mb-25 sm:mb-0">
        {/* Navigation */}
        <Nav />

        {/* About Section */}
        <article>
          <header className="mb-6">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              About Me
            </h2>
            <div className="h-[3px] w-20 bg-yellow-300 rounded-full"></div>
          </header>

          <section className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              I'm a Web Developer from Nigeria, working in web development. I
              enjoy turning complex problems into simple, beautiful, and
              intuitive designs.
            </p>
            <p>
              My job is to build your website so that it is functional and
              user-friendly but at the same time attractive. Moreover, I add a
              personal touch to your product and make sure that it is
              eye-catching and easy to use. My aim is to bring across your
              message and identity in the most creative way. I created web
              designs for many famous brand companies.
            </p>
          </section>

          {/* What I'm Doing */}
          <section className="mt-12">
            <h3 className="text-2xl font-semibold mb-6 text-foreground">
              What I'm Doing
            </h3>
            <ul className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  title: "Web Design",
                  text: "The most modern and high-quality design made at a professional level.",
                },
                {
                  title: "Web Development",
                  text: "High-quality development of sites at the professional level.",
                },
                {
                  title: "Mobile Apps",
                  text: "Professional development of applications for iOS and Android.",
                },
                {
                  title: "Forex Trading",
                  text: "Expert insights and strategies from market analysis to risk management.",
                },
              ].map((item) => (
                <li
                  key={item.title}
                  className="bg-card border border-border p-4 sm:p-6 rounded-2xl shadow-md hover:scale-[1.03] transition-transform cursor-pointer"
                >
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <Image
                      src="https://i.postimg.cc/mZ00RwX7/icon-quote.png"
                      alt="icon"
                      width={40}
                      height={40}
                      className="flex-shrink-0"
                    />
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

          {/* Testimonials */}
          <section className="mt-16">
            <h3 className="text-2xl font-semibold mb-6 text-foreground">
              Testimonials
            </h3>

            <div
              id="testimonial-scroll"
              className="flex gap-6 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory scroll-smooth"
              onScroll={(e) => {
                const el = e.currentTarget;
                const progress =
                  (el.scrollLeft / (el.scrollWidth - el.clientWidth)) * 100;
                const bar = document.getElementById("scroll-progress-bar");
                if (bar) bar.style.width = `${progress}%`;
              }}
            >
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  onClick={() => {
                    setSelected(t);
                    setOpen(true);
                  }}
                  className="relative cursor-pointer bg-card border border-border p-4 rounded-2xl shadow-md transition-all w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(50%-0.75rem)] snap-center flex-shrink-0 overflow-visible"
                >
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2 pr-16">
                      {t.name}
                    </h4>
                    <p className="text-base text-muted-foreground leading-relaxed line-clamp-4">
                      {t.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Progress Bar */}
<div className="mt-2 h-[3px] w-full bg-border rounded-full overflow-hidden flex justify-center">
  <div
    id="scroll-progress-bar"
    className="h-full bg-neutral-900 dark:bg-white rounded-full transition-all duration-300 ease-linear w-[0%]"
  ></div>
</div>

          </section>
        </article>
      </section>

      {/* Modal (Dialog) */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-card border border-border text-foreground rounded-3xl transition-colors shadow-xl w-[90%] max-w-lg mx-auto p-6 sm:w-auto sm:mx-0 cursor-pointer">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-foreground flex items-center gap-3">
                  <Image
                    src={selected.avatar}
                    alt={selected.name}
                    width={80}
                    height={80}
                    className="rounded-2xl bg-muted border border-border"
                  />
                  {selected.name}
                </DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground">
                  {selected.date}
                </DialogDescription>
              </DialogHeader>
              <p className="text-muted-foreground leading-relaxed">
                {selected.text}
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}
