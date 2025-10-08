"use client";
import { Header } from "@/app/_features/Header";
import { Sumicons } from "@/app/_icons/Sum";
import { useParams } from "next/navigation";
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
  const [genreData, setGenreData] = useState([]);
  const [genreMovieData, setGenreMovieData] = useState([]);

  const param = useParams();
  const { id } = param;
  const apiLink = `https:/api.themoviedb.org/3/discover/movie?language=en&with_genres=${id}&page=${1}`;

  const getData = async () => {
    const data = await fetch(buttonLink, options);
    const jsonData = await data.json();
    setGenreData(jsonData.genres);
  };
  const getData2 = async () => {
    const data = await fetch(apiLink, options);
    const jsonData = await data.json();
    setGenreMovieData(jsonData);
    console.log("this is genremovievgubhijnomk", jsonData);
  };

  useEffect(() => {
    getData();
    getData2();
  }, []);
  return (
    <div>
      <Header />
      <div className="flex">
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
                >
                  {genre.name}
                  <Sumicons />
                </button>
              );
            })}
          </div>
        </div>
        <div className="mt-[5%]">asdfg</div>
      </div>
    </div>
  );
}
