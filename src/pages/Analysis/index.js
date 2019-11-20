import React, {
  useEffect,
  useState
} from 'react';

import {
  Row, 
} from 'antd';

import {
  useSelector
} from "react-redux";

import {
  useHistory
} from "react-router-dom";

import { 
  Header, 
  ListCommit 
} from '../../components';
import { server } from '../../services';

function Analysis() {

  const history = useHistory();
  const [ branchList, setBranchList ] = useState([]);

  const {
    name: nameOfRepository
  } = useSelector(({repositories}) => repositories.repository);

  const {
    good,
    bad
  } = useSelector(({metrics}) => metrics.listCommits);

  useEffect(() => {
    fetch(`${server.host}/repo/${nameOfRepository}/branches`)
    .then(result => result.json())
    .then(result => setBranchList(result));
  }, [nameOfRepository]);

  return(
    <Row>
      <Header />
      <ListCommit 
        branches={branchList}
        title="List of Best Commits"
        width={600}
        type="good"
        data={good.list}
        commitAction={(id, type) => {
          history.push(
            "/repository/analysis/viewer", 
            { type, commit: id }
          );
        }}
      />
      <ListCommit 
        branches={branchList}
        title="List of Worst Commits"
        width={600}
        type="bad"
        data={bad.list}
        commitAction={(id) => {
          history.push(
            "/repository/analysis/viewer", 
            {
              commit: id
            }
          );
        }}
      />
    </Row>
  );
}


export default Analysis;