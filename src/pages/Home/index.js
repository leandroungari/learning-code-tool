import React, { 
  useState,
  useEffect
} from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
  Header,
} from '../../components';

import {
  server
} from '../../services';

function Home() {
  
  const history = useHistory();
  const dispatch = useDispatch();
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {

    async function listOfRepositories() {
      fetch(`${server.host}/metrics/availableRepositories`)
      .then(result => result.json())
      .then(result => {
        setRepositories(result);
        dispatch({
          type: 'LIST_REPOSITORIES',
          list: result
        });
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
          history.push(`/repository/${value}`);
        }}
        homeAction={() => {
          history.push("/");
        }}
      />
    </>
  );
}

export default Home;
