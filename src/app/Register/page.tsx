"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function RegisterPage() {
  const router = useRouter();

  const changeLogin = () => {
    router.push("/Login");
  };

  return (
    <div className="flex justify-center items-center  h-screen px-12 py-8">
      <div className="flex flex-col w-lg h-full ">
        <div className="flex flex-row items-center justify-center w-full -950 h-14">
          <Image
            src="/Icons_login/iconNelby.png"
            alt="Icono de login"
            width={70}
            height={46}
            className="object-contain"
          />
          <h1 className="text-3xl">elby</h1>
        </div>

        <div className=" flex flex-col md:flex-row w-full flex-1  mt-5 ">
          <div className="flex flex-col gap-12 justify-center items-center  text-white p-8 shadow-md flex-1">
            <h1 className="text-left text-2xl text-black mr-auto lg:ml-7 ml-0">
              Crea tu cuenta!
            </h1>

            <input
              placeholder="Nombre Completo"
              className="w-full max-w-sm h-10 border-b-2 border-b-neutral-300 placeholder-neutral-400 text-black  focus:outline-none"
            />

            <input
              placeholder="Correo electrónico o número"
              className="w-full max-w-sm h-10 border-b-2 border-b-neutral-300 placeholder-neutral-400 text-black  focus:outline-none"
            />

            <input
              placeholder="Contraseña"
              className="w-full max-w-sm h-10 border-b-2 border-b-neutral-300 placeholder-neutral-400 text-black  focus:outline-none"
            />
            <h1 className="text-black mr-auto lg:ml-7 ml-0">
              {" "}
              Elige una foto (opcional)
            </h1>

            <div className="flex flex-row items-center gap-7 w-full h-12 max-w-sm ">
              <Image
                src="/Icons_Register/Icon_Porfil.png"
                alt="Icono de login"
                width={50}
                height={46}
                className="object-contain"
              />

              <input
                value={"Subir imagen"}
                className="w-28 h-6 text-sm rounded bg-gradient-to-r from-pink-500 to-indigo-600 rounded-tr-sm cursor-pointer hover:opacity-75"
                type="button"
              ></input>
            </div>

            <input
              value="Registrate"
              type="button"
              className="w-full max-w-xs h-10 bg-gradient-to-r from-pink-500 to-indigo-600 rounded-xl cursor-pointer hover:opacity-75"
            />

            <div className="w-full max-w-sm flex justify-between">
              <h1 className="text-black text-sm">¿Ya tienes cuenta?:</h1>
              <a
                onClick={changeLogin}
                className="text-purple-950 text-sm cursor-pointer hover:underline"
              >
                Inicia Sesión
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

//pointer , quitar focus, dar animacion hver btonoes
