"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";


export default function VerificationCodePage() {
  const router = useRouter();
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [errorMessage, setErrorMessage] = useState("");
  const [timer, setTimer] = useState<number>(60);
  const inputsRef = useRef<HTMLInputElement[]>([]);

  // Manejo del temporizador
  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer((t) => t - 1), 1000);
      return () => clearTimeout(countdown);
    }
  }, [timer]);

  // Manejo de cambio en el input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value.slice(-1); // Solo un carácter
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Mover foco
    if (value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };


  console.log(code.join(""))

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://posnelby-backend.onrender.com/api/register",
        // "http://localhost:3003/api/verify",
           { code: code.join("") },
        {
          headers: {
            "Content-Type": "application/json", 
          },
          
        }
      );
      console.log("Respuesta del servidor:", response.data);
    } catch (error) {}
  };

  // Reenviar código
  const handleResend = () => {
    setTimer(60);
    setErrorMessage("");
    setCode(Array(6).fill(""));
  };


  //Uso ruta verificasiond e codigo 
  

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
              className="w-12 h-12 text-center text-2xl border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          ))}
        </div>

        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}

        <button
          onClick={handleSubmit}
          className="mt-4 w-full rounded-md px-6 py-2 bg-gradient-to-r from-pink-500 to-indigo-600 text-white shadow-md hover:opacity-90 transition duration-200"
        >
          Verificar
        </button>

        {timer > 0 ? (
          <p className="text-gray-500 mt-2">
            Reenviar código en {timer} segundos
          </p>
        ) : (
          <button
            className="text-indigo-600 underline mt-2"
            onClick={handleResend}
          >
            Reenviar código
          </button>
        )}
      </div>
    </div>
  );
}
