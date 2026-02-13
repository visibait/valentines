"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PhotoPairGame from "../components/PhotoPairGame";
import ValentinesProposal from "@/components/ValentinesProposal";
import TextFooter from "@/components/TextFooter";
import OrientationGuard from "@/components/OrientationGuard";

const ANIM_DURATION = 2;

export default function Home() {
  const [showValentinesProposal, setShowValentinesProposal] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const handleShowProposal = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setShowValentinesProposal(true);
    }, ANIM_DURATION * 1000);
  };

  const handleSkip = () => {
    setIsTransitioning(!isTransitioning);
    setTimeout(() => {
      setShowValentinesProposal(!showValentinesProposal);
    }, ANIM_DURATION * 100);
  };

  return (
    <OrientationGuard>
      <main className="flex items-center justify-center min-h-screen bg-black overflow-hidden relative">
        {/* Скрытая кнопка для быстрого перехода */}

        <button
          onClick={handleSkip}
          className="absolute top-0 left-0 w-5 h-5 opacity-0 hover:opacity-20 transition-opacity cursor-pointer bg-gray-800 rounded z-1000"
          aria-label="Skip to proposal"
        />

        {/* Кнопка для показа всех карточек */}
        <button
          onClick={() => setShowAll(!showAll)}
          className="absolute top-0 right-0 w-5 h-5 opacity-0 hover:opacity-20 transition-opacity cursor-pointer bg-gray-800 rounded z-1000"
          aria-label="Toggle show all cards"
        ></button>

        {!showValentinesProposal ? (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: isTransitioning ? 0 : 1 }}
            transition={{ duration: ANIM_DURATION }}
            className="flex flex-col items-center"
          >
            <PhotoPairGame handleShowProposal={handleShowProposal} showAll={showAll} />
            <div className="mt-4 md:mt-0">
              <TextFooter />
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: ANIM_DURATION }}
          >
            <ValentinesProposal />
          </motion.div>
        )}
      </main>
    </OrientationGuard>
  );
}
