import React, { useState, useEffect } from "react";

import { Form, Input, Button, Radio, Table, Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

function ProviderTable(props) {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    const dataTemp = [];
    for (let i = 0; i < 46; i++) {
      dataTemp.push({
        key: i + "key",
        provider: `Provider ${i}`,
        email: i + "@gmail.com",
        duration: i,
      });
      setData(dataTemp);
    }
    return () => {};
  }, []);
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
      record["provider"].toString().toLowerCase().includes(value.toLowerCase()),
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
      title: "Provider",
      dataIndex: "provider",
      sorter: (a, b) => a.provider.localeCompare(b.provider),
      width: props.tableWidth[0],
      ellipsis: true,
      ...getColumnSearchProps(),
    },
    {
      title: "Email",
      dataIndex: "email",
      width: props.tableWidth[0],
      ellipsis: true,
    },
  ];
  return (
    <div>
      <Table
        rowSelection={props.rowSelection}
        columns={columns}
        dataSource={data}
        bordered={props.bordered}
        pagination={props.pagination}
        scroll={props.scroll}

        // scroll={{ x: 460 }}
      />
    </div>
  );
}

export default ProviderTable;
