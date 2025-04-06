import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="  flex items-center flex-col h-screen  px-12 py-8">
      <div className="w-full h-18  relative">
        <Image
          src="/Icons_login/iconNelby.png" 
          alt="Icono de login"
          width={100} 
          height={100}
          className="object-contain"
        />
      </div>

      <div className=" flex flex-col md:flex-row w-full flex-1 ">
     
        <div className="hidden md:flex  flex-col justify-center px-10 gap-8 text-white  shadow-md flex-1 pb-14 ">
          <h1 className="text-center text-black text-3xl">
            Bienvenido a Nelby!
          </h1>
          <p className="text-black text-center">
            Nos alegra tenerte en Nelby 🎉. Un espacio donde la creatividad y la
            comunidad se unen. Comparte imágenes, audios, videos y APKs,
            descubre contenido único y conéctate con personas afines.
          </p>
        </div>

        <div className="flex flex-col gap-10 justify-center items-center  text-white p-8 shadow-md flex-1">
          <h1 className="text-center text-3xl text-black">Iniciar Sesión</h1>

          <input
            placeholder="correo electrónico"
            className="w-full max-w-sm h-10 border-b-2 border-b-neutral-300 placeholder-neutral-400"
          />

          <input
            placeholder="Contraseña"
            className="w-full max-w-sm h-10 border-b-2 border-b-neutral-300 placeholder-neutral-400"
          />

          <input
            value="Iniciar Sesión"
            type="button"
            className="w-full max-w-xs h-10 bg-gradient-to-r from-pink-500 to-indigo-600 rounded-xl"
          />

          <div className="w-full max-w-sm flex justify-between">
            <h1 className="text-black text-sm">¿Aún no tienes cuenta?</h1>
            <a className="text-purple-950 text-sm cursor-pointer">
              Registrarse
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
