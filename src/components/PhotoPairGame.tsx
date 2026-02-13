"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

// 18 images
const images = [
  "/game-photos/1.jpg",
  "/game-photos/2.jpg",
  "/game-photos/3.jpg",
  "/game-photos/4.jpg",
  "/game-photos/5.jpg",
  "/game-photos/6.jpg",
  "/game-photos/7.jpg",
  "/game-photos/8.jpg",
  "/game-photos/9.jpg",
  "/game-photos/10.jpg",
  "/game-photos/11.avif",
  "/game-photos/12.avif",
  "/game-photos/13.avif",
  "/game-photos/14.avif",
  "/game-photos/15.avif",
  "/game-photos/16.avif",
  "/game-photos/17.avif",
  "/game-photos/18.avif",
];

// Create 18 pairs of images (36 images in total)
const imagePairs = images.flatMap((image) => [image, image]);

const shuffleArray = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const heartLayout = [
  [null, null, 0, 1, null, 2, 3, null, null],
  [null, 4, 5, 6, 7, 8, 9, 10, null],
  [11, 12, 13, 14, 15, 16, 17, 18, 19],
  [null, 20, 21, 22, 23, 24, 25, 26, null],
  [null, null, 27, 28, 29, 30, 31, null, null],
  [null, null, null, 32, 33, 34, null, null, null],
  [null, null, null, null, 35, null, null, null, null],
];

type ValentinesProposalProps = {
  handleShowProposal: () => void;
  showAll: boolean;
};

