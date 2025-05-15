// export default function Potscard (){
//     return(
        
  
//       {/* Top 5 Usuarios */}
//       <div className="bg-gray-100 p-4 rounded-lg mt-4">
//         <h2 className="text-xl font-semibold text-purple-700">
//           Top 5 Usuarios
//         </h2>
  
//         {/* Aquí irían los usuarios */}
//         <ul className="mt-2 text-sm text-gray-700">
//           <li className="flex justify-between border-b border-gray-200 py-1">
//             <span>Usuario</span>
//             <span className="text-purple-600">0 mensajes</span>
//           </li>
//           {/* Repetir <li> para más usuarios */}
//         </ul>
//       </div>
  
//       {/* Área de mensajes */}
//       <div
//       ref={chatRef}
      
//         className="flex-1 mt-4 overflow-y-auto space-y-4 pr-1 w-full max-h-[calc(100vh-140px)] bg-amber-300"
//       >
//         <div
//             className={h-full flex flex-col gap-4 justify-end items-end ${
//                 IdUser
//                 ? messages.some((msg) => msg.userId === IdUser)
//                     ? "items-end"
//                     : "items-start"
//                 : "items-start"
//             }}
//         >
//           {messages.map((msg, i) => (
//             <div
//               key={i}
//               className="bg-white rounded-lg shadow-sm p-4 mb-4 sm:max-w-full max-w-[100%] sm:p-4"
//             >
//               <div className="flex items-start sm:space-x-3 space-x-2">
//                 {/* Avatar */}
//                 <div className="w-8 h-8 sm:w-8 sm:h-8 rounded-full overflow-hidden relative">
//                   <Image
//                     className="h-14 w-14"
//                     src="/Icons_Chat/Porfil_user_chat.avif"
//                     alt="Avatar de Daniel Green"
//                     layout="fill"
//                     objectFit="cover"
//                   />
//                 </div>
  
//                 {/* Contenido */}
//                 <div className="flex-1">
//                   <div className="flex items-center sm:space-x-2 space-x-1">
//                     <span className="font-semibold text-gray-800 text-xs sm:text-sm">
//                       Daniel Green
//                     </span>
//                     <span className="text-gray-500 text-[10px] sm:text-xs">
//                       hace 4 h
//                     </span>
//                     <div className="flex-grow"></div>
//                     <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-4 w-4"
//                         viewBox="0 0 20 20"
//                         fill="currentColor"
//                       >
//                         <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
//                       </svg>
//                     </button>
//                   </div>
  
//                   {/* Mensaje */}
//                   <p className="text-gray-700 mt-1 text-xs sm:text-sm leading-tight">
//                     {msg.message}
//                   </p>
  
//                   {/* Botones de Reacción */}
//                   <div className="mt-2 flex items-center space-x-3 text-gray-600 text-xs sm:text-sm">
//                     {/* Like */}
//                     <button className="flex items-center space-x-1 hover:text-blue-600 focus:outline-none">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-5 w-5"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                         />
//                       </svg>
//                       <span className="text-xs">1</span>
//                     </button>
  
//                     {/* Responder */}
//                     <button className="flex items-center space-x-1 hover:text-green-600 focus:outline-none">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-5 w-5"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M3 10h10a8 8 0 01-7.857 7.569M7 9v5m3-4h10a7 7 0 00-.4-2.2A6.95 6.95 0 0017.2 3.9a7 7 0 01-7.5 6.561M21.218 14.894A7 7 0 0112 20.05m-1.999-8.903A5 5 0 0010.22 15.04c-.172.46-.808 1.288-2.197 1.725"
//                         />
//                       </svg>
//                       <span className="text-xs">Responder</span>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
  
//       {/* Input fijo abajo */}
//       <div className="mt-4">
//         <div className="flex">
//           <input
//             onChange={(e) => setMessageSend(e.target.value)}
//             value={MessageSend}
//             type="text"
//             className="flex-1 border border-gray-300 p-3 rounded-lg mr-2 text-sm"
//             placeholder="Escribe un mensaje..."
//           />
//           <button
//             onClick={goku}
//             className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
//           >
//             Enviar
//           </button>
//         </div>
//       </div>
//     </div>

//     )
// }