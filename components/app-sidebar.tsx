"use client"

import * as React from "react"
import {
  BarChart3,
  Folder,
  Users,
  MessageSquare,
  Bell,
  Trophy,
  Flame,
  Award,
  CreditCard,
  Command,
  PlusCircle,
  Settings,
  Trash2,
  AlertTriangle,
  ClipboardList,
  Mail,
  UserCircle,
  FileText,
  Lock,
  Frame,
  GalleryVerticalEnd,
  Home,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

// Helper to generate initials
const getInitials = (name: string) =>
  name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .substring(0, 2)

// -------------------- NAVIGATION STRUCTURES --------------------
const userNav = [
  {
    title: "User Dashboard",
    url: "#",
    icon: SquareTerminal,
    isActive: true,
    items: [
      { title: "Home", url: "/dashboard/home", icon: Home },
      { title: "All Groups", url: "/dashboard/groups", icon: Folder },
      { title: "My Groups", url: "/dashboard/my-groups", icon: Users },
      { title: "Messages", url: "/dashboard/messages", icon: MessageSquare },
      { title: "Notifications", url: "/dashboard/notifications", icon: Bell },
    ],
  },
  {
    title: "Leaderboard",
    url: "#",
    icon: Trophy,
    items: [
      { title: "Top Engagers", url: "/leaderboard/top", icon: Trophy },
      { title: "Streaks & Points", url: "/leaderboard/streaks", icon: Flame },
      { title: "Badges", url: "/leaderboard/badges", icon: Award },
      { title: "Payouts", url: "/leaderboard/payouts", icon: CreditCard },
    ],
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings2,
    items: [
      { title: "Profile Settings", url: "/settings/profile", icon: UserCircle },
      { title: "Password & Security", url: "/settings/password", icon: Lock },
      { title: "Personal Info", url: "/settings/info", icon: FileText },
      { title: "Delete Account", url: "/settings/delete", icon: Trash2 },
    ],
  },
]

const adminNav = [
  {
    title: "Admin Dashboard",
    url: "#",
    icon: Command,
    isActive: true, // <-- Automatically open when switched
    items: [
      { title: "Overview", url: "/admin/overview", icon: BarChart3 },
      {
        title: "Groups Management",
        url: "/admin/groups",
        icon: Folder,
        items: [
          { title: "Create Group", url: "/admin/groups/create", icon: PlusCircle },
          { title: "Edit Group", url: "/admin/groups/edit", icon: Settings },
          { title: "Delete Group", url: "/admin/groups/delete", icon: Trash2 },
        ],
      },
      {
        title: "Defaulter Management",
        url: "/admin/defaulters",
        icon: AlertTriangle,
        items: [
          { title: "View Defaulters", url: "/admin/defaulters/view", icon: ClipboardList },
          { title: "Send Warnings", url: "/admin/defaulters/warnings", icon: Mail },
        ],
      },
      {
        title: "User Management",
        url: "/admin/users",
        icon: Users,
        items: [
          { title: "All Users", url: "/admin/users/all", icon: Users },
          { title: "User Profiles", url: "/admin/users/profiles", icon: UserCircle },
        ],
      },
      { title: "Reports & Analytics", url: "/admin/reports", icon: BarChart3 },
    ],
  },
]

const allNav = [...userNav, ...adminNav]

// -------------------- PANELS --------------------
const panels = [
  { name: "User Panel", logo: GalleryVerticalEnd, plan: "User Panel" },
  { name: "Admin Panel", logo: GalleryVerticalEnd, plan: "Admin Panel" },
  { name: "All Panel", logo: GalleryVerticalEnd, plan: "All Panel" },
]

const panelNav: Record<string, typeof userNav> = {
  "User Panel": userNav,
  "Admin Panel": adminNav,
  "All Panel": allNav,
}

// -------------------- SIDEBAR COMPONENT --------------------
interface UserData {
  name: string
  email: string
  avatar: string
}

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession()
  const [userData, setUserData] = useState<UserData>({
    name: session?.user?.name || "User",
    email: session?.user?.email || "user@example.com",
    avatar: "",
  })

  const [navItems, setNavItems] = useState(userNav)
  const [activePanel, setActivePanel] = useState("User Panel")

  // Handle panel switching
  const handleTeamSwitch = (team: { plan: string }) => {
    setActivePanel(team.plan)
    const nav = panelNav[team.plan] || userNav

    // Make first collapsible active to auto-open
    if (nav.length > 0) {
      nav[0].isActive = true
    }

    setNavItems(nav)
  }

  useEffect(() => {
    if (session?.user) {
      const initials = getInitials(session.user.name || "User")
      setUserData({
        name: session.user.name || "User",
        email: session.user.email || "user@example.com",
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          initials
        )}&background=random&color=fff&size=128`,
      })
    }
  }, [session])

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher
          teams={panels.map((panel) => ({
            ...panel,
            active: panel.plan === activePanel,
          }))}
          onTeamChange={handleTeamSwitch}
        />
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navItems} />
        <NavProjects
          projects={[
            { name: "Morning Engagement", url: "#", icon: Frame },
            { name: "Afternoon Engagement", url: "#", icon: Frame },
            { name: "Night Engagement", url: "#", icon: Frame },
          ]}
        />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
