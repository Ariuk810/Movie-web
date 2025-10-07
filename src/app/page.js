"use client";
import { Header } from "./_features/Header";

import { HeroSection } from "./_features/HeroSection";
import { MovieList } from "./_features/MovieList";
import { Footer } from "./_features/Footer";

const apiLink =
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <MovieList
        order={"Upcoming"}
        apiName="upcoming"
        start={0}
        end={10}
        seemore={"See More"}
        folder="/upcoming"
        showPage={false}
      />
      <MovieList
        order={"Popular"}
        apiName="popular"
        start={0}
        end={10}
        seemore={"See More"}
        folder="/popular"
        showPage={false}
      />
      <MovieList
        order={"Top Rated"}
        apiName="top_rated"
        start={0}
        end={10}
        seemore={"See More"}
        folder="/topRated"
        showPage={false}
      />
      <Footer />
    </>
  );
}
