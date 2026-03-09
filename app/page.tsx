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
      <div className='bg-[#050505]/60'>
        <Banner banners={homePageMounts.banners} />
        <div className='lg:-mt-30 md:-mt-20 mt-2 pb-5'>
          <HomeContent props={homePageMounts} />
        </div>
      </div>
    </Splash>
  )
}
