import React, { useRef, useEffect, useState } from "react";
import "./header.css";
import { Container } from "reactstrap";

import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";

import { signOutSuccess } from "../../persistence/users/UserReducer";
import Logo from "../../assets/images/logo192.png";
import Language from "../../assets/images/language.png";

const NAV__LINKS = [
  {
    display: "Marketplace",
    url: "/market",
  },
  {
    display: "Users",
    url: "/users",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { loggedIn, data } = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();
  const [route, setRoute] = useState("");

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("header__shrink");
      } else {
        headerRef.current.classList.remove("header__shrink");
      }
    });

    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  const toggleMenu = () => menuRef.current.classList.toggle("active__menu");
  console.log(data);
  const onLogout = () => {
    googleLogout();
    dispatch(signOutSuccess());
    navigate("/login");
  };

  return (
    <header className="header header__shrink" ref={headerRef}>
      <Container>
        <div className="navigation">
          <div className="nav__menu" ref={menuRef} onClick={toggleMenu}>
            <ul className="nav__list">
              <li className="nav__item logo">
                <NavLink to="/home">
                  <img src={Logo} className="logo_img" alt="logo image" />
                </NavLink>
              </li>
              <div className="nav__right">
                {NAV__LINKS.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.url}
                      onClick={() => setRoute("")}
                      className={(navClass) =>
                        navClass.isActive ? "active" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
                <li className="nav__item drop_menu">
                  <NavLink
                    className={(navClass) =>
                      navClass.isActive && route === "more" ? "active" : ""
                    }
                  >
                    <div className="drop_label">
                      <div>More</div>
                      <span>
                        <i className="ri-arrow-down-s-fill"></i>
                      </span>
                    </div>
                  </NavLink>
                  <ul className="drop_content">
                    <li className="nav__item">
                      <NavLink
                        className="drop_item"
                        to={"/blog"}
                        onClick={() => setRoute("more")}
                      >
                        Blog
                      </NavLink>
                    </li>
                    <li className="nav__item">
                      <NavLink
                        className="drop_item"
                        to={"/about"}
                        onClick={() => setRoute("more")}
                      >
                        About
                      </NavLink>
                    </li>
                    <li className="nav__item">
                      <NavLink
                        className="drop_item"
                        to={"/faq"}
                        onClick={() => setRoute("more")}
                      >
                        FAQ
                      </NavLink>
                    </li>
                  </ul>
                </li>
                <li className="nav__item">
                  {loggedIn ? (
                    <div className="avatar_container">
                      <img
                        src={data.picture}
                        className={"avatar"}
                        alt="cover image"
                      />
                      <ul className="drop_content">
                        <li style={{ color: "white" }}>{data.name}</li>
                        <li>
                          <div
                            onClick={onLogout}
                            style={{ color: "white", cursor: "pointer" }}
                          >
                            Logout
                          </div>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <>
                      <NavLink
                        to={"/login"}
                        onClick={() => setRoute("login")}
                        className={(navClass) =>
                          navClass.isActive && route === "login" ? "active" : ""
                        }
                      >
                        Login
                      </NavLink>
                      <span style={{ color: "white" }}>/</span>
                      <NavLink
                        to={"/signup"}
                        onClick={() => setRoute("signup")}
                        className={(navClass) =>
                          navClass.isActive && route === "signup"
                            ? "active"
                            : ""
                        }
                      >
                        Signup
                      </NavLink>
                    </>
                  )}
                </li>
                <li className="nav__item">
                  <NavLink to="/multi_language">
                    <img
                      src={Language}
                      className="multi_language"
                      alt="Multi Language"
                    />
                  </NavLink>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
