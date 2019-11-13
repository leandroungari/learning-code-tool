import React, { 
  useEffect
} from 'react';

import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  Header,
} from '../../components';

import {
  server
} from '../../services';

import { 
  currentRepository, 
  listRepositories 
} from '../../action/repositories';

function Home() {
  
  const history = useHistory();
  const dispatch = useDispatch();

  const repositories = useSelector(
    ({ repositories }) => repositories.listOfRepositories
  );

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
      <Header 
        searchOptions={repositories}
        optionAction={(value) => {
          dispatch(currentRepository(value));
          history.push(`/repository`);
        }}
        homeAction={() => {
          history.push("/");
        }}
      />
    </>
  );
}

export default Home;
