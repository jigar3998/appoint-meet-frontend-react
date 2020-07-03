import React, { useState, useEffect } from "react";
import { Form, Input, Button, Radio, Table, Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

function AppointmentTable(props) {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    const dataTemp = [];
    for (let i = 0; i < 46; i++) {
      dataTemp.push({
        key: i + "key",
        time: "20-10-2020 9:00 am",
        services: `service ${i}`,
        staff: `Staff ${i}`,

        price: i,
        duration: i,
      });
      setData(dataTemp);
    }
    return () => {};
  }, []);

  let searchInput = undefined;
  const getColumnSearchProps = (dataIndex) => ({
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
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
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
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.select());
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const columns = [
    {
      title: "Time",
      dataIndex: "time",
      // sorter: (a, b) => a.services.localeCompare(b.services),
      // width: props.tableWidth[0],
      // ellipsis: true,
    },
    {
      title: "Services",
      dataIndex: "services",
      sorter: (a, b) => a.services.localeCompare(b.services),
      // width: props.tableWidth[1],
      // ellipsis: true,
      ...getColumnSearchProps("services"),
    },
    {
      title: "Staff",
      dataIndex: "staff",
      sorter: (a, b) => a.staff.localeCompare(b.staff),
      // width: props.tableWidth[2],
      // ellipsis: true,
      ...getColumnSearchProps("staff"),
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (text) => <span>{text} ₹</span>,
      sorter: (a, b) => a.price - b.price,
      // width: props.tableWidth[3],
      // ellipsis: true,
      align: "center",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      render: (text) => <span>{text} min</span>,
      sorter: (a, b) => a.duration - b.duration,
      // width: props.tableWidth[4],
      // ellipsis: true,
      align: "center",
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

        // scroll={{ x: 460 }}
      />
    </div>
  );
}

export default AppointmentTable;
