"use client"

import Image from "next/image"
import {createContext,useContext,useState,useCallback,} from "react"

type BgContextType = {
  setBg: (url: string | null) => void
}

const BgContext = createContext<BgContextType | null>(null)

export function BackgroundProvider({children,}: { children: React.ReactNode}) {
  const [bg, setBgState] = useState<string | null>(`/storage/images/backgrounds/background.jpg`)
  const [prevBg, setPrevBg] = useState<string | null>(null)

  const setBg = useCallback((url: string | null) => {
    setPrevBg(bg)
    setBgState(url)
  }, [bg])

  return (
    <BgContext.Provider value={{ setBg }}>
      <div className="relative min-h-screen overflow-hidden w-screen">
        {prevBg && (
          <Image
            src={prevBg}
            alt=""
            fill
            priority
            sizes="100vw"
            className="pointer-events-none fixed inset-0 -z-20
                       object-cover blur-sm scale-110
                       opacity-0 transition-opacity duration-700"
          />
        )}
        {bg && (
          <Image
            key={bg} 
            src={bg}
            alt=""
            fill
            priority
            sizes="100vw"
            className="pointer-events-none fixed inset-0 -z-10
                       object-cover  scale-110
                        blur-lg transition-all duration-700"
          />
        )}
        <div className="pointer-events-none fixed inset-0 -z-10 bg-slate-700/55" />

        {children}
      </div>
    </BgContext.Provider>
  )
}

export function useBackground() {
  const ctx = useContext(BgContext)
  if (!ctx) throw new Error("useBackground must be inside BackgroundProvider")
  return ctx
}
