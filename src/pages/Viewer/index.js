import React, {
  useEffect, 
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

import { 
  Row, 
  Typography 
} from "antd";

import TitleBar from "../../components/TitleBar";

const {
  Text,
  Title
} = Typography;


function Viewer() {

  const location = useLocation();
  const [ files, setFiles ] = useState([]);
  const [ info, setInfo ] = useState({
    fullMessage: "",
    shortMessage: "",
    author: "",
    email: "",
    date: ""
  });
  const { commit, type } = location.state;

  console.log(info)

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
    fetch(`${server.host}/repo/${nameOfRepository}/${branch}/${commit}/info`)
    .then(result => result.json())
    .then(result => setInfo(result));
  }, [branch, commit, nameOfRepository]);

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
          flexDirection: "column",
          alignItems: "center",
          margin: "30px 0"
        }}
      >
        <Row
          style={{
            display: "flex",
            margin: "0 30px",
            flexDirection: "column",
            alignSelf: "flex-start"
          }}
        >
          <Title level={4}>{info.shortMessage}</Title>
          <Text>
            <strong>{info.id}</strong><br/>
            Author: {info.authorName}<br/>
            Email: {info.email}<br/>
            Date: {info.date}<br/>
            Description: {info.fullMessage}
          </Text>

        </Row>
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