import React, { 
  useEffect,
  useCallback,
  useState
} from "react";

import { 
  Row, 
  Typography, 
  Form,
  AutoComplete
} from "antd";

import {
  LinePlot
} from "../../../components";

import {
  useSelector
} from "react-redux";

import { server } from "../../../services";

function NumberOfAuthors() {

  const [branch, setBranch] = useState(undefined);
  const [data, setData] = useState([]);
  console.log(data)
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

  useEffect(() => {

    if(branch) {
      
      const result = commits[branch].map(async commit => {
        return await fetch(`${server.host}/repo/${name}/${branch}/${commit}/info`)
          .then(result => result.json());
      });
  
      Promise
      .all(result)
      .then(data => {
        const result = data.reduce((total, commit, index) => {
          return [
            ...total,
            {
              ...(index === 0 ? {} : total[index-1]),
              [commit.email]: ''
            }
          ];
        }, []);
        setData([{
          id: "contributors",
          color: "hsl(93, 70%, 50%)",
          data: result
            .map(item => Object.keys(item).length)
            .map((item,index) => ({x: index, y: item}))
        }]);
      });
    }
    
  }, [branch, branches, commits, name]);

  const handleFilterBranch = useCallback((input, option) => (
    option.props.children.includes(input)
  ), []);

  return(
    <Row>
      <Typography.Title
        level={4}
      >
        Number of contributors until the commit
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

export default NumberOfAuthors;