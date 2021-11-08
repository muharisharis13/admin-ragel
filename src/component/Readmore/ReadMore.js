import React, { useState } from 'react'
import styled from 'styled-components'

export const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text">
      {isReadMore ? text.slice(0, 100) : text}
      <span onClick={toggleReadMore} className="read-or-hide">
        {isReadMore ? <ButtonReadMore>Read More</ButtonReadMore> : <ButtonReadMore>Less More</ButtonReadMore>}
      </span>
    </p>
  );
}

const ButtonReadMore = styled.div`
cursor:pointer;
display:inline-flex;
background: gray;
margin:0px 20px;
color:#fff;
padding:2px 10px;
font-size:9pt;
border-radius : 7px;
`
