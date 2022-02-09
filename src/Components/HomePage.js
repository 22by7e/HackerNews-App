import './HomePage.css';
import SearchBar from './SearchBar';

function HomePage() {
  return (
    <div className="HomePage">
      <h1 className="Title">HackerNews Daily</h1>
      <SearchBar placeholder="Enter a Search Term..."/>
    </div>
  );
}

export default HomePage;