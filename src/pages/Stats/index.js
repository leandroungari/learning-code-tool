import React, {
  useEffect
} from "react";


import { Header } from "../../components";
import { Row, Typography } from "antd";
import LinePlot from "../../components/LinePlot";

import NumberOfAuthors from "./stats/NumberOfAuthors";

function Stats() {

  


  useEffect(() => {

    
  }, []);

  return(
    <Row>
      <Header />
      <Row style={{
        margin: 50
      }}>
        <Typography.Title
          level={4}
        >
          Number of files per commit
        </Typography.Title>
      
        <NumberOfAuthors />
      </Row>
      
    </Row>
  );
}

export default Stats;