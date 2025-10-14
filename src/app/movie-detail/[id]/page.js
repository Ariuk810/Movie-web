"use client";
import { Header } from "@/app/_features/Header";
import { Staricons } from "@/app/_icons/Star";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Sumicons } from "@/app/_icons/Sum";
import { Footer } from "@/app/_features/Footer";
import { MovieCard } from "@/app/_components/MovieCard";
import { Trailer } from "@/app/_icons/Trailer";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export default function MovieDetail() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [upcomingMoviesData, setUpcomingMoviesData] = useState([]);
  const [similarData, setSimilarData] = useState([]);
  const [crew, setCrew] = useState([]);
  const [cast, setCast] = useState([]);

  // 🎬 trailer state нэмсэн хэсэг
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState(null);

  // Trailer татах функц (MovieSlide-ийнхтэй ижил)
  const getTrailerUrl = async (id) => {
    try {
      const apiLink = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
      const res = await fetch(apiLink, options);
      const data = await res.json();

      const trailer = data.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
      return trailer ? `https://www.youtube.com/embed/${trailer.key}` : null;
    } catch (error) {
      console.error("Trailer fetch error:", error);
      return null;
    }
  };

  // Гол киноны мэдээлэл ба trailer татах
  const getData = async () => {
    setLoading(true);

    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
      options
    );
    const jsonData = await data.json();

    const creditsData = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
      options
    );
    const similarData = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
      options
    );

    const [creditsJson, similarJson, trailer] = await Promise.all([
      creditsData.json(),
      similarData.json(),
      getTrailerUrl(id),
    ]);

    setUpcomingMoviesData(jsonData);
    setCast(creditsJson.cast);
    setCrew(creditsJson.crew);
    setSimilarData(similarJson.results);
    setTrailerUrl(trailer);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [id]);

  if (loading) return <div>....loading</div>;
  if (!id) return <div>something wrong</div>;

  const handleSeeClick = (id) => {
    router.push(`/more-like/${id}`);
  };

  return (
    <div>
      <Header />
      <div className="ml-[16%]">
        <div className="w-[1080px] h-[524px] ml-[10%] mt-[5%]">
          <div className="flex justify-between">
            <div>
              <h1 className="text-black font-bold text-4xl">
                {upcomingMoviesData.title}
              </h1>
              <p className="text-black">{upcomingMoviesData.release_date}</p>
            </div>
            <div>
              <p className="font-bold">Rating</p>
              <div className="flex items-center">
                <Staricons />
                <div>
                  <p className="text-black font-bold">
                    {Math.round(upcomingMoviesData.vote_average)}
                    <span className="text-gray-500">/10</span>
                  </p>
                  <p className="text-gray-500">37k</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-[32px] mt-5">
            <img
              src={`https://image.tmdb.org/t/p/original${upcomingMoviesData.poster_path}`}
              className="w-[290px] h-[428px] rounded-lg"
            />
            <div className="relative">
              <img
                src={`https://image.tmdb.org/t/p/original${upcomingMoviesData.backdrop_path}`}
                className="w-[760px] h-[428px] rounded-lg"
              />
              <div
                className={`flex items-center absolute top-[85%] left-[3%] gap-3 ${
                  trailerUrl
                    ? "cursor-pointer"
                    : "opacity-50 cursor-not-allowed"
                }`}
                onClick={() => trailerUrl && setShowTrailer(true)}
              >
                <button className="w-[40px] h-[40px] rounded-full bg-white flex justify-center items-center">
                  <Trailer />
                </button>
                <p className="text-white">Play trailer</p>
              </div>
            </div>
          </div>
        </div>

        {/* Genres, Overview, Crew info */}
        <div className="w-[1080px] h-[271px] mt-[2%] ml-[10%]">
          <div className="flex gap-2">
            {upcomingMoviesData.genres?.map((genre, index) => (
              <button
                key={index}
                className="h-7 flex items-center gap-5-2 px-4 cursor-pointer text-l font-bold border rounded-full border-[#ddd]"
              >
                {genre.name}
              </button>
            ))}
          </div>
          <p className="mt-5">{upcomingMoviesData.overview}</p>
          <div className="mt-5">
            <div className="flex gap-15">
              <p className="font-bold">Director</p>
              <p>
                {crew
                  .filter((e) => e.job === "Director")
                  .map((d) => d.name)
                  .join(", ") || "N/A"}
              </p>
            </div>
            <div className="flex gap-15 mt-4">
              <p className="font-bold">Writer</p>
              <p>
                {crew
                  .filter((w) => w.known_for_department === "Writing")
                  .map((w) => w.name)
                  .join(", ") || "N/A"}
              </p>
            </div>
            <div className="flex gap-15 mt-4">
              <p className="font-bold">Stars</p>
              <p>
                {cast
                  .slice(0, 3)
                  .map((s) => s.name)
                  .join(", ") || "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Similar movies */}
        <div className="w-[1080px] h-[550px] ml-[10%]">
          <div className="flex justify-between">
            <h1 className="font-bold text-black text-4xl ">More like this</h1>
            <div className="flex items-center ">
              <p className="cursor-pointer" onClick={() => handleSeeClick(id)}>
                See More
              </p>
              <Sumicons />
            </div>
          </div>
          <div className="grid grid-cols-5 gap-[10%] mt-5">
            {similarData.slice(2, 7).map((movie, index) => (
              <MovieCard
                key={index}
                title={movie.title}
                rating={Math.round(movie.popularity)}
                imgSrc={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                movieId={movie.id}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Trailer popup */}
      {showTrailer && trailerUrl && (
        <div
          className="fixed inset-0 bg-opacity-80 flex justify-center items-center z-50"
          onClick={() => setShowTrailer(false)}
        >
          <div
            className="relative w-[80vw] h-[45vw] max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              width="100%"
              height="100%"
              src={trailerUrl}
              title="Movie Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <button
              className="absolute top-2 right-4 text-white text-3xl font-bold"
              onClick={() => setShowTrailer(false)}
            >
              &times;
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
