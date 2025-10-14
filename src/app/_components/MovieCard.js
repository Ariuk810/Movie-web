"use client";

import { useRouter } from "next/navigation";
import { Staricons } from "../_icons/Star";
export const MovieCard = (props) => {
  const { imgSrc, rating, title, movieId } = props;

  const router = useRouter();

  // console.log("this is movieId", movieId);

  const handleMovieClick = () => {
    router.push(`/movie-detail/${movieId}`);
  };
  return (
    <div
      className="w-[229px] h-[439px] cursor-pointer rounded-lg "
      onClick={handleMovieClick}
    >
      <div className="mt-10 ">
        <img src={imgSrc} alt="movie" className="rounded-lg"></img>
      </div>
      <div className="flex flex-col bg-gray-100 w-[230px] h-[95px] rounded-lg">
        <div className="flex items-center">
          <Staricons />
          <span>{rating}</span>
          <span className="text-gray-400">/10</span>
        </div>
        <div>{title}</div>
      </div>
    </div>
  );
};
