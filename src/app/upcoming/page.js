"use client";

import { Footer } from "../_features/Footer";
import { Header } from "../_features/Header";
import { MovieList } from "../_features/MovieList";

export default function Home() {
  return (
    <div>
      <Header />
      <MovieList order={"Upcoming"} apiName="upcoming" showPage={true} />
      <Footer />
    </div>
  );
}
