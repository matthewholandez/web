"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

const COVER_SRC = "/covers/the-chase.jpg";
const YOUTUBE_ID = "rvduT4ZasWI";
const TRACK_TITLE = "Butterflies";
const TRACK_ARTIST = "Hearts2Hearts";

type YtPlayer = {
  playVideo: () => void;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  setVolume: (volume: number) => void;
  destroy: () => void;
};

/** Quiet enough to sit in the background once unmuted (0–100). */
const PLAYBACK_VOLUME = 22;

type YtNamespace = {
  Player: new (
    elementId: string,
    options: {
      videoId: string;
      width?: number;
      height?: number;
      playerVars?: Record<string, number | string>;
      events?: {
        onReady?: (event: { target: YtPlayer }) => void;
        onStateChange?: (event: { data: number; target: YtPlayer }) => void;
      };
    },
  ) => YtPlayer;
  PlayerState: { ENDED: number; PLAYING: number };
};

declare global {
  interface Window {
    YT?: YtNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<YtNamespace> | null = null;

function loadYouTubeApi(): Promise<YtNamespace> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("No window"));
  }
  if (window.YT?.Player) {
    return Promise.resolve(window.YT);
  }
  if (apiPromise) return apiPromise;

  apiPromise = new Promise((resolve) => {
    const prior = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prior?.();
      if (window.YT) resolve(window.YT);
    };

    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.head.appendChild(script);
    }
  });

  return apiPromise;
}

export function NowPlaying() {
  const reactId = useId().replace(/:/g, "");
  const hostId = `yt-host-${reactId}`;
  const bubbleId = `np-bubble-${reactId}`;
  const rootRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<YtPlayer | null>(null);
  const [muted, setMuted] = useState(true);
  const [ready, setReady] = useState(false);
  const [eggOpen, setEggOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    void loadYouTubeApi().then((YT) => {
      if (cancelled) return;

      playerRef.current = new YT.Player(hostId, {
        videoId: YOUTUBE_ID,
        width: 1,
        height: 1,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          loop: 1,
          playlist: YOUTUBE_ID,
        },
        events: {
          onReady: (event) => {
            if (cancelled) return;
            event.target.setVolume(PLAYBACK_VOLUME);
            event.target.mute();
            event.target.playVideo();
            setReady(true);
          },
          onStateChange: (event) => {
            if (event.data === YT.PlayerState.ENDED) {
              event.target.playVideo();
            }
          },
        },
      });
    });

    return () => {
      cancelled = true;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [hostId]);

  useEffect(() => {
    if (!eggOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setEggOpen(false);
    };

    const onPointer = (event: MouseEvent | TouchEvent) => {
      const root = rootRef.current;
      if (!root) return;
      const target = event.target;
      if (target instanceof Node && !root.contains(target)) {
        setEggOpen(false);
      }
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("touchstart", onPointer);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("touchstart", onPointer);
    };
  }, [eggOpen]);

  const toggleMute = () => {
    const player = playerRef.current;
    if (!player || !ready) return;

    if (player.isMuted()) {
      player.setVolume(PLAYBACK_VOLUME);
      player.unMute();
      player.playVideo();
      setMuted(false);
    } else {
      player.mute();
      setMuted(true);
    }
  };

  const engage = () => {
    toggleMute();
    setEggOpen(true);
  };

  const active = ready && !muted;

  return (
    <div className="nowPlaying" ref={rootRef}>
      <div className="nowPlaying__yt" aria-hidden="true">
        <div id={hostId} />
      </div>

      {eggOpen ? (
        <aside
          className="nowPlaying__bubble"
          id={bubbleId}
          role="status"
          aria-live="polite"
        >
          <p className="nowPlaying__bubbleText">
            Yes, I&apos;m a K-pop fan.
          </p>
          <span className="nowPlaying__bubbleTail" aria-hidden="true" />
        </aside>
      ) : null}

      <button
        type="button"
        className="nowPlaying__art"
        onClick={engage}
        aria-label={muted ? `Unmute ${TRACK_TITLE}` : `Mute ${TRACK_TITLE}`}
        aria-pressed={!muted}
        aria-controls={bubbleId}
        aria-expanded={eggOpen}
      >
        <Image
          className="nowPlaying__cover"
          src={COVER_SRC}
          alt=""
          width={56}
          height={56}
        />
        <span className="nowPlaying__mute" aria-hidden="true">
          {muted ? <MuteIcon /> : <SpeakerIcon />}
        </span>
      </button>

      <button
        type="button"
        className="nowPlaying__meta"
        onClick={engage}
        aria-controls={bubbleId}
        aria-expanded={eggOpen}
      >
        <span className="nowPlaying__title">{TRACK_TITLE}</span>
        <span className="nowPlaying__artist">
          {TRACK_ARTIST}
          <span
            className={`nowPlaying__bars${active ? " is-active" : ""}`}
            aria-hidden="true"
          >
            <i />
            <i />
            <i />
            <i />
          </span>
        </span>
      </button>
    </div>
  );
}

function MuteIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
      <path d="M3.5 9.2h3.1L12 4.8v14.4l-5.4-4.4H3.5V9.2Z" />
      <path
        d="M15.4 9.6 20 14.2M20 9.6l-4.6 4.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SpeakerIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
      <path d="M3.5 9.2h3.1L12 4.8v14.4l-5.4-4.4H3.5V9.2Z" />
      <path
        d="M15.1 9.1a3.5 3.5 0 0 1 0 5.8M17.4 6.8a6.3 6.3 0 0 1 0 10.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
    </svg>
  );
}
