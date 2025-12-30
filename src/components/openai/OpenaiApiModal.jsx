import OpenAI from "openai";
import { useEffect, useRef, useState } from "react";
import { sendTextopenai } from "../../apis/openai/openaiApi";

function TypingEffect({ text, speed = 50 }) {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setTyping] = useState(true);
  const textIndex = useRef(0);

  useEffect(() => {
    const textArray = Array.from(text);

    const timer = setInterval(() => {
      if (textIndex.current < text.length) {
        setDisplayText((prev) => prev + textArray[textIndex.current++]);
      } else {
        setTyping(false);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text]);

  return (
    <div>
      {displayText}
      {isTyping && <span>|</span>}
    </div>
  );
}

function OpenaiApiModal() {
  const [inputValue, setInputValue] = useState("");
  const [response, setResponse] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const handleSend = async () => {
    setLoading(true);
    const response = await sendTextopenai(inputValue);
    setResponse(response);
  };

  useEffect(() => {
    if (isLoading) {
      setLoading(false);
    }
  }, [response]);

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleSend}>전송</button>
      {!isLoading && !!response && <TypingEffect text={response.output_text} />}
    </div>
  );
}

export default OpenaiApiModal;
