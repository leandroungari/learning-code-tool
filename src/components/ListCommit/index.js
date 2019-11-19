import React, {
  useState, 
  useEffect,
  useCallback
} from "react";

import {
  useSelector,
  useDispatch
} from "react-redux";

import {
  Col,
  Typography,
  Row,
  Radio,
  List,
  Select
} from 'antd';

import { server } from "../../services";

import { 
  storeGoodCommits, 
  storeBadCommits 
} from "../../action";

const { Title, Text } = Typography;

function Header (props) {

  const dispatch = useDispatch();

  const { 
    title,  
    branches,
    type
  } = props;

  const {
    name: repositoryName

  } = useSelector(({repositories}) => repositories.repository);

  const [ radioGroupOption, setRadioGroupOption ] = useState("wmc");
  const [ selectOption, setSelectOption ] = useState(undefined);

  const handleRadioGroupChange = useCallback(event => {
    setRadioGroupOption(event.target.value);
  }, [setRadioGroupOption]);

  const handleSelect = useCallback(value => {
    setSelectOption(
      branches
      .filter(branch =>branch.name.includes(value))[0]
    );
  }, [branches]);

  useEffect(() => {
    
    if(selectOption) {

      const {
        id
      } = selectOption;

      fetch(`${server.host}/metrics/relevant/${repositoryName}/${id.name}/${radioGroupOption}/average`)
      .then(result => result.json())
      .then(result => {
        if(type === "good") {
          dispatch(storeGoodCommits(id.name, result.good))
        }
        else {
          dispatch(storeBadCommits(id.name, result.bad));
        }
      });
    }
  }, [dispatch, radioGroupOption, repositoryName, selectOption, type]);

  return(
    <Row style={{
      display: "flex",
      flexDirection: "column"
    }}>
      <Row>
        <Title level={4}>{title}</Title>
      </Row>
      <Row style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row"
      }}>
        <Col>
          <Radio.Group 
            value={radioGroupOption}
            onChange={handleRadioGroupChange}
          >
            <Radio value="wmc">WMC</Radio>
            <Radio value="cbo">CBO</Radio>
            <Radio value="dit">DIT</Radio>
            <Radio value="rfc">RFC</Radio>
            <Radio value="nosi">NOSI</Radio>
          </Radio.Group>
        </Col>
        <Col>
          <Select
            style={{width: 180}}
            placeholder="Select a branch"
            onSelect={handleSelect}
          >
            {
              branches.map(branch => (
                <Select.Option
                  key={branch.name}
                  value={branch.name}
                >
                  {branch.name.substring(13)}
                </Select.Option>
              ))
            }
          </Select>
        </Col>
      </Row>
    </Row>
  );
}

export default function ListCommit(props) {

  const {
    title,
    data,
    width,
    branches = [],
    type,
    commitAction = () => {}
  } = props;

  return(
    <Row style={{
      display: 'flex',
      margin: 50,
    }}>
      <List
        style={{
          display: 'flex',
          flexDirection: "column",
          width: width || 500
        }}
        header={
          <Header 
            { ... {
              title,
              branches,
              type
            }}
          />
        }
        bordered
        itemLayout="horizontal"
        size="large"
        dataSource={
          data
          .filter((_,index) => index < 10)
          .map(obj => {
            const [
              commit, value
            ] = Object.entries(obj)[0];

            return {
              type,
              commit,
              value
            }
          })
        }
        renderItem={(item) => (
          <List.Item
            style={{
              cursor: "pointer"
            }}
            onClick={() => commitAction(item.commit, type)}
          >
            <List.Item.Meta 
              title={item.commit}
            />
            <Text
              style={{
                color: "#1890ff",
                fontSize: 12
              }}
            >
              {(item.value*100).toFixed(3)}%
            </Text>
          </List.Item>
        )}
      />
    </Row>
  );
}