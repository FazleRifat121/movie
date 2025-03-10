import { useEffect, useState } from "react";
import Search from "./component/search/Search";
import Loading from "./component/loading/Loading";
// Api
const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};
function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // fetch movies
  const fetchMovieList = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const endPoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endPoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error("Failed to fetch Movies");
      }
      const data = await response.json();
      if (data.Response === false) {
        setErrorMessage(data.error || "Failed to fetch");
        setMovieList([]);
        return;
      }
      setMovieList(data.results || []);
    } catch (err) {
      setErrorMessage(`Error: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  //fetch effect
  useEffect(() => {
    fetchMovieList();
  }, []);
  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="hero.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You Will Enjoy
            Without the Hassle
          </h1>

          <Search
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          ></Search>
        </header>
        <section className="all-movies mt-5">
          <h2 className="text-white ">All Movies</h2>
          {isLoading ? (
            <Loading></Loading>
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <p className="text-white">{movie.title}</p>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

export default App;
