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
  Header, 
  ListCommit 
} from '../../components';
import { server } from '../../services';

function Analysis() {

  const [ branchList, setBranchList ] = useState([]);

  const {
    name: nameOfRepository
  } = useSelector(({repositories}) => repositories.repository);

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
      />
      <ListCommit 
        branches={branchList}
        title="List of Worst Commits"
        width={600}
      />
    </Row>
  );
}


export default Analysis;