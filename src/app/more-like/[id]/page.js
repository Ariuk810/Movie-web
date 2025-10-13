"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Header } from "@/app/_features/Header";
import { Footer } from "@/app/_features/Footer";
import { MovieCard } from "@/app/_components/MovieCard";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export default function MoreLike() {
  const { id } = useParams();
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const apiLink = `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${id}&page=${page}`;

  const getData2 = async () => {
    setLoading(true);
    const data = await fetch(apiLink, options);
    const jsonData1 = await data.json();
    setTotalPages(jsonData1.total_pages);
  };

  const fetchSimilarMovies = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
        options
      );
      const json = await res.json();
      setSimilarMovies(json.results || []);
    } catch (err) {
      console.error("Failed to fetch similar movies", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchSimilarMovies();
    }
  }, [id]);
  useEffect(() => {
    getData2();
  }, [page]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div>
      <Header />
      <div className="ml-[10%] mt-[5%]">
        <h1 className="text-4xl font-bold mb-6">More Like This</h1>
        <div className="grid grid-cols-5 gap-8">
          {similarMovies.slice(0, 10).map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              rating={Math.round(movie.popularity)}
              imgSrc={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              movieId={movie.id}
            />
          ))}
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
