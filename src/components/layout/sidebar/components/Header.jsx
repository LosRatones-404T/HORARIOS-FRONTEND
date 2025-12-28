import React from "react";
import logo from "../../../../assets/logo-unsis.png";

export default function Header({ collapsed }) {
  const logoContainerStyles = collapsed
    ? {
        backgroundColor: "#A6C3FC",
        padding: "6px",
        borderRadius: "10px",
      }
    : {
        backgroundColor: "#A6C3FC",
        padding: "12px",
        borderRadius: "16px",
      };

  return (
    <div
      style={{
        padding: collapsed ? "10px 6px" : "14px",
        backgroundColor: "#4A83DD",
        display: "flex",
        flexDirection: collapsed ? "column" : "row",
        alignItems: "center",
        justifyContent: collapsed ? "center" : "flex-start",
        gap: collapsed ? "6px" : "12px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
      }}
    >
      {/* LOGO */}
      <div
        style={{
          ...logoContainerStyles,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={logo}
          alt="SIPLEX Logo"
          style={{
            width: collapsed ? "36px" : "64px", 
            display: "block",
          }}
        />
      </div>

      {/* TEXTO */}
      {!collapsed && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            color: "white",
            lineHeight: 1.1, 
          }}
        >
          {/* SIPLEX */}
          <span
            style={{
              fontSize: "24px",       
              fontWeight: "700",
              fontFamily: "'Roboto Mono', monospace",
              padding: "2px 8px",     
              letterSpacing: "1px",
              marginBottom: "2px",
              justifyContent: "center",
              display: "flex",
            }}
          >
            SIPLEX
          </span>

          {/* SUBTÍTULO */}
          <span
            style={{
              fontSize: "11.5px",
              fontFamily: "'Roboto Mono', monospace",
              whiteSpace: "nowrap",
              overflow: "hidden",
              fontWeight: "350",      
              opacity: 0.94,
            }}
          >
            Sistema de Planificación de Exámenes
          </span>
        </div>
      )}
    </div>
  );
}
