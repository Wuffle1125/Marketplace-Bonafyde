import React, { useEffect, useState } from "react";

import CommonSection from "../components/ui/Common-section/CommonSection";
import { Container, Row, Col, Table } from "reactstrap";
import axios from "axios";

import Avatar from "../assets/images/ava-01.png";
import Flag from "../assets/images/flag.png";
import { countries } from "../assets/data/countries";
import FilterList from "../components/ui/FilterList/FilterList";
import "../styles/users.css";

let cityList = [];
let userList = [
  {
    avatar: Avatar,
    name: "User 1",
    country: "Canada",
    city: "Edmonton",
    owned: 3,
  },
  {
    avatar: Avatar,
    name: "User 2",
    country: "Canada",
    city: "Edmonton",
    owned: 6,
  },
  {
    avatar: Avatar,
    name: "User 2",
    country: "Canada",
    city: "Texas",
    owned: 16,
  },
  {
    avatar: Avatar,
    name: "Dennis",
    country: "Canada",
    city: "Vancouver",
    owned: 2,
  },
  {
    avatar: Avatar,
    name: "James",
    country: "Canada",
    city: "London",
    owned: 6,
  },
];

const Users = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState(userList);
  const [cList, setCList] = useState([]);
  const [cities, setCities] = useState([]);
  const [cItem, setCitem] = useState("");
  const [city, setCity] = useState("");
  const initials = [
    {
      avatar: Avatar,
      name: "User1",
      location: "Canada",
      count: 4,
    },
  ];

  useEffect(() => {
    let temp = userList;
    if (search != "") {
      temp = temp.filter((user) =>
        user.name.toLowerCase().startsWith(search.toLowerCase())
      );
    }
    if (cItem != "") {
      temp = temp.filter((user) =>
        user.country.toLowerCase().startsWith(cItem.toLowerCase())
      );
    }
    if (city != "") {
      temp = temp.filter((user) =>
        user.city.toLowerCase().startsWith(city.toLowerCase())
      );
    }
    setUsers(temp);
  }, [search, cItem, city]);

  const onFilterCountry = (e) => {
    let text = e.target.value;
    setCitem(text);
    if (text == "") {
      setCList(countries);
      return;
    }
    let cItems = [];
    for (let i = 0; i < countries.length; i++) {
      const name = countries[i].name;
      const index = name.toLowerCase().indexOf(text.toLowerCase());
      if (index !== -1) {
        cItems.push({ name, index });
      }
    }
    cItems = cItems.sort((a, b) => a.index - b.index);
    setCList(cItems);
    return cItems;
  };

  const onFilterCities = (e) => {
    let text = e.target.value;
    setCity(text);
    if (text == "") {
      setCities(cityList);
      return;
    }
    let cItems = [];
    for (let i = 0; i < cityList.length; i++) {
      const name = cityList[i].name;
      const index = name.toLowerCase().indexOf(text.toLowerCase());
      if (index !== -1) {
        cItems.push({ name, index });
      }
    }
    cItems = cItems.sort((a, b) => a.index - b.index);
    setCities(cItems);
    return cItems;
  };

  const onCityClick = (name) => {
    setCity(name);
  };

  const onCountryClick = async (name) => {
    setCitem(name);
    setCity("");
    const { data } = await axios.post(
      `https://countriesnow.space/api/v0.1/countries/cities`,
      {
        country: name,
      }
    );
    if (data?.data) {
      cityList = data?.data.map((item) => ({
        name: item,
      }));
      setCities(cityList);
      return;
    }
    setCities([]);
  };
  return (
    <div>
      <CommonSection title={"Find a User"} />
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <div className="users__filter d-flex align-items-center">
                <div style={{ position: "relative" }}>
                  <span className="search_icon">
                    <i className="ri-search-line"></i>
                  </span>
                  <input
                    type="text"
                    placeholder="Collectors Name"
                    className="search_field"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <FilterList
                  items={cList}
                  placeholder="Countries"
                  value={cItem}
                  onChange={onFilterCountry}
                  onClick={onCountryClick}
                />
                <FilterList
                  items={cities}
                  placeholder="Cities"
                  value={city}
                  onChange={onFilterCities}
                  onClick={onCityClick}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg="12" className="mb-5">
              <Table bordered={true} className="users_table">
                <thead>
                  <tr>
                    <th>Collector</th>
                    <th>Location</th>
                    <th>Nft's owned</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index}>
                      <td>
                        <div className="user_item">
                          <img src={user.avatar} className="user_avatar" />
                          <div className="user_name">{user.name}</div>
                        </div>
                      </td>
                      <td>
                        <div className="location">
                          <img src={Flag} className="location_flag" />
                          <div className="location_label">
                            {user.city + ", " + user.country}
                          </div>
                        </div>
                      </td>
                      <td>{user.owned}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Users;
