import React, {
  useEffect, useState, useMemo, useCallback,
} from 'react';

import { useHistory } from 'react-router-dom';

import {
  useDispatch,
  useSelector
} from 'react-redux';

import {
  Header,
  TitlePage
} from '../../components';

import {
  server
} from '../../services';

import { 
  storeBranches, 
  storeCommits,
  currentRepository
} from '../../action';

import { List, Row } from 'antd';

export default function Repository() {

  const dispatch = useDispatch();
  const history = useHistory();

  const {
    listOfRepositories,
    current:nameOfRepository

  } = useSelector(({ repositories }) => repositories);

  const [ branches, setBranches ] = useState([]);
  const [ commits, setCommits ] = useState({});

  const listItems = useMemo(() => ([
    {
      title: "Average of Metrics of Files",
      description: "",
      onClick: () => history.push(`/repository/plots`, { plotName: 'average-metrics-files' })
    },
    {
      title: "Average of Metrics of Files (Normalized)",
      description: "",
      onClick: () => history.push(`/repository/plots`, { plotName: 'normalized-average-metrics-files' })
    },
    {
      title: "Sum of Metrics of Files",
      description: "",
      onClick: () => history.push(`/repository/plots`, { plotName: 'sum-metrics-files' })
    },
    {
      title: "Sum of Metrics of Files (Normalized)",
      description: "",
      onClick: () => history.push(`/repository/plots`, { plotName: 'normalized-sum-metrics-files' })
    },
    {
      title: "Evolution of Files by Metrics",
      description: "",
      onClick: () => history.push(`/repository/plots`, { plotName: 'evolution-files-metrics' })
    }
  ]), [history]);

  useEffect(() => {
    if(nameOfRepository !== undefined) {
      fetch(`${server.host}/repo/${nameOfRepository}/branches`)
      .then(result => result.json())
      .then(branches => {  
        const result = [];
        for (const branch of branches) {
          if (!result.includes(branch)) {
            result.push(branch);
          }
        }
        setBranches(branches);
      });
    }
  }, [nameOfRepository]);

  useEffect(() => {
    dispatch(storeBranches(branches));
  }, [branches, dispatch]);

  const retrieveCommits = useCallback( async (name,branches) => {
    return await branches
    .reduce(async (result, branch) => {
      (await result)[branch.id.name] = await fetch(`${server.host}/repo/${name}/${branch.id.name}/commits`)
        .then(result => result.json());
      return result;
    }, {});
  }, []);
  
  useEffect(() => {

    retrieveCommits(nameOfRepository,branches)
    .then(result => {
      const commits = Object
      .entries(result)
      .reduce((total,[branch,commits]) => {
        return {
          ...total,
          [branch]: commits.map(commit => commit.id.name)
        }
      }, {});
      setCommits(commits);
    });

  }, [branches, nameOfRepository, retrieveCommits]);

  useEffect(() => {
    dispatch(storeCommits(commits));
  }, [commits, dispatch]);

  return (
    <>
      <Header
        searchOptions={listOfRepositories}
        optionAction={value => {
          dispatch(currentRepository(value));
          history.push(`/repository`);
        }}
        homeAction={() => {
          history.push("/");
        }}
      />
      <Row style={{
        display: 'flex', 
        margin: 50,
        flexDirection: 'column'
      }}>
        <TitlePage name={nameOfRepository} />
        <Row style={{ marginTop: 30}}>
          <List
            style={{width: 320}}
            size="large"
            bordered
            itemLayout="horizontal"
            dataSource={listItems}
            renderItem={item => (
              <List.Item
                style={{ cursor: "pointer" }}
                onClick={item.onClick}
              >
                <List.Item.Meta
                  title={item.title}
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </Row>
      </Row>
    </>
  );
}
