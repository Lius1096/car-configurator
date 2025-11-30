import React, { useState, useMemo } from "react";
import CarConfigurator from "./components/CarConfigurator";
import CarViewer from "./components/CarViewer";

export default function App() {
  const [config, setConfig] = useState({
    paint: null,
    wheels: null,
    interior: null,
    extras: {},
  });

  const total = useMemo(() => {
    const paintPrice = config.paint?.price || 0;
    const wheelsPrice = config.wheels?.price || 0;
    const interiorPrice = config.interior?.price || 0;
    const extrasPrice = Object.values(config.extras).reduce(
      (sum, option) => sum + (option.price || 0),
      0
    );
    return paintPrice + wheelsPrice + interiorPrice + extrasPrice;
  }, [config]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-neutral-100">
      {/* Sidebar */}
      <aside className="w-full md:w-[300px] bg-white backdrop-blur-xl border-b md:border-b-0 md:border-r shadow-lg flex flex-col md:fixed md:top-0 md:left-0 md:h-full">
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <h2 className="text-2xl font-semibold tracking-tight mb-6 md:mb-10 text-neutral-900">
            Configuration
          </h2>
          <CarConfigurator config={config} setConfig={setConfig} total={total} />
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
              color={config.paint?.hex}
              selectedWheel={config.wheels?.idKey}
              options={config.extras}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