export default function PhotoPairGame({
  handleShowProposal,
  showAll,
}: ValentinesProposalProps) {
  const [selected, setSelected] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [incorrect, setIncorrect] = useState<number[]>([]);
  const [images, setImages] = useState<string[]>([...imagePairs]);
  const [enlargedLeft, setEnlargedLeft] = useState<string | null>(null);
  const [enlargedRight, setEnlargedRight] = useState<string | null>(null);
  const [cardPosition, setCardPosition] = useState<{
    left?: { x: number; y: number };
    right?: { x: number; y: number };
  }>({});

  // Shuffle images after component mounts to avoid hydration mismatch
  useEffect(() => {
    setImages(shuffleArray([...imagePairs]));
  }, []);

  const handleClick = async (index: number, event: React.MouseEvent) => {
    if (
      selected.length === 2 ||
      matched.includes(index) ||
      selected.includes(index) ||
      showAll
    )
      return;

    if (selected.length === 1) {
      const firstIndex = selected[0];
      const rect = (event.target as HTMLElement)
        .closest(".card-wrapper")
        ?.getBoundingClientRect();
      if (rect) {
        setCardPosition((prev) => ({
          ...prev,
          right: { x: rect.left, y: rect.top },
        }));
      }
      setSelected((prev) => [...prev, index]);
      setEnlargedRight(images[index]); // Show second card on the right

      if (images[firstIndex] === images[index]) {
        setMatched((prev) => [...prev, firstIndex, index]);
        setTimeout(() => {
          setSelected([]);
          setEnlargedLeft(null);
          setEnlargedRight(null);
          setCardPosition({});
        }, 1000);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second

        setIncorrect([firstIndex, index]);
        setTimeout(() => setIncorrect([]), 1000); // Clear incorrect after 1 second
        setTimeout(() => {
          setSelected([]);
          setEnlargedLeft(null);
          setEnlargedRight(null);
          setCardPosition({});
        }, 1000);
      }
    } else {
      const rect = (event.target as HTMLElement)
        .closest(".card-wrapper")
        ?.getBoundingClientRect();
      if (rect) {
        setCardPosition({ left: { x: rect.left, y: rect.top } });
      }
      setSelected([index]);
      setEnlargedLeft(images[index]); // Show first card on the left
    }
  };

  // Check if game is won
  useEffect(() => {
    if (matched.length === imagePairs.length) {
      handleShowProposal();
    }
  }, [matched, handleShowProposal]);

  return (
    <div className="relative flex items-center justify-center gap-2 sm:gap-4 lg:gap-8">
      {/* Увеличенное фото слева */}
      <div
        className="w-32 h-48 sm:w-48 sm:h-72 lg:w-64 lg:h-96 flex-shrink-0 relative z-50"
        id="left-enlarged"
      >
        {enlargedLeft && cardPosition.left && (
          <motion.div
            initial={{
              x:
                cardPosition.left.x -
                (typeof window !== "undefined"
                  ? document
                      .getElementById("left-enlarged")
                      ?.getBoundingClientRect().left || 0
                  : 0),
              y:
                cardPosition.left.y -
                (typeof window !== "undefined"
                  ? document
                      .getElementById("left-enlarged")
                      ?.getBoundingClientRect().top || 0
                  : 0),
              width: "8vh",
              height: "8vh",
              rotateY: -180,
            }}
            animate={{
              x: 0,
              y: 0,
              width: "100%",
              height: "100%",
              rotateY: 0,
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src={enlargedLeft}
              alt="Selected card 1"
              fill
              className="object-cover"
            />
          </motion.div>
        )}
      </div>

      {/* Игровое поле */}
      <div className="relative flex-shrink-0">
        <div className="grid grid-cols-9 gap-0.5 sm:gap-1 lg:gap-2 max-w-[95vw] mx-auto place-items-center">
          {/* Image preload */}
          <div className="hidden">
            {images.map((image, i) => (
              <Image
                key={i}
                src={image}
                alt={`Image ${i + 1}`}
                fill
                className="object-cover"
                priority
              />
            ))}
          </div>

          {heartLayout.flat().map((index, i) =>
            index !== null ? (
              <motion.div
                key={i}
                className="card-wrapper w-[8vh] h-[8vh] sm:w-[10vh] sm:h-[10vh] lg:w-20 lg:h-20 relative cursor-pointer"
                whileHover={{ scale: 1.1 }}
                onClick={(e) => handleClick(index, e)}
                style={{ perspective: "1000px" }} // Add perspective for 3D effect
              >
                {/* Back of the card */}
                {!selected.includes(index) &&
                  !matched.includes(index) &&
                  !showAll && (
                    <motion.div
                      className="w-full h-full bg-gray-300 rounded-sm lg:rounded-md absolute z-10"
                      initial={{ rotateY: 0 }}
                      animate={{
                        rotateY:
                          selected.includes(index) ||
                          matched.includes(index) ||
                          showAll
                            ? 180
                            : 0,
                      }}
                      transition={{ duration: 0.5 }}
                      style={{ backfaceVisibility: "hidden" }}
                    />
                  )}

                {/* Front of the card (image) */}
                {(selected.includes(index) ||
                  matched.includes(index) ||
                  showAll) && (
                  <motion.div
                    className="w-full h-full absolute"
                    initial={{ rotateY: -180 }}
                    animate={{ rotateY: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <Image
                      src={images[index]}
                      alt={`Imagen ${index + 1}`}
                      fill
                      className="rounded-sm lg:rounded-md object-cover"
                    />
                  </motion.div>
                )}

                {/* Incorrect animation */}
                {incorrect.includes(index) && (
                  <motion.div
                    className="absolute inset-0"
                    animate={{ scale: [1, 1.1, 1], opacity: [1, 0, 1] }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-full h-full bg-red-500 rounded-sm lg:rounded-md"></div>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <div
                key={i}
                className="w-[8vh] h-[8vh] sm:w-[10vh] sm:h-[10vh] lg:w-20 lg:h-20"
              />
            ),
          )}
        </div>
      </div>

      {/* Увеличенное фото справа */}
      <div
        className="w-32 h-48 sm:w-48 sm:h-72 lg:w-64 lg:h-96 flex-shrink-0 relative z-50"
        id="right-enlarged"
      >
        {enlargedRight && cardPosition.right && (
          <motion.div
            initial={{
              x:
                cardPosition.right.x -
                (typeof window !== "undefined"
                  ? document
                      .getElementById("right-enlarged")
                      ?.getBoundingClientRect().left || 0
                  : 0),
              y:
                cardPosition.right.y -
                (typeof window !== "undefined"
                  ? document
                      .getElementById("right-enlarged")
                      ?.getBoundingClientRect().top || 0
                  : 0),
              width: "8vh",
              height: "8vh",
              rotateY: -180,
            }}
            animate={{
              x: 0,
              y: 0,
              width: "100%",
              height: "100%",
              rotateY: 0,
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src={enlargedRight}
              alt="Selected card 2"
              fill
              className="object-cover"
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}
