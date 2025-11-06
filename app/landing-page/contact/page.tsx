"use client";

import React, { useState } from "react";
import Sidebar from "@/components/landing-page/Sidebar";
import Nav from "@/components/landing-page/Nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Send } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const payload = {
      fullname: formData.get("fullname") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    try {
      const res = await fetch("/api/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      // Show success message
      toast.success(data.message || "Message sent successfully!");
      
      // Safely reset the form if it exists
      if (form) {
        form.reset();
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="min-h-screen bg-background text-foreground 
      p-4 md:py-10 md:px-40 flex flex-col md:flex-row gap-6 
      transition-colors duration-300"
    >
      {/* Sidebar */}
      <aside>
        <Sidebar />
      </aside>

      {/* Right Content */}
      <section
        className="flex-1 bg-card border border-border rounded-3xl 
        p-4 md:p-10 shadow-lg overflow-y-auto transition-colors mb-24 sm:mb-0"
      >
        {/* Navigation */}
        <Nav />

        {/* Header */}
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Contact</h2>
          <div className="h-[3px] w-20 bg-foreground/80 rounded-full"></div>
        </header>

        {/* Google Map Section */}
        <section className="mb-10">
          <div className="overflow-hidden rounded-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7112387875945!2d7.490286975039422!3d6.431128593559989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1044a164ddaabdd7%3A0x15205a092b91068c!2sCatholic%20Institute%20for%20Development%20Justice%20And%20Peace!5e0!3m2!1sen!2sng!4v1733318840338!5m2!1sen!2sng"
              width="100%"
              height="400"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-2xl border border-border"
            ></iframe>
          </div>
        </section>

        {/* Contact Form */}
        <section>
          <Card
            className="
              bg-transparent border-none rounded-none shadow-none p-0
              sm:bg-muted sm:border sm:rounded-2xl sm:shadow-md sm:px-6 sm:py-6
            "
          >
            <CardHeader className="p-0">
              <CardTitle className="text-2xl font-semibold text-foreground">
                Send a Message
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    type="text"
                    name="fullname"
                    placeholder="Full name"
                    required
                    className="
                      py-6 bg-muted dark:bg-card border border-border text-foreground placeholder:text-muted-foreground
                      transition-colors duration-300 w-full
                    "
                  />
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    required
                    className="
                      py-6 bg-muted dark:bg-card border border-border text-foreground placeholder:text-muted-foreground
                      transition-colors duration-300 w-full
                    "
                  />
                </div>

                <Textarea
                  name="message"
                  placeholder="Your message"
                  required
                  className="min-h-[150px] dark:bg-card border-border text-foreground w-full"
                />

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="
                      w-full sm:w-auto bg-foreground text-background 
                      hover:bg-foreground/90 font-semibold text-[15px]
                      rounded-lg py-6 px-8 flex items-center justify-center gap-2
                      transition-all cursor-pointer
                    "
                  >
                    {loading ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </section>
      </section>
    </main>
  );
}



