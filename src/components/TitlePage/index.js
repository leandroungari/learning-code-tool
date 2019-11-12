import React, {
  useMemo
} from 'react';

import {
  useSelector
} from 'react-redux';

import {
  Typography
} from 'antd';

const {
  Title,
  Text
} = Typography;

export default function TitlePage(props) {

  const { name } = props;

  const commits = useSelector(
    ({ repositories }) => repositories.commits
  );

  const branches = useSelector(
    ({ repositories }) => repositories.branches
  );

  const numBranches = useMemo(() => {
    return branches ? branches.length : 0;
  }, [branches]);

  const numCommits = useMemo(() => {
    return commits ? Object
      .entries(commits)
      .reduce((total, [_, listOfCommits]) => (
        total + listOfCommits.length
      ), 0) : 0;
  }, [commits]);

  return (
    <>
      <Title level={2}>#{name}</Title>
      <Text>This repository has <strong>{numBranches}</strong> branche(s) with a total of <strong>{numCommits}</strong> commit(s).</Text> 
    </>
  );
}
