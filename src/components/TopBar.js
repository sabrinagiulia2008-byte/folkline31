import React from "react";

/**
 * Componente mică pentru bara de sus (logo).
 * Folosește clase din `src/index.css` (clasa `.top` și `.logo` sunt definite acolo).
 */
export default function TopBar() {
  return (
    <div className="top" style={{ padding: 12 }}>
      <div className="logo" style={{ fontSize: 20 }}>
        Folkline
      </div>
    </div>
  );
}
