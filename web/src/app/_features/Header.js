"use client";
import { useState } from "react";
import { Sumicons } from "../_icons/Sum";
import { Genre } from "../_icons/Genre";
export const Header = (props) => {
  const [showGenreList, setShowGenreList] = useState();
  const genres = ["Action", "Comedy", "Drama", "Horror", "Sci-Fi"];
  return (
    <div>
      <div className="flex justify-between mt-[13px]">
        <div>
          <img src="Logo.png"></img>
        </div>
        <div className="gap-[10px] flex">
          <button
            className="w-[97px] h-[36px] rounded-lg border flex items-center justify-center gap-2"
            onClick={() => setShowGenreList(!showGenreList)}
          >
            <Genre />
            Genre
          </button>
          {showGenreList && (
            <ul className="absolute top-[40px] left-228 bg-white border rounded-lg w-[97px] z-10 shadow-lg">
              {genres.map((genre, index) => (
                <li
                  key={index}
                  className="px-2 py-1 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    console.log("Selected genre:", genre);
                    setShowGenreList(false);
                  }}
                >
                  {genre}
                </li>
              ))}
            </ul>
          )}
          <input
            className="border w-[379px] h-[36px] rounded-lg"
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
