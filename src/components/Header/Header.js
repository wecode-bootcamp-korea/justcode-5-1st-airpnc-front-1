import React, { useEffect, useRef, useState } from 'react';
import './Header.scss';
import { useNavigate } from 'react-router-dom';
import ActivatedHeader from './ActivatedHeader';
import { FaAirbnb } from 'react-icons/fa';
import { FaUserCircle, FaSearch } from 'react-icons/fa';

function Header({
  setHeders: setHederFilter,
  login,
  wish,
  loginModalValue,
  signupModalValue,
}) {
  const [isClickedNav, setIsClickedNav] = useState(false);
  const [Signup, ClickedSignUp] = useState(false);
  const [Mypage, ClickedMypage] = useState(false);
  const [location, setLocation] = useState(0);
  const el = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    setHederFilter(Number(location));
  }, [location]);

  const goHome = () => {
    if (Number(location) !== 0) {
      setHederFilter(0);
    }
    navigate('/');
  };

  const isSignUped = () => {
    //
    if (localStorage.getItem('back_token')) {
      Signup(!ClickedSignUp);
    } else {
      signupModalValue(true);
    }
  };
  const isMyPaged = () => {
    //
    if (localStorage.getItem('back_token')) {
      Mypage(!ClickedMypage);
    } else {
      navigate('/Mypage');
    }
  };
  const isLogined = () => {
    loginModalValue(true);
  };

  const isLogout = () => {
    localStorage.removeItem('login-token');
    localStorage.removeItem('user-id');
    navigate('/');
  };

  const onClick = e => {
    console.log(!el.current.contains(e.target));
    if (!el.current.contains(e.target)) {
      setIsClickedNav(false);
    }
  };

  return (
    <>
      {isClickedNav ? (
        <div onClick={onClick} className="wrapper">
          <div ref={el} className="container" onClick={onClick}>
            <div className="logo" onClick={() => goHome()}>
              <FaAirbnb size="40" />
              <div>airpnc</div>
            </div>
            <ActivatedHeader
              setIsClickedNav={setIsClickedNav}
              isClickedNav={isClickedNav}
              setLocation={setLocation}
            />
            <div className="container_right">
              <div className="container_wish" onClick={wish}>
                <span>Wish List</span>
              </div>

              {login ? (
                <div className="container_login">
                  <div type="button" onClick={isLogout}>
                    Logout
                  </div>
                </div>
              ) : (
                <div className="container_login">
                  <div type="button" onClick={isLogined}>
                    Login
                  </div>
                </div>
              )}
              {login ? null : (
                <div className="container_signup">
                  <div type="button" onClick={isSignUped}>
                    signup
                  </div>
                </div>
              )}

              {login ? (
                <div className="container_myPage">
                  <div type="button" onClick={isMyPaged}>
                    <FaUserCircle size="35" color="#EEEEEE" />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="logo" onClick={() => goHome()}>
            <FaAirbnb size="40" />
            <div>airpnc</div>
          </div>
          <div
            className="searchBarContainer"
            onClick={() => setIsClickedNav(!isClickedNav)}
          >
            <div className="search">
              <div className="searchComment">
                <span className="where">어디로</span>
                <span className="when">언제</span>
              </div>
              <div className="iconSearch">
                <FaSearch />
              </div>
            </div>
          </div>
          <div className="container_right">
            <div className="container_wish" onClick={wish}>
              <span>Wish List</span>
            </div>

            {login ? (
              <div className="container_login">
                <div type="button" onClick={isLogout}>
                  Logout
                </div>
              </div>
            ) : (
              <div className="container_login">
                <div type="button" onClick={isLogined}>
                  Login
                </div>
              </div>
            )}
            {login ? null : (
              <div className="container_signup">
                <div type="button" onClick={isSignUped}>
                  signup
                </div>
              </div>
            )}

            {login ? (
              <div className="container_myPage">
                <div type="button" onClick={isMyPaged}>
                  <FaUserCircle size="35" color="#EEEEEE" />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
