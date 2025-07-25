import { useState } from "react";

const useGetHint = () => {
  const [isHintLoading, setIsHintLoading] = useState(false);
  const [hintData, setHintData] = useState(null);

  const HF_TOKEN = import.meta.env.VITE_HF_TOKEN;

  const query = async (prompt) => {
    const response = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${HF_TOKEN}`,
        },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          model: "google/gemma-2-2b-it:nebius",
        }),
      }
    );

    const result = await response.json();

    return result.choices[0].message.content;
  };

  const getHint = async (questionText, options, answer) => {
    setIsHintLoading(true);

    const prompt = `Give a supporting hint (without revealling the answer) for this quiz question: "${questionText}". The options are: ${options.join(
      ","
    )}. The correct answer is: ${answer}.`;

    try {
      const response = await query(prompt);
      setHintData(response);
    } catch (err) {
      console.error("Error getting hint: ", err);
      setHintData("Sorry, couldn't generate a hint right now.");
    } finally {
      setIsHintLoading(false);
    }
  };

  return {
    isHintLoading,
    hintData,
    setHintData,
    getHint,
  };
};

export default useGetHint;
