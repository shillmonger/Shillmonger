"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { FaMicrophoneAlt } from "react-icons/fa"
import { Home, Sun, Moon, ChevronDown } from "lucide-react"
import { useTheme } from "next-themes"

export default function YappingLanding() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <main
      className="min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 
      bg-background text-foreground transition-colors duration-300 relative"
    >
      {/* Breadcrumb (top-left) */}
      <nav className="absolute top-6 left-6 text-sm text-muted-foreground">
        <Link
          href="/"
          className="flex items-center gap-2 hover:text-primary transition-colors"
        >
          <Home size={16} />
          <span>Home</span>
        </Link>
      </nav>

      {/* Theme Dropdown (top-right) */}
      <div className="absolute top-6 right-6">
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl 
            text-sm text-foreground hover:bg-muted transition-all"
          >
            {theme === "dark" ? (
              <>
                <Moon size={16} /> <span>Dark</span>
              </>
            ) : (
              <>
                <Sun size={16} /> <span>Light</span>
              </>
            )}
            <ChevronDown
              size={14}
              className={`transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>

          {open && (
            <div
              className="absolute right-0 mt-2 w-32 bg-card border border-border rounded-xl 
              shadow-md overflow-hidden z-50 animate-in fade-in-50"
            >
              <button
                onClick={() => {
                  setTheme("light")
                  setOpen(false)
                }}
                className={`w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition-colors ${
                  theme === "light" ? "text-primary font-medium" : "text-foreground"
                }`}
              >
                <Sun size={14} /> Light
              </button>
              <button
                onClick={() => {
                  setTheme("dark")
                  setOpen(false)
                }}
                className={`w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition-colors ${
                  theme === "dark" ? "text-primary font-medium" : "text-foreground"
                }`}
              >
                <Moon size={14} /> Dark
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Icon */}
      <div className="text-6xl mb-6 text-primary">
        <FaMicrophoneAlt />
      </div>

      {/* Title */}
      <h1 className="text-4xl sm:text-5xl font-bold mb-4">Welcome X Yappers</h1>

      {/* Subtitle */}
      <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-xl">
        We help Yappers gain real engagement and build stronger connections with
        their audience. Whether you’re sharing your thoughts, telling your story,
        or sparking meaningful discussions, Yapping gives your voice the space
        and reach it deserves.
      </p>

      {/* Buttons */}
      <div className="flex sm:flex-row gap-5">
        <Link href="/auth-page/login">
          <button
            className="px-8 py-4 bg-primary border-2 border-primary text-primary-foreground font-bold rounded-lg shadow-lg 
            hover:bg-primary/90 transition cursor-pointer"
          >
            Login
          </button>
        </Link>
        <Link href="/auth-page/signup">
          <button
            className="px-8 py-4 border-2 border-primary text-primary font-bold rounded-lg shadow-lg 
            hover:bg-primary hover:text-primary-foreground transition cursor-pointer"
          >
            Sign Up
          </button>
        </Link>
      </div>
    </main>
  )
}
