"use client";

// import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Sidebar() {
  // const router = useRouter();

  return (
    <div className="flex flex-col gap-2 w-96 px-12 h-auto bg-gray-100">
  
      <div className="text-gray-600 py-6">

        <div className="bg-gray-200 outline-none flex items-center justify-start gap-2 rounded-lg px-4 text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
          />
        </svg>

     
        <input
          type="text"
          placeholder="Buscar"
          className="bg-gray-200 outline-none flex-1 text-gray-600 placeholder-gray-400 py-2 rounded-sm" // Añadido padding izquierdo para el ícono
        />
        </div>
      </div>

      <div className="flex flex-col w-full h-auto bg-white rounded-2xl shadow space-y-5 p-6">
        <h1 className="text-center text-2xl">Descubre en Grupos </h1>
        <Image
          src="/Icons_Home/Icon_Apks.png"
          alt="Icono de login"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-32 "
        />
        <h1 className="text-xl mb-7">Explora Apks</h1>

        <Image
          src="/Icons_Home/Icon_Musics.png"
          alt="Icono de login"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-32 "
        />
        <h1 className="text-xl">Busca tus generos</h1>
        <a className="text-blue-700">Ver más &gt;</a>
      </div>

      <div className="flex flex-col w-full h-auto bg-white rounded-2xl shadow space-y-5 p-6">
        <h1 className="text-xl">Tus Grupos </h1>
        <div className="w-full h-14 flex flex-row gap-5 items-center">
          <Image
            src="/Icons_Home/Icon_Omar.png"
            alt="Icono de login"
            width={0}
            height={0}
            sizes="100vw"
            className="w-12 h-12"
          />
          <h1>Música don Omar</h1>
        </div>

        <div className="w-full h-14 flex flex-row gap-5 items-center">
          <Image
            src="/Icons_Home/Icon_apk.png"
            alt="Icono de login"
            width={0}
            height={0}
            sizes="100vw"
            className="w-12 h-12 "
          />
          <h1>Apks para Android</h1>
        </div>

        <a className="text-blue-700">Ver más &gt;</a>
      </div>
    </div>
  );
}
