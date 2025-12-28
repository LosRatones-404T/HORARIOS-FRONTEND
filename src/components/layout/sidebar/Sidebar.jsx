import { HiMenu } from "react-icons/hi";
import { useState } from "react";
import { Header, Body, Footer } from "./components";

export default function Sidebar({ menu }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      style={{
        height: "98vh",
        width: collapsed ? "120px" : "385px",
        transition: "0.3s",
        backgroundColor: "#F5F5F5",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >

      <div
        style={{
          backgroundColor: "#4A83DD", 
          padding: "6px",
          display: "flex",
          justifyContent: collapsed ? "center" : "flex-end",
        }}
      >
        <div
          onClick={() => setCollapsed(!collapsed)}
          style={{
            cursor: "pointer",
            padding: "6px",
            borderRadius: "6px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "0.2s",
          }}
        >
          <HiMenu style={{ color: "white", fontSize: "22px" }} />
        </div>
      </div>

      {/* 🔹 HEADER */}
      <Header collapsed={collapsed} />

      {/* 🔹 MENÚ */}
      <Body collapsed={collapsed} options={menu} />

      {/* 🔹 FOOTER */}
      <Footer collapsed={collapsed} />
    </div>
  );
}
