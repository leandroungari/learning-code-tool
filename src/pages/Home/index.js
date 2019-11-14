import React, { 
  useEffect
} from 'react';

import { useDispatch } from 'react-redux';

import {
  Header,
} from '../../components';

import {
  server
} from '../../services';

import { 
  listRepositories 
} from '../../action';

function Home() {
  
  const dispatch = useDispatch();

  useEffect(() => {

    async function listOfRepositories() {
      fetch(`${server.host}/metrics/availableRepositories`)
      .then(result => result.json())
      .then(result => {
        dispatch(listRepositories(result));
      });
    }

    document.title = 'Learning Code Tool';
    listOfRepositories();
    
  }, [dispatch]);

  return (
    <>
      <Header />
    </>
  );
}

export default Home;
