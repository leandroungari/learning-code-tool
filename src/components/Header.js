import React, { useEffect, useState } from 'react';
import fetch from 'isomorphic-unfetch';

import TopBar from './header/TopBar';
import TextFieldHeader from './header/TextFieldHeader';




function Header(props) {

  const [listing, setListing] = useState([]);

  const getListing = async () => {
    fetch('http://localhost:8080/metrics/listRepositories')
      .then(result => result.json())
      .then(result => {
        setListing(result);
      });
  }


  useEffect(() => {

    
    getListing();

  }, []);

  return (
    <>
      <TopBar>
        <img src="/static/images/code-solid-white.svg" style={{
          width: 25,
          height: 25,
        }} />
        <TextFieldHeader
          placeholder="Search here ..."
          list={listing}
          clickItemList={(event, value) => { }}
        />
      </TopBar>
    </>
  );
}


export default Header;