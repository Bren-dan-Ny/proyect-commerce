// components/CategoriaDropdown.jsx
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/categorydropdown.css";

export default function CategoriaDropdown({
  icon,
  label,
  items = [],
  sidebarOpen,
  isOpen,
  onToggle,
}) {
  return (
    <div className="custom-dropdown border-bottom p-0">
      <button
        className="btn w-100 p-2 d-flex align-items-center justify-content-between "
        onClick={onToggle}
      >
        <div className="d-flex py-2 align-items-center">
          <i className={`bi ${icon}`} style={{ fontSize: "1.3rem" }}></i>
          {sidebarOpen && <span className="ms-2">{label}</span>}
        </div>
        {sidebarOpen && (
          <i
            className={`bi ${isOpen ? "bi-chevron-up" : "bi-chevron-down"}`}
          ></i>
        )}
      </button>

      {isOpen && sidebarOpen && (
        <div className="dropdown-items">
          {items.map((item, idx) => (
            <NavLink
              to={`/category/${item.value}`}
              className="dropdown-item"
              key={idx}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}
