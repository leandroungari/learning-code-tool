import React, {
  useMemo,
  useEffect,
  useCallback
} from 'react';

import {
  useSelector,
  useDispatch
} from 'react-redux';

import {
  server
} from '../../services';

import { 
  storeRepository
} from '../../action';

import {
  Typography
} from 'antd';

const {
  Title,
  Text
} = Typography;

export default function TitlePage() {

  const dispatch = useDispatch();

  const {
    repository,
    current: name
  } = useSelector(({ repositories }) => repositories);

  const numBranches = useMemo(() => {
    return repository.branches ? repository.branches.length : 0;
  }, [repository.branches]);

  const numCommits = useMemo(() => {
    return repository.commits ? Object
      .entries(repository.commits)
      .reduce((total, [_, listOfCommits]) => (
        total + listOfCommits.length
      ), 0) : 0;
  }, [repository.commits]);

  const retrieveCommits = useCallback( async (name,branches) => {
    return await branches
    .reduce(async (result, branch) => {
      (await result)[branch.id.name] = await fetch(`${server.host}/repo/${name}/${branch.id.name}/commits`)
        .then(result => result.json());
      return result;
    }, {});
  }, []);

  useEffect(() => {
    if(name !== repository.name) {
      console.log("name", name, repository.name)
      fetch(`${server.host}/repo/${name}/branches`)
      .then(result => result.json())
      .then(branches => {  
        
        retrieveCommits(name,branches)
        .then(result => {
          const commits = Object
          .entries(result)
          .reduce((total,[branch,commits]) => {
            return {
              ...total,
              [branch]: commits
                .map(commit => commit.id.name)
                .reduce((total, a) => ([a, ...total]), [])
            }
          }, {});
          
          dispatch(storeRepository(
            name,
            branches,
            commits
          ));
        });

      });
    }
  }, [dispatch, name, repository.name, retrieveCommits]);

  return (
    <>
      <Title level={2}>#{name}</Title>
      <Text>This repository has <strong>{numBranches}</strong> branche(s) with a total of <strong>{numCommits}</strong> commit(s).</Text> 
    </>
  );
}
