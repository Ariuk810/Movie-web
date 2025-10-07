"use client";
import { useParams } from "next/navigation";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export default function Genres() {
  const param = useParams();
  const { id } = param;

  const apiLink = `https:/api.themoviedb.org/3 /discover/movie?language=en&with_genres=${id}&page=${1}`;
  const getData = async () => {
    const data = await fetch(apiLink, options);
    const jsonData = await data.json();
  };
  return <div className="font-bold text-5xl">sdxfcgvhbjn</div>;
}
