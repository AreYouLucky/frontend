export interface CategoriesModel {
  category_id?: number;
  title?: string;
  description: string;
  is_banner?: number;
  is_active?: number;
  created_at?: string;
  updated_at?: string;
  category_name?:string;
  post_category_id?:number;
  [key: string]: unknown;
}

export const emptyCategory: CategoriesModel = {
  category_id: 0,
  title: "",
  description: "",
  category_name: '',
  is_banner: 0,
  is_active: 0,
  
} as const;


export interface ProgramsModel {
  program_id?: number;
  code?: string;
  title: string;
  description: string;
  agency: string;
  image: string | null;
  trailer: string | null;
  date_started: string | null;
  program_type: string;
  trailer_file?: File;
  image_file?: File;
  order?: number;
  is_banner?: number;
  is_active?: number;
  created_at?: string;
  updated_at?: string;
  episodes?: PostModel[];
  [key: string]: unknown;
}

export const emptyProgram: ProgramsModel = {
  program_id: 0,
  code: '',
  title: '',
  description: '',
  agency: '',
  image: '',
  trailer: '',
  date_started: '',
  program_type: '',
  order: 0,
  is_banner: 0,
  is_active: 0,
} as const;


export interface BannerModel {
  banner_id?: number | null;
  title: string | null;
  media?: string | null;
  media_file?: File | null;
  bg?: string | null;
  bg_file?: File | null;
  icon?: string | null;
  icon_file?: File | null;
  code?: string | null;
  highlight_text?: string | null;
  episodes?: string | null;
  description?: string | null;
  url?: string | null;
  type: number;
  is_banner: number | null;
  is_active: number | null;
  duration?: number | null;
  [key: string | number]: unknown;
}



export interface PostModel {
  program_id: number | null;
  post_id: number | null;
  slug: string | null;
  title: string | null;
  type: string | null;
  program: string | null;
  program_title: string | null;
  description: string | null;
  excerpt: string | null;
  episode: string | null;
  content: string | null;
  platform: string | null;
  url: string | null;
  image: string | null;
  trailer: string | null;
  trailer_file: string | File | null;
  banner: string | null;
  banner_image: string | File | null;
  thumbnail: string | null;
  thumbnail_image: File | string | null;
  guest: string | null;
  agencies: PostAgencyModel[] | null;
  date_published: string | null;
  is_featured: number | null;
  feature_guest: string | null;
  status: string | null;
  tags: string | null;
  page: number | null;
  featured_guest: string | null;
  post_program: ProgramsModel;
  categories: CategoriesModel[];
  season: number | null;
  regions: RegionModel[];
}


export interface AdvertisementModel {
  advertisement_id: number | null;
  title: string | null;
  thumbnail: string | null;
  url: string | null;
  slug: string | null;
  order: number | null;
  description: string | null;
  excerpt: string | null;
  is_redirect: number | null;
  is_active: string | null;
  is_banner: number | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface TestimonialModel {
  testimonial_id: number | null;
  title: string | null;
  guest: string | null;
  thumbnail: string | null;
  url: string | null;
  slug: string | null;
  description: string | null;
  excerpt: string | null;
  is_active: number | null;
  is_banner: number | null;
  date_published: string | null;
  created_at: string | null;
  updated_at: string | null;
}
export interface AgencyModel {
  id: number | null;
  name: string | null;
  website_url: string | null;
}

export interface RegionModel {
  id: number | null;
  name: string | null;
}

export interface PostAgencyModel {
  post_id: number | null;
  agency_id: number | null;
  agency_name: string | null;
}

export interface PostRegionModel {
  post_id: number | null;
  region_id: number | null;
}

export interface ProgramSeasonModel {
  uuid: number | null;
  id: number | null;
  program_id: number | null;
  title: string | null;
  description: string | null;
  thumbnail: string | null;
  season: number | null;
  [key: string | number]: unknown;
}


export type YtVideo = {
  video_id: string | null;
  title: string | null;
  description: string | null;
  view_count: number | null;
  thumbnail: string | null;
};

export type TopCount = {
  top_10_most_viewed: YtVideo[] | null;
};

export type mountsProps = {
  programs: ProgramsModel[],
  ads: AdvertisementModel[],
  categories: CategoriesModel[],
}

export type homeMountProps = {
  recent_posts: PostModel[],
  featured_posts: PostModel[],
  featured_categories: CategoriesModel[]
}