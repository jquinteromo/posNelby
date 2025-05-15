"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function VerificationCodePage() {
  const router = useRouter();
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [errorMessage, setErrorMessage] = useState("");
  const [timer, setTimer] = useState(60);
  const inputsRef = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value.slice(-1);
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    if (!value && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  
  const handleSubmit = () => {
    if (code.join("") === "") {
      router.push("/home");
    } else {
      setErrorMessage("Código incorrecto, intenta nuevamente.");
    }
  };

  const handleResend = () => {
    setTimer(60);
    setErrorMessage("");
    setCode(Array(6).fill(""));
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-pink-100 to-indigo-200">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-sm w-full text-center space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">Verifica tu código</h1>

        <div className="flex justify-center space-x-2">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                if (el) inputsRef.current[index] = el;
              }}
              type="text"
              value={digit}
              maxLength={1}
              onChange={(e) => handleChange(e, index)}
              className="w-12 h-12 text-center text-2xl border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        <button
          className="mt-4 rounded-sm px-6 py-2 bg-gradient-to-r from-pink-500 to-indigo-600 text-white  shadow-lg hover:bg-blue-600 transition duration-200"
          onClick={handleSubmit}
        >
          Verificar
        </button>

        {timer > 0 ? (
          <p className="text-gray-500">Reenviar código en {timer} segundos</p>
        ) : (
          <button className="text-blue-500 underline" onClick={handleResend}>
            Reenviar código
          </button>
        )}
      </div>
    </div>
  );
}
