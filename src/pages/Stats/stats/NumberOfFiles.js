import React, {
  useState,
  useCallback,
  useEffect
} from "react";

import {
  Row,
  Form,
  Typography,
  AutoComplete
} from "antd";

import {
  useSelector
} from "react-redux";

import LinePlot from "../../../components/LinePlot";

import { server } from "../../../services";

function NumberOfFiles() {

  const [branch, setBranch] = useState(undefined);
  const [data, setData] = useState([]);
  
  const { 
    name,
    branches,
    commits
  } = useSelector(({repositories}) => repositories.repository);

  const handleSelectBranch = useCallback((value) => {
    const branchId = branches
      .filter(b => b.name.includes(value))[0]
      .id.name;

    setBranch(branchId);

  }, [branches]);

  const handleFilterBranch = useCallback((input, option) => (
    option.props.children.includes(input)
  ), []);

  useEffect(() => {

    if(branch) {

      fetch(`${server.host}/repo/${name}/${branch}/numberOfFiles`)
      .then(result => result.json())
      .then(result => {
        
        setData([{
          id: "Number of files",
          color: "red",
          data: result.map((item,index) => ({x: index, y: item}))
        }]);
      });
    }
    
  }, [branch, branches, commits, name]);

  return(
    <Row>
      <Typography.Title level={4}>
          Number of files per commit
      </Typography.Title>
      <Form.Item label="Branch">
        <AutoComplete 
          placeholder="Select a branch"
          style={{width: 200}}
          dataSource={branches.map(branch => branch.name)}
          onSelect={value => handleSelectBranch(value)}
          filterOption={handleFilterBranch}
        />
      </Form.Item>
      {
        data.length !== 0 &&
        <LinePlot 
          width={0.8*window.innerWidth}
          height={600}
          data={data} 
        /> 
      }
    </Row>
  );
}

export default NumberOfFiles;