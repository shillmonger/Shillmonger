// app/(home)/layout.tsx

import Sidebar from "@/components/landing-page/Sidebar";
import Nav from "@/components/landing-page/Nav";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="
      min-h-screen bg-background text-foreground
      p-3 md:py-10 md:px-30
      flex flex-col md:flex-row gap-6
      transition-colors duration-300
    ">

      {/* Sidebar — sticky only on desktop */}
      <aside className="
        shrink-0
        md:sticky md:top-10
        md:self-start
      ">
        <Sidebar />
      </aside>

      {/* Right Content — grows naturally */}
      <section className="
        flex-1
        bg-card border border-border rounded-3xl
        p-4 md:p-10
        shadow-lg
        transition-colors
        mb-25 sm:mb-0
      ">
        <Nav />
        <div className="pb-10">
          {children}
        </div>
      </section>

    </main>
  );
}