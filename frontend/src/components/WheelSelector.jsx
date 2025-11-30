import React from "react";

export default function WheelSelector({ wheels, selected, onSelect }) {
  return (
    <div className="space-y-3">
      {wheels.map(w => {
        const id = w.idKey || w.id;
        return (
          <button
            key={id}
            onClick={() => onSelect(id)}
            className={`w-full flex items-center gap-3 p-2 rounded-xl transition border ${selected === id ? "border-green-400 bg-white/5" : "border-white/10"}`}
          >
            {w.thumb ? <img src={w.thumb} alt={w.name} className="w-16 h-16 object-contain" /> : null}
            <div className="text-left">
              <div className="font-semibold text-white">{w.name}</div>
              <div className="text-sm text-gray-300">{Number(w.price || 0).toLocaleString('fr-FR')} €</div>
            </div>
            <div className="ml-auto text-sm text-gray-300">{selected === id ? "Sélectionné" : "Choisir"}</div>
          </button>
        );
      })}
    </div>
  );
}
