import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Fireworks from "@fireworks-js/react";
import Image from "next/image";

// 18 images for background
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
];

export default function ValentinesProposal() {
  const [step, setStep] = useState(0);
  const [position, setPosition] = useState<{
    top: string;
    left: string;
  } | null>(null);
  const [showFireworks, setShowFireworks] = useState(false);

  const getRandomPosition = () => {
    const randomTop = Math.random() * 60 + 15;
    const randomLeft = Math.random() * 60 + 15;
    return { top: `${randomTop}%`, left: `${randomLeft}%` };
  };

  const handleEnvelopeClick = () => {
    setStep(1);
  };

  const handleYesClick = () => {
    setShowFireworks(true);
    setStep(2);
  };

  return (
    <div className="flex flex-col items-center justify-center h-[350px] relative w-[700px]">
      {/* Image Grid Background - показываем только на шаге 1 и 2 */}
      {(step === 1 || step === 2) && (
        <div
          className="fixed inset-0 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 opacity-10 pointer-events-none"
          style={{ gridAutoRows: "1fr" }}
        >
          {images.map((src, index) => (
            <div key={index} className="relative w-full h-full min-h-0">
              <Image
                src={src}
                alt={`Memory ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 16vw"
              />
            </div>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* Step 0: Envelope */}
        {step === 0 && (
          <motion.div
            key="step-0"
            className="flex flex-col items-center cursor-pointer"
            transition={{ duration: 0.5 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -20, 0],
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={handleEnvelopeClick}
          >
            <motion.div
              className="hover:scale-110 transition-transform"
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <img src="/envelope.png" alt="Envelope" width={190} />
            </motion.div>
            <p className="text-lg sm:text-xl lg:text-2xl font-semibold mt-4 sm:mt-6 text-white">
              ♡ Спешиали фор ююю! ♡
            </p>
          </motion.div>
        )}

        {/* Step 1: Letter with question */}
        {step === 1 && (
          <motion.div
            key="step-1"
            transition={{ duration: 0.5 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="flex flex-col items-center relative z-10 max-w-[90vw]"
          >
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 lg:mb-6 font-serif px-2 text-center text-white">
              Ксения Андреевна, вы ко мне как относитесь?
            </h1>
            <img src="/cat_heart.gif" alt="Cat with heart" width={150} />
            <div className="flex space-x-3 sm:space-x-4 mt-2 sm:mt-3">
              <button
                className="relative px-5 py-2 sm:px-6 sm:py-3 text-sm sm:text-base lg:text-lg font-bold text-white bg-gradient-to-br from-pink-400 via-rose-500 to-pink-600 rounded-full hover:from-pink-500 hover:via-rose-600 hover:to-pink-700 transform hover:scale-110 transition-all duration-300 shadow-[0_4px_15px_rgba(236,72,153,0.4)] hover:shadow-[0_6px_20px_rgba(236,72,153,0.6)] border-2 border-pink-300/50 hover:border-pink-200 z-100"
                onClick={handleYesClick}
                style={{ zIndex: 100 }}
              >
                <span className="relative z-10">Люблю тебя</span>
              </button>
              <button
                className="relative px-5 py-2 sm:px-6 sm:py-3 text-sm sm:text-base lg:text-lg font-bold text-white bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600 rounded-full hover:from-gray-500 hover:via-gray-600 hover:to-gray-700 transition-colors duration-300 shadow-[0_4px_15px_rgba(107,114,128,0.4)] border-2 border-gray-300/50 z-50 opacity-80"
                style={
                  position
                    ? {
                        position: "absolute",
                        top: position.top,
                        left: position.left,
                        transition:
                          "top 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), left 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      }
                    : {}
                }
                onMouseEnter={() => setPosition(getRandomPosition())}
                onTouchStart={() => setPosition(getRandomPosition())}
                onClick={() => setPosition(getRandomPosition())}
              >
                <span className="relative z-10">Бесишь меня</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Final message */}
        {step === 2 && (
          <motion.div
            key="step-2"
            className="flex flex-col justify-center items-center font-serif px-4 text-center relative z-10 max-w-[90vw] w-[280px]"
            transition={{ duration: 1 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="text-base sm:text-lg lg:text-xl mb-4 sm:mb-6 font-semibold text-white">
              Мяу, и я тебя люблю 💕
            </p>
            <img src="/cat_dance.gif" alt="Happy Cat" width={150} />
          </motion.div>
        )}
      </AnimatePresence>

      {showFireworks && (
        <div className="absolute w-full h-full pointer-events-none">
          <Fireworks
            options={{
              autoresize: true,
            }}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        </div>
      )}
    </div>
  );
}
