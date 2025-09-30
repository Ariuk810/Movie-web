"use client";
import { useEffect, useState } from "react";
import { MovieCard } from "../_components/MovieCard";
import { Sumicons } from "../_icons/Sum";
import Link from "next/link";
export const MovieList = (props) => {
  const { order, apiName, start, end, seemore, folder } = props;
  console.log(folder, "asdasd");
  const url = folder;
  const apiLink = `https://api.themoviedb.org/3/movie/${apiName}?language=en-US&page=1`;
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

  const getData = async () => {
    setLoading(true);
    const data = await fetch(apiLink, options);
    const jsonData = await data.json();
    setUpcomingMoviesData(jsonData.results);
    setLoading(false);
  };
  console.log("loading", loading);
  console.log("upcominMoviesData", upcomingMoviesData);

  useEffect(() => {
    getData();
  }, []);

  if (loading) return <div>....loading</div>;

  return (
    <div className="flex flex-col ">
      <div className="flex justify-between mt-10 ">
        <h1 className="text-3xl ml-10">{order} </h1>
        <div className="flex items-center mr-10">
          <Link href={`${folder}`}>
            <p>{seemore}</p>
          </Link>
          <Sumicons />
        </div>
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-5 gap-[40px]">
          {upcomingMoviesData.slice(start, end).map((movie, index) => {
            return (
              <MovieCard
                key={index}
                title={movie.title}
                rating={Math.round(movie.vote_average)}
                imgSrc={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                movieId={movie.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
