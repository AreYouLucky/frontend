"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

interface ModalProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function Modal({
  open,
  onClose,
  children,
}: ModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* MODAL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.25 }}
            className="fixed z-50 left-1/2 top-1/2  w-[96vw] max-w-350 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-neutral-900 shadow-2xl overflow-hidden"
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={onClose}
              className="absolute top-2 right-2 p-3 rounded-full bg-white text-black backdrop-blur-sm shadow hover:bg-background z-50"
            >
              <X className="w-5 h-5 text-black " />
            </button>

            {children}
            
          </motion.div>

          <AnimatePresence>
           
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  )
}