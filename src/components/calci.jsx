import React, { useState } from "react";

export default function Calculator() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (value) => {
    if (value === "=") {
      try {
        setResult(eval(expression).toString());
      } catch (error) {
        setResult("Error");
      }
    } else if (value === "C") {
      setExpression("");
      setResult("");
    } else {
      setExpression((prev) => prev + value);
    }
  };

  return (
    <div className="container mx-auto my-4 p-4 max-w-sm bg-gray-100 rounded-lg h-[428px]">
      <input
        type="text"
        value={expression}
        className="w-full mb-4 px-3 py-2 bg-white border border-gray-300 rounded-md text-lg text-gray-800 focus:outline-none"
        readOnly
      />
      <input
        type="text"
        value={result}
        className="w-full mb-6 px-3 py-2 bg-white border border-gray-300 rounded-md text-lg text-gray-800 focus:outline-none"
        readOnly
      />
      <div className="grid grid-cols-4 gap-2">
        {[
          "7",
          "8",
          "9",
          "+",
          "4",
          "5",
          "6",
          "-",
          "1",
          "2",
          "3",
          "*",
          "C",
          "0",
          "=",
          "/",
        ].map((item) => (
          <button
            key={item}
            className="px-4 py-2  hover:bg-slate-950 rounded-md text-white font-semibold transition duration-200 ease-in-out bg-slate-900"
            onClick={() => handleClick(item)}
          >
            {item}
          </button>
        ))}
        <br />
      </div>
    </div>
  );
}
