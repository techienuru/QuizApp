import { useState } from "react";

const HF_TOKEN = import.meta.env.VITE_HF_TOKEN;
const MODEL = "facebook/mbart-large-50-many-to-many-mmt";

export default function useTranslate() {
  const mbart50Languages = [
    { language: "Afrikaans", code: "af_ZA" },
    { language: "Arabic", code: "ar_AR" },
    { language: "Azerbaijani", code: "az_AZ" },
    { language: "Belarusian", code: "be_BY" },
    { language: "Bengali", code: "bn_IN" },
    { language: "Bulgarian", code: "bg_BG" },
    { language: "Burmese", code: "my_MM" },
    { language: "Catalan", code: "ca_ES" },
    { language: "Chinese (Simplified)", code: "zh_CN" },
    { language: "Croatian", code: "hr_HR" },
    { language: "Czech", code: "cs_CZ" },
    { language: "Danish", code: "da_DK" },
    { language: "Dutch", code: "nl_XX" },
    { language: "English", code: "en_XX" },
    { language: "Estonian", code: "et_EE" },
    { language: "Finnish", code: "fi_FI" },
    { language: "French", code: "fr_XX" },
    { language: "German", code: "de_DE" },
    { language: "Georgian", code: "ka_GE" },
    { language: "Greek", code: "el_GR" },
    { language: "Gujarati", code: "gu_IN" },
    { language: "Hebrew", code: "he_IL" },
    { language: "Hindi", code: "hi_IN" },
    { language: "Hungarian", code: "hu_HU" },
    { language: "Indonesian", code: "id_ID" },
    { language: "Italian", code: "it_IT" },
    { language: "Japanese", code: "ja_XX" },
    { language: "Kazakh", code: "kk_KZ" },
    { language: "Korean", code: "ko_KR" },
    { language: "Latvian", code: "lv_LV" },
    { language: "Lithuanian", code: "lt_LT" },
    { language: "Macedonian", code: "mk_MK" },
    { language: "Malay", code: "ms_MY" },
    { language: "Nepali", code: "ne_NP" },
    { language: "Norwegian", code: "no_NO" },
    { language: "Persian", code: "fa_IR" },
    { language: "Polish", code: "pl_PL" },
    { language: "Portuguese", code: "pt_XX" },
    { language: "Romanian", code: "ro_RO" },
    { language: "Russian", code: "ru_RU" },
    { language: "Sinhala", code: "si_LK" },
    { language: "Slovak", code: "sk_SK" },
    { language: "Slovenian", code: "sl_SI" },
    { language: "Spanish", code: "es_XX" },
    { language: "Swedish", code: "sv_SE" },
    { language: "Tagalog", code: "tl_XX" },
    { language: "Tamil", code: "ta_IN" },
    { language: "Telugu", code: "te_IN" },
    { language: "Thai", code: "th_TH" },
    { language: "Turkish", code: "tr_TR" },
    { language: "Ukrainian", code: "uk_UA" },
    { language: "Vietnamese", code: "vi_VN" },
    { language: "Welsh", code: "cy_GB" },
  ];
  const [isLangLoading, setIsLangLoading] = useState(false);

  async function translateBatch(allQuizQues, quesObj, src, tgt) {
    setIsLangLoading(true);
    try {
      const currentQues = getCurrQues(quesObj.currentQuesNo, allQuizQues);
      const newArray = [
        quesObj.question,
        currentQues.correct_answer,
        ...currentQues.incorrect_answers,
      ];

      const body = {
        inputs: newArray,
        parameters: { src_lang: src, tgt_lang: tgt },
      };
      const res = await fetch(
        `https://router.huggingface.co/hf-inference/models/${MODEL}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${HF_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      const data = await res.json();

      if (Array.isArray(data)) {
        const translatedArray = data.map((item) => item.translation_text);

        const { category, currentQuesNo, difficulty, totalQuesNo, type } =
          quesObj;
        const question = translatedArray[0];
        const correctAnswer = translatedArray[1];
        const incorrectAnswers = translatedArray.slice(2);
        const options = sortAnswers(correctAnswer, incorrectAnswers);
        const translatedObj = {
          category,
          correctAnswer,
          currentQuesNo,
          difficulty,
          options,
          question,
          totalQuesNo,
          type,
        };

        return translatedObj;
      } else {
        console.error("Unexpected response format:", data);
        return quesObj;
      }
    } catch (e) {
      console.error(e.message);
      return quesObj;
    } finally {
      setIsLangLoading(false);
    }
  }

  const getCurrQues = (currentQuesNo, allQuizQues) => {
    return allQuizQues[currentQuesNo - 1];
  };

  const sortAnswers = (correctAnswer, incorrectAnswers) => {
    const options = [...incorrectAnswers, correctAnswer];
    return options.sort(() => Math.random() - 0.5);
  };

  return { translateBatch, mbart50Languages, isLangLoading };
}
