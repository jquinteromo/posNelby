"use client";

// import Topbar from "./Components/Topbar";
// import Sidebar from "./Components/Sidebar";
// import PotsCreador from "./Components/PotsCreador";
// import Imagepots from "./Components/Cards/Imagepots";

// import { useEffect, useState } from "react";
// import { useState } from "react";
// import Topbar from "./Components/Topbar";

// type CustomImage = {
//   src: string;
//   photographer: string;
//   alt: string;
//   originalSrc: string;
// };

// type PhotoSrc = {
//   original: string;
//   large: string;
//   medium: string;
//   small: string;
//   portrait: string;
//   landscape: string;
//   tiny: string;
// };

// type Photo = {
//   id: number;
//   photographer: string;
//   alt: string;
//   src: PhotoSrc;
//   };

// export default function StartingPage() {
//   const [images, setImages] = useState<CustomImage[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchImages = async () => {
//       const API_KEY =
//         "Qhw5ahFjOCm46OqErrh72CT9JrkCfMj9ebhhKQ0jr0jTTJ5Z5saq8K4O";
//       const keywords = ["cars", "dogs", "city", "celebrity"];
//       const imagesPerTopic = 50;

//       try {
//         const responses = await Promise.all(
//           keywords.map((keyword) =>
//             fetch(
//               `https://api.pexels.com/v1/search?query=${keyword}&per_page=${imagesPerTopic}`,
//               {
//                 headers: {
//                   Authorization: API_KEY,
//                 },
//               }
//             ).then((res) => res.json())
//           )
//         );

//         const allImages: CustomImage[] = responses.flatMap((res) =>
//           res.photos.map((photo: Photo) => ({
//             src: photo.src.large, // La URL para la imagen que se muestra (puede ser pequeña)
//             photographer: photo.photographer,
//             alt: photo.alt || "Imagen de Pexels",
//             originalSrc: photo.src.large // La URL de la imagen original
//           }))
//         );

//         setImages(allImages.slice(0, 250)); // Limitamos a 250 imágenes
//         setLoading(false);
//       } catch (err) {
//         console.error("Error al cargar imágenes:", err);
//         setError("No se pudieron cargar las imágenes.");
//         setLoading(false);
//       }
//     };

//     fetchImages();
//   }, []);

//   if (loading) return <div className="p-4">Cargando imágenes...</div>;
//   if (error) return <div className="p-4 text-red-500">{error}</div>;

//   return (
//     <div className="min-h-screen bg-gray-100 flex justify-center items-center flex-col">
//       <Topbar />

//       <div className="flex flex-row w-full gap-14">
//         <Sidebar />

//         <div className="w-full max-w-2xl space-y-4 p-4">
//           <PotsCreador />
//           <Imagepots Imagge={images} />
//         </div>
//       </div>
//     </div>
//   );
// }

// const Chat = () => {
//   return (
//     <div className="h-screen flex mt-6 flex-col max-w-xl mx-auto p-4 shadow-md border border-gray-200">

//       {/* Topbar */}
//       <div>
//    <Topbar></Topbar>
//       </div>

//       {/* Top 5 Usuarios */}
//       <div className="bg-gray-100 p-4 rounded-lg mt-4">
//         <h2 className="text-xl font-semibold text-purple-700">Top 5 Usuarios</h2>
//         <ul className="mt-2 text-sm text-gray-700">
//           {/* Aquí irían los usuarios */}
//           <li className="flex justify-between border-b border-gray-200 py-1">
//             <span>Usuario</span>
//             <span className="text-purple-600">0 mensajes</span>
//           </li>
//           {/* Repetir <li> para más usuarios */}
//         </ul>
//       </div>

//       {/* Área de mensajes */}
//       <div className="flex-1 mt-4 overflow-y-auto space-y-4 pr-1">
//         <div className="flex justify-start">
//           <div className="relative w-72 p-3 rounded-lg shadow bg-white text-black border border-gray-200">

//             <div className="flex justify-between items-center mb-1">
//               <p className="text-sm font-semibold text-gray-700">Juan</p>
//               <button className="text-gray-400 hover:text-gray-600 text-xl leading-none">⋮</button>
//             </div>

