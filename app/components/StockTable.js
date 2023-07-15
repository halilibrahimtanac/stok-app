import React, { useState } from "react";
import "./table.css";
const StockTable = ({
  paletArr,
  selectAll,
  isCheckedHandler,
  removeSingle,
}) => {
  const [checkedState, setCheckedState] = useState(false);
  return (
    <div className="w-full h-[40vh] bg-white rounded-md relative overflow-scroll">
      <table className="w-full border-collapse border-2">
        <thead>
          <tr className="sticky top-0 z-[1] bg-white">
            <td className="border-2 p-2">
              <input
                type="checkbox"
                checked={
                  paletArr.length > 0 &&
                  paletArr.every((p) => p.isChecked === true)
                    ? true
                    : !paletArr.every((p) => p.isChecked === true)
                    ? false
                    : checkedState
                }
                onChange={() => selectAll(checkedState, setCheckedState)}
              />
            </td>
            <th className="border-2 p-2 text-left dark:text-black">
              Seri Numarası
            </th>
            <th className="border-2 dark:text-black">Miktar</th>
            <th className="border-2 dark:text-black">İşlemler</th>
          </tr>
        </thead>

        <tbody>
          {paletArr.map((p, i) =>
            p.isEmpty ? null : (
              <tr key={p.paletId}>
                <td className="border-2 p-2">
                  <input
                    type="checkbox"
                    checked={p.isChecked}
                    onChange={() => isCheckedHandler(i)}
                  />
                </td>
                <td className="border-2 p-2 dark:text-black">{p.paletId}</td>
                <td className="border-2 p-2 dark:text-black">
                  {p.paletAmount}
                </td>
                <td className="border-2 p-2 dark:text-black">
                  <button
                    className="w-20 bg-red-400 text-white text-sm p-1 rounded-md"
                    onClick={() => removeSingle(p)}
                  >
                    Sil
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;
