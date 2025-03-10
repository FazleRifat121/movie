import { useState } from "react";
import Search from "./component/search/Search";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
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
          <h1 className="text-white">{searchTerm}</h1>
        </header>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}></Search>
      </div>
    </main>
  );
}

export default App;
