"use client";

import Topbar from "./Components/Topbar";
import Sidebar from "./Components/Sidebar";
import PotsCreador from "./Components/PotsCreador";
import Imagepots from "./Components/Cards/Imagepots";

import { useEffect, useState } from "react";

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
    <div className="min-h-screen bg-gray-100 flex justify-center items-center flex-col">
      <Topbar />

      <div className="flex flex-row w-full gap-14">
        <Sidebar />
        <div className="w-full max-w-2xl space-y-4 p-4">
          <PotsCreador />
          <Imagepots Imagge={images} />
        </div>
      </div>
    </div>
  );
}
