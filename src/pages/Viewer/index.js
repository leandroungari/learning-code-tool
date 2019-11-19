import React, {
  useEffect, 
  useCallback,
  useState,
  useMemo
} from "react";

import {
  Header
} from "../../components";

import {
  useLocation
} from "react-router-dom";

import {
  parseDiff, 
  Diff, 
  Hunk
} from 'react-diff-view';

import { server } from "../../services";

import {
  useSelector
} from "react-redux";

import "react-diff-view/style/index.css";

import { Row } from "antd";

function Viewer() {

  const location = useLocation();

  const [ files, setFiles ] = useState([]);

  const { commit, type } = location.state;

  const {
    name: nameOfRepository,
  } = useSelector(({repositories}) => repositories.repository);

  const {
    listCommits
  } = useSelector(({metrics}) => metrics);

  const branch = useMemo(() => {
    return listCommits[type].branchId;
  }, [listCommits, type]);

  useEffect(() => {
    document.title = "Learning Code Tool";
  }, []);

  useEffect(() => {
    fetch(`${server.host}/repo/${nameOfRepository}/${branch}/${commit}/diffInCommit`)
    .then(result => result.json())
    .then(result => setFiles(parseDiff(result)));
  }, [branch, commit, nameOfRepository]);

  const renderFile = useCallback(({oldRevision, newRevision, type, hunks}) => {
    return (
      <Diff 
        key={oldRevision + '-' + newRevision} 
        viewType="split" 
        diffType={type} 
        hunks={hunks}
      >
        {
          hunks => hunks.map(
            hunk => <Hunk key={hunk.content} hunk={hunk} />
          )
        }
      </Diff>
    );
  }, []);

  return(
    <>
      <Header />
      <Row
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          margin: "30px 0"
        }}
      >
        <Row
          style={{
            width: "95%",
            fontSize: 12
          }}
        >
          { files.map(renderFile) }
        </Row>
      </Row>
    </>
  );
}

export default Viewer;