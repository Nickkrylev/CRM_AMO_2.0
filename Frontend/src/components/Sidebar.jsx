import { NavLink, useLocation } from "react-router-dom";
import React, { useContext, useState } from "react";
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
    setActiveMenu((prev) => (prev === menuName ? null : menuName));
  };

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

            <li className={`menu-item ${activeMenu === "dashboard" ? "active" : ""}`}>
              <NavLink
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  toggleMenu("dashboard");
                }}
                className="submenu-toggle"
              >
                <img
                  src={activeMenu === "dashboard" ? DashboardImg : DashboardStatic}
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

            <li className={`menu-item ${activeMenu === "directory" ? "active" : ""}`}>
              <NavLink
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  toggleMenu("directory");
                }}
                className="submenu-toggle"
              >
                <img
                  src={
                    activeMenu === "directory"
                      ? "https://cdn-icons-gif.flaticon.com/7211/7211817.gif"
                      : "https://cdn-icons-gif.flaticon.com/7211/7211817.gif"
                  }
                  alt="Справочник"
                  className="menu-icon"
                />
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

      {/* Подменю: Рабочий стол */}
      {activeMenu === "dashboard" && (
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

      {/* Подменю: Справочник */}
      {activeMenu === "directory" && (
        <div className="submenu-panel show">
          <ul className="submenu">
            <li>
              <NavLink
                to="/clients"
                className={location.pathname === "/clients" ? "active-sub" : ""}
                onClick={() => setActiveMenu(null)}
              >
                <img
                  src="https://cdn-icons-gif.flaticon.com/7211/7211817.gif"
                  alt="Клиенты"
                  className="submenu-icon"
                />
                <span>Клиенты</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/employees"
                className={location.pathname === "/employees" ? "active-sub" : ""}
                onClick={() => setActiveMenu(null)}
              >
                <img
                  src="https://cdn-icons-gif.flaticon.com/7211/7211849.gif"
                  alt="Сотрудники"
                  className="submenu-icon"
                />
                <span>Сотрудники</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/reports"
                className={location.pathname === "/reports" ? "active-sub" : ""}
                onClick={() => setActiveMenu(null)}
              >
                <img
                  src="https://cdn-icons-gif.flaticon.com/6416/6416398.gif"
                  alt="Отчеты"
                  className="submenu-icon"
                />
                <span>Отчеты</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/access"
                className={location.pathname === "/access" ? "active-sub" : ""}
                onClick={() => setActiveMenu(null)}
              >
                <img
                  src="https://cdn-icons-gif.flaticon.com/15968/15968705.gif"
                  alt="Доступы"
                  className="submenu-icon"
                />
                <span>Доступы</span>
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Sidebar;
