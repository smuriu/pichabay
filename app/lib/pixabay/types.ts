import { z } from 'zod'

export const ImageTypes = ['all', 'photo', 'illustration', 'vector'] as const

export const ImageCategories = [
  'backgrounds',
  'fashion',
  'nature',
  'science',
  'education',
  'feelings',
  'health',
  'people',
  'religion',
  'places',
  'animals',
  'industry',
  'computer',
  'food',
  'sports',
  'transportation',
  'travel',
  'buildings',
  'business',
  'music',
] as const

export const StringBool = ['true', 'false'] as const

export const SortOrder = ['popular', 'latest'] as const

export const SearchSchema = z.object({
  q: z.optional(z.string()),
  image_type: z.optional(z.enum(ImageTypes)),
  category: z.optional(z.enum(ImageCategories)),
  editors_choice: z.optional(z.enum(StringBool)),
  order: z.optional(z.enum(SortOrder)),
  page: z.optional(
    z.coerce
      .number()
      .min(1)
      .transform((num) => num.toString()),
  ),
  per_page: z.optional(
    z.coerce
      .number()
      .min(3)
      .max(200)
      .transform((num) => num.toString()),
  ),
  // todo: add support for below keys
  // lang, orientation, min_width, min_height, colors, safesearch
})
// .strict()

export type SearchParams = z.infer<typeof SearchSchema>

export interface Hit {
  id: number
  pageURL: string
  type: 'photo' | 'illustration' | 'vector'
  tags: string
  previewURL: string
  previewWidth: number
  previewHeight: number
  webformatURL: string
  webformatWidth: number
  webformatHeight: number
  largeImageURL: string
  imageWidth: number
  imageHeight: number
  views: number
  downloads: number
  likes: number
  comments: number
  user_id: number
  user: string
  userImageURL: string
}

export interface Hits {
  total: number
  totalHits: number
  hits: Hit[]
}
