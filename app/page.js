"use client";
import StockInfo from "./components/StockInfo";
import StockCreator from "./components/StockCreator";
import StockTable from "./components/StockTable";
import FooterButtons from "./components/FooterButtons";
import { useEffect, useState } from "react";

const insertBetweenHelper = (paletArr, newPalet) => {
  for (let i = 0; i < paletArr.length; i++) {
    if (i < paletArr.length - 1) {
      let currentNum = paletArr[i];
      let nextNum = paletArr[i + 1];

      if (paletArr[0].paletId !== 20230713001) {
        paletArr.unshift({ ...newPalet, paletId: 20230713001 });
        break;
      }

      if (nextNum.paletId - currentNum.paletId > 1) {
        paletArr.splice(i + 1, 0, {
          ...newPalet,
          paletId: currentNum.paletId + 1,
        });
        break;
      }
    } else {
      if (paletArr[0].paletId !== 20230713001) {
        paletArr.unshift({ ...newPalet, paletId: 20230713001 });
        break;
      } else {
        paletArr.push({
          ...newPalet,
          paletId: paletArr[paletArr.length - 1].paletId + 1,
        });
        break;
      }
    }
  }

  return paletArr;
};

const exceededPaletHelper = (kalan, paletAdet, paletArr) => {
  let id = 20230713000;
  while (kalan > 0) {
    if (
      paletArr
        .map((p, i) => (id + i + 1 !== p.paletId ? true : false))
        .includes(true)
    ) {
      paletArr = insertBetweenHelper(paletArr, {
        paletAmount: paletAdet < kalan ? paletAdet : kalan,
        isChecked: false,
        isEmpty: false,
      });
    } else {
      paletArr.push({
        paletId:
          paletArr.length > 0
            ? parseInt(paletArr[paletArr.length - 1].paletId) + 1
            : 20230713001,
        paletAmount: paletAdet < kalan ? paletAdet : kalan,
        isChecked: false,
        isEmpty: false,
      });
    }
    kalan = kalan - paletAdet;
  }
  return [paletArr, kalan];
};

const notExceededPaletHelper = (kalan, adet, paletAdet, paletArr) => {
  let id = 20230713000;
  for (let i = 0; i < adet; i++) {
    if (
      paletArr
        .map((p, idx) => (id + idx + 1 !== p.paletId ? true : false))
        .includes(true)
    ) {
      paletArr = insertBetweenHelper(paletArr, {
        paletAmount: paletAdet,
        isChecked: false,
        isEmpty: false,
      });
    } else {
      paletArr.push({
        paletId:
          paletArr.length > 0
            ? parseInt(paletArr[paletArr.length - 1].paletId) + 1
            : 20230713001,
        paletAmount: paletAdet,
        isChecked: false,
        isEmpty: false,
      });
    }

    kalan = kalan - paletAdet;
  }
  return [paletArr, kalan];
};

export default function Home() {
  const [kalanPaletAdet, setKalanPaletAdet] = useState(2100);
  const [paletArr, setPaletArr] = useState([]);

  const createStock = (palet, paletAdet) => {
    let kalan = kalanPaletAdet;
    let newPaletArr = [...paletArr];

    const amount = palet * paletAdet;
    if (amount > kalanPaletAdet && paletAdet <= 2100) {
      newPaletArr = exceededPaletHelper(kalan, paletAdet, newPaletArr)[0];
      setKalanPaletAdet(0);
      setPaletArr(newPaletArr);
    } else if (amount > kalanPaletAdet) {
      newPaletArr = exceededPaletHelper(kalan, paletAdet, newPaletArr)[0];
      setKalanPaletAdet(0);
      setPaletArr(newPaletArr);
    } else if (amount <= kalanPaletAdet) {
      let paletHelperResults = notExceededPaletHelper(
        kalan,
        palet,
        paletAdet,
        newPaletArr
      );
      newPaletArr = paletHelperResults[0];
      setKalanPaletAdet(paletHelperResults[1]);
      setPaletArr(newPaletArr);
    }
  };

  const selectAll = (checkedState, setCheckedState) => {
    let newPaletArr = [...paletArr].map((p) => ({
      ...p,
      isChecked: !checkedState,
    }));
    setCheckedState(!checkedState);
    setPaletArr(newPaletArr);
  };

  const isCheckedHandler = (index) => {
    let newPaletArr = [...paletArr];
    let selected = newPaletArr[index];
    newPaletArr[index] = { ...selected, isChecked: !selected.isChecked };
    setPaletArr(newPaletArr);
  };

  const removeSingle = (val) => {
    let newPaletArr = [...paletArr].filter((p) => p.paletId !== val.paletId);
    /* let foundPaletIndex = newPaletArr.findIndex(
      (p) => p.paletId === val.paletId
    );
    newPaletArr[foundPaletIndex] = {
      paletId: newPaletArr[foundPaletIndex].paletId,
      isEmpty: true,
    }; */
    setPaletArr(newPaletArr);
    setKalanPaletAdet(
      2100 - newPaletArr.reduce((p, c) => p + (c.paletAmount || 0), 0)
    );
  };

  useEffect(() => {
    console.log("kalan: ", kalanPaletAdet);
    console.log(paletArr);
  }, [kalanPaletAdet]);

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    console.log(darkModeMediaQuery);

    const handleDarkModeChange = (e) => {
      setIsDarkMode(e.matches);
    };

    darkModeMediaQuery.addEventListener("change", handleDarkModeChange);

    // Cleanup the event listener on component unmount
    return () => {
      darkModeMediaQuery.removeEventListener("change", handleDarkModeChange);
    };
  }, []);

  return (
    <main className="w-full h-[100vh] flex items-center justify-center">
      <div className="w-[95%] h-[70vh] bg-slate-400 p-5 text-xs flex flex-col gap-4 lg:w-1/3">
        <StockInfo />
        <StockCreator createStock={createStock} />
        <StockTable
          paletArr={paletArr}
          selectAll={selectAll}
          isCheckedHandler={isCheckedHandler}
          removeSingle={removeSingle}
        />
        <FooterButtons
          checkedAmount={paletArr.filter((p) => p.isChecked === true).length}
          paletArr={paletArr}
          setPaletArr={setPaletArr}
          kalanPaletAdet={kalanPaletAdet}
          setKalanPaletAdet={setKalanPaletAdet}
          isDarkMode={isDarkMode}
        />
      </div>
    </main>
  );
}
