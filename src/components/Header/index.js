import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  TopBar,
  TextFieldHeader
} from '../../components';

import { 
  ReactComponent as Code 
} from './assets/code-solid.svg'; 


function Header() {

  const dispatch = useDispatch();
  const history = useHistory();

  const [listing, setListing] = useState([]);

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
            history.push('/repository');
          }}
        />
      </TopBar>
    </>
  );
}


export default Header;