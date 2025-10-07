"use client";
import { Header } from "@/app/_features/Header";
import { Staricons } from "@/app/_icons/Star";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Sumicons } from "@/app/_icons/Sum";
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

export default function MovieDetail() {
  const param = useParams();
  const { id } = param;
  const [loading, setLoading] = useState(false);
  const [upcomingMoviesData, setUpcomingMoviesData] = useState([]);
  const [similarData, setSimilarData] = useState([]);
  const [crew, setCrew] = useState([]);
  const [cast, setCast] = useState([]);

  const apiLink = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  const getData = async () => {
    setLoading(true);
    const data = await fetch(apiLink, options);
    const jsonData = await data.json();

    const creditsData = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
      options
    );

    const similarData = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
      options
    );

    const jsonData1 = await similarData.json();
    console.log(jsonData1, "hehhee");
    setSimilarData(jsonData1.results);

    const creditsJson = await creditsData.json();
    console.log(creditsJson, "ds");

    console.log("this is json", jsonData);
    setUpcomingMoviesData(jsonData);
    setCast(creditsJson.cast);
    setCrew(creditsJson.crew);

    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [id]);

  if (loading) return <div>....loading</div>;

  if (!id) {
    return <div>something wrong</div>;
  }

  return (
    <div>
      <Header />
      <div className="ml-[16%]">
        <div className=" w-[1080px] h-[524px] ml-[10%] mt-[5%] ">
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
                    <span className="text-gray-500">/10</span>{" "}
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
            ></img>
            <img
              src={`https://image.tmdb.org/t/p/original${upcomingMoviesData.backdrop_path}`}
              className="w-[760px] h-[428px] rounded-lg"
            ></img>
          </div>
        </div>
        <div className="w-[1080px] h-[271px]  mt-[2%] ml-[10%]">
          <div className="flex gap-2 ">
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
        <div className="w-[1080px] h-[550px] ml-[10%]">
          <div className="flex justify-between">
            <h1 className="font-bold text-black text-4xl ">More like this</h1>
            <div className="flex items-center ">
              <p>See More</p>
              <Sumicons />
            </div>
          </div>
          <div className="flex">
            <div className="grid grid-cols-5 gap-[10%]">
              {similarData.slice(2, 7).map((movie, index) => {
                return (
                  <MovieCard
                    key={index}
                    title={movie.title}
                    rating={Math.round(movie.popularity)}
                    imgSrc={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    movieId={movie.id}
                  />
                );
              })}
            </div>
          </div>

          {/* <div className="flex gap-7 mt-[5%]">
          {similarData.slice(2, 7).map((movie, index) => (
            <div className="w-[190px] h-[372px] " key={index}>
              <img
                className="rounded-lg cursor-pointer"
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              ></img>
              <div className="flex flex-col bg-gray-100 h-[87px]">
                <div className="flex items-center">
                  <Staricons />
                  <span>{Math.round(movie.popularity)}</span>
                  <span>/10</span>
                </div>
                <div>{movie.title}</div>
              </div>
            </div>
          ))}
        </div> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}
