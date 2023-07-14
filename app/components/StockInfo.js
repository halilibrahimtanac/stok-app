import React from "react";

const StockInfo = () => {
  return (
    <div className="w-full h-auto bg-white flex flex-col gap-1 rounded-md p-2">
      <label className="text-sm dark:text-black">
        <strong>Stok Kodu:</strong>
        150-002-100-002-119
      </label>
      <label className="text-sm dark:text-black">
        <strong>Stok Adı:</strong>
        Cook Alm.Fol 30x8 Mt. Kolisi 12'li
      </label>
    </div>
  );
};

export default StockInfo;
