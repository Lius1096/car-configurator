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
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all border-2 hover:border-blue-300 ${selected === id ? "border-blue-500 bg-blue-50 text-neutral-900" : "border-gray-300 bg-white text-neutral-900 hover:bg-gray-50"}`}
          >
            {w.thumb ? <img src={w.thumb} alt={w.name} className="w-14 h-14 object-contain" /> : null}
            <div className="text-left flex-1">
              <div className="font-bold text-base">{w.name}</div>
              <div className="text-sm font-medium text-gray-600">{Number(w.price || 0).toLocaleString('fr-FR')} €</div>
            </div>
            <div className={`text-sm font-semibold px-2 py-1 rounded ${selected === id ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}>
              {selected === id ? "✓ Sélectionné" : "Choisir"}
            </div>
          </button>
        );
      })}
    </div>
  );
}
