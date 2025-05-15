"use client";

import Topbar from "./Components/Topbar";
import Sidebar from "./Components/Sidebar";
import PotsCreador from "./Components/PotsCreador";
import Imagepots from "./Components/Cards/Imagepots";
import { useEffect,useState } from "react";


type CustomImage = {
  src: string;
  photographer: string;
  alt: string;
  originalSrc: string;
};

type PhotoSrc = {
  original: string;
  large: string;
  medium: string;
  small: string;
  portrait: string;
  landscape: string;
  tiny: string;
};

type Photo = {
  id: number;
  photographer: string;
  alt: string;
  src: PhotoSrc;
  };

export default function StartingPage() {
  const [images, setImages] = useState<CustomImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      const API_KEY =
        "Qhw5ahFjOCm46OqErrh72CT9JrkCfMj9ebhhKQ0jr0jTTJ5Z5saq8K4O";
      const keywords = ["cars", "dogs", "city", "celebrity"];
      const imagesPerTopic = 50;

      try {
        const responses = await Promise.all(
          keywords.map((keyword) =>
            fetch(
              `https://api.pexels.com/v1/search?query=${keyword}&per_page=${imagesPerTopic}`,
              {
                headers: {
                  Authorization: API_KEY,
                },
              }
            ).then((res) => res.json())
          )
        );

        const allImages: CustomImage[] = responses.flatMap((res) =>
          res.photos.map((photo: Photo) => ({
            src: photo.src.large, // La URL para la imagen que se muestra (puede ser pequeña)
            photographer: photo.photographer,
            alt: photo.alt || "Imagen de Pexels",
            originalSrc: photo.src.large // La URL de la imagen original
          }))
        );

        setImages(allImages.slice(0, 250)); // Limitamos a 250 imágenes
        setLoading(false);
      } catch (err) {
        console.error("Error al cargar imágenes:", err);
        setError("No se pudieron cargar las imágenes.");
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) return <div className="p-4">Cargando imágenes...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className=" bg-gray-50  rounded-2xl shadow-lg min-h-screen  flex justify-center items-center flex-col">
      <Topbar />

      <div className="flex flex-row w-full gap-14">
        <Sidebar />

        <div className="w-full max-w-2xl space-y-4 p-4">
          <PotsCreador />
          <Imagepots Imagge={images} />
        </div>
      </div>
    </div>
  


    //CARTA DE VIENBVENIDA
    //   <div className="w-full max-w-xl mx-auto bg-white p-10 rounded-3xl shadow-2xl mt-12 relative overflow-hidden">
    //   {/* Fondo brillante detrás del icono */}
    //   <div className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 w-48 h-48 bg-purple-300 rounded-full blur-3xl opacity-30 z-0" />

    //   <div className="relative z-10 flex flex-col items-center space-y-8">

    // <div className="relative w-[100px] h-[100px]">
    //   <div className="absolute inset-0 rounded-full bg-purple-500 opacity-50 blur-xl animate-pulse z-0"></div>
    //   <Image
    //     src="/Icons_login/iconNelby.png"
    //     alt="Icono de login"
    //     width={100}
    //     height={100}
    //     className="object-contain relative z-10"
    //   />
    // </div>

    //     <h2 className="text-purple-700 text-3xl font-extrabold text-center">
    //       ¡Felicidades, pionero! 🎉
    //     </h2>

    //     <p className="text-gray-600 text-lg text-center max-w-md">
    //       Eres parte del primer grupo de usuarios. Puedes{' '}
    //       <span className="inline-flex items-center font-semibold text-purple-700">
    //         reclamar tu distintivo exclusivo
    //         <svg
    //           className="w-5 h-5 ml-1 text-purple-500 animate-bounce"
    //           fill="currentColor"
    //           viewBox="0 0 24 24"
    //         >
    //           <path d="M12 2L15 8l6 1-4.5 4.4L18 21l-6-3-6 3 1.5-7.6L3 9l6-1z" />
    //         </svg>
    //       </span>{' '}
    //       y destacar con nuestro sello único.
    //     </p>

    //     {/* Botón o mensaje final */}
    //     {!reclamado && !mostrarAnimacion && (
    //       <button
    //         onClick={reclamarCertificacion}
    //         className="mt-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-3 rounded-full shadow-lg text-lg font-semibold hover:scale-105 transition transform duration-300"
    //       >
    //         🎁 Reclamar Distintivo
    //       </button>
    //     )}

    //     {/* Animación de recompensa */}
    //     {mostrarAnimacion && (
    //       <div className="text-center animate-fade-in">
    //         <p className="text-purple-600 text-xl font-bold mt-4">¡Entregando tu distintivo... ✨</p>
    //       </div>
    //     )}

    //     {/* Mensaje final */}
    //     {reclamado && (
    //       <div className="text-green-600 mt-6 text-lg font-bold animate-fade-in">
    //         ¡Distintivo reclamado con éxito! Ya lo verás en tu perfil. 🚀
    //       </div>
    //     )}
    //   </div>
    // </div>

    //Componente perfil
    // {/* <div className="bg-gray-50 min-h-screen p-4 sm:p-8 space-y-8">

    // {/* Header */}
    // <div className="bg-white rounded-xl shadow-lg overflow-hidden">
    //   <div className="bg-gradient-to-r from-purple-600 to-purple-400 h-32 relative">
    //     <div className="absolute top-4 right-4 flex gap-2 z-10">
    //       <button className="bg-white text-purple-700 px-3 py-1 rounded-md text-sm font-medium shadow hover:bg-purple-50">Editar perfil</button>
    //       <button className="bg-white text-purple-700 px-3 py-1 rounded-md text-sm font-medium shadow hover:bg-purple-50">Configuración</button>
    //     </div>
    //   </div>

    //   <div className="flex flex-col items-center -mt-16 pb-6 relative z-20">
    //     <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow mb-4">
    //       <Image src="/Icons_login/Jaider.jpg" alt="Perfil" width={96} height={96} className="object-cover w-full h-full" />
    //     </div>
    //     <h2 className="mt-3 text-xl font-bold text-gray-800">Jaider Quintero</h2>
    //     <p className="text-gray-500 text-sm">jaiderstuntquintero@gmail.com</p>
    //     <p className="text-sm text-gray-600 mt-1 text-center max-w-sm">Dev...</p>
    //   </div>
    // </div>

    // {/* Contenido subido */}
    // <div className="bg-white rounded-xl shadow-md p-4">
    //   <div className="flex justify-between items-center mb-4">
    //     <h3 className="text-lg font-bold text-gray-800">📤 Contenido subido</h3>
    //     <button className="text-sm text-purple-600 hover:underline">Editar</button>
    //   </div>

    //   {/* Tabs */}
    //   <div className="flex gap-6 text-sm border-b mb-4">
    //     <button className="border-b-2 border-purple-600 text-purple-700 font-medium pb-1">Publicaciones</button>
    //     <button className="text-gray-500 hover:text-purple-600">Me gusta</button>
    //   </div>

    //   {/* Publicación con audio */}
    //   <div className="flex items-start gap-4 mb-6">
    //     <div className="w-24 h-24 rounded-md overflow-hidden">
    //       <Image src="/images/audio-post.jpg" alt="Post" width={96} height={96} className="object-cover w-full h-full" />
    //     </div>
    //     <div className="flex-1">
    //       <h4 className="font-medium text-gray-700">Demo</h4>
    //       <div className="mt-1 mb-2">
    //         <div className="bg-purple-600 text-white px-3 py-2 rounded-lg text-sm inline-block">🎵 00:21</div>
    //       </div>
    //       <div className="flex items-center text-gray-500 text-xs gap-4">
    //         <span>❤️ 45</span>
    //         <span>💬 2</span>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Publicación de archivo */}
    //   <div className="flex items-start gap-4 mb-4">
    //     <div className="w-16 h-16 bg-purple-100 rounded-md flex items-center justify-center">
    //       📦
    //     </div>
    //     <div className="flex-1">
    //       <h4 className="font-medium text-gray-700">Application.apk</h4>
    //       <div className="text-xs text-green-600 bg-green-100 inline-block px-2 py-1 rounded mt-1">✅ 15 MB</div>
    //       <div className="flex items-center text-gray-500 text-xs gap-4 mt-2">
    //         <span>❤️ 15</span>
    //         <span>💬 4</span>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    // {/* Vinculado con */}
    // <div className="bg-white rounded-xl shadow-md p-4">
    //   <div className="flex justify-between items-center mb-4">
    //     <h3 className="text-lg font-bold text-purple-700">🔗 Vinculado con</h3>
    //     <button className="text-sm text-purple-600 hover:underline">Editar</button>
    //   </div>
    //   <div className="flex items-center gap-4">
    //     <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-purple-500">
    //       <Image src="/Icons_Home/Image_Testing.png" alt="Pareja" width={48} height={48} className="object-cover w-full h-full" />
    //     </div>
    //     <div>
    //       <p className="text-sm font-medium text-gray-700">User21</p>
    //       <p className="text-xs text-purple-500 italic">Dev backend</p>
    //     </div>
    //   </div>
    //   <div className="mt-3 border-t pt-2 text-xs text-purple-600 bg-purple-50 p-2 rounded-md">
    //     💎 <strong>Premium:</strong> Tema compartido, emojis, música y fondos personalizados.
    //   </div>
    // </div>

    // {/* Cápsulas del Día */}
    // <div className="bg-white rounded-xl shadow-md p-4">
    //   <div className="flex justify-between items-center mb-4">
    //     <h2 className="text-lg font-bold text-gray-800">📆 Cápsulas del Día</h2>
    //     <button className="text-sm text-purple-600 hover:underline">Editar</button>
    //   </div>
    //   <div className="flex gap-4 overflow-x-auto pb-2">
    //     {[
    //       { label: "Gratitud", emoji: "🙏", color: "from-pink-400 to-purple-400" },
    //       { label: "Logro", emoji: "🔥", color: "from-yellow-400 to-orange-500" },
    //       { label: "Reflexión", emoji: "🧘", color: "from-blue-400 to-cyan-500" },
    //       { label: "Celebración", emoji: "🎉", color: "from-green-400 to-lime-500" },
    //     ].map((capsule, idx) => (
    //       <div key={idx} className={`min-w-[120px] h-32 bg-gradient-to-br ${capsule.color} text-white p-3 rounded-xl shadow-md`}>
    //         <div className="text-2xl mb-2">{capsule.emoji}</div>
    //         <p className="text-sm font-semibold">{capsule.label}</p>
    //         <p className="text-xs opacity-80 mt-1">Ver historia</p>
    //       </div>
    //     ))}
    //   </div>
    // </div>

    // {/* Amigos agregados */}
    // <div className="bg-white rounded-xl shadow-md p-4">
    //   <div className="flex justify-between items-center mb-4">
    //     <h2 className="text-lg font-bold text-gray-800">🤝 Amigos agregados</h2>
    //     <button className="text-sm text-purple-600 hover:underline">Editar</button>
    //   </div>
    //   <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
    //     {[
    //       { name: "Laura", mutual: 8, image: "/images/laura.jpg" },
    //       { name: "Tomás", mutual: 3, image: "/images/tomas.jpg" },
    //       { name: "Daniela", mutual: 12, image: "/images/daniela.jpg" },
    //     ].map((friend, idx) => (
    //       <div key={idx} className="bg-white rounded-xl shadow p-4 flex items-center gap-4 hover:bg-purple-50 transition">
    //         <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-purple-500">
    //           <Image src={friend.image} alt={friend.name} width={56} height={56} className="object-cover w-full h-full" />
    //         </div>
    //         <div className="flex-1">
    //           <p className="font-semibold text-sm text-gray-800">{friend.name}</p>
    //           <p className="text-xs text-gray-500">{friend.mutual} amigos en común</p>
    //         </div>
    //         <button className="text-xs bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700">Ver</button>
    //       </div>
    //     ))}
    //   </div>
    // </div>

    // {/* Seguidores recientes */}
    // <div className="bg-white rounded-xl shadow-md p-4">
    //   <div className="flex justify-between items-center mb-4">
    //     <h2 className="text-lg font-bold text-gray-800">🌍 Seguidores recientes</h2>
    //     <button className="text-sm text-purple-600 hover:underline">Editar</button>
    //   </div>
    //   <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
    //     {[
    //       { name: "Alex", country: "Perú", image: "/images/alex.jpg" },
    //       { name: "Mila", country: "Chile", image: "/images/mila.jpg" },
    //       { name: "David", country: "México", image: "/images/david.jpg" },
    //     ].map((follower, idx) => (
    //       <div key={idx} className="flex items-center bg-white rounded-xl shadow p-3 gap-4 hover:bg-purple-50 transition">
    //         <div className="w-12 h-12 rounded-full overflow-hidden border">
    //           <Image src={follower.image} alt={follower.name} width={48} height={48} />
    //         </div>
    //         <div className="flex-1">
    //           <p className="text-sm font-semibold text-gray-700">{follower.name}</p>
    //           <p className="text-xs text-purple-500">{follower.name} te sigue desde {follower.country} ✨</p>
    //         </div>
    //         <button className="text-xs text-white bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded-md">Seguir</button>
    //       </div>
    //     ))}
    //   </div>
    // </div>

    // {/* Miniportafolio */}
    // <div className="bg-white rounded-xl shadow-md p-4 mb-4">
    //   <div className="flex justify-between items-center mb-4">
    //     <h2 className="text-lg font-bold text-gray-800">🎒 Miniportafolio</h2>
    //     <button className="text-sm text-purple-600 hover:underline">Editar</button>
    //   </div>
    //   <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    //     {[
    //       { title: "🎨 Proyecto UI", image: "/images/port1.jpg", desc: "Dashboard moderno" },
    //       { title: "💻 Script útil", image: "/images/port2.jpg", desc: "Automatización diaria" },
    //       { title: "📱 App móvil", image: "/images/port3.jpg", desc: "Diseño intuitivo" },
    //     ].map((item, i) => (
    //       <div key={i} className="bg-white shadow rounded-xl overflow-hidden">
    //         <Image src={item.image} alt={item.title} width={400} height={200} className="object-cover w-full h-32" />
    //         <div className="p-3">
    //           <h4 className="text-sm font-semibold text-gray-700">{item.title}</h4>
    //           <p className="text-xs text-gray-500">{item.desc}</p>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>

    // </div> */}
  );
}
