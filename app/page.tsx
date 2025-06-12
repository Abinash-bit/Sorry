"use client"

import { useState, useEffect } from "react"
import { Heart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"

export default function SorryPage() {
  const [showMessage, setShowMessage] = useState(false)
  const [confettiTriggered, setConfettiTriggered] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const triggerConfetti = () => {
    if (confettiTriggered) return

    setConfettiTriggered(true)
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ffadad", "#ffd6a5", "#fdffb6", "#caffbf", "#9bf6ff", "#a0c4ff", "#bdb2ff", "#ffc6ff"],
    })
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 flex flex-col items-center justify-center p-4 text-center">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-200"
            initial={{
              x: Math.random() * 100 - 50 + "%",
              y: -20,
              opacity: 0.7,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: ["0%", "100%"],
              x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`, `${Math.random() * 100}%`],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              times: [0, 1],
              delay: Math.random() * 5,
            }}
          >
            {i % 2 === 0 ? <Heart size={16} /> : <Star size={16} />}
          </motion.div>
        ))}
      </div>

      <motion.div
        className="max-w-md w-full bg-white rounded-3xl shadow-lg p-8 relative overflow-hidden"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-100 rounded-full" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-100 rounded-full" />

        <div className="relative">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mb-6"
          >
            <div className="flex justify-center mb-4">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 2,
                  ease: "easeInOut",
                }}
              >
                <Heart className="h-20 w-20 text-pink-400 fill-pink-400" />
              </motion.div>
            </div>
            <h1 className="text-3xl font-bold text-pink-500 mb-2">I'm Sorry, Amisa</h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showMessage ? 1 : 0, y: showMessage ? 0 : 20 }}
            transition={{ duration: 0.8 }}
            className="space-y-4 mb-6"
          >
            <p className="text-gray-700">
              I never meant to hurt your feelings. You mean the world to me, and I hope you can forgive me.
            </p>
            <p className="text-gray-700">Your smile brightens my day, and I promise to do better.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showMessage ? 1 : 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="flex flex-col items-center gap-4"
          >
            <Button
              className="bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white px-8 py-2 rounded-full shadow-md"
              onClick={triggerConfetti}
            >
              Forgive Me?
            </Button>

            {confettiTriggered && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-pink-500 font-medium"
              >
                Thank you! You're the best! ❤️
              </motion.p>
            )}
          </motion.div>
        </div>
      </motion.div>
    </main>
  )
}
