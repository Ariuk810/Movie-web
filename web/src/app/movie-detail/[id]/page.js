"use client";
import { Footer } from "@/app/_features/Footer";
import { Header } from "@/app/_features/Header";
import { Staricons } from "@/app/_icons/Star";
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

export default function MovieDetail() {
  const param = useParams();
  const { id } = param;
  const [loading, setLoading] = useState(false);
  const [upcomingMoviesData, setUpcomingMoviesData] = useState([]);

  const apiLink = `https://api.themoviedb.org/3//movie/${id}?language=en-US`;
  const getData = async () => {
    setLoading(true);
    const data = await fetch(apiLink, options);
    const jsonData = await data.json();
    console.log("this is json", jsonData);
    setUpcomingMoviesData(jsonData);
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
      <div className=" w-[1080px] h-[524px] ml-[10%] mt-[5%] ">
        <div className="flex justify-between">
          <div>
            <h1 className="text-black font-bold text-4xl">Wicked</h1>
            <p className="text-black">2024.11.26 · PG · 2h 40m</p>
          </div>
          <div>
            <p className="font-bold">Rating</p>
            <div className="flex items-center">
              <Staricons />
              <div>
                <p className="text-black font-bold">
                  6.9 <span className="text-gray-500">/10</span>{" "}
                </p>
                <p className="text-gray-500">37k</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
