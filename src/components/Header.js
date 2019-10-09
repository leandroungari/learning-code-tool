import React, { useEffect, useState } from 'react';

import TopBar from './header/TopBar';
import TextFieldHeader from './header/TextFieldHeader';

import Code from '../assets/images/code-solid.svg'; 


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
        <Code 
          width={25} 
          height={25} 
          fill='#fff' 
        />
        <TextFieldHeader
          placeholder="Search here ..."
          list={listing}
          clickItemList={(event) => {
            console.log("teste");
          }}
        />
      </TopBar>
    </>
  );
}


export default Header;