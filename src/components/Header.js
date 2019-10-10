import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  TopBar,
  TextFieldHeader
} from '../components/header';

import { 
  ReactComponent as Code 
} from '../assets/images/code-solid.svg'; 


function Header(props) {

  const [listing, setListing] = useState([]);
  const dispatch = useDispatch();

  const getListing = async () => {
    fetch('http://localhost:8080/metrics/listRepositories')
    .then(result => result.json())
    .then(result => {
      setListing(result);
    });
  }

  function currentRepository(name) {
    dispatch({
      type: 'SELECT_REPOSITORY', 
      repository: name
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
          onClickItem={(_, value) => {
            currentRepository(value);
          }}
        />
      </TopBar>
    </>
  );
}


export default Header;