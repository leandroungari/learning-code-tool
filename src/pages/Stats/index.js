import React, {
  useEffect
} from "react";


import { Header } from "../../components";
import { Row } from "antd";

import NumberOfAuthors from "./stats/NumberOfAuthors";
import NumberOfFiles from "./stats/NumberOfFiles";

function Stats() {

  


  useEffect(() => {

    
  }, []);

  return(
    <Row>
      <Header />
      <Row style={{
        margin: 50
      }}>
        <NumberOfFiles />
        <NumberOfAuthors />
      </Row>
      
    </Row>
  );
}

export default Stats;