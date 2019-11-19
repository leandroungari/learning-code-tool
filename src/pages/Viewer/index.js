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

import ReactDiffViewer from "react-diff-viewer";
import { server } from "../../services";

import {
  useSelector
} from "react-redux";

import { Row } from "antd";
import TitleBar from "../../components/TitleBar";

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
    .then(result => setFiles(result));
  }, [branch, commit, nameOfRepository]);

  console.log(files)

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
          {
            files.map((file,index) => (
              <TitleBar
                key={index}
                title={`${file.oldFile} -- ${file.newFile}`}
              >
                <ReactDiffViewer 
                  oldValue={file.oldContent} 
                  newValue={file.newContent}
                  splitView={true}
                  styles={{
                    line: {
                      height: 12
                    }
                  }}
                />
              </TitleBar>
            ))
          }
        </Row>
      </Row>
    </>
  );
}

export default Viewer;