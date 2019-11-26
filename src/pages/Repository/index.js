import React, {
  useMemo
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
  currentRepository
} from '../../action';

import { List, Row } from 'antd';

export default function Repository() {

  const dispatch = useDispatch();
  const history = useHistory();

  const {
    listOfRepositories

  } = useSelector(({ repositories }) => repositories);

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
    },
    {
      title: "Stats",
      description: "",
      onClick: () => history.push("/repository/stats")
    }
  ]), [history]);

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
        <TitlePage />
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
