"use client";
import { useState } from "react";
import { Sumicons } from "../_icons/Sum";
import { Genre } from "../_icons/Genre";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "../_icons/Search";
import Link from "next/link";
import { SearchCard } from "../_components/SearchCard";
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
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [genreData, setGenreData] = useState([]);
  const [showGenre, setShowGenre] = useState(false);
  const [inputString, setInputString] = useState("");
  const [showSearch, setShowSearch] = useState([]);

  const searchApi = `https://api.themoviedb.org/3/search/movie?query=${inputString}&language=en-US&page=1`;

  const getData = async () => {
    const data = await fetch(apiLink, options);
    const jsonData = await data.json();
    setGenreData(jsonData.genres);
  };

  const SearchData = async () => {
    const searchData = await fetch(searchApi, options);
    const SearchjsonData = await searchData.json();
    console.log("this is search", SearchjsonData);
    setShowSearch(SearchjsonData.results);
  };

  useEffect(() => {
    getData();
    SearchData();
  }, [inputString]);

  //   useEffect(() => {
  //   if (inputString.trim().length === 0) {
  //     setShowSearch([]); // Хоосон үед хайлтын үр дүн цэвэрлэх
  //     return;
  //   }

  //   const delayDebounce = setTimeout(() => {
  //     getData(); // 0.5 секундийн дараа хайлт ажиллана
  //   }, 500); // 500ms = 0.5 секунд

  //   return () => clearTimeout(delayDebounce); // өмнөх timer-ийг цуцлах
  // }, [inputString]);

  const handleGenreClick = (id) => {
    router.push(`/genres/${id}`);
  };
  // console.log(inputString);

  const saveString = (event) => {
    setInputString(event.target.value);
  };
  // console.log("Golog", genreData);
  if (loading) return <div>Loading...</div>;
  return (
    <div>
      <div className="flex justify-between mt-[13px]">
        <Link href={"/"}>
          <img src="/Logo.png"></img>
        </Link>
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
            </div>
          )}
          <div className="flex items-center border border-gray-300 rounded-lg px-2">
            <Search />
            <input
              className="w-[300px] h-[34px] px-2 outline-none text-sm"
              placeholder="Search..."
              onChange={saveString}
              value={inputString}
            ></input>
          </div>
          {inputString.length > 0 ? (
            <div className="absolute bg-white w-[577px] h-[729px] top-[4.3%] z-10 rounded-lg border border-gray-300 overflow-scroll">
              {showSearch.slice(0, 5).map((movie, index) => {
                return (
                  <div key={index}>
                    <SearchCard
                      title={movie.title}
                      rating={movie.vote_average}
                      imgSrc={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                      date={movie.release_date}
                      movieId={movie.id}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            ""
          )}
        </div>
        <div>
          <button className="border w-[26px] h-[26px] rounded-lg">
            <img src="/Sar.png"></img>
          </button>
        </div>
      </div>
    </div>
  );
};
