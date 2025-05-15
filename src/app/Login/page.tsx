"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";

type FormDataType = {
  email: string;
  password: string;
};

// Por defecto las propiedades estarán vacías
const FormDataInit: FormDataType = {
  email: "",
  password: "",
};

export default function LoginPage() {
  const router = useRouter();
  const [formData, setformData] = useState<FormDataType>(FormDataInit);
  const [ErrorMessages, setErrorMessages] =
    useState<FormDataType>(FormDataInit);

    
  // ✅ Función de Validación (mejora)
  const validateFields = (name: string, value: string) => {
    if (name === "email") {
      setErrorMessages((prev) => ({
        ...prev,
        email: !value
          ? "Por favor rellena el campo"
          : value.length === 3 && /[^a-zA-Z0-9]/.test(value)
          ? "Caracteres no aceptados"
          : "",
      }));
    }

    if (name === "password") {
      setErrorMessages((prev) => ({
        ...prev,
        password: !value
          ? "Por favor rellena el campo"
          : value.length < 8
          ? "La contraseña debe tener al menos 8 caracteres."
          : "",
      }));
    }
  };

  const SubmitForm = (name: string, value: string) => {
    setformData({
      ...formData,
      [name]: value,
    });
    validateFields(name, value); // ✅ Validar en tiempo real
  };

  const handleSubmit = async () => {
    validateFields("email", formData.email);
    validateFields("password", formData.password);

    if (ErrorMessages.email || ErrorMessages.password) return;

    try {
      const response = await axios.post(
"https://posnelby-backend.onrender.com//api/register",
        // "http://localhost:3002/api/auth",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Respuesta del servidor:", response.data);
    } catch (error) {
      console.error("Error al iniciar sesión", error);
    }
  };

  const changeRegister = () => {
    router.push("/Register");
  };

  return (
    <div className="flex items-center flex-col h-screen px-12 py-8">
      <div className="w-full h-18 relative">
        <Image
          src="/Icons_login/iconNelby.png"
          alt="Icono de login"
          width={100}
          height={100}
          className="object-contain"
        />
      </div>

      <div className="flex flex-col md:flex-row w-full flex-1 ">
        <div className="hidden md:flex flex-col justify-center px-10 gap-8 text-white shadow-md flex-1 pb-14 ">
          <h1 className="text-center text-black text-3xl">
            Bienvenido a Nelby!
          </h1>
          <p className="text-black text-center">
            Nos alegra tenerte en Nelby 🎉. Un espacio donde la creatividad y la
            comunidad se unen.
          </p>
        </div>

        <div className="flex flex-col gap-11 justify-center items-center text-white p-8 shadow-md flex-1">
          <h1 className="text-center text-3xl text-black">Iniciar Sesión</h1>

          <div className="w-full max-w-sm relative">
            <input
              onChange={(e) => SubmitForm(e.target.name, e.target.value)}
              name="email"
              type="email"
              placeholder="Correo electrónico"
              className="w-full h-10 border-b-2 border-b-neutral-300 placeholder-neutral-400 text-black focus:outline-none"
            />
            {ErrorMessages.email && (
              <div className="flex items-center gap-2 mt-1 text-red-500 text-sm animate-pulse">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 9v2m0 4h.01M12 5a7 7 0 1 1 0 14 7 7 0 0 1 0-14z" />
                </svg>
                <p>{ErrorMessages.email}</p>
              </div>
            )}
          </div>

          <div className="w-full max-w-sm relative">
            <input
              onChange={(e) => SubmitForm(e.target.name, e.target.value)}
              type="password"
              name="password"
              placeholder="Contraseña"
              className="w-full h-10 border-b-2 border-b-neutral-300 placeholder-neutral-400 text-black focus:outline-none"
            />
            {ErrorMessages.password && (
              <div className="flex items-center gap-2 mt-1 text-red-500 text-sm animate-pulse">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 9v2m0 4h.01M12 5a7 7 0 1 1 0 14 7 7 0 0 1 0-14z" />
                </svg>
                <p>{ErrorMessages.password}</p>
              </div>
            )}
          </div>

          <input
            onClick={handleSubmit}
            value="Iniciar Sesión"
            type="button"
            className="w-full max-w-xs h-10 bg-gradient-to-r from-pink-500 to-indigo-600 rounded-xl cursor-pointer hover:opacity-75"
          />

          <div className="w-full max-w-sm flex justify-between">
            <h1 className="text-black text-sm">¿Aún no tienes cuenta?</h1>
            <a
              onClick={changeRegister}
              className="text-purple-950 text-sm cursor-pointer hover:underline"
            >
              Registrarse
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
