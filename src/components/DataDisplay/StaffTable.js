import React, { useState, useEffect, useContext } from "react";

import { Form, Input, Button, Radio, Table, Space, message } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

import { Url } from "../../constants/ServerUrl";
import axios from "axios";
import { GlobalContext } from "../../context/GlobalState";

function ProviderTable(props) {
  const contextData = useContext(GlobalContext);

  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  let requesurl;
  if (contextData.loginData.business_id !== undefined) {
    //find staff by id 
    requesurl ="/staff/" + contextData.loginData.business_id;
  } else if (props.business_id !== undefined) {
    //find staff by id
    requesurl ="/staff/" + props.business_id;    
  } else if (props.service_id !== undefined) {
    //find staff by service name
    requesurl ="/staff&service/" + props.service_id;
  }
  useEffect(() => {
    loadStaff();            
  }, []);
  let loadStaff = () => {
    setLoading(true);

    axios
      .get(Url + requesurl)
      // .get(Url + "/staff/" + "29")
      .then(function (response) {
        console.log(response.data);
        setLoading(false);
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error.response);
        message.error("Something went wrong. Please try again");
        setLoading(false);
      });
  };

  let searchInput = undefined;
  const getColumnSearchProps = () => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput = node;
          }}
          placeholder={`Search Staff`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),

    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record["staff_name"].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.select());
      }
    },
    render: (text) => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  });
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const handleSearch = (selectedKeys, confirm) => {
    confirm();
    setSearchText(selectedKeys[0]);
  };

  const columns = [
    {
      title: "Staff",
      dataIndex: "staff_name",
      sorter: (a, b) => a.staff_name.localeCompare(b.staff),
      // width: props.tableWidth[0],
      // ellipsis: true,
      ...getColumnSearchProps(),
    },
    {
      title: "Email",
      dataIndex: "staff_email",
      // width: props.tableWidth[0],
      // ellipsis: true,
    },
  ];
  return (
    <div  style={{overflow:"auto"}}>
      <Table
        rowSelection={props.rowSelection}
        columns={columns}
        dataSource={data}
        bordered={props.bordered}
        pagination={props.pagination}
        scroll={props.scroll}
        rowKey={(ele) => ele.staff_id}
        loading={loading}
      />
    </div>
  );
}

export default ProviderTable;
