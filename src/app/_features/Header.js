"use client";
import { useState } from "react";
import { Sumicons } from "../_icons/Sum";
import { Genre } from "../_icons/Genre";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
export const Header = (props) => {
  const apiLink = "https://api.themoviedb.org/3/genre/movie/list?language=en";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
    },
  };
  const router = useRouter;
  const [loading, setLoading] = useState(false);
  const [genreData, setGenreData] = useState([]);
  const [showGenre, setShowGenre] = useState(false);
  const getData = async () => {
    setLoading(true);
    const data = await fetch(apiLink, options);
    const jsonData = await data.json();
    setGenreData(jsonData.genres);
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  console.log("Golog", genreData);
  if (loading) return <div>Loading...</div>;
  return (
    <div>
      <div className="flex justify-between mt-[13px]">
        <div>
          <img src="Logo.png"></img>
        </div>
        <div className="gap-[10px] flex">
          <button
            className="w-[97px] h-[36px] rounded-lg border  border-gray-300 flex items-center justify-center gap-2"
            onClick={() => setShowGenre((prev) => !prev)}
          >
            <Genre />
            Genre
          </button>
          {showGenre && (
            <div className="absolute bg-white w-[577px] h-[333px] top-[4.3%] z-10 rounded-lg border border-gray-300">
              <div className="ml-5">
                <h3 className="text-black font-bold mt-5 text-[30px]">
                  Genres
                </h3>
                <p className="text-black text-[20px]">
                  See lists of movies by genre
                </p>
                <div className="h-[1px] bg-gray-300"></div>
                <div className="mt-5 grid grid-cols-5 gap-5">
                  {genreData.map((genre, index) => {
                    return (
                      <Link href={`/genres/${genre.id}`}>
                        <button
                          className="rounded-lg w-[76px] h-[25px] border border-gray-300 flex justify-center items-center text-[10px] font-bold"
                          key={index}
                        >
                          {genre.name}
                          <Sumicons />
                        </button>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          <input
            className="border w-[379px] h-[36px] rounded-lg  border-gray-300"
            placeholder="Search.."
          ></input>
        </div>
        <div>
          <button className="border w-[26px] h-[26px] rounded-lg">
            <img src="Sar.png"></img>
          </button>
        </div>
      </div>
    </div>
  );
};
