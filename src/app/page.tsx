"use client";

import { Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { evaluate } from "mathjs";
import { useRouter } from "next/router";

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isResult, setIsResult] = useState<boolean>(false);
  const router = useRouter();

  const handleButtonClick = (value: string): void => {
    if (error) setError(null);
    if (isResult) {
      setDisplayValue(value);
      setIsResult(false);
    } else {
      setDisplayValue((prevValue) => prevValue + value);
    }
  };

  const handleEqualClick = (): void => {
    try {
      const result = evaluate(displayValue);
      const resultStr = result.toString();

      if (resultStr === "500") {
        router?.push("/home");
        console.log(resultStr);
      }

      setDisplayValue(resultStr);
      setIsResult(true);
    } catch (err) {
      setError("Invalid expression");
      setDisplayValue("Error");
      setIsResult(false);
    }
  };
  const handleClear = (): void => {
    setDisplayValue("");
    setError(null);
    setIsResult(false);
  };

  const backspace = () => {
    setDisplayValue(displayValue.slice(0, -1));
    setIsResult(false);
  };

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleEqualClick();
      }
      if (event.key === "Backspace") {
        backspace();
      }
      if (/[0-9+\-*/.]/.test(event.key)) {
        handleButtonClick(event.key);
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [displayValue, isResult]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="flex flex-col items-center p-4 bg-gray-800 text-white rounded-lg shadow-lg max-w-xs w-full">
        <h1 className="text-2xl font-semibold mb-4">Calculator</h1>

        <input
          type="text"
          id="display"
          value={displayValue}
          readOnly
          className="w-full p-4 text-3xl text-right bg-gray-700 rounded-lg border border-gray-600 mb-4 focus:outline-none"
        />

        {error && <div className="text-red-500 mb-2">{error}</div>}

        <div className="grid grid-cols-4 gap-4 w-full">
          <Button onClick={() => handleButtonClick("7")}>
            <Typography sx={{ color: "white", fontSize: "1.5rem" }}>
              7
            </Typography>
          </Button>
          <Button onClick={() => handleButtonClick("8")}>
            <Typography sx={{ color: "white", fontSize: "1.5rem" }}>
              8
            </Typography>
          </Button>
          <Button onClick={() => handleButtonClick("9")}>
            <Typography sx={{ color: "white", fontSize: "1.5rem" }}>
              9
            </Typography>
          </Button>
          <Button onClick={() => handleButtonClick("/")}>
            <Typography sx={{ color: "white" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.499 11.998h15m-7.5-6.75h.008v.008h-.008v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM12 18.751h.007v.007H12v-.007Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </Typography>
          </Button>

          <Button onClick={() => handleButtonClick("4")}>
            <Typography sx={{ color: "white", fontSize: "1.5rem" }}>
              4
            </Typography>
          </Button>
          <Button onClick={() => handleButtonClick("5")}>
            <Typography sx={{ color: "white", fontSize: "1.5rem" }}>
              5
            </Typography>
          </Button>
          <Button onClick={() => handleButtonClick("6")}>
            <Typography sx={{ color: "white", fontSize: "1.5rem" }}>
              6
            </Typography>
          </Button>
          <Button onClick={() => handleButtonClick("*")}>
            <Typography sx={{ color: "white" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </Typography>
          </Button>

          <Button onClick={() => handleButtonClick("1")}>
            <Typography sx={{ color: "white", fontSize: "1.5rem" }}>
              1
            </Typography>
          </Button>
          <Button onClick={() => handleButtonClick("2")}>
            <Typography sx={{ color: "white", fontSize: "1.5rem" }}>
              2
            </Typography>
          </Button>
          <Button onClick={() => handleButtonClick("3")}>
            <Typography sx={{ color: "white", fontSize: "1.5rem" }}>
              3
            </Typography>
          </Button>
          <Button onClick={() => handleButtonClick("+")}>
            <Typography sx={{ color: "white" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </Typography>
          </Button>

          <Button onClick={() => handleButtonClick(".")}>
            <Typography sx={{ color: "white", fontSize: "1.5rem" }}>
              .
            </Typography>
          </Button>
          <Button onClick={() => handleButtonClick("0")}>
            <Typography sx={{ color: "white", fontSize: "1.5rem" }}>
              0
            </Typography>
          </Button>
          <Button onClick={() => handleEqualClick()}>
            <Typography sx={{ color: "white" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.499 8.248h15m-15 7.501h15"
                />
              </svg>
            </Typography>
          </Button>
          <Button onClick={() => handleButtonClick("-")}>
            <Typography sx={{ color: "white" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14"
                />
              </svg>
            </Typography>
          </Button>
        </div>
        <div className="mt-4 flex gap-4">
          <Button onClick={() => handleClear()}>
            <Typography sx={{ color: "white", fontSize: "1.5rem" }}>
              Clear
            </Typography>
          </Button>
          <Button onClick={() => backspace()}>
            <Typography sx={{ color: "white", fontSize: "1.5rem" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z"
                />
              </svg>
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
