import { Staricons } from "../_icons/Star";
import { Sumicons } from "../_icons/Sum";
import { Trailer } from "../_icons/Trailer";

export const MovieSlide = (props) => {
  const { title, exp, imgSrc, rate, handleSlideChange } = props;
  console.log(imgSrc);

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
        <div className="flex justify-center items-center w-[145px] h-[40px] border bg-white rounded-lg">
          <Trailer />
          <button>Watch Trailer</button>
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
    </div>
  );
};
