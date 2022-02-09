import React from 'react';
import { Link } from 'react-router-dom';
import './NewsCard.css';

function NewsCard(props) {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }
 
  return(
    <div>
      <div className='cardContainer'>
        <div className='cardTitle'>
          {props.title}
          <p></p>
        </div>
        <div className='cardBody'> 
          {formatDate(props.date)}
          <Link to={`/${props.id}`}>
            <button className='cardButton'>
              View Full News
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;