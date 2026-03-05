import React from 'react'
import Banner from '@/components/home-partials/banner/banner'
import { loadHomePageMounts } from '@/hooks/home/home-mount'
import HomeContent from '@/components/home-partials/home-content'
import "keen-slider/keen-slider.min.css"
import Splash from '@/components/ui/splash'
export default async function HomePage() {
  const homePageMounts = await loadHomePageMounts();
  return (
    <Splash>
      <div className='bg-zinc-900/10'>
        <Banner banners={homePageMounts.banners} />
        <div className=''>
          <HomeContent props={homePageMounts} />
        </div>
        <h2>
          dasasdads
        </h2>
        <h2>
          dasasdads
        </h2>      <h2>
          dasasdads
        </h2>      <h2>
          dasasdads
        </h2>      <h2>
          dasasdads
        </h2>
        2
      </div>
    </Splash>
  )
}
