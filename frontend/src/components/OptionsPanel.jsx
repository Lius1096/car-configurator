import React from "react";

export default function OptionsPanel({ options, onToggle, defs }) {
  return (
    <div className="space-y-3">
      {defs?.extras?.map(option => {
        const id = option.idKey || option.id;
        const isChecked = Boolean(options[id]);
        return (
          <label key={id} className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => onToggle(id)}
              className="w-4 h-4"
            />
            <div className="flex-1">
              <div className="font-medium text-neutral-900">{option.name}</div>
              <div className="text-xs text-gray-500">+{(option.price || 0).toLocaleString('fr-FR')} €</div>
            </div>
          </label>
        );
      })}
    </div>
  );
}
