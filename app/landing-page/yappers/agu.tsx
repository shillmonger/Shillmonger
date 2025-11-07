// "use client";

// import { useEffect, useRef, useState } from "react";
// import Link from "next/link";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Lenis from "lenis";
// import { FaMicrophoneAlt } from "react-icons/fa";
// import { Home } from "lucide-react";

// export default function ParallaxPage() {
//   const layersRef = useRef<HTMLDivElement>(null);
//   const bottomRef = useRef<HTMLDivElement>(null);
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     gsap.registerPlugin(ScrollTrigger);

//     const lenis = new Lenis();
//     lenis.on("scroll", ScrollTrigger.update);
//     gsap.ticker.add((time) => lenis.raf(time * 1000));
//     gsap.ticker.lagSmoothing(0);

//     if (layersRef.current) {
//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: layersRef.current,
//           start: "top top",
//           end: "bottom top",
//           scrub: true,
//         },
//       });

//       const layers = [
//         { layer: "1", yPercent: 70 },
//         { layer: "2", yPercent: 55 },
//         { layer: "3", yPercent: 40 },
//         { layer: "4", yPercent: 10 },
//       ];

//       layers.forEach(({ layer, yPercent }, i) => {
//         tl.to(
//           layersRef.current!.querySelectorAll(`[data-parallax-layer="${layer}"]`),
//           { yPercent, ease: "none" },
//           i === 0 ? 0 : "<" // ← fixed: real "<", not "&lt;"
//         );
//       });
//     }

//     setMounted(true);

//     // Scroll to bottom once everything is mounted
//     setTimeout(() => {
//       bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, 800);

//     return () => {
//       lenis.destroy();
//       gsap.ticker.remove(lenis.raf);
//     };
//   }, []);

//   if (!mounted) return null;

//   const scrollToBottom = () => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   return (
//     <>
//       <style jsx global>{`
//         @font-face {
//           font-family: "PP Neue Corp Wide";
//           src: url("https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/6717e399d30a606fed425914_PPNeueCorp-WideUltrabold.woff2")
//             format("woff2");
//           font-weight: 800;
//           font-style: normal;
//           font-display: swap;
//         }
//         @font-face {
//           font-family: "PP Neue Montreal";
//           src: url("https://cdn.prod.website-files.com/6819ed8312518f61b84824df/6819ed8312518f61b84825ba_PPNeueMontreal-Medium.woff2")
//             format("woff2");
//           font-weight: 500;
//           font-style: normal;
//           font-display: swap;
//         }
//       `}</style>

//       <div className="bg-black text-white antialiased relative">
//         {/* Parallax container */}
//         <div className="relative overflow-hidden w-full">
//           {/* --- Header Section --- */}
//           <section className="relative z-10 flex items-center justify-center min-h-[100svh]">
//             {/* Go Back Home (top-left) */}
//             <Link href="/">
//               <button
//                 onClick={scrollToBottom}
//                 className="absolute overflow-hidden z-50 top-6 left-6 flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/30 rounded-xl hover:bg-white hover:text-black transition-all duration-300 font-semibold shadow-2xl cursor-pointer"
//               >
//                 <Home size={16} />
//                 Go Back Home
//               </button>
//             </Link>

//             <div className="absolute inset-0 h-[120%] w-full">
//               {/* Black line at bottom */}
//               <div className="absolute bottom-[-1px] left-0 z-20 h-px w-full bg-black" />

//               {/* Layers container */}
//               <div
//                 ref={layersRef}
//                 data-parallax-layers
//                 className="absolute inset-0 h-full w-full overflow-hidden"
//               >
//                 <img
//                   src="https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/6717795be09b462b2e8ebf71_osmo-parallax-layer-3.webp"
//                   loading="eager"
//                   data-parallax-layer="1"
//                   alt=""
//                   className="pointer-events-none absolute left-0 top-[-17.5%] h-[117.5%] w-full max-w-none object-cover"
//                 />
//                 <img
//                   src="https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/6717795b4d5ac529e7d3a562_osmo-parallax-layer-2.webp"
//                   loading="eager"
//                   data-parallax-layer="2"
//                   alt=""
//                   className="pointer-events-none absolute left-0 top-[-17.5%] h-[117.5%] w-full max-w-none object-cover"
//                 />
//                 <div
//                   data-parallax-layer="3"
//                   className="absolute inset-0 flex h-[100svh] w-full items-center justify-center"
//                 >
//                   <h2
//                     className="
//                       m-0 mb-[0.1em] mr-[0.075em]
//                       text-center font-extrabold leading-[1]
//                       text-[13vw] sm:text-[12vw] md:text-[11vw] lg:text-[10vw] cursor-pointer
//                     "
//                     style={{ fontFamily: "'PP Neue Corp Wide', sans-serif" }}
//                   >
//                     Shillmonger
//                   </h2>
//                 </div>
//                 <img
//                   src="https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/6717795bb5aceca85011ad83_osmo-parallax-layer-1.webp"
//                   loading="eager"
//                   data-parallax-layer="4"
//                   alt=""
//                   className="pointer-events-none absolute left-0 top-[-17.5%] h-[117.5%] w-full max-w-none object-cover"
//                 />
//               </div>

//               {/* Bottom fade */}
//               <div
//                 className="absolute bottom-0 left-0 z-30 h-[20%] w-full"
//                 style={{
//                   background:
//                     "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.738) 19%, rgba(0,0,0,0.541) 34%, rgba(0,0,0,0.382) 47%, rgba(0,0,0,0.278) 56.5%, rgba(0,0,0,0.194) 65%, rgba(0,0,0,0.126) 73%, rgba(0,0,0,0.075) 80.2%, rgba(0,0,0,0.042) 86.1%, rgba(0,0,0,0.021) 91%, rgba(0,0,0,0.008) 95.2%, rgba(0,0,0,0.002) 98.2%, transparent 100%)",
//                 }}
//               />
//             </div>
//           </section>

//           {/* --- Content Section --- */}
//           <section
//             ref={bottomRef}
//             className="relative flex flex-col items-center justify-center text-center min-h-[100svh] px-6"
//           >
//             <h1 className="text-3xl sm:text-3xl font-bold mb-4">
//               Welcome X Yappers
//             </h1>

//             <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-xl">
//               We help Yappers gain real engagement and build stronger connections
//               with their audience. Whether you’re sharing your thoughts, telling
//               your story, or sparking meaningful discussions.
//             </p>

//             <div className="flex sm:flex-row gap-5">
//               <Link href="/auth-page/login">
//                 <button className="px-10 py-4 border-2 bg-white text-black font-bold rounded-lg shadow-lg hover:bg-gray-200 transition cursor-pointer">
//                   Login
//                 </button>
//               </Link>
//               <Link href="/auth-page/signup">
//                 <button className="px-10 py-4 border-2 border-white text-white font-bold rounded-lg shadow-lg hover:bg-white hover:text-black transition cursor-pointer">
//                   Sign Up
//                 </button>
//               </Link>
//             </div>
//           </section>
//         </div>
//       </div>
//     </>
//   );
// }
