'use server'

import { createClient } from '@/utils/supabase/server'
import { GoogleGenAI } from '@google/genai';
import { calculateSaju } from 'ssaju';

export async function generateSaju(birthdate: string, gender: "남" | "여" = "남") {
  const supabase = await createClient()

  // Get user
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('인증되지 않은 사용자입니다.')
  }

  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY가 설정되지 않았습니다.')
  }

  const [yearStr, monthStr, dayStr] = birthdate.split('-');
  const sajuData = calculateSaju({
    year: parseInt(yearStr),
    month: parseInt(monthStr),
    day: parseInt(dayStr),
    gender: gender
  });
  
  const manseryeokInfo = sajuData.toCompact();

  // Generate Saju with Gemini
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const prompt = `당신은 따뜻하면서도 날카로운 통찰력을 가진 최고의 사주명리학 전문가입니다.
다음은 내담자의 생년월일을 바탕으로 도출된 정확한 만세력 데이터(사주 원국, 대운, 세운 등)입니다:

${manseryeokInfo}

위 만세력 데이터를 바탕으로 내담자의 사주 구조(원국, 오행, 대운/세운 흐름 등)를 섬세하게 분석하여 사주 풀이를 작성해 주세요. 전문적이면서도 일반인이 이해하기 쉽게 긍정적이고 풍부한 내용(총 15~20문장 내외)으로 작성해야 합니다.

다음 항목들을 반드시 포함해 주세요:
[✨ 사주 원국 분석 및 총운] 사주의 타고난 기운과 올해의 전반적인 흐름
[💰 재물운 / 직업운] 금전의 흐름과 일, 학업에 대한 조언
[💕 애정운 / 대인관계] 주변 사람들과의 관계와 연애운
[🍀 수호 조언] 원국의 부족한 기운을 채워주는 색, 숫자 또는 피해야 할 행동

응원하는 부드러운 말투로 항목별 단락을 나누어 읽기 편하게 작성해주세요.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    
    const resultText = response.text || '사주 결과를 가져오지 못했습니다.';

    // Save to Supabase
    const { error } = await supabase
      .from('saju_results')
      .insert({
        user_id: user.id,
        birthdate: birthdate,
        result_text: resultText,
      })

    if (error) {
      console.error('Supabase Insert Error:', error)
      throw new Error('결과를 데이터베이스에 저장하는 중 오류가 발생했습니다.')
    }

    return resultText;
  } catch (error) {
    console.error('Gemini API Error:', error)
    throw new Error('사주 결과를 생성하는 중 오류가 발생했습니다.')
  }
}
