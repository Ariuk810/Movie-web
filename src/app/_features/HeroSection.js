"use client";
import { useEffect, useState } from "react";
import { MovieSlide } from "../_components/MovieSlide";
export const HeroSection = (props) => {
  const apiLink =
    " https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
    },
  };
  const [upcomingMoviesData, setUpcomingMoviesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);
  const [backPage, setBackPage] = useState(0);

  const getData = async () => {
    setLoading(true);
    const data = await fetch(apiLink, options);
    const jsonData = await data.json();
    setUpcomingMoviesData(jsonData.results);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSlideChange = () => {
    setSlideNumber(slideNumber + 1);
  };

  const BackSlideChange = () => {
    if (slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 space-y-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-blue-600 font-semibold text-lg">хүлээ ...</p>
      </div>
    );

  return (
    <div>
      {upcomingMoviesData
        .slice(slideNumber, slideNumber + 1)
        .map((movie, index) => (
          <MovieSlide
            title={movie.title}
            rate={Math.round(movie.vote_average)}
            exp={movie.overview}
            handleSlideChange={handleSlideChange}
            BackSlideChange={BackSlideChange}
            key={index}
            movieId={movie.id}
            imgSrc={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
          />
        ))}
    </div>
  );
};
