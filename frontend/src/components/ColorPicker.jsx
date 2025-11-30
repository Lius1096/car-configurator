import React from "react";

const PRESET_COLORS = [
  "#000000","#2b2b2b","#4b5563","#7c3aed",
  "#0ea5a4","#06b6d4","#2563eb","#ef4444",
  "#f97316","#f59e0b","#10b981","#a3e635",
];

export default function ColorPicker({ color, onChange }) {
  return (
    <div className="flex flex-wrap gap-3">
      {PRESET_COLORS.map(c => (
        <button
          key={c}
          onClick={() => onChange(c)}
          className={`w-10 h-10 rounded-full border-2 ${c === color ? "ring-4 ring-offset-2 ring-green-400" : "border-white/30"}`}
          style={{ background: c }}
          aria-label={`Choisir ${c}`}
        />
      ))}
      <input
        type="color"
        value={color}
        onChange={e => onChange(e.target.value)}
        className="w-10 h-10 p-0 rounded-full border-2 border-white/30"
        title="Couleur personnalisée"
      />
    </div>
  );
}
