import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./views/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="main-content">
        <Home />
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
