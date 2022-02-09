import React, { useEffect, useState } from "react";
import "./SearchBar.css";
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import HashLoader from "react-spinners/HashLoader";
import NewsCard from "./NewsCard";

function SearchBar({ placeholder }) {
  const [wordEntered, setWordEntered] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState(0);
  const [loading, setLoading] = useState(false);

  const clearData = () => {
    setData([]);
  };

  const handleSearch = (event) => {
    setLoading(true);
    event.preventDefault(); 
    const searchWord = event.target.elements.Query.value;
    setWordEntered(searchWord);
    setError(0);
  };


  useEffect(() => {
    if(wordEntered.length > 0) {
      console.log(wordEntered);
      axios({
        method: 'get',
        url: `http://hn.algolia.com/api/v1/search?query=${wordEntered}`,
        responseType: 'json'
      }).then(function (response) {
        console.log(response.data.hits);
        setData(response.data.hits);
        setLoading(false);
        if(response.data.hits.length === 0) {
          setError(1);
        }
      });
    }
  }, [wordEntered])

  const override = `
    display: block;
    margin: auto;
    margin-top: 125px;
    border-color: red;
  `;

  return (
    <div>
    { loading ? <HashLoader css={override} color={"white"} loading={loading} size=  {100} /> :
      <div className="search">
        {
          data.length === 0 && <div className="searchInputs">
          <form onSubmit={handleSearch}>
            <input 
              type="text"
              placeholder={placeholder}
              name="Query"
            />
          </form>
          <div className="searchIcon">
            <SearchIcon />
          </div>
          </div>
        }
        <div className="News">
          {
            data.length > 0 && <h2 className="searchTitle">{`Search results for "${wordEntered}"`}🔍</h2>
          }
          {
            error === 1 && <h2 className="searchTitle">{`No results found for "${wordEntered}"`}💩</h2>
          }
          {
            data.map((news) => news.title && <NewsCard title={news.title} date={news.created_at} id={news.objectID} points={news.points} clearData={clearData}/>)
          }
        </div>
      </div>
      }
    </div>
  ); 
}

export default SearchBar;