import React from "react";
import { useState } from "react";

import { useTransact } from "../Services/useTransact";

import { Loading } from "./Loading";
import { TransactTable } from "../Features/TransactTable";
import { TransactInputForm } from "../Features/TransactInputForm";

export const Transact = () => {
  const [id, setID] = useState(0);
  const [description, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [variance, setVariance] = useState("");
  const [price, setPrice] = useState("");
  const [page, setPage] = useState(0);
  const [descending, setDescending] = useState(true);

  const { isLoading, transacts } = useTransact(page, descending);

  if (isLoading) {
    return <Loading />;
  }

  const descendingSwitch = () => {
    let newDesc = !descending;
    setDescending(newDesc);
  };

  return (
    <div className="centent flex flex-col mt-5 mx-10">
      <h1 className="text-3xl font-bold text-center">TRANSACTION</h1>

      <TransactInputForm
        onChangeMethods={{
          setDesc,
          setDate,
          setVariance,
          setPrice,
        }}
        values={{ id, description, date, variance, price }}
      />

      <DataControllerButton
        page={page}
        maxPage={transacts.maxPage}
        editPage={setPage}
      />

      <TransactTable
        transacts={transacts.data}
        isDescending={descending}
        onChangeMethods={{
          setID,
          setDesc,
          setDate,
          setVariance,
          setPrice,
          descendingSwitch,
        }}
      />
    </div>
  );
};

const DataControllerButton = ({ page, maxPage, editPage }) => {
  const LeftClickHandler = () => {
    if (page > 0) {
      editPage(page - 1);
      console.log("refetch");
    }
  };

  const RightClickHandler = () => {
    if (page < maxPage - 1) {
      editPage(page + 1);
      console.log("refetch");
    }
  };

  return (
    <>
      <div className="flex justify-center space-x-5 mt-5">
        {page != 0 ? (
          <p
            className="font-semibold cursor-pointer select-none "
            onClick={LeftClickHandler}
          >
            ⬅️ Left
          </p>
        ) : (
          <p className="font-semibold cursor-default  select-none opacity-5">
            {" "}
            ⬅️ Left
          </p>
        )}
        {page === maxPage - 1 ? (
          <p
            className="font-semibold cursor-pointer select-none opacity-5"
            onClick={RightClickHandler}
          >
            Right ➡️
          </p>
        ) : (
          <p
            className="font-semibold cursor-pointer select-none "
            onClick={RightClickHandler}
          >
            Right ➡️
          </p>
        )}
      </div>
    </>
  );
};
