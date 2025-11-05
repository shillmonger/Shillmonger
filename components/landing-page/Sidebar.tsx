"use client"

import Image from "next/image"
import Link from "next/link"
import { FaFacebook, FaTwitter, FaWhatsapp, FaInstagram, FaGlobe } from "react-icons/fa"
import { MdEmail, MdPhoneIphone, MdCalendarToday, MdLocationOn } from "react-icons/md"
import { SiTiktok } from "react-icons/si"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function Sidebar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [showContacts, setShowContacts] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <aside
      className="flex-1 bg-card border border-border rounded-3xl px-4 py-6 md:p-7 shadow-lg overflow-y-auto transition-colors duration-300"
    >
      {/* Avatar */}
      <div className="flex flex-col items-center">
        <div className="relative w-50 h-50 mb-4">
          <Image
            src="https://i.postimg.cc/vTcfmkDh/shillmong-png.png"
            alt="Shillmonger Avatar"
            fill
            className="object-cover rounded-3xl bg-muted transition-colors duration-300"
          />
        </div>
        <h1 className="text-2xl font-bold tracking-wide text-center text-foreground">
          SHILLMONGER
        </h1>
        <p className="bg-muted px-4 py-1 mt-2 text-sm text-muted-foreground rounded-md">
          Web Developer
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
        {/* Contact List */}
        <ul className="space-y-4 w-full">
          {[
            {
              icon: <MdEmail />,
              label: "EMAIL",
              value: (
                <Link
                  href="mailto:shillmonger0@gmail.com"
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  shillmonger0@gmail.com
                </Link>
              ),
            },
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
                <time dateTime="2003-11-25" className="text-sm text-muted-foreground">
                  November 25, 2003
                </time>
              ),
            },
            {
              icon: <MdLocationOn />,
              label: "LOCATION",
              value: (
                <address className="not-italic text-sm text-muted-foreground">
                  Enugu Nigeria
                </address>
              ),
            },
          ].map((item, idx) => (
            <li
              key={idx}
              className="flex items-center space-x-3 bg-muted rounded-2xl px-3 py-3 shadow-md hover:bg-card transition-colors duration-300"
            >
              <div className="text-primary text-lg">{item.icon}</div>
              <div>
                <p className="text-xs text-muted-foreground">{item.label}</p>
                {item.value}
              </div>
            </li>
          ))}
        </ul>

        {/* Separator */}
        <div className="w-full border-t border-border my-6"></div>

        {/* Social Links */}
        <ul className="flex justify-center gap-5 text-xl text-foreground transition-colors duration-300">
          {[
            { href: "https://www.facebook.com/profile.php?id=100074008546049", icon: <FaFacebook /> },
            { href: "https://x.com/shillmonger0?t=yMkjGvcK9ujwCdubEJKNBQ&s=09", icon: <FaTwitter /> },
            { href: "https://wa.me/2348059268860?text=Hello%20there!", icon: <FaWhatsapp /> },
            { href: "https://www.instagram.com/codelab042?igsh=YzljYTk1ODg3Zg==", icon: <FaInstagram /> },
            { href: "https://www.tiktok.com/@shillmonger0?lang=en", icon: <SiTiktok /> },
            { href: "https://www.yourwebsite.com", icon: <FaGlobe /> },
          ].map((social, idx) => (
            <li key={idx}>
              <Link
                href={social.href}
                target="_blank"
                className="hover:text-primary transition-colors duration-300"
              >
                {social.icon}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
