    "use client";
    import { useState, useEffect, useCallback } from "react";
    import Image from "next/image";

    type CustomImage = {
    src: string;
    photographer: string;
    alt: string;
    originalSrc: string;
    };

    type CustomImageProps = {
    Imagge: CustomImage[];
    };


    

    export default function Imagepots({ Imagge }: CustomImageProps) {
        const [visibleCount, setVisibleCount] = useState(20);
      
        const loadMore = useCallback(() => {
          setVisibleCount((prev) => Math.min(prev + 20, Imagge.length));
        }, [Imagge.length]);
      
        const handleScroll = useCallback(() => {
          const scrollTop = window.scrollY;
          const windowHeight = window.innerHeight;
          const fullHeight = document.body.offsetHeight;
      
          if (scrollTop + windowHeight >= fullHeight - 100) {
            loadMore();
          }
        }, [loadMore]);
      
        useEffect(() => {
          window.addEventListener("scroll", handleScroll);
      
          return () => {
            window.removeEventListener("scroll", handleScroll);
          };
        }, [handleScroll]);
      
        const imagesToShow = Imagge.slice(0, visibleCount);
      
        const handleDownload = async (src: string) => {
          try {
            // Iniciar la descarga de la imagen original
            const start = Date.now(); // Marca de tiempo de inicio
            const response = await fetch(src);
            console.log('Tiempo de descarga de la imagen:', Date.now() - start, 'ms');
            const blob = await response.blob(); // Obtener la imagen como Blob
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob); // Crea un enlace con el Blob de la imagen
            link.download = "imagen-descargada.jpg"; // Asigna el nombre del archivo
            link.click(); // Inicia la descarga
          } catch (error) {
            console.error('Error al descargar la imagen:', error);
          }
        };
      
        return (
          <div className="space-y-4">
            {imagesToShow.map((Imagee, index) => (
              <div key={index} className="h-auto bg-white rounded-2xl shadow p-8 space-y-7">
                <div className="w-full h-auto flex flex-row gap-2">
                  <Image
                    src="/Icons_Register/Icon_Porfil.png"
                    alt="Icon_User"
                    loading="lazy"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-9 h-9"
                  />
                  <div className="w-32 h-auto flex flex-col">
                    <h1>User 22</h1>
                    <p className="text-gray-500 font-bold" style={{ fontSize: "8px" }}>
                      Hace 30 segundos
                    </p>
                  </div>
                </div>
                <div>{Imagee.photographer}</div>
                <Image
                  src={Imagee.src} // Aquí se está usando la URL de la imagen de vista previa
                  alt={Imagee.alt}
                  loading="lazy"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="object-cover w-full h-80"
                />
                <div className="flex w-full h-auto">
                  <button
                    onClick={() => handleDownload(Imagee.originalSrc)} // Aquí se usa 'originalSrc' para la descarga
                    className="bg-green-500 text-white py-1 px-5 rounded-sm ml-auto">
                    Descargar
                  </button>
                </div>
      
                <div className="w-full h-11 flex flex-row flex-wrap md:space-x-18 space-x-5 items-center justify-center px-2">
                  <div className="flex flex-row items-center mt-1">
                    <Image
                      src="/Icons_Home/Icon_Like.png"
                      alt="Icon_Like"
                      loading="lazy"
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-9 h-9"
                    />
                    <span>12,mil</span>
                  </div>
      
                  <div className="flex flex-row items-center mt-1">
                    <Image
                      src="/Icons_Home/Icon_Coment.png"
                      alt="Icon_Like"
                      loading="lazy"
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-7 h-7"
                    />
                    <span>12,mil</span>
                  </div>
      
                  <div className="flex flex-row items-center">
                    <Image
                      src="/Icons_Home/Icon_Record.png"
                      alt="Icon_Like"
                      loading="lazy"
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-8 h-8"
                    />
                    <span>Grabar</span>
                  </div>
      
                  <div className="flex flex-row items-center">
                    <Image
                      src="/Icons_Home/Icon_Share.png"
                      alt="Icon_Like"
                      loading="lazy"
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-10 h-10"
                    />
                    <span>Compartir</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      }
      