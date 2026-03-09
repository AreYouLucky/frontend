"use client"

import { useEffect } from "react"
import { useBackground } from "../layout-partials/background-context"

export default function SetBg({ thumbnail }: { thumbnail: string }) {
  const { setBg } = useBackground()

  useEffect(() => {
    if (!thumbnail) return
    setBg(thumbnail)
  }, [thumbnail, setBg])

  return null
}