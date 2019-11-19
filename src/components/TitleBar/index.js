import React from "react";
import { Row, Typography } from "antd";

function TitleBar(props) {

  const { children, title} = props;

  return(
    <Row>
      <Row 
        style={{
          display: "flex",
          backgroundColor: "#001529"
        }}
      >
        <Typography.Text
          style={{
            color: "#fff",
            fontWeight: "bold"
          }}
        >
          {title}
        </Typography.Text>
      </Row>
      <Row>
        { children }
      </Row>
    </Row>
  );
}

export default TitleBar;