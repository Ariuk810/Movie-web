"use client";

import { useRouter } from "next/navigation";
import { Staricons } from "../_icons/Star";
export const SearchCard = (props) => {
  const { imgSrc, rating, title, movieId, date } = props;

  const router = useRouter();

  // console.log("this is movieId", movieId);

  const handleMovieClick = () => {
    router.push(`/movie-detail/${movieId}`);
  };
  return (
    <div className="flex gap-5 mt-[5%] ml-[5%]">
      <div
        className="w-[67px] h-[100px] cursor-pointer "
        onClick={handleMovieClick}
      >
        <img src={imgSrc} className="rounded-md"></img>
      </div>
      <div>
        <h4 className="font-bold text-xl">{title}</h4>
        <div className="flex items-center">
          <Staricons />
          <span>{rating}</span>
          <span className="text-gray-400">/10</span>
        </div>

        {date}
      </div>
    </div>
  );
};
