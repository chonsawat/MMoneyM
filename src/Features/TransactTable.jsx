import React from "react";

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { useDeleteTransact } from "../Services/useDeleteTransact";

const TransactContainer = ({ children }) => {
  return (
    <>
      <div className="flex flex-col mx-10 mt-5">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-xl">
              <table className="min-w-full text-center text-sm font-light text-surface dark:text-white mb-5">
                {children}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const TransactHeader = () => {
  return (
    <>
      <thead className="border-b border-neutral-200 bg-[#332D2D] font-medium text-white dark:border-white/10">
        <tr>
          <th scope="col" className=" px-4 py-3">
            Date
          </th>
          <th scope="col" className=" px-4 py-3">
            Description
          </th>
          <th scope="col" className=" px-4 py-3">
            +/-
          </th>
          <th scope="col" className=" px-4 py-3">
            Price
          </th>
          <th scope="col" className=" px-4 py-3">
            Edit
          </th>
          <th scope="col" className=" px-4 py-3">
            Delete
          </th>
        </tr>
      </thead>
    </>
  );
};

const EditBtn = () => {
  return (
    <>
      <div className="flex justify-center">
        <FaEdit
          size="2rem"
          className="text-black hover:text-gray-700 justify-items-center"
        />
      </div>
    </>
  );
};

const DeleteBtn = () => {
  return (
    <>
      <div className="flex justify-center">
        <MdDelete size="2rem" className="text-red-800 hover:text-red-400" />
      </div>
    </>
  );
};

export const TransactTable = ({ transacts, onChangeMethods }) => {
  const { removeTransact } = useDeleteTransact();
  const { setID, setDate, setDesc, setVariance, setPrice } = onChangeMethods;

  async function deleteTarget(target) {
    const id = target._links.self.href.split("/").pop();
    removeTransact(id);
  }

  async function changeHandler(target) {
    const id = target._links.self.href.split("/").pop();
    console.log(id);
    setID(id);
    setDate(target.date);
    setDesc(target.description);
    setVariance(target.variance);
    setPrice(target.price);
  }

  return (
    <>
      <TransactContainer>
        <TransactHeader />
        <tbody>
          {transacts
            ? transacts.map((element, index) => {
                return (
                  <tr
                    key={index}
                    className="border-b border-neutral-200 dark:border-white/10 "
                  >
                    <td className="whitespace-nowrap  px-4 py-3 font-medium">
                      {element.date}
                    </td>
                    <td className="whitespace-nowrap  px-4 py-3">
                      {element.description}
                    </td>
                    <td className="whitespace-nowrap  px-4 py-3">
                      {element.variance}
                    </td>
                    <td className="whitespace-nowrap  px-4 py-3">
                      {element.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                    <td
                      className="whitespace-nowarp px-4 py-3 cursor-pointer"
                      onClick={(e) => changeHandler(element)}
                    >
                      <EditBtn />
                    </td>
                    <td
                      className="whitespace-nowrap  px-4 py-3 cursor-pointer inline-flex justify-center"
                      onClick={(e) => deleteTarget(element)}
                    >
                      <DeleteBtn />
                    </td>
                  </tr>
                );
              })
            : ""}
        </tbody>
      </TransactContainer>
    </>
  );
};
