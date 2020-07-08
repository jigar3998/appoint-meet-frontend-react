import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { CopyOutlined } from "@ant-design/icons";

import { message } from "antd";

function CopyUrl(props) {
  return (
    <div>
      {props.title}
      <CopyToClipboard
        text={props.copytext}
        onCopy={() => message.success("Copied")}
      >
        <CopyOutlined style={{ fontSize: "21px", float: "right" }} />
      </CopyToClipboard>
    </div>
  );
}

export default CopyUrl;
