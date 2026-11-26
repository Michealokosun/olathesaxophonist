"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
} from "lucide-react";
import { scrollReveal } from "@/features/home/scroll-reveal";

const videos = [
  "export_1795677350826.mp4",
  "v14044g50000d3hnv8fog65nfvtlnddg (1).mp4",
  "v14044g50000d97n5mvog65k9v0i2tk0 (1).mp4",
  "v1c044g50000d7hrt0fog65vf6u4n810 (1).mp4",
];

export default function VideoShowcaseSection() {
  const [activeVideo, setActiveVideo] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const previousVideo = () =>
    setActiveVideo((activeVideo - 1 + videos.length) % videos.length);
  const nextVideo = () => setActiveVideo((activeVideo + 1) % videos.length);

  useEffect(() => {
    videoRef.current?.pause();
  }, [activeVideo]);

  return (
    <section className="video-showcase section" aria-label="Live performance videos">
      <motion.div className="section-kicker" {...scrollReveal}>
        MICHAEL OLA · LIVE IN PERFORMANCE
      </motion.div>
      <motion.div className="video-showcase-heading" {...scrollReveal}>
        <h2>
          The music speaks
          <br />
          <em>for itself.</em>
        </h2>
        <p>A few moments from the room, the music, and the feeling.</p>
      </motion.div>
      <motion.div className="video-carousel" {...scrollReveal}>
        <div className="video-frame">
          <motion.video
            key={videos[activeVideo]}
            ref={videoRef}
            className="video-player"
            src={`/videos/${encodeURIComponent(videos[activeVideo])}`}
            controls
            muted={isMuted}
            autoPlay={false}
            playsInline
            preload="metadata"
            aria-label={`Live performance video ${activeVideo + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
          />
          <span className="video-frame-label">LIVE PERFORMANCE</span>
          <button
            className="video-mute-toggle"
            type="button"
            onClick={() => setIsMuted((muted) => !muted)}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
            aria-pressed={isMuted}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            <span>{isMuted ? "UNMUTE" : "MUTE"}</span>
          </button>
        </div>
        <div className="video-carousel-controls">
          <span className="video-count">
            {String(activeVideo + 1).padStart(2, "0")}{" "}
            <i>/</i> {String(videos.length).padStart(2, "0")}
          </span>
          <div className="video-dots" aria-label="Choose a video">
            {videos.map((video, index) => (
              <button
                key={video}
                className={index === activeVideo ? "active" : ""}
                onClick={() => setActiveVideo(index)}
                aria-label={`Show video ${index + 1}`}
                aria-current={index === activeVideo ? "true" : undefined}
              />
            ))}
          </div>
          <div className="video-arrows">
            <button onClick={previousVideo} aria-label="Previous video">
              <ChevronLeft size={18} />
            </button>
            <button onClick={nextVideo} aria-label="Next video">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
