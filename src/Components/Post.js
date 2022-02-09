import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DOMPurify from 'dompurify';
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './Post.css';

function Post(props) {
  let { handle } = useParams();
  const objId = handle;
  const [postData, setPostData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(objId > 0) {
      axios({
        method: 'get',
        url: `http://hn.algolia.com/api/v1/items/${objId}`,
        responseType: 'json'
      }).then(function(response) {
        setPostData(response.data);
        setLoading(false);
      });
    }
  }, [objId])
  
  const override = `
    display: block;
    margin: auto;
    margin-top: 260px;
    border-color: red;
  `;

  return(
    <div>
      { loading ? <ClimbingBoxLoader css={override} color={"white"} loading={loading} size={20} /> :
        <div className='post'>
          <div className='postContainer'>
            <div className='postTitle'>
              <h1>📰  {postData.title}</h1>
            </div>
            <div className='postPoints'>
              <p>💯  {postData.points && `Points: ${postData.points}`}</p>
            </div>
          </div>   
          {
            postData.title &&
            postData.children.map((comment) => 
            comment.author && 
            <div className='postBody'>
              <div className='profileWidget'>
                <AccountCircleIcon className='icon' color="disabled" fontSize="large"/>
                <h4>{comment.author}</h4>
              </div>
         
              <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(comment.text)}}>
              </div>
              <p></p>
            </div>
            )
        }  
        </div>
      }
    </div>
    
  );
}

export default Post;
