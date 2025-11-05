"use client"

import dynamic from "next/dynamic"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { User, FileText, Folder, Mail } from "lucide-react"
import { FaMicrophoneAlt } from "react-icons/fa"

const ThemeToggle = dynamic(() => import("../ThemeToggle"), { ssr: false })

export default function Nav() {
  const pathname = usePathname()

  const navItems = [
    { name: "Resume", icon: FileText, href: "/landing-page/resume" },
    { name: "Portfolio", icon: Folder, href: "/landing-page/portfolio" },
    { name: "About", icon: User, href: "/" },
    { name: "Contact", icon: Mail, href: "/landing-page/contact" },
    { name: "Yappers", icon: FaMicrophoneAlt, href: "/landing-page/yappers" }, 
  ]

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:flex justify-end">
        <div className="bg-muted border border-border rounded-2xl px-6 py-4 shadow-md inline-flex transition-colors duration-300">
          <ul className="flex flex-wrap gap-6 text-foreground transition-colors duration-300">
            {navItems.map(({ name, href }) => {
              const isActive = href === "/" ? pathname === href : pathname.startsWith(href)
              const linkClasses = [
                'transition-colors',
                'duration-300',
                'cursor-pointer',
                isActive ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-foreground'
              ].join(' ')

              return (
                <li key={name}>
                  <Link href={href} className={linkClasses}>
                    {name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>


      {/* Mobile Navbar */}
      <nav className="md:hidden fixed bottom-0 left-1/2 -translate-x-1/2 w-full bg-card/90 backdrop-blur-md border-t border-x border-border rounded-t-3xl px-4 py-2 flex justify-between items-center text-foreground shadow-lg z-50 transition-all duration-300">
        {navItems.map(({ name, icon: Icon, href }) => {
          const isActive = href === "/" ? pathname === href : pathname.startsWith(href)
          const linkClasses = [
            'flex flex-col items-center text-xs gap-1 transition-all',
            isActive ? 'text-primary' : 'text-muted-foreground hover:text-yellow-400'
          ].join(' ')
          const iconClasses = [
            'p-3 rounded-xl transition-colors',
            isActive ? 'bg-primary/15' : 'bg-muted'
          ].join(' ')

          return (
            <Link key={name} href={href} className={linkClasses}>
              <div className={iconClasses}>
                <Icon size={23} />
              </div>
              <span>{name}</span>
            </Link>
          )
        })}
      </nav>

      {/* Theme toggle button */}
      <ThemeToggle />
    </>
  )
}
