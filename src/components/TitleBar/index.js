import React from "react";
import { Row, Typography } from "antd";

function TitleBar(props) {

  const { children, title} = props;

  return(
    <Row style={{
      borderRadius: "5px 5px 0 0",
      border: "1px solid #dedede",
      margin: "15px 0"
    }}>
      <Row 
        style={{
          display: "flex",
          padding: "10px 14px",
          borderBottom: "1px solid #dedede"
        }}
      >
        <Typography.Text
          style={{
            color: "#222",
            fontWeight: "bold",
            fontSize: 12,
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