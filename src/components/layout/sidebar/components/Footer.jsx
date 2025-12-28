import { LuLogOut } from "react-icons/lu";

export default function Footer({ collapsed }) {
  return (
    <div style={styles.footer}>
      <button
        style={{
          ...styles.button,
          justifyContent: collapsed ? "center" : "center",
        }}
      >
        {!collapsed && <span style={styles.text}>Cerrar sesión</span>}
        <LuLogOut size={18} />
      </button>
    </div>
  );
}

const styles = {
  footer: {
    marginTop: "auto",
    backgroundColor: "#4A83DD",
    height: "90px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderTop: "1px solid rgba(255,255,255,0.35)",
  },
  button: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    color: "white",
  },
  text: {
    whiteSpace: "nowrap",
  },
};
