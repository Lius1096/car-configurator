import React from "react";

export default function Summary({ total }) {
  return (
    <div className="mt-auto pt-6 border-t">
      <div className="flex justify-between items-center text-2xl font-bold text-white">
        <span>Total</span>
        <span>{total.toLocaleString('fr-FR')} €</span>
      </div>
    </div>
  );
}
