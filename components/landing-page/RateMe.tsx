"use client"

import { useState } from "react"
import { X, Star } from "lucide-react"

type Rating = "great" | "good" | "bad" | null

const faces = [
  {
    val: "great" as const,
    label: "Perfect port",
    bg: "bg-green-100 dark:bg-green-950",
    border: "border-green-400 dark:border-green-500",
    activeShadow: "shadow-[0_0_0_3px_#86efac]",
    svg: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="11" cy="13" r="2.2" fill="#166534" />
        <circle cx="21" cy="13" r="2.2" fill="#166534" />
        <path d="M9 20 Q16 27 23 20" stroke="#166534" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="11.5" cy="12" r="0.8" fill="white" opacity="0.7" />
        <circle cx="21.5" cy="12" r="0.8" fill="white" opacity="0.7" />
      </svg>
    ),
  },
  {
    val: "good" as const,
    label: "Good port",
    bg: "bg-yellow-100 dark:bg-yellow-950",
    border: "border-yellow-400 dark:border-yellow-500",
    activeShadow: "shadow-[0_0_0_3px_#fcd34d]",
    svg: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="11" cy="13" r="2.2" fill="#713f12" />
        <circle cx="21" cy="13" r="2.2" fill="#713f12" />
        <path d="M10.5 21 Q16 24 21.5 21" stroke="#713f12" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="11.5" cy="12" r="0.8" fill="white" opacity="0.7" />
        <circle cx="21.5" cy="12" r="0.8" fill="white" opacity="0.7" />
      </svg>
    ),
  },
  {
    val: "bad" as const,
    label: "Bad port",
    bg: "bg-red-100 dark:bg-red-950",
    border: "border-red-400 dark:border-red-500",
    activeShadow: "shadow-[0_0_0_3px_#fca5a5]",
    svg: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="11" cy="13" r="2.2" fill="#7f1d1d" />
        <circle cx="21" cy="13" r="2.2" fill="#7f1d1d" />
        <path d="M10.5 23 Q16 19 21.5 23" stroke="#7f1d1d" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="11.5" cy="12" r="0.8" fill="white" opacity="0.7" />
        <circle cx="21.5" cy="12" r="0.8" fill="white" opacity="0.7" />
      </svg>
    ),
  },
]

export default function RateMe() {
  const [chosen, setChosen] = useState<Rating>(null)
  const [feedback, setFeedback] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [visible, setVisible] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!chosen) return

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/rate-me", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating: chosen,
          feedback: feedback || "",
        }),
      })

      if (response.ok) {
        setSubmitted(true)
      } else {
        console.error("Failed to submit rating")
      }
    } catch (error) {
      console.error("Error submitting rating:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!visible) return null

  return (
    <>
      {/* Mobile backdrop — blurs the page on small screens */}
      <div
        className="fixed inset-0 z-500 bg-black/40 backdrop-blur-sm sm:hidden"
        onClick={() => setVisible(false)}
        aria-hidden="true"
      />

      {/* Popup — top-right on desktop, centered on mobile */}
      <div className="fixed z-500 inset-0 flex items-center justify-center pointer-events-none sm:inset-auto sm:top-5 sm:right-5 sm:block">
        <div className="pointer-events-auto bg-card border border-border rounded-2xl shadow-xl w-[300px] p-6 relative transition-all duration-300">

          {/* Close */}
          <button
            onClick={() => setVisible(false)}
            className="absolute top-3 right-3 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md p-1 transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {submitted ? (
            <div className="text-center py-2">
              <div className="text-4xl mb-3">
                {chosen === "great" ? "🎉" : chosen === "good" ? "🙏" : "💪"}
              </div>
              <p className="text-base font-semibold text-foreground mb-1">
                {chosen === "great"
                  ? "Amazing, thank you!"
                  : chosen === "good"
                  ? "Thanks for the kind words!"
                  : "Noted — I'll keep improving!"}
              </p>
              <p className="text-sm text-muted-foreground">
                {feedback ? `"${feedback}"` : "Your rating has been recorded."}
              </p>
            </div>
          ) : (
            <>
              {/* Header */}
              <p className="text-xs font-semibold tracking-widest text-primary uppercase flex items-center gap-1 mb-1">
                <Star className="w-3 h-3" /> Rate me
              </p>
              <h2 className="text-base font-semibold text-foreground mb-1">How's my portfolio?</h2>
              <p className="text-sm text-muted-foreground mb-5">Your feedback helps me grow.</p>

              {/* Faces */}
              <div className="flex justify-between gap-4 mb-5">
                {faces.map((face) => (
                  <button
                    key={face.val}
                    onClick={() => setChosen(face.val)}
                    className="flex flex-col items-center gap-1.5 group cursor-pointer"
                    aria-label={face.label}
                  >
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-150
                        ${face.bg} ${face.border}
                        ${chosen === face.val
                          ? `scale-110 ${face.activeShadow}`
                          : "group-hover:scale-110"
                        }`}
                    >
                      {face.svg}
                    </div>
                    <span
                      className={`text-[11px] font-medium whitespace-nowrap transition-colors
                        ${chosen === face.val
                          ? "text-foreground font-semibold"
                          : "text-muted-foreground"
                        }`}
                    >
                      {face.label}
                    </span>
                  </button>
                ))}
              </div>

              <hr className="border-border mb-4" />

              {/* Feedback Input */}
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={3}
                placeholder="Help me improve — what can I do better?"
                className="w-full resize-none rounded-lg border border-border bg-muted text-foreground text-sm
                  placeholder:text-muted-foreground px-3 py-2.5 outline-none focus:ring-2 focus:ring-primary/30
                  focus:border-primary transition mb-3 cursor-text"
              />

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={!chosen || isSubmitting}
                className="w-full py-2.5 rounded-lg text-sm font-medium transition-all
                  bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.98]
                  disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? "Submitting..." : "Submit feedback"}
              </button>
            </>
          )}
        </div>
      </div>
    </>
  )
}