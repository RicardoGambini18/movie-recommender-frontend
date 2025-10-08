export enum MovieStatus {
  RUMORED = 'RUMORED',
  PLANNED = 'PLANNED',
  CANCELED = 'CANCELED',
  RELEASED = 'RELEASED',
  IN_PRODUCTION = 'IN_PRODUCTION',
  POST_PRODUCTION = 'POST_PRODUCTION',
}

export type Movie = {
  id: number
  status: MovieStatus
  budget: number | null
  revenue: number | null
  homepage: string | null
  imdb_id: number
  tmdb_id: number
  title: string
  title_es: string | null
  overview: string
  overview_es: string | null
  poster_path: string | null
  release_date: string
  vote_count: number
  vote_average: number
  tagline: string | null
  tagline_es: string | null
  original_language_id: number
  collection_id: number | null
}
