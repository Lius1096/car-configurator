import React from "react";

export default function OptionsPanel({ options, onToggle, onSetInterior, defs }) {
  return (
    <div className="space-y-4 text-sm text-gray-200 overflow-auto max-h-[400px]">
      {/* Sièges */}
      <div>
        <div className="mb-2 font-semibold text-white">Sièges</div>
        <div className="flex flex-wrap gap-2">
          {defs.interior.map(i => {
            const iid = i.idKey || i.id;
            const selectedInterior = typeof options.interior === 'string' ? options.interior : (options.interior?.idKey || options.interior?.id);
            return (
              <button
                key={iid}
                onClick={() => onSetInterior(iid)}
                className={`px-3 py-1 rounded-md text-sm sm:text-base ${
                  selectedInterior === iid
                    ? "bg-green-600 text-white"
                    : "bg-white/5 text-gray-200 hover:bg-white/10"
                }`}
              >
                {i.name} {i.price ? `(+${i.price}€)` : ""}
              </button>
            );
          })}
        </div>
      </div>

      {/* Toit panoramique */}
      <div className="flex items-center justify-between">
        <div>
          <div className="font-semibold text-white">Toit panoramique</div>
          <div className="text-gray-300 text-xs sm:text-sm">Lumière naturelle</div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={options.sunroof}
            onChange={() => onToggle("sunroof")}
            className="sr-only"
          />
          <span
            className={`w-11 h-6 rounded-full transition-colors ${
              options.sunroof ? "bg-green-500" : "bg-gray-500"
            }`}
          ></span>
        </label>
      </div>

      {/* Pack Sport */}
      <div className="flex items-center justify-between">
        <div>
          <div className="font-semibold text-white">Pack Sport</div>
          <div className="text-gray-300 text-xs sm:text-sm">Suspension + aéro</div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={options.sportPackage}
            onChange={() => onToggle("sportPackage")}
            className="sr-only"
          />
          <span
            className={`w-11 h-6 rounded-full transition-colors ${
              options.sportPackage ? "bg-green-500" : "bg-gray-500"
            }`}
          ></span>
        </label>
      </div>
    </div>
  );
}
