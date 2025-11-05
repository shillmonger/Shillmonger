import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

export const metadata = {
  title: "Shillmonger",
  description: "I will make you hustle easier",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "https://i.postimg.cc/rytG8pg3/shillmonger.png",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="shillmonger-theme"
        >
          <div className="min-h-screen transition-colors duration-300">
            {children}
            <Toaster
              position="top-center"
              toastOptions={{
                classNames: {
                  toast:
                    "group !text-white !shadow-lg !rounded-lg !font-medium !p-4",
                  description: "!text-white",
                  actionButton: "!bg-white/20 hover:!bg-white/30 !text-white",
                  cancelButton: "!bg-white/20 hover:!bg-white/30 !text-white",
                  // Solid success (green) toast
                  success: "!bg-green-500",
                  // Solid error (red) toast
                  error: "!bg-red-500",
                },
              }}
              richColors={false}
              closeButton
            />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
