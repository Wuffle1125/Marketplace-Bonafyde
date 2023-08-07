import React, { useEffect, useRef, useState, memo } from "react";

import "./filter-list.css";

const FilterList = ({
  items = [],
  placeholder = "",
  value,
  onChange,
  onClick,
}) => {
  const [active, setActive] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    window.addEventListener(
      "click",
      (e) => {
        if (ref.current) {
          if (!ref.current.contains(e.target)) {
            setActive(false);
          }
        }
      },
      false
    );
  }, []);

  const onChangeText = (e) => {
    setActive(true);
    onChange(e);
  };

  const onClickText = (name) => {
    setActive(false);
    onClick(name);
  };

  return (
    <div ref={ref} className="">
      <div style={{ position: "relative" }}>
        <input
          type="text"
          placeholder={placeholder}
          onChange={onChangeText}
          className="filter_input"
          value={value}
        />
        <span className="arrow_down">
          <i className="ri-arrow-down-s-line"></i>
        </span>
      </div>
      {active && items?.length !== 0 && (
        <div className="filter_select">
          {items.map((item, index) => (
            <div
              key={index}
              className="country_name"
              onClick={() => onClickText(item.name)}
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(FilterList);
