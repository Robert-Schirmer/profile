import { useEffect, useState } from 'react';

const useTypedText = (text: string, typeSpeed: number = 100): [string, boolean] => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    setTitle('_');
    let interval: ReturnType<typeof setInterval> | null = null;
    const characters = Array.from(text);
    const to = setTimeout(() => {
      interval = setInterval(() => {
        setTitle((prevTitle) => {
          const prevCharacters = Array.from(prevTitle);
          if (prevCharacters.length === characters.length) {
            interval && clearInterval(interval);
            return characters.join('');
          }
          return characters.slice(0, prevCharacters.length).join('') + '_';
        });
      }, typeSpeed);
    }, 300);

    return () => {
      interval && clearInterval(interval);
      clearTimeout(to);
    };
  }, [text, typeSpeed]);

  return [title, text.length === title.length];
};

export default useTypedText;
