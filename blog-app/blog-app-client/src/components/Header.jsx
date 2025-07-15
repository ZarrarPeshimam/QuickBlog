import React, { useRef, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import gsap from 'gsap';
import { motion } from 'framer-motion';

export default function Header() {
  const { setInput, input } = useAppContext();
  const inputRef = useRef();
  const hexRefs = useRef([]);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // 🌐 Setup mouse and screen size tracking
  useEffect(() => {
    const updateMouse = (e) => setMouse({ x: e.clientX, y: e.clientY });
    const updateWindowSize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    updateWindowSize();
    window.addEventListener('mousemove', updateMouse);
    window.addEventListener('resize', updateWindowSize);
    return () => {
      window.removeEventListener('mousemove', updateMouse);
      window.removeEventListener('resize', updateWindowSize);
    };
  }, []);

  // 🌀 Animate Background and Hexagons
  useEffect(() => {
    // Aurora Background Animation
    gsap.to('.aurora', {
      backgroundPosition: '200% center',
      duration: 15,
      repeat: -1,
      ease: 'linear',
    });

    // Floating and Rotating Hexagons
    hexRefs.current.forEach((el, i) => {
      gsap.to(el, {
        rotation: '+=360',
        duration: 40,
        repeat: -1,
        ease: 'none',
      });
    });
  }, []);

  // 🎯 Parallax Effect on Hexagons
  useEffect(() => {
    const centerX = windowSize.width / 2;
    const centerY = windowSize.height / 2;

    hexRefs.current.forEach((el, i) => {
      if (!el) return;

      const depth = (i + 1) * 20;
      const offsetX = ((mouse.x - centerX) / centerX) * depth;
      const offsetY = ((mouse.y - centerY) / centerY) * depth;

      gsap.to(el, {
        x: offsetX,
        y: offsetY,
        duration: 1.2,
        ease: 'power2.out',
      });
    });
  }, [mouse, windowSize]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setInput(inputRef.current.value);
  };

  const onClear = () => {
    setInput('');
    inputRef.current.value = '';
  };

  return (
    <div className="relative overflow-hidden min-h-screen pb-10">
      {/* Cursor Follower */}
      <motion.div
        className="fixed w-5 h-5 z-50 bg-yellow-300 rounded-full pointer-events-none mix-blend-difference"
        animate={{
          x: mouse.x - 10,
          y: mouse.y - 10,
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 25,
        }}
      />

      {/* Aurora Background */}
      <div className="aurora absolute inset-0 -z-10 bg-gradient-to-r from-purple-900 via-blue-700 to-pink-600 bg-[length:400%_400%]" />

      {/* SVG Glow Filter */}
      <svg width="0" height="0">
        <filter id="neon-glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </svg>

      {/* Floating Hexagons with Parallax */}
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <svg
            key={i}
            ref={(el) => (hexRefs.current[i] = el)}
            className="absolute opacity-20"
            width="200"
            height="200"
            style={{
              top: `${10 + i * 12}%`,
              left: `${5 + i * 18}%`,
              filter: 'url(#neon-glow)',
              zIndex: 1,
            }}
          >
            <polygon
              points="100,0 190,50 190,150 100,200 10,150 10,50"
              stroke="#ffffff"
              strokeWidth="3"
              fill="none"
            />
          </svg>
        ))}

      {/* Main Content */}
      <div className="relative z-10 mx-8 sm:mx-16 lg:mx-24 text-center pt-24 px-4">
        <div className="inline-flex items-center justify-center mb-6 px-6 py-1.5 gap-3 border border-white/40 bg-white/10 rounded-full text-sm text-white">
          <p>New AI feature integrated</p>
          <img src={assets.star_icon} className="w-2.5" alt="" />
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold text-white leading-tight mb-4">
          Your own <span className="text-yellow-300">blogging</span> platform.
        </h1>

        <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
          A space to think out loud, share what matters, and write without filters.
        </p>

        <form
          onSubmit={onSubmitHandler}
          className="flex justify-center items-center mx-auto max-w-xl border border-white/30 bg-white/10 rounded overflow-hidden backdrop-blur"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for blogs"
            required
            className="flex-grow bg-transparent text-white placeholder-white/70 py-3 px-4 outline-none"
          />
          <button
            type="submit"
            className="bg-yellow-400 text-dark px-6 py-3 hover:scale-105 transition cursor-pointer"
          >
            Search
          </button>
        </form>

        {input && (
          <button
            onClick={onClear}
            className="mt-4 px-4 py-2 border border-white text-white text-sm rounded hover:bg-white/20 transition"
          >
            Clear Search
          </button>
        )}
      </div>
    </div>
  );
}
