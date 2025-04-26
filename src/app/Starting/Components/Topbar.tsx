"use client";

import { useState } from "react";
import Image from "next/image";

export default function Topbar() {
  const [showExtraIcons, setShowExtraIcons] = useState(false);

  const goku = () => {
    alert("goku");
  };

  return (
    <div className="flex items-center justify-between px-4 absolute top-0 left-0  w-full h-16 bg-gradient-to-r from-purple-300 via-purple-500 to-purple-700">
      {/* Izquierda: Icono principal */}
      <Image
        src="/Icons_Home/Icons_Topbar/nelbyIcon2.png"
        alt="Nelby"
        width={0}
        height={0}
        sizes="100vw"
        className="w-8 h-8"
      />
      {showExtraIcons && (
        <div className="absolute flex justify-start items-start space-x-4 bg-purple-600 px-2 py-1 rounded-md transition-all duration-300">
          <Image
            src="/Icons_Home/Icons_Topbar/Icon_Global.png"
            alt="Global"
            width={0}
            height={0}
            sizes="100vw"
            className="w-6 h-6"
          />

          <Image
            src="/Icons_Home/Icons_Topbar/Icon_Groups.png"
            alt="Groups"
            width={0}
            height={0}
            sizes="100vw"
            className="w-6 h-6"
          />
        </div>
      )}
      {/* Centro: Íconos visibles */}

      <button
        onClick={() => setShowExtraIcons(!showExtraIcons)}
        className="text-white text-xl z-0 flex items-center justify-center "
      >
        <Image
          src="/Icons_Home/Icons_Topbar/Seleccion-desplegable.png"
          alt="Groups"
          width={0}
          height={0}
          sizes="100vw"
          className="w-4 h-4"
        />
      </button>
      <Image
        src="/Icons_Home/Icons_Topbar/Icon_House.png"
        alt="Home"
        width={0}
        height={0}
        sizes="100vw"
        className="w-7 h-7"
      />
      <Image
        src="/Icons_Home/Icons_Topbar/Icon_Notification.png"
        alt="Notification"
        width={0}
        height={0}
        sizes="100vw"
        className="w-6 h-6"
      />
      <Image
        src="/Icons_Home/Icons_Topbar/Icon_chat.png"
        alt="Chat"
        width={0}
        height={0}
        sizes="100vw"
        className="w-6 h-6 mt-1"
        onClick={goku}
      />

      {/* Botón para mostrar más íconos */}

      {/* Íconos ocultos que aparecen con el botón */}

      {/* Derecha: User */}
      <Image
        src="/Icons_Home/Icons_Topbar/User_Home.png"
        alt="User"
        width={0}
        height={0}
        sizes="100vw"
        className="w-7 h-7"
      />
    </div>
  );
}
