import React, {
  useEffect,
  useState,
} from 'react';
import { useHistory } from 'react-router-dom';

import { useParams } from 'react-router-dom';

import {
  useDispatch,
  useSelector
} from 'react-redux';

import {
  Container,
  Header,
  GlobalStyle,
  RepositoryData,
  DataArea
} from '../../components';

import {
  server
} from '../../services';

import { 
  storeBranches, 
  storeCommits 
} from '../../action/repositories';

export default function Repository() {

  const { name } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const listOfRepositories = useSelector(
    ({ repositories }) => repositories.listOfRepositories
  );

  const [branches, setBranches] = useState([]);
  const [commits, setCommits] = useState([]);
  
  function totalOfCommitsInAllBranches() {

    return Object
      .entries(commits)
      .reduce((total, [_, listOfCommits]) => {
        return total + listOfCommits.length;
      }, 0);
  }


  useEffect(() => {

    async function obtainBranches() {
      const result = [];
      const branches = await fetch(`${server.host}/repo/${name}/branches`)
        .then(result => result.json());
      for (const branch of branches) {
        if (!result.includes(branch)) {
          result.push(branch);
        }
      }
      setBranches(result);
      dispatch(storeBranches(result));
    };
    obtainBranches();
  }, [dispatch, name]);

  useEffect(() => {


    async function obtainCommits() {
      
      const result = await branches
        .reduce(async (result, branch) => {
          (await result)[branch.id.name] = await fetch(`${server.host}/repo/${name}/${branch.id.name}/commits`)
            .then(result => result.json());
          return result;
        }, {});

      setCommits(result);
      dispatch(storeCommits(result));
    }
    obtainCommits();
  }, [name, branches, dispatch]);

  return (
    <>
      <GlobalStyle />
      <Header
        searchOptions={listOfRepositories}
        optionAction={(_, value) => {
          history.push(`/repository/${value}`);
        }}
      />
      <Container
        margin="50px"
      >
        <RepositoryData
          name={name}
          numBranches={branches.length}
          numCommits={totalOfCommitsInAllBranches()}
        />
        <DataArea 
          title="Average of Metrics Of Files"
          onClick={() => {
            history.push(`/plot/${name}`, {
              plotName: 'average-metrics-files'
            });
          }}
        ></DataArea>
      </Container>
    </>
  );
}