//             <div className="text-sm whitespace-pre-wrap transition-all duration-300">
//               ¡Hola! ¿Cómo estás?
//             </div>

//             {/* <button className="text-xs text-purple-600 mt-1 hover:underline">
//               Ver más
//             </button> */}

//             <span className="text-xs text-gray-400 block mt-1">
//               12:30 PM
//             </span>

//             <div className="mt-3 flex gap-2">
//               <button className="flex items-center gap-1 bg-purple-600 text-white px-3 py-1 rounded-full text-sm shadow hover:bg-purple-700 transition">
//                 👍
//               </button>
//               <button className="flex items-center gap-1 bg-purple-600 text-white px-3 py-1 rounded-full text-sm shadow hover:bg-purple-700 transition">
//                 😊
//               </button>
//               <button className="flex items-center gap-1 bg-purple-600 text-white px-3 py-1 rounded-full text-sm shadow hover:bg-purple-700 transition">
//                 💬
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Puedes duplicar el <div> de mensaje para más mensajes */}
//       </div>

//       {/* Input fijo abajo */}
//       <div className="mt-4">
//         <div className="flex">
//           <input
//             type="text"
//             className="flex-1 border border-gray-300 p-3 rounded-lg mr-2 text-sm"
//             placeholder="Escribe un mensaje..."
//           />
//           <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
//             Enviar
//           </button>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default Chat;

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("https://posnelby-backend.onrender.com"); // Dirección del backend
// const socket = io("http://localhost:3001");


export default function Starting() {
  const [MessageSend, setMessageSend] = useState("");
  const [messages, setMessages] = useState<{ message: string, userId: string }[]>([]);
  const [IdUser, setIdUser] =  useState<string>("");
  

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Conectado al servidor de Socket.IO ✅");
    });

    socket.on("receiveMessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, { message: data.message, userId: data.userId }]);
      
      // console.log("Esto me llego del backend :"+IdUser)
    });


    const generatedId = `user-${Math.random().toString(36).substring(2, 15)}`;
    setIdUser(generatedId);
    console.log("Este es el id del usuario:", generatedId); // Imprimimos el valor generado

    return () => {
      socket.disconnect();
    };
  }, []);


  const goku = () => {
    if (MessageSend.trim() !== "") {
      socket.emit("sendMessage", MessageSend,IdUser); // Envia el mensaje al servidor
      setMessageSend(""); // Limpia el input si quieres
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">


      <div className="flex flex-col space-y-4">
        <input
          type="text"
          value={MessageSend}
          onChange={(e) => setMessageSend(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Escribe algo..."
        />
        <button
          onClick={goku}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Mostrar valor
        </button>

        {messages.map((msg, i) => (
          <div key={i} className="flex-1 mt-4 overflow-y-auto space-y-4 pr-1">
            <div className="flex justify-start">
              <div className={`relative w-72 p-3 rounded-lg shadow  text-black border border-gray-200 ${msg.userId===IdUser ? 'bg-green-500 ':'bg-blue-500'}`}>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm font-semibold text-gray-700">Juan</p>
                  <button className="text-gray-400 hover:text-gray-600 text-xl leading-none">
                    ⋮
                  </button>
                </div>

                <div className="text-sm whitespace-pre-wrap transition-all duration-300">
                  {msg.message}
                </div>

                {/* <button className="text-xs text-purple-600 mt-1 hover:underline">
              Ver más
            </button> */}

                <span className="text-xs text-gray-400 block mt-1">
                  12:30 PM
                </span>

                <div className="mt-3 flex gap-2">
                  <button className="flex items-center gap-1 bg-purple-600 text-white px-3 py-1 rounded-full text-sm shadow hover:bg-purple-700 transition">
                    👍
                  </button>
                  <button className="flex items-center gap-1 bg-purple-600 text-white px-3 py-1 rounded-full text-sm shadow hover:bg-purple-700 transition">
                    😊
                  </button>
                  <button className="flex items-center gap-1 bg-purple-600 text-white px-3 py-1 rounded-full text-sm shadow hover:bg-purple-700 transition">
                    💬
                  </button>
                </div>
              </div>
            </div>

            {/* Puedes duplicar el <div> de mensaje para más mensajes */}
          </div>
        ))}
      </div>
    </div>
  );
}
