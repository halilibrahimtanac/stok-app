"use client";
import React from "react";

const FooterButtons = ({
  checkedAmount,
  paletArr,
  setPaletArr,
  kalanPaletAdet,
  setKalanPaletAdet,
}) => {
  const removeSelectedOnes = () => {
    const removedAmount = [...paletArr].reduce((prev, curr) => {
      if (curr.isChecked) {
        return prev + curr.paletAmount;
      }
      return prev;
    }, 0);
    const filteredPalets = [...paletArr].filter((p) => p.isChecked !== true);
    setPaletArr(filteredPalets);
    setKalanPaletAdet(kalanPaletAdet + removedAmount);
  };

  const combineHandler = () => {
    if (paletArr.length === 0 || !paletArr.some((p) => p.isChecked === true))
      return;
    let newPaletArr = [...paletArr];
    const combinedAmount = newPaletArr.reduce((prev, curr) => {
      if (curr.isChecked) {
        return prev + curr.paletAmount;
      }
      return prev;
    }, 0);
    let firstChecked = newPaletArr.findIndex((p) => p.isChecked === true);
    newPaletArr[firstChecked].paletAmount = combinedAmount;
    newPaletArr = newPaletArr.filter(
      (p) =>
        p.isChecked !== true ||
        (p.paletId === newPaletArr[firstChecked].paletId &&
          p.isChecked === true)
    );
    setPaletArr(newPaletArr);
  };
  return (
    <div className="w-full h-auto bg-white flex gap-1 rounded-md p-2 justify-between">
      <div className="flex items-center gap-3">
        <label className="text-sm">{checkedAmount} seri seçili</label>
        <button
          className="w-20 bg-blue-400 text-white text-sm p-1 rounded-md"
          onClick={combineHandler}
        >
          Birleştir
        </button>
        <button
          className="w-20 bg-red-400 text-white text-sm p-1 rounded-md"
          onClick={removeSelectedOnes}
        >
          Sil
        </button>
      </div>

      <label>{kalanPaletAdet}</label>

      <button className="w-20 bg-purple-400 text-white text-sm p-1 rounded-md">
        Kaydet
      </button>
    </div>
  );
};

export default FooterButtons;
