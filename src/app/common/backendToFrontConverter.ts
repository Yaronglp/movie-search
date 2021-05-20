import { IMovie } from "../model/movie.interface";
import { removeEmptyPropsFromObject } from "./utils";

export const convertMovie = (movie: any): IMovie[] => {
  return [convertMovieSearch(movie)]
}

export const convertMovies = (movies: any[]): IMovie[] => {
  if (movies?.length === 0) {
    return []
  }

  const convertedBackToFrontMovies = []

  for (const movie of movies) {
    convertedBackToFrontMovies.push(convertMovieSearch(movie))   
  }

  return convertedBackToFrontMovies
}

const convertMovieSearch = (dataFromBackend: any): IMovie => {
  const movie = {
    title: dataFromBackend.Title,
    year: dataFromBackend.Year,
    type: dataFromBackend.Type,
    poster: dataFromBackend.Poster,
    imdbID: dataFromBackend.imdbID,
    released: dataFromBackend.Released,
    runtime: dataFromBackend.Runtime,
    genre: dataFromBackend.Genre,
    actors: dataFromBackend.Actors,
    plot: dataFromBackend.Plot,
    country: dataFromBackend.Country,
    rating: dataFromBackend.Rating
  }

  return removeEmptyPropsFromObject(movie)
}