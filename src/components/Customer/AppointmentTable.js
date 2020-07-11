import React, { useState, useEffect, useContext } from "react";
import { Input, Button, Table, Space, message, Descriptions } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

import { Url } from "../../constants/ServerUrl";
import axios from "axios";
import { GlobalContext } from "../../context/GlobalState";

function AppointmentTable(props) {
  const contextData = useContext(GlobalContext);

  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [data, setData] = useState([]);
  let user_id = contextData.loginData.user_id;
  useEffect(() => {
    loadAppointment();
  }, []);

  let loadAppointment = () => {
    setLoading(true);
    axios
      // .get(Url + "/business/appointments/" + business_id)
      .get(Url + props.urlPath + user_id)
      .then(function (response) {
        console.log(response.data);
        setLoading(false);
        if (response.data === "You have no appointments") {
          setData([]);
        } else {
          setData(response.data);
        }
      })
      .catch(function (error) {
        console.log(error.response);
        message.error("Something went wrong. Please try again");
        setLoading(false);
      });
  };

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
  function getTimeAsNumberOfMinutes(time) {
    var timeParts = time.split(":");

    var timeInMinutes = timeParts[0] * 60 + timeParts[1];

    return timeInMinutes;
  }
  let tConvert = (time) => {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  };
  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  const columns = [
    {
      title: "Date",
      dataIndex: "booking_date",
      render: (date) => <span>{formatDate(date)}</span>,

      sorter: (a, b) =>
        new Date(a.booking_date).getTime() - new Date(b.booking_date).getTime(),
      // width: props.tableWidth[0],
      // ellipsis: true,
    },
    {
      title: "Time",
      dataIndex: "start_time_slot",
      render: (time) => <span>{tConvert(time.slice(0, 5))}</span>,

      sorter: (a, b) =>
        getTimeAsNumberOfMinutes(a.start_time_slot.slice(0, 5)) -
        getTimeAsNumberOfMinutes(b.start_time_slot.slice(0, 5)),
      // width: props.tableWidth[0],
      // ellipsis: true,
    },

    {
      title: "Business Info",
      dataIndex: "service_name",
      sorter: (a, b) => a.service_name.localeCompare(b.service_name),
      // width: props.tableWidth[1],
      // ellipsis: true,
      ...getColumnSearchProps("service_name"),
    },
    {
      title: "Services",
      dataIndex: "service_name",
      sorter: (a, b) => a.service_name.localeCompare(b.service_name),
      // width: props.tableWidth[1],
      // ellipsis: true,
      ...getColumnSearchProps("service_name"),
    },
    {
      title: "Staff",
      dataIndex: "staff_name",
      sorter: (a, b) => a.staff_name.localeCompare(b.staff_name),
      // width: props.tableWidth[2],
      // ellipsis: true,
      ...getColumnSearchProps("staff_name"),
    },
    {
      title: "Price",
      dataIndex: "service_price",
      render: (text) => <span>{text} ₹</span>,
      sorter: (a, b) => a.service_price - b.service_price,
      // width: props.tableWidth[3],
      // ellipsis: true,
      align: "center",
    },
    {
      title: "Duration",
      dataIndex: "service_time",
      render: (text) => <span>{text} min</span>,
      sorter: (a, b) => a.service_time - b.service_time,
      // width: props.tableWidth[4],
      // ellipsis: true,
      align: "center",
    },
  ];
  return (
    <div style={{ overflow: "auto" }}>
      <Table
        loading={loading}
        columns={columns}
        dataSource={data}
        bordered={props.bordered}
        pagination={props.pagination}
        scroll={props.scroll}
        rowKey={(ele, index) => index}
        expandable={{
          expandedRowRender: (record) => (
            <Descriptions title={<h2>Business Information</h2>} bordered>
              <Descriptions.Item label="Business Name" span={3}>
                {record.business_name}
              </Descriptions.Item>
              <Descriptions.Item label="Category" span={3}>
                {record.industry}
              </Descriptions.Item>
              <Descriptions.Item label="Business Description" span={3}>
                {record.business_description}
              </Descriptions.Item>
              <Descriptions.Item label="Business Address" span={3}>
                {record.business_address}
              </Descriptions.Item>
            </Descriptions>
          ),
          expandRowByClick: true,
        }}

        // scroll={{ x: 460 }}
      />
    </div>
  );
}

export default AppointmentTable;
