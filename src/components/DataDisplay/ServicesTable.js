import React, { useState, useEffect, useContext } from "react";
import {  Input, Button,  Table, Space, message } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

import { Url } from "../../constants/ServerUrl";
import axios from "axios";
import { GlobalContext } from "../../context/GlobalState";

function ServicesTable(props) {
  const contextData = useContext(GlobalContext);

  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  let business_id =
    contextData.loginData.business_id === undefined
      ? props.business_id
      : contextData.loginData.business_id;

  useEffect(() => {
    loadService();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log("ServicesTable", props.business_id);

  let loadService = () => {
    setLoading(true);
    axios
      .get(Url + "/service/" + business_id)
      // .get(Url + "/service/" + "29")
      .then(function (response) {
        // console.log(response.data);
        setLoading(false);
        setData(response.data);
      })
      .catch(function (error) {
        // console.log(error.response);
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
          placeholder={`Search Service`}
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
      record["service_name"]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
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
      title: "Services",
      dataIndex: "service_name",
      sorter: (a, b) => a.service_name.localeCompare(b.services),
      // width: props.tableWidth[0],
      // ellipsis: true,
      ...getColumnSearchProps(),
    },
    {
      title: "Price",
      dataIndex: "service_price",
      render: (text) => <span>{text} ₹</span>,
      sorter: (a, b) => a.service_price - b.service_price,
      // width: props.tableWidth[1],
      // ellipsis: true,
      align: "center",
    },
    {
      title: "Duration",
      dataIndex: "service_time",
      render: (text) => <span>{text} min</span>,
      sorter: (a, b) => a.service_time - b.service_time,
      // width: props.tableWidth[2],
      // ellipsis: true,
      align: "center",
    },
  ];
  return (
    <div style={{ overflow: "auto" }}>
      <Table
        rowSelection={props.rowSelection}
        columns={columns}
        dataSource={data}
        bordered={props.bordered}
        pagination={props.pagination}
        scroll={props.scroll}
        rowKey={(ele) => ele.service_id}
        loading={loading}
        expandable={
          props.expandable
            ? {
                expandedRowRender: (record) => (
                  <p style={{ margin: 0 }}>
                    Service description : {record.service_description}
                  </p>
                ),
                expandRowByClick: props.expandRowByClick,
              }
            : {}
        }

        // scroll={{ x: 460 }}
      />
    </div>
  );
}

export default ServicesTable;
