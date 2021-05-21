import { EShowType } from "./search.enum";

interface IRating {
  source: string
  value: string
}

export interface IMovie {
  title: string
  year: string
  type: EShowType
  poster: string
  imdbID: string
  released?: string
  runtime?: string
  genre?: string
  actors?: string
  plot?: string
  country?: string
  imdbRating?: string,
  totalSeasons?: string
}
