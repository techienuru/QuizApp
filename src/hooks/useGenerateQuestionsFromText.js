const HF_TOKEN = import.meta.env.VITE_HF_TOKEN;

const useGenerateQuestionsFromText = function () {
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
          model: "mistralai/Mistral-7B-Instruct-v0.2:featherless-ai",
        }),
      }
    );

    const result = await response.json();
    if (!response.ok) throw new Error(result?.error?.message);

    return result.choices[0].message.content;
  };

  const generateQuestionsFromText = async (extractedText, noOfQuestions) => {
    const prompt = `You are a JSON-only generator. 

Input text:
"${extractedText}"

Instruction:
Generate exactly ${noOfQuestions} multiple-choice questions from the above text and return **only** a JSON array of objects. Each object must have these keys, in this order:

  1. "type" (always "multiple")  
  2. "difficulty" (choose "easy", "medium" or "hard")  
  3. "category" (your choice)  
  4. "question"  
  5. "correct_answer"  
  6. "incorrect_answers" (an array of three strings)

**Do not** return any other text—no explanations, no code fences, no bullet points, nothing.  
Make sure the output parses with 'JSON.parse(...)' without errors. That is both key and values should be quoted with "".

Stop after the closing ']'.
`;

    const response = await query(prompt);

    return JSON.parse(response);
  };

  return { generateQuestionsFromText };
};

export default useGenerateQuestionsFromText;
