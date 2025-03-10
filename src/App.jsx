import { useEffect, useState } from "react";
import Search from "./component/search/Search";
import Loading from "./component/loading/Loading";
import Card from "./component/card/Card";
import { useDebounce } from "react-use";
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
  const [debounceSearchTerm, setDebounceSearchTerm] = useState("");

  // optimizing the search
  useDebounce(() => setDebounceSearchTerm(searchTerm), 500, [searchTerm]);

  // fetch movies
  const fetchMovieList = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const endPoint = query
        ? `${API_BASE_URL}/search/movie?query=${query}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
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
    fetchMovieList(debounceSearchTerm);
  }, [debounceSearchTerm]);
  return (
    <main className="overflow-x-hidden">
      <div className="pattern" />
      <div className="wrapper">
        {/* header part  */}
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

        {/* movies showing section  */}
        <section className="all-movies my-5">
          <a href="/">
            <h2 className="text-white ">All Movies</h2>
          </a>
          {isLoading ? (
            <Loading></Loading>
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul className="mt-8">
              {movieList.map((movie) => (
                <Card key={movie.id} movie={movie}></Card>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

export default App;
