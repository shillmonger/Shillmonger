"use client"

import Image from "next/image"
import Link from "next/link"
import {
  FaTwitter,
  FaWhatsapp,
  FaInstagram,
  FaGithub,
  FaTelegram,
} from "react-icons/fa"
import { MdPhoneIphone, MdCalendarToday, MdLocationOn } from "react-icons/md"
import { SiTiktok } from "react-icons/si"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Sidebar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [showContacts, setShowContacts] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)

  const images = [
    // "/shillmonger.jpeg",
    // "/shillmonger.jpeg",
    "/shillmonger.jpeg",
  ]

  // ✅ Always call hooks before any conditional returns
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [images.length])

  // ✅ Instead of returning null early, conditionally render inside JSX
  return (
    <aside className="flex-1 bg-card border border-border rounded-3xl px-4 py-6 md:p-5 shadow-lg overflow-y-auto transition-colors duration-300">
      {mounted && (
        <>
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <div className="relative w-50 h-50 mb-4 overflow-hidden rounded-xl bg-muted">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={images[currentImage]}
                    alt="Shillmonger Avatar"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <h1 className="text-2xl font-bold tracking-wide text-center text-foreground">
              SHILLMONGER
            </h1>
            <p className="bg-muted px-4 py-1 mt-2 text-sm text-muted-foreground rounded-md">
              Full Stack Developer
            </p>
          </div>

          {/* Separator */}
          <div className="w-full border-t border-border my-6"></div>

          {/* Toggle Button (small screens) */}
          <button
            className="md:hidden w-full flex justify-between items-center bg-card px-4 py-3 rounded-xl text-foreground text-sm font-medium hover:bg-muted transition-colors duration-300"
            onClick={() => setShowContacts((prev) => !prev)}
          >
            {showContacts ? "Hide Contact Info" : "Show Contact Info"}
            {showContacts ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          {/* Contact + Social Section */}
          <div
  className={`overflow-hidden transition-all duration-500 ease-in-out ${
    showContacts ? "max-h-[2000px] mt-4" : "max-h-0 md:max-h-full"
  } md:mt-0`}
>
  {/* CONTACT CARDS */}
  <ul className="space-y-3">
    {[
      {
        icon: <MdPhoneIphone />,
        label: "PHONE",
        value: (
          <Link
            href="tel:+2348059268860"
            className="text-sm text-primary hover:text-primary/80 transition-colors"
          >
            +2348059268860
          </Link>
        ),
      },
      {
        icon: <MdCalendarToday />,
        label: "BIRTHDAY",
        value: (
          <time
            dateTime="2004-11-25"
            className="text-sm text-muted-foreground"
          >
            November 25, 2004
          </time>
        ),
      },
      {
        icon: <MdLocationOn />,
        label: "LOCATION",
        value: (
          <address className="not-italic text-sm text-muted-foreground">
            Enugu, Nigeria
          </address>
        ),
      },
    ].map((item, idx) => (
      <li
        key={idx}
        className="flex items-center cursor-pointer gap-4 rounded-2xl px-3 py-3 bg-muted/60 border border-border/50 shadow-sm hover:shadow-md hover:bg-muted transition-all duration-300"
      >
        {/* Icon bubble */}
        <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary text-lg shrink-0">
          {item.icon}
        </div>

        {/* Content */}
        <div className="flex flex-col leading-tight">
          <p className="text-[11px] tracking-widest text-muted-foreground">
            {item.label}
          </p>
          {item.value}
        </div>
      </li>
    ))}
  </ul>

  {/* DIVIDER */}
  <div className="w-full border-t border-border/60 my-6" />

  {/* SOCIAL SECTION TITLE */}
  <p className="text-center text-xs tracking-widest text-muted-foreground mb-3">
    CONNECT WITH ME
  </p>

  {/* SOCIAL LINKS */}
  <ul className="flex justify-center flex-wrap gap-4 text-xl text-foreground">
    {[
      // { href: "#", icon: <FaFacebook /> },
      {
        href: "https://x.com/shillmonger0",
        icon: <FaTwitter />,
      },
      {
        href: "https://wa.me/2348059268860?text=Hello%20there!",
        icon: <FaWhatsapp />,
      },
      { href: "https://github.com/shillmonger", icon: <FaGithub /> },
      {
        href: "https://t.me/shillmonger0",
        icon: <FaTelegram />,
      },
      {
        href: "https://www.tiktok.com/@shillmonger0?lang=en",
        icon: <SiTiktok />,
      },
    ].map((social, idx) => (
      <li key={idx}>
        <Link
          href={social.href}
          target="_blank"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-muted/50 border border-border/50 hover:bg-primary/10 hover:text-primary transition-all duration-300"
        >
          {social.icon}
        </Link>
      </li>
    ))}
  </ul>
</div>
        </>
      )}
    </aside>
  )
}
