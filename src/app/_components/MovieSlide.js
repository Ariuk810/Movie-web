import { useState, useEffect } from "react";
import { LeftSumiconst } from "../_icons/Leftsum";
import { Staricons } from "../_icons/Star";
import { Sumicons } from "../_icons/Sum";
import { Trailer } from "../_icons/Trailer";

export const MovieSlide = ({
  title,
  exp,
  imgSrc,
  rate,
  movieId,
  handleSlideChange,
  BackSlideChange,
}) => {
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState(null);

  const getTrailerUrl = async (id) => {
    const apiLink = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
      },
    };

    try {
      const res = await fetch(apiLink, options);
      const data = await res.json();

      // Youtube trailer-ээс type = Trailer гэсэн видеог хайх
      const trailer = data.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
      if (trailer) {
        return `https://www.youtube.com/embed/${trailer.key}`;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Trailer fetch error:", error);
      return null;
    }
  };

  useEffect(() => {
    // Trailer url-г авч хадгалах
    const fetchTrailer = async () => {
      const url = await getTrailerUrl(movieId);
      setTrailerUrl(url);
    };

    if (movieId) {
      fetchTrailer();
    }
  }, [movieId]);

  return (
    <div className="relative" style={{ width: "100vw" }}>
      <img src={imgSrc} className="mt-[20px] w-[100vw]"></img>
      <div className="absolute top-[20%] left-[10%]">
        <h1 className="text-white text-[40px]">Now Playing:</h1>
        <h2 className="text-white text-[80px] font-bold">{title}</h2>
        <div className=" flex items-center">
          <Staricons />
          <span className="text-white">{rate}</span>
          <span className="text-gray-400">/10</span>
        </div>
        <p className="  w-[302px] text-[white] ">{exp}</p>
        <div
          className={`flex justify-center items-center w-[145px] h-[40px] border bg-white rounded-lg cursor-pointer mt-5 ${
            trailerUrl ? "" : "opacity-50 cursor-not-allowed"
          }`}
          onClick={() => trailerUrl && setShowTrailer(true)}
        >
          <Trailer />
          <button className="cursor-pointer">Watch Trailer</button>
        </div>
      </div>
      <div className="absolute top-[50%] left-[95%]">
        <button
          onClick={handleSlideChange}
          className="flex justify-center items-center bg-white rounded-full w-[60px] h-[60px] "
        >
          <Sumicons />
        </button>
      </div>
      <div className="absolute top-[50%] ">
        <button
          onClick={BackSlideChange}
          className="flex justify-center items-center bg-white rounded-full w-[60px] h-[60px] "
        >
          <LeftSumiconst />
        </button>
      </div>
      {showTrailer && trailerUrl && (
        <div
          className="fixed inset-0 bg-opacity-75 flex justify-center items-center z-50"
          onClick={() => setShowTrailer(false)}
        >
          <div
            className="relative w-[80vw] h-[45vw] max-w-4xl max-h-[56.25vw]"
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
              className="absolute top-2 right-2 text-white text-3xl font-bold"
              onClick={() => setShowTrailer(false)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
