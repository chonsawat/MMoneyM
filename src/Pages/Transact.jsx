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

  const { isLoading, transacts } = useTransact();

  if (isLoading) return <h1>Is LOADING ...</h1>;

  return (
    <div className="centent flex flex-col mt-5 mx-10">
      <h1 className="text-3xl font-bold text-center">TRANSACTION</h1>

      <TransactInputForm
        onChangeMethods={{ setDesc, setDate, setVariance, setPrice }}
        values={{ id, description, date, variance, price }}
      />
      <TransactTable
        transacts={transacts}
        onChangeMethods={{ setID, setDesc, setDate, setVariance, setPrice }}
      />
    </div>
  );
};
