import React from 'react';
import { BrowserRouter as Router, Link, Routes, Route, useLocation } from 'react-router-dom';

function Def() {
    const { pathname } = useLocation();
    return (
    <div>
    output =
    {pathname.includes("r")("r") && <span>p</span>}
    {pathname.includes("x")("w") && <span>y</span>}
    </div>
    );
   }

export default function Abc() {
    return (
    <div>
    <Link to="q/x">x</Link>
    <Link to="q/s">r</Link>
    <Routes>
    <Route path="q/:a" element={<Def />} />
    </Routes>
    </div>
    );
}

export default function App() {
    return (
      <Router>
        <Abc />
      </Router>
    );
}