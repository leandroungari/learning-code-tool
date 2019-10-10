import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
  TopBar,
  TextFieldHeader
} from '../../components';

import { 
  ReactComponent as Code 
} from './assets/code-solid.svg'; 


function Header() {

  const history = useHistory();

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
          onClickItem={(_, value) => {
            history.push(`/repository/${value}`);
          }}
        />
      </TopBar>
    </>
  );
}


export default Header;