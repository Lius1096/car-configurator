import React from "react";

export default function OptionsPanel({ options, onToggle, defs }) {
  return (
    <div className="space-y-3">
      {defs?.extras?.map(option => {
        const id = option.idKey || option.id;
        const isChecked = Boolean(options[id]);
        return (
          <label key={id} className={`flex items-center gap-3 p-3 cursor-pointer rounded-lg border-2 transition-all ${isChecked ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white hover:border-gray-400"}`}>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => onToggle(id)}
              className="w-5 h-5 accent-blue-500"
            />
            <div className="flex-1">
              <div className="font-bold text-neutral-900">{option.name}</div>
              <div className="text-sm font-medium text-gray-600">+{(option.price || 0).toLocaleString('fr-FR')} €</div>
            </div>
            {isChecked && <div className="text-blue-500 font-bold">✓</div>}
          </label>
        );
      })}
    </div>
  );
}
