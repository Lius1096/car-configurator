import React, { useState, useMemo } from "react";
import CarViewer from "./CarViewer";
import OptionsPanel from "./OptionsPanel";
import ColorPicker from "./ColorPicker";
import WheelSelector from "./WheelSelector";
import Summary from "./Summary";
import { useOptionsData } from "../hooks/useOptionsData";

export default function CarConfiguratorSync() {
  const [config, setConfig] = useState({
    paint: null,
    wheels: null,
    interior: null,
    extras: {},
  });

  const { defs, loading, error } = useOptionsData();

  const total = useMemo(() => {
    let sum = 0;
    if (config.paint) sum += config.paint.price || 0;
    if (config.wheels) sum += config.wheels.price || 0;
    if (config.interior) sum += config.interior.price || 0;
    Object.values(config.extras).forEach(opt => sum += opt.price || 0);
    return sum;
  }, [config]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  const handleToggleOption = (key) => {
    setConfig(c => ({
      ...c,
      extras: {
        ...c.extras,
        [key]: !c.extras[key]
      }
    }));
  };

  const handleSetInterior = (id) => {
    const interior = defs.interior.find(i => (i.idKey || i.id) === id);
    if (interior) setConfig(c => ({ ...c, interior }));
  };

  const handleSetWheel = (id) => {
    const wheel = defs.wheels.find(w => (w.idKey || w.id) === id);
    if (wheel) setConfig(c => ({ ...c, wheels: wheel }));
  };

  const handleSetPaint = (colorHex) => {
    const paint = defs.paint.find(p => p.hex === colorHex);
    if (paint) setConfig(c => ({ ...c, paint }));
    else setConfig(c => ({ ...c, paint: { name: "Custom", hex: colorHex, price: 0 } }));
  };

  return (
    <div className="flex gap-6">
      <div className="flex-1">
        <CarViewer
          color={config.paint?.hex || "#ff0000"}
          selectedWheel={config.wheels?.idKey || config.wheels?.id || null}
          options={Object.fromEntries(Object.entries(config.extras).filter(([k,v]) => v))}
        />
      </div>

      <div className="w-80 flex flex-col gap-6">
        <div>
          <h3 className="text-white font-semibold mb-2">Couleur</h3>
          <ColorPicker color={config.paint?.hex || "#ff0000"} onChange={handleSetPaint} />
        </div>

        <OptionsPanel
          options={{ ...config.extras, interior: config.interior }}
          onToggle={handleToggleOption}
          onSetInterior={handleSetInterior}
          defs={defs}
        />

        <div>
          <h3 className="text-white font-semibold mb-2">Jantes</h3>
          <WheelSelector
            wheels={defs.wheels}
            selected={config.wheels?.idKey || config.wheels?.id}
            onSelect={handleSetWheel}
          />
        </div>

        <Summary
          color={config.paint?.hex || "#ff0000"}
          wheel={config.wheels}
          options={{ ...config.extras, interior: config.interior }}
          total={total}
        />
      </div>
    </div>
  );
}
