import { NavLink, useLocation } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import "../styles/Sidebar.css";
import DashboardImg from "../assets/menu-icons/dashboard.gif";
import DashboardStatic from "../assets/menu-icons/dashboard_static.png";
import OrderImg from "../assets/sub-menu-icons/orders.gif";
import OrderStatic from "../assets/sub-menu-icons/orders_static.png";

const Sidebar = () => {
  const { theme, toggleTheme, setBackgroundImage } = useContext(ThemeContext);
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(null);

  const handleBackgroundChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackgroundImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleMenu = (menuName) => {
    if (menuName === "dashboard" && activeMenu === "dashboard") {
      setActiveMenu(null);
    } else {
      setActiveMenu(menuName);
    }
  };

  const isSubmenuActive = activeMenu === "dashboard";

  return (
    <>
      <nav className={`sidebar ${theme}`}>
        <NavLink to="/profile" className="avatar-link">
          <img src="/avatar.jpg" alt="Профиль" className="avatar" />
        </NavLink>
        <div className="scrollable-menu hidden-scroll">
          <ul className="menu">
            <li className="menu-item">
              <NavLink 
                to="/home"
                className={location.pathname === "/statistics" ? "active" : ""}
                onClick={() => setActiveMenu(null)}
              >
                <img src={DashboardStatic} alt="Статистика" className="menu-icon" />
                <span>Статистика</span>
              </NavLink>
            </li>
            <li className={`menu-item ${isSubmenuActive ? "active" : ""}`}>
              <NavLink 
                to="#" 
                onClick={(e) => {
                  e.preventDefault();
                  toggleMenu("dashboard");
                }}
                className="submenu-toggle"
              >
                <img
                  src={isSubmenuActive ? DashboardImg : DashboardStatic}
                  alt="Рабочий стол"
                  className="menu-icon"
                />
                <span>Рабочий стол</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink 
                to="/home"
                className={location.pathname === "/assets" ? "active" : ""}
                onClick={() => setActiveMenu(null)}
              >
                <img src={DashboardStatic} alt="Активы" className="menu-icon" />
                <span>Активы</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink 
                to="/transactions"
                className={location.pathname === "/transactions" ? "active" : ""}
                onClick={() => setActiveMenu(null)}
              >
                <img src={DashboardStatic} alt="Транзакции" className="menu-icon" />
                <span>Транзакции</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink 
                to="/clients"
                className={location.pathname === "/clients" ? "active" : ""}
                onClick={() => setActiveMenu(null)}
              >
                <img src={DashboardStatic} alt="Клиенты" className="menu-icon" />
                <span>Клиенты</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink 
                to="/employees"
                className={location.pathname === "/employees" ? "active" : ""}
                onClick={() => setActiveMenu(null)}
              >
                <img src={DashboardStatic} alt="Сотрудники" className="menu-icon" />
                <span>Сотрудники</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink 
                to="/directory"
                className={location.pathname === "/directory" ? "active" : ""}
                onClick={() => setActiveMenu(null)}
              >
                <img src={DashboardStatic} alt="Справочник" className="menu-icon" />
                <span>Справочник</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink 
                to="/archive"
                className={location.pathname === "/archive" ? "active" : ""}
                onClick={() => setActiveMenu(null)}
              >
                <img src={DashboardStatic} alt="Архив" className="menu-icon" />
                <span>Архив</span>
              </NavLink>
            </li>
          </ul>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === "light" ? "🌙 Темная тема" : "☀️ Светлая тема"}
          </button>
          <label className="upload-bg">
            Загрузить фон
            <input type="file" accept="image/*" onChange={handleBackgroundChange} />
          </label>
         </div>
      </nav>
     
      {isSubmenuActive && (
        <div className="submenu-panel show">
          <ul className="submenu">
            <li>
              <NavLink
                to="/orders"
                className={location.pathname === "/orders" ? "active-sub" : ""}
                onClick={() => setActiveMenu(null)}
              >
                <img
                  src={location.pathname === "/orders" ? OrderImg : OrderStatic}
                  alt="Заказы"
                  className="submenu-icon"
                />
                <span>Заказы</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/executors"
                className={location.pathname === "/executors" ? "active-sub" : ""}
                onClick={() => setActiveMenu(null)}
              >
                <img src={OrderStatic} alt="Исполнители" className="submenu-icon" />
                <span>Исполнители</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tasks"
                className={location.pathname === "/tasks" ? "active-sub" : ""}
                onClick={() => setActiveMenu(null)}
              >
                <img src={OrderStatic} alt="Задачи" className="submenu-icon" />
                <span>Задачи</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/journal"
                className={location.pathname === "/journal" ? "active-sub" : ""}
                onClick={() => setActiveMenu(null)}
              >
                <img src={OrderStatic} alt="Журнал" className="submenu-icon" />
                <span>Журнал</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/calendar"
                className={location.pathname === "/calendar" ? "active-sub" : ""}
                onClick={() => setActiveMenu(null)}
              >
                <img src={OrderStatic} alt="Календарь" className="submenu-icon" />
                <span>Календарь</span>
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Sidebar;