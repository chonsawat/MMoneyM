import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [variance, setVariance] = useState("");
  const [price, setPrice] = useState("");
  const [data, setData] = useState([
    { id: 1, desc: "Init", var: "+", price: 7000, date: "2024-06-29" },
    { id: 2, desc: "Launch", var: "-", price: 120, date: "2024-06-29" },
    { id: 3, desc: "Milk", var: "-", price: 1000, date: "2024-06-29" },
  ]);

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  async function add() {
    const newData = [
      ...data,
      {
        id: 3,
        desc,
        var: variance,
        price,
        date,
      },
    ];

    setData(newData);
  }

  async function deleteTarget(target) {
    console.log("target: ", target);
    const newData = data.filter((x) => x != target);
    setData(newData);
  }

  async function clear() {
    setGreetMsg(await invoke("clear"));
  }

  return (
    <div className="centent flex flex-col mt-5 mx-10">
      <h1 className="text-3xl font-bold text-center">
        MOB Money Management (version 0.0.1)
      </h1>

      <form
        className="row mt-2"
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
        />
        <input
          id="desc-input"
          onChange={(e) => setDesc(e.currentTarget.value)}
          placeholder="Enter Description ..."
          className="rounded-full py-1 px-3 border "
        />
        <input
          id="var-input"
          onChange={(e) => setVariance(e.currentTarget.value)}
          placeholder="Enter a Variance ..."
          className="rounded-full py-1 px-3 border "
        />
        <input
          id="price-input"
          onChange={(e) => setPrice(e.currentTarget.value)}
          placeholder="Enter a Price ..."
          className="rounded-full py-1 px-3 border "
        />
        <button type="submit" className="rounded-full py-1 px-3 border">
          Add
        </button>
        <button
          type="submit"
          className="rounded-full py-1 px-3 border bg-lime-500 text-white hover:bg-lime-400"
        >
          Save
        </button>
        <button
          type="button"
          onClick={clear}
          className="rounded-full py-1 px-3 border bg-black text-white hover:bg-gray-800"
        >
          Export
        </button>
      </form>

      <div className="flex flex-col mx-10">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-xl">
              <table className="min-w-full text-center text-sm font-light text-surface dark:text-white mb-5">
                <thead className="border-b border-neutral-200 bg-[#332D2D] font-medium text-white dark:border-white/10">
                  <tr>
                    <th scope="col" class=" px-4 py-3">
                      Date
                    </th>
                    <th scope="col" class=" px-4 py-3">
                      Description
                    </th>
                    <th scope="col" class=" px-4 py-3">
                      +/-
                    </th>
                    <th scope="col" class=" px-4 py-3">
                      Price
                    </th>
                    <th scope="col" class=" px-4 py-3">
                      Edit
                    </th>
                    <th scope="col" class=" px-4 py-3">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data
                    ? data.map((element, index) => {
                        return (
                          <tr
                            key={index}
                            className="border-b border-neutral-200 dark:border-white/10"
                          >
                            <td className="whitespace-nowrap  px-4 py-3 font-medium">
                              {element.date}
                            </td>
                            <td className="whitespace-nowrap  px-4 py-3">
                              {element.desc}
                            </td>
                            <td className="whitespace-nowrap  px-4 py-3">
                              {element.var}
                            </td>
                            <td className="whitespace-nowrap  px-4 py-3">
                              {element.price
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </td>
                            <td className="whitespace-nowrap  px-4 py-3 cursor-pointer">
                              Edit_Icon
                            </td>
                            <td
                              className="whitespace-nowrap  px-4 py-3 cursor-pointer"
                              onClick={(e) => deleteTarget(element)}
                            >
                              Delete_Icon
                            </td>
                          </tr>
                        );
                      })
                    : ""}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
