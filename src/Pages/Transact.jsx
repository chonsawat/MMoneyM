import React from "react";
import { useState } from "react";

import { useTransact } from "../Services/useTransact";

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

  const descendingSwitch = () => {
    let newDesc = !descending;
    setDescending(newDesc);
  };

  return (
    <div className="centent flex flex-col mt-5 mx-10 select-none">
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

      {isLoading ? (
        <>
          <SkeletonDataControllerButton />

          <TransactTable
            transacts={transacts}
            isLoading={isLoading}
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
        </>
      ) : (
        <>
          <DataControllerButton
            page={page}
            maxPage={transacts.maxPage}
            editPage={setPage}
          />

          <TransactTable
            transacts={transacts.data}
            isLoading={isLoading}
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
        </>
      )}
    </div>
  );
};

const SkeletonDataControllerButton = () => {
  const ArrowStyle = "font-semibold cursor-default select-none opacity-5";

  return (
    <>
      <div className="flex justify-center space-x-5 mt-5">
        <p className={ArrowStyle}>⬅️ Left</p>
        <p className={ArrowStyle}>Right ➡️</p>
      </div>
    </>
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

  const ArrowStyle = "font-semibold cursor-pointer hover:drop-shadow hover:text-red-600 hover:animate-pulse";
  const ArrowSkeletonStyle = "font-semibold cursor-default opacity-5";

  return (
    <>
      <div className="flex justify-center space-x-5 mt-5">
        {page != 0 ? (
          <p className={ArrowStyle} onClick={LeftClickHandler}>
            ⬅️ Left
          </p>
        ) : (
          <p className={ArrowSkeletonStyle}> ⬅️ Left</p>
        )}
        {page === maxPage - 1 ? (
          <p className={ArrowSkeletonStyle}>Right ➡️</p>
        ) : (
          <p className={ArrowStyle} onClick={RightClickHandler}>
            Right ➡️
          </p>
        )}
      </div>
    </>
  );
};
