"use client";

// import { useRouter } from "next/navigation";
import Image from "next/image";

export default function PotsCreador() {
  // const router = useRouter();
  return (
    <div className="py-5 flex flex-col space-y-5 w-full h-auto items-center">
      <div className="text-base text-gray-400 font-semibold">¿Que Deseas subir hoy?</div>
      <div className="  flex h-auto flex-row w-full gap-7 justify-center">
        <Image
          src="/Icons_Home/Icon_apk_gray.png"
          alt="Icono de login"
          width={0}
          height={0}
          sizes="100vw"
          className="w-8 h-8 "
        />
        <Image
          src="/Icons_Home/Icon_music.png"
          alt="Icono de login"
          width={0}
          height={0}
          sizes="100vw"
          className="w-8 h-8 "
        />

        <Image
          src="/Icons_Home/Icon_Public.png"
          alt="Icono de login"
          width={0}
          height={0}
          sizes="100vw"
          className="w-8 h-8 "
        />

        <Image
          src="/Icons_Home/Icon_Text.png"
          alt="Icono de login"
          width={0}
          height={0}
          sizes="100vw"
          className="w-8 h-8 "
        />
      </div>
    </div>
  );
}
