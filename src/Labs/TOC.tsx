import React from "react";
import ReactDOM from 'react-dom/client';
import { useLocation } from "react-router";
import { Link } from 'react-router-dom';

export default function TOC() {
  const { pathname } = useLocation();
  return (
    <ul className="nav nav-pills">
      <li className="nav-item">
        <a id="wd-a" href="#/Labs" className="nav-link">
          Labs
        </a>
      </li>
      <li className="nav-item">
        <a id="wd-a1" href="#/Labs/Lab1"
          className={`nav-link ${pathname.includes("Lab1") ? "active" : ""}`}>
          Lab 1
        </a>
      </li>
      <li className="nav-item">
        <a id="wd-a2" href="#/Labs/Lab2"
          className={`nav-link ${pathname.includes("Lab2") ? "active" : ""}`}>
          Lab 2
        </a>
      </li>
      <li className="nav-item">
        <a id="wd-a3" href="#/Labs/Lab3"
          className={`nav-link ${pathname.includes("Lab3") ? "active" : ""}`}>
          Lab 3
        </a>
      </li>
      <li className="nav-item">
        <a id="wd-a3" href="#/Labs/Lab4"
          className={`nav-link ${pathname.includes("Lab4") ? "active" : ""}`}>
          Lab 4
        </a>
      </li>
      <li className="nav-item">
        <a id="wd-a3" href="#/Labs/Lab5"
          className={`nav-link ${pathname.includes("Lab5") ? "active" : ""}`}>
          Lab 5
        </a>
      </li>
      <li className="nav-item">
        <a id="wd-k" href="#/Kanbas" className="nav-link">
          Kanbas
        </a>
      </li>
      <li className="nav-item">
        <a id="wd-k" href="https://github.com/jannunzi" className="nav-link">
          My GitHub
        </a>
      </li>
      <li className="nav-item">
        <a id="wd-github" href="https://github.com/mayic18/kanbas-react-web-app.git" className="nav-link">
          Yicheng Ma GitHub
        </a>
      </li>
      <li className="nav-item">
        <a id="wd-github" href="https://github.com/mayic18/kanbas-node-server-app.git" className="nav-link">
          Yicheng Ma Node-Sever
        </a>
      </li>
      <li className="nav-item">
        <a id="wd-github" href="https://kanbas-node-server-app-gvfj.onrender.com" className="nav-link">
           Render
        </a>
      </li>
    </ul>
  );
}

  