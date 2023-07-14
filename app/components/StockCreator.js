"use client";
import React, { useState } from "react";

const StockCreator = ({ createStock }) => {
  const [palet, setPalet] = useState({
    palet: 0,
    paletAdet: 0,
  });

  const onChangeHandler = (e) => {
    const val = parseInt(e.target.value);
    if (val > 0) setPalet({ ...palet, [e.target.name]: val });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    createStock(palet.palet, palet.paletAdet);
  };
  return (
    <form
      onSubmit={submitHandler}
      className="w-full h-auto bg-white flex gap-[4px] rounded-md p-2 lg:gap-1"
    >
      <div className="w-fit flex items-center">
        <label className="text-[10px] dark:text-black">Palet Sayısı:</label>
        <input
          type="number"
          name="palet"
          min={0}
          className="w-[40%] h-6 rounded-md p-2 border-[1px] border-slate-300 text-xs lg:w-1/3 dark:text-black"
          onChange={onChangeHandler}
        />
      </div>

      <div className="w-fit flex items-center">
        <label className="text-[10px] dark:text-black">1 Palet kaç adet:</label>
        <input
          type="number"
          name="paletAdet"
          min={0}
          className="w-[45%] h-6 rounded-md p-2 border-[1px] border-slate-300 text-xs lg:w-1/3 dark:text-black"
          onChange={onChangeHandler}
        />
      </div>

      <div className="w-fit flex items-center">
        <button
          type="submit"
          className="bg-blue-400 text-white text-[10px] p-1 rounded-md"
        >
          Oluştur
        </button>
      </div>
    </form>
  );
};

export default StockCreator;
