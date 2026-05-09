'use client';

import { useEffect, useRef, useState, createElement, useMemo, useCallback } from 'react';
import { gsap } from 'gsap';

const TextType = ({
  text,
  as: Component = 'div',
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  loop = true,
  className = '',
  showCursor = true,
  cursorCharacter = '|',
  cursorClassName = '',
  cursorBlinkDuration = 0.5,
  textColors = [],
  variableSpeed,
  startOnVisible = true,
  ...props
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnVisible);
  const cursorRef = useRef(null);
  const containerRef = useRef(null);

  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

  const getRandomSpeed = useCallback(() => {
    if (!variableSpeed) return typingSpeed;
    const { min, max } = variableSpeed;
    return Math.random() * (max - min) + min;
  }, [variableSpeed, typingSpeed]);

  // Cursor Blinking Animation
  useEffect(() => {
    if (showCursor && cursorRef.current) {
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: cursorBlinkDuration,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      });
    }
  }, [showCursor, cursorBlinkDuration]);

  // Intersection Observer to start when visible
  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [startOnVisible]);

  // Main Typing Logic (No Delete)
  useEffect(() => {
    if (!isVisible) return;

    let timeout;
    const currentFullText = textArray[currentTextIndex];

    const type = () => {
      if (currentCharIndex < currentFullText.length) {
        // Typing forward
        timeout = setTimeout(() => {
          setDisplayedText(prev => prev + currentFullText[currentCharIndex]);
          setCurrentCharIndex(prev => prev + 1);
        }, variableSpeed ? getRandomSpeed() : typingSpeed);
      } else {
        // Finished typing the current sentence
        if (loop || currentTextIndex < textArray.length - 1) {
          timeout = setTimeout(() => {
            setDisplayedText('');
            setCurrentCharIndex(0);
            setCurrentTextIndex(prev => (prev + 1) % textArray.length);
          }, pauseDuration);
        }
      }
    };

    if (currentCharIndex === 0 && displayedText === '') {
      timeout = setTimeout(type, initialDelay);
    } else {
      type();
    }

    return () => clearTimeout(timeout);
  }, [currentCharIndex, currentTextIndex, isVisible, textArray, typingSpeed, loop, pauseDuration, initialDelay]);

  const currentColor = textColors.length > 0 ? textColors[currentTextIndex % textColors.length] : 'inherit';

  return createElement(
    Component,
    { ref: containerRef, className: `text-type ${className}`, ...props },
    <span style={{ color: currentColor }}>{displayedText}</span>,
    showCursor && (
      <span ref={cursorRef} className={`text-type__cursor ${cursorClassName}`} style={{ fontWeight: 'bold' }}>
        {cursorCharacter}
      </span>
    )
  );
};

export default TextType;