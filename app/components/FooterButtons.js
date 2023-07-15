"use client";
import React from "react";

const sortIds = (paletArr) => {
  const firstId = 20230713000;
  let i = 0;
  paletArr = paletArr.map((p) => {
    i = i + 1;
    return { ...p, paletId: firstId + i };
  });
  return paletArr;
};

const FooterButtons = ({
  checkedAmount,
  paletArr,
  setPaletArr,
  kalanPaletAdet,
  setKalanPaletAdet,
  isDarkMode,
}) => {
  const removeSelectedOnes = () => {
    const removedAmount = [...paletArr].reduce((prev, curr) => {
      if (curr.isChecked) {
        return prev + (curr.paletAmount || 0);
      }
      return prev;
    }, 0);
    let newPaletArr = [...paletArr].filter((p) => p.isChecked !== true);
    /* newPaletArr.forEach((p, i) => {
      if (p.isChecked) {
        newPaletArr[i] = { paletId: p.paletId, isEmpty: true };
      }
    }); */
    setPaletArr(newPaletArr);
    setKalanPaletAdet(kalanPaletAdet + removedAmount);
  };

  const combineHandler = () => {
    if (paletArr.length === 0 || !paletArr.some((p) => p.isChecked === true))
      return;
    let newPaletArr = [...paletArr];
    const combinedAmount = newPaletArr.reduce((prev, curr) => {
      if (curr.isChecked) {
        return prev + (curr.paletAmount ? curr.paletAmount : 0);
      }
      return prev;
    }, 0);
    let firstChecked = newPaletArr.findIndex((p) => p.isChecked === true);
    newPaletArr[firstChecked].paletAmount = combinedAmount;

    newPaletArr = newPaletArr.filter((p) => {
      if (
        p.paletId === newPaletArr[firstChecked].paletId ||
        p.isChecked !== true
      ) {
        return p;
      }
    });
    setPaletArr(sortIds(newPaletArr));
  };
  return (
    <div className="w-full h-auto bg-white flex gap-1 rounded-md p-2 justify-start items-center">
      <div className="flex items-center gap-3">
        <label className="text-xs lg:text-sm dark:text-black">
          {checkedAmount} seri seçili
        </label>
        <button
          className="w-fit bg-blue-400 text-white text-xs p-1 rounded-md lg:text-sm lg:w-20"
          onClick={combineHandler}
        >
          Birleştir
        </button>
        <button
          className="w-[35px] bg-red-400 text-white text-xs p-1 rounded-md lg:text-sm lg:w-20"
          onClick={removeSelectedOnes}
        >
          Sil
        </button>
      </div>

      <label className="text-xs lg:text-sm dark:text-black">
        {kalanPaletAdet}
      </label>

      <button
        className={`w-fit ${
          isDarkMode ? "bg-white" : "bg-purple-400"
        } text-white text-xs p-1 rounded-md lg:text-sm lg:w-20`}
        onClick={() => console.log(paletArr)}
      >
        Kaydet
      </button>
    </div>
  );
};

export default FooterButtons;
