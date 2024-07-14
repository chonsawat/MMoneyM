import React from "react";

import { useAddTransact } from "../Services/useAddTransact";
import { useEditTransact } from "../Services/useUpdateTransact";

export const TransactInputForm = ({ values, onChangeMethods }) => {
  const { createTransact } = useAddTransact();
  const { editTransact } = useEditTransact();
  const { id, description, variance, date, price } = values;
  const { setDesc, setDate, setVariance, setPrice } = onChangeMethods;

  async function add() {
    const newData = {
      description,
      variance,
      price,
      date,
    };
    createTransact(newData);
  }

  async function updateHandler() {
    const newData = {
      date,
      description,
      variance,
      price: parseFloat(price),
    };
    editTransact({ id, newData });
  }

  return (
    <>
      <form
        className="row mt-5"
        onSubmit={(e) => {
          e.preventDefault();
          add();
        }}
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 10,
          alignItems: "center",
        }}
      >
        <input
          id="date-input"
          type="date"
          onChange={(e) => setDate(e.currentTarget.value)}
          placeholder="Enter Date ..."
          className="rounded-full py-1 px-3 border "
          value={date}
        />
        <input
          id="desc-input"
          onChange={(e) => setDesc(e.currentTarget.value)}
          placeholder="Enter Description ..."
          className="rounded-full py-1 px-3 border "
          value={description}
        />
        <input
          id="var-input"
          onChange={(e) => setVariance(e.currentTarget.value)}
          placeholder="Enter a Variance ..."
          className="rounded-full py-1 px-3 border "
          value={variance}
        />
        <input
          id="price-input"
          onChange={(e) => setPrice(e.currentTarget.value)}
          placeholder="Enter a Price ..."
          className="rounded-full py-1 px-3 border "
          value={price}
        />
        <button type="submit" className="rounded-full py-1 px-3 border">
          Add
        </button>
        <button
          type="button"
          className="rounded-full py-1 px-3 border bg-lime-500 text-white hover:bg-lime-400"
          onClick={updateHandler}
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => {
            console.log("Export as Excel");
          }}
          className="rounded-full py-1 px-3 border bg-black text-white hover:bg-gray-800"
        >
          Export
        </button>
      </form>
    </>
  );
};
