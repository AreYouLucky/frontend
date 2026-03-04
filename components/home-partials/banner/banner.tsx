import BannerCarousel from "./banner-carousel";
import { BannerModel } from "@/types/models";
export default async function Banner({ banners}: {banners: BannerModel[]}) {
  return (
    <>
      <BannerCarousel banners={banners} />
    </>
  );
}
