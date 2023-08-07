import React, { useEffect, useState } from "react";

import CommonSection from "../components/ui/Common-section/CommonSection";

import NftCard from "../components/ui/Nft-card/NftCard";

import { NFT__DATA } from "../assets/data/data";

import { Container, Row, Col } from "reactstrap";

import "../styles/market.css";

const Market = () => {
  const [data, setData] = useState(NFT__DATA);
  const [search, setSearch] = useState("");
  const [filterValue, setFilterValue] = useState("all");

  const handleCategory = () => {};

  const handleItems = () => {};

  // ====== SORTING DATA BY HIGH, MID, LOW RATE =========
  useEffect(() => {
    let temp = [];
    if (filterValue === "all") {
      temp = NFT__DATA;
    }
    if (filterValue === "high") {
      temp = NFT__DATA.filter((item) => item.currentBid >= 6);
    }

    if (filterValue === "mid") {
      temp = NFT__DATA.filter(
        (item) => item.currentBid >= 5.5 && item.currentBid < 6
      );
    }

    if (filterValue === "low") {
      temp = NFT__DATA.filter(
        (item) => item.currentBid >= 4.89 && item.currentBid < 5.5
      );
    }
    if (search != "") {
      let filterData = [];
      for (let i = 0; i < temp.length; i++) {
        const title = temp[i].title;
        const index = title.toLowerCase().indexOf(search.toLowerCase());
        if (index !== -1) {
          filterData.push({ data: temp[i], index });
        }
      }
      temp = filterData.sort((a, b) => a.index - b.index);
      temp = temp.map((item) => item.data);
    }
    setData(temp);
  }, [filterValue, search]);
  const handleSort = (e) => {
    setFilterValue(e.target.value);
  };

  const onSearchText = (e) => {
    const text = e.target.value;
    setSearch(text);
  };

  return (
    <>
      <CommonSection title={"MarketPlace"} />

      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <div className="market__product__filter d-flex align-items-center justify-content-between flex-wrap gap-3">
                <div className="filter__left d-flex align-items-center flex-wrap gap-3">
                  <div className="all__category__filter">
                    <select onChange={handleCategory}>
                      <option>All Categories</option>
                      <option value="art">Art</option>
                      <option value="music">Music</option>
                      <option value="domain-name">Domain Name</option>
                      <option value="virtual-world">Virtual World</option>
                      <option value="trending-card">Trending Cards</option>
                    </select>
                  </div>

                  <div style={{ position: "relative" }}>
                    <span className="search_icon">
                      <i className="ri-search-line"></i>
                    </span>
                    <input
                      type="text"
                      placeholder="Search for Nfts"
                      className="search_field"
                      value={search}
                      onChange={onSearchText}
                    />
                  </div>
                </div>

                <div className="filter__right">
                  <select onChange={handleSort}>
                    <option value="all">Sort By</option>
                    <option value="high">High Rate</option>
                    <option value="mid">Mid Rate</option>
                    <option value="low">Low Rate</option>
                  </select>
                </div>
              </div>
            </Col>

            {data?.map((item) => (
              <Col lg="3" md="4" sm="6" className="mb-4" key={item.id}>
                <NftCard item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Market;
