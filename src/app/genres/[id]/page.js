"use client";
import { MovieCard } from "@/app/_components/MovieCard";
import { Footer } from "@/app/_features/Footer";
import { Header } from "@/app/_features/Header";
import { Sumicons } from "@/app/_icons/Sum";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};
const buttonLink = "https://api.themoviedb.org/3/genre/movie/list?language=en";

export default function Genres() {
  const router = useRouter();
  const [genreData, setGenreData] = useState([]);
  const [genreMovieData, setGenreMovieData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const param = useParams();
  const { id } = param;
  const [loading, setLoading] = useState(false);
  const apiLink = `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${id}&page=${page}`;

  const getData = async () => {
    const data = await fetch(buttonLink, options);
    const jsonData = await data.json();
    console.log("this is genres??????", jsonData);
    setGenreData(jsonData.genres);
  };
  const getData2 = async () => {
    setLoading(true);
    const data = await fetch(apiLink, options);
    const jsonData1 = await data.json();
    console.log("asdfg", jsonData1);
    setGenreMovieData(jsonData1.results);
    setTotalResults(jsonData1.total_results);
    setTotalPages(jsonData1.total_pages);
    setLoading(false);
  };

  useEffect(() => {
    getData();
    getData2();
  }, [page]);
  const handleGenreClick = (id) => {
    router.push(`/genres/${id}`);
  };

  const selectedGenre = genreData.filter((item) => item.id == id);

  // const manyMovie = genreMovieData.filter((item) => item.id == id);

  if (loading) return <div>....loading</div>;
  return (
    <div>
      <Header />
      <div className="flex gap-[10%]">
        <div className="ml-[80px] mt-[62px] w-[387px] h-[352px]">
          <h3 className="font-bold text-4xl">Search filter</h3>
          <h1 className="font-bold text-3xl mt-[2%]">Genres</h1>
          <p className="text-black text-[20px]">See lists of movies by genre</p>
          <div className=" flex flex-wrap w-[387px] gap-5 mt-[2%]">
            {genreData.map((genre, index) => {
              return (
                <button
                  className="rounded-lg w-[76px] h-[25px] border border-gray-300 flex justify-center items-center text-[10px] font-bold"
                  key={index}
                  onClick={() => handleGenreClick(genre.id)}
                >
                  {genre.name}
                  <Sumicons />
                </button>
              );
            })}
          </div>
        </div>
        <div className="mt-[7%]">
          <h1 className="font-bold text-2xl">
            {totalResults} titles in "{selectedGenre[0]?.name}"
            {/* {manyMovie[0]?.total_results} */}
          </h1>
          <div className="flex flex-wrap gap-5">
            {genreMovieData.map((movie, index) => {
              return (
                <MovieCard
                  key={index}
                  title={movie.original_title}
                  rating={Math.round(movie.vote_average)}
                  imgSrc={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  movieId={movie.id}
                />
              );
            })}
          </div>
        </div>
      </div>
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
      <Footer />
    </div>
  );
}
