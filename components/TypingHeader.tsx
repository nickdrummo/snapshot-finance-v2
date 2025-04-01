import { useState, useEffect } from 'react';
import '../app/styles/globals.css';

const useTextCycler = (
  phrases: string[],
  interval: number = 4000,
  typingSpeed: number = 100
): string => {
  const [text, setText] = useState<string>('');
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [loopNum, setLoopNum] = useState<number>(0);
  const [typingDelay, setTypingDelay] = useState<number>(typingSpeed);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentPhrase = phrases[loopNum % phrases.length];
    
    if (isDeleting) {
      // Deleting text
      timer = setTimeout(() => {
        setText(currentPhrase.substring(0, text.length - 1));
        setTypingDelay(typingSpeed / 2);
      }, typingDelay);
      
      if (text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingDelay(150);
      }
    } else {
      // Typing text
      timer = setTimeout(() => {
        setText(currentPhrase.substring(0, text.length + 1));
        setTypingDelay(typingSpeed);
      }, typingDelay);
      
      if (text === currentPhrase) {
        setTypingDelay(interval);
        setIsDeleting(true);
      }
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingDelay, phrases, interval, typingSpeed]);

  return text;
};

export const SubscriptionHeader = () => {
  const phrases: string[] = ['Subscriptions.', 'Netflix.', 'Spotify.', 'HBO Max.', 'Disney.', 'Amazon Prime.'];
  const cycledText = useTextCycler(phrases);

  return (
    <span className="text-pink-400 typingCursor">{cycledText}</span>
  );
};