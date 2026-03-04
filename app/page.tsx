import React from 'react'
import Banner from '@/components/home-partials/banner/banner'
import { loadHomePageMounts } from '@/hooks/home/home-mount'
export default async function HomePage() {
  const homePageMounts = await loadHomePageMounts();
  return (
    <div>
      <Banner banners={homePageMounts.banners} />
    </div>
  )
}
