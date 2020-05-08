import React, { useState, useEffect } from "react";
import { Form, Input, Button, Radio, Table, Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

function FirstBookingStep(props) {
  const [width, setWidth] = useState(window.innerWidth);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
  };
  const updateWindowDimensions = () => {
    console.log(window.innerWidth);
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions);
    const dataTemp = [];
    for (let i = 0; i < 46; i++) {
      dataTemp.push({
        key: i + "key",
        services: `service ${i}`,
        price: i,
        duration: i,
      });
      setData(dataTemp);
    }
    return () => {
      window.removeEventListener("resize", updateWindowDimensions);
    };
  }, []);
  const rowSelection = {
    type: "radio",
    onChange: onSelectChange,
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
      record["services"].toString().toLowerCase().includes(value.toLowerCase()),
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
      dataIndex: "services",
      sorter: (a, b) => a.service.localeCompare(b.service),
      width: 200,
      ellipsis: true,
      ...getColumnSearchProps(),
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (text) => <span>{text} ₹</span>,
      sorter: (a, b) => a.price - b.price,
      width: 100,
      ellipsis: true,
      align: "center",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      render: (text) => <span>{text} min</span>,
      sorter: (a, b) => a.duration - b.duration,
      width: 100,
      ellipsis: true,
      align: "center",
    },
  ];

  return (
    <div className="service-container">
      <div className="service-title">Select Service</div>
      <div className="service-div-container">
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          bordered={true}
          pagination={{ pageSize: 5 }}
          scroll={width < 560 ? { x: 460 } : {}}
          // scroll={{ x: 460 }}
        />
      </div>
      <div className="signup-navigation-button">
        <Button type="primary" onClick={() => props.next()}>
          Next
        </Button>
      </div>
    </div>
  );
}

export default FirstBookingStep;
