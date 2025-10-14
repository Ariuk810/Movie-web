"use client";
import { useEffect, useState } from "react";
import { MovieCard } from "../_components/MovieCard";
import { Sumicons } from "../_icons/Sum";
import Link from "next/link";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};
export const MovieList = (props) => {
  const { order, apiName, start, end, seemore, folder, showPage } = props;
  const [page, setPage] = useState(1);
  // console.log(folder, "asdasd");
  // const url = folder;
  const apiLink = `https://api.themoviedb.org/3/movie/${apiName}?language=en-US&page=${page}`;
  // console.log("asdasdadsdsa", showPage);

  const [upcomingMoviesData, setUpcomingMoviesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const getData = async () => {
    setLoading(true);
    const data = await fetch(apiLink, options);

    const jsonData = await data.json();
    setTotalPages(jsonData.total_pages);
    setUpcomingMoviesData(jsonData.results);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [page]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center  bg-gray-100 space-y-4 ">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-blue-600 font-semibold text-lg">хүлээ...</p>
      </div>
    );

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
        <div className="grid grid-cols-5 gap-[40px] max-md:grid-cols-2">
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

      {showPage && (
        <div className="flex justify-center items-center gap-4 mt-20">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 bg-gray-200 rounded-lg shadow
               hover:bg-gray-300 transition disabled:opacity-50"
          >
            ◀ Prev
          </button>

          <span className="text-sm font-medium text-gray-700">
            Page <span className="font-bold">{page}</span> / {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 bg-gray-200 rounded-lg shadow
               hover:bg-gray-300 transition disabled:opacity-50"
          >
            Next ▶
          </button>
        </div>
      )}
    </div>
  );
};
