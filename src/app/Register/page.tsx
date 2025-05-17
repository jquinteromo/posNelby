"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

type FormDataType = {
  email: string;
  password: string;
  nameUs: string;
};

const FormDataInit: FormDataType = {
  email: "",
  password: "",
  nameUs: "",
};

export default function RegisterPage() {
  const router = useRouter();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [Preview, setPreview] = useState<string | null>(null);
  const [formData, setformData] = useState<FormDataType>(FormDataInit);
  const [ErrorMessages, setErrorMessages] =
    useState<FormDataType>(FormDataInit);

  const validateAllFields = (data: FormDataType) => {
    const errors: FormDataType = {
      email: "",
      password: "",
      nameUs: "",
    };

    if (!data.nameUs) {
      errors.nameUs = "Por favor ingresa tu nombre completo";
    } else if (data.nameUs.length < 5) {
      errors.nameUs = "El nombre debe tener al menos 5 caracteres";
    } else if (data.nameUs.length > 50) {
      errors.nameUs = "El nombre no puede tener más de 50 caracteres";
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9 ]+$/.test(data.nameUs)) {
      errors.nameUs = "El nombre solo debe contener letras.";
    }

    if (!data.email) {
      errors.email = "Por favor ingresa tu email";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email)
    ) {
      errors.email = "Por favor ingresa un correo valido";
    } else if (data.email.length > 100) {
      errors.email = "El correo no puede tener más de 100 caracteres";
    }

    if (!data.password) {
      errors.password = "Por favor ingresa tu contraseña";
    } else if (data.password.length < 6) {
      errors.password = "La contraseña debe tener al menos 6 caracteres";
    } else if (!/(?=.*[A-Z])/.test(data.password)) {
      errors.password = "La contraseña debe tener al menos una letra mayuscula";
    }

    return errors;
  };

  const udtImgPorf = (file: File) => {
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      return () => URL.revokeObjectURL(imageUrl);
    }
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const SubmitForm = (name: string, value: string) => {
    setformData({
      ...formData,
      [name]: value,
    });
    const erros = validateAllFields({... formData, [name]:value})

   setErrorMessages({
  ...ErrorMessages, // Mantiene los errores existentes
  [name]: erros[name as keyof FormDataType], // Solo actualiza el error del campo modificado
});
  }

  useEffect(() => {
    console.log(ErrorMessages);
  }, [ErrorMessages]);

  const handleSubmit = async () => {
    const errors = validateAllFields(formData);
    setErrorMessages(errors);
    const hasErrors = Object.values(errors).some((error) => error !== "");

    if (hasErrors) {
      console.error("Errores detectados:", errors);
      return;
    }

    try {
      const response = await axios.post(
        "https://posnelby-backend.onrender.com/api/register",
        // "http://localhost:3003/api/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json", // Asegúrate de que tu backend esté esperando JSON
          },
        }
      );
      console.log("Respuesta del servidor:", response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        const { data } = error.response;

        setErrorMessages((prev) => ({
          ...prev,
          email: data.message,
        }));
      } else {
        console.error("otro error", error);
      }

      console.error("Error al iniciar sesión", error);
    }
  };

  const changeLogin = () => {
    router.push("/Login");
  };

  return (
    <div className="flex justify-center items-center h-screen px-12 py-8 ">
      <div className="flex flex-col w-96 h-full    gap-5">
        <div className="flex flex-row items-center  justify-center w-full h-14">
          <Image
            src="/Icons_login/iconNelby.png"
            alt="Icono de login"
            width={79}
            height={76}
            className="object-contain"
          />
          <h1 className="text-3xl">elby</h1>
        </div>

        <div className="flex flex-col w-full mt-5 gap-10 pb-10 ">
          <h1 className="text-2xl text-black">Crea tu cuenta!</h1>

          <div className="w-full max-w-sm relative">
            <input
              onChange={(e) => SubmitForm(e.target.name, e.target.value)}
              type="text"
              name="nameUs"
              placeholder="Nombre Completo"
              className="w-full h-10 border-b-2 border-neutral-300 placeholder-neutral-400 text-black focus:outline-none"
            />
            {ErrorMessages.nameUs && (
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
                <p>{ErrorMessages.nameUs}</p>
              </div>
            )}
          </div>

          <div className="w-full max-w-sm relative">
            <input
              onChange={(e) => SubmitForm(e.target.name, e.target.value)}
              type="email"
              name="email"
              placeholder="Correo electrónico o número"
              className="w-full h-10 border-b-2 border-neutral-300 placeholder-neutral-400 text-black focus:outline-none"
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
              className="w-full h-10 border-b-2 border-neutral-300 placeholder-neutral-400 text-black focus:outline-none"
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

          <h1 className="text-black">Elige una foto (opcional)</h1>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden relative">
              <Image
                src={Preview ?? "/Icons_Register/Icon_porfil.png"}
                alt="Avatar"
                width={96}
                height={96}
                className="object-cover"
              />
            </div>

            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) =>
                e.target.files?.[0] && udtImgPorf(e.target.files[0])
              }
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1 bg-gradient-to-r from-pink-500 to-indigo-600 text-white rounded hover:opacity-75"
            >
              Subir imagen
            </button>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full mt-4 bg-gradient-to-r from-pink-500 to-indigo-600 text-white py-2 rounded-xl hover:opacity-75"
          >
            Registrate
          </button>

          <div className="flex justify-between mt-4 text-sm text-black">
            <p>¿Ya tienes cuenta?:</p>
            <a
              onClick={changeLogin}
              className="text-purple-950 cursor-pointer hover:underline"
            >
              Inicia Sesión
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
