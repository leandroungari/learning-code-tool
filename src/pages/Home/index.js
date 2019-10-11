import React, { 
  useState,
  useEffect
} from 'react';
import { useHistory } from 'react-router-dom';

import {
  Header,
  GlobalStyle
} from '../../components';

import {
  server
} from '../../services';

function Home() {
  
  const history = useHistory();
  const [repositories, setRepositories] = useState([]);

  async function listOfRepositories() {
    fetch(`${server.host}/metrics/listRepositories`)
    .then(result => result.json())
    .then(result => setRepositories(result));
  }

  useEffect(() => {
    document.title = 'Learning Code Tool';
    listOfRepositories();
  }, []);

  return (
    <>
      <GlobalStyle />
      <Header 
        searchOptions={repositories}
        optionAction={(_, value) => {
          history.push(`/repository/${value}`);
        }}
      />
    </>
  );
}

export default Home;
