import { useState, useMemo } from "react";
import CarViewer from "./components/CarViewer";
import ColorPicker from "./components/ColorPicker";
import WheelSelector from "./components/WheelSelector";
import OptionsPanel from "./components/OptionsPanel";
import { useOptionsData } from "./hooks/useOptionsData";

export default function App() {
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

  if (loading) return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;

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
    <div className="min-h-screen flex flex-col md:flex-row bg-neutral-100">
      {/* Sidebar */}
      <aside className="w-full md:w-[300px] bg-white backdrop-blur-xl border-b md:border-b-0 md:border-r shadow-lg flex flex-col md:fixed md:top-0 md:left-0 md:h-full">
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight mb-4 text-neutral-900">
              Configuration
            </h2>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-neutral-700 mb-3">Couleur</h3>
            <ColorPicker color={config.paint?.hex || "#000000"} onChange={handleSetPaint} />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-neutral-700 mb-3">Jantes</h3>
            <WheelSelector
              wheels={defs.wheels}
              selected={config.wheels?.idKey || config.wheels?.id}
              onSelect={handleSetWheel}
            />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-neutral-700 mb-3">Intérieur</h3>
            <div className="space-y-2">
              {defs.interior.map(i => {
                const id = i.idKey || i.id;
                const isSelected = config.interior?.idKey === id || config.interior?.id === id;
                return (
                  <button
                    key={id}
                    onClick={() => handleSetInterior(id)}
                    className={`w-full text-left p-3 rounded-lg transition-all border-2 font-semibold ${isSelected ? "border-blue-500 bg-blue-50 text-neutral-900" : "border-gray-300 bg-white text-neutral-900 hover:border-gray-400"}`}
                  >
                    <div className="font-bold">{i.name}</div>
                    <div className="text-sm font-medium text-gray-600">{(i.price || 0).toLocaleString('fr-FR')} €</div>
                  </button>
                );
              })}
            </div>
          </div>

          <OptionsPanel
            options={config.extras}
            onToggle={handleToggleOption}
            defs={defs}
          />
        </div>

        <div className="p-4 border-t border-gray-200 text-neutral-800 font-bold text-lg">
          Total : {total.toLocaleString("fr-FR")} €
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 md:ml-[300px] p-6 md:p-14">
        <section className="flex flex-col items-center w-full">
          <h1 className="text-3xl md:text-5xl font-bold text-neutral-900 tracking-tight mb-6 md:mb-12 text-center">
            Car Configurator 3D
          </h1>
          <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl p-4 md:p-6 border border-gray-200">
            <CarViewer
              color={config.paint?.hex || "#000000"}
              selectedWheel={config.wheels?.idKey || config.wheels?.id || null}
              options={Object.fromEntries(Object.entries(config.extras).filter(([,v]) => v))}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
