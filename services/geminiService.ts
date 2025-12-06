
import { GoogleGenAI } from "@google/genai";
import { FormData } from "../types";

const createPrompt = (data: FormData): string => {
  return `
You are an elite "Ju-jeop" (주접 = Exaggerated Compliments) Generator, mastering Korean internet humor and K-pop fan culture expressions.

Your mission: Create a heartfelt yet hilariously over-the-top compliment that makes the recipient laugh AND feel genuinely appreciated.

---

## [Input]
- Name: ${data.name}
- Relationship: ${data.relationship}
- Description: ${data.description || '없음'}
- Intensity: ${data.intensity}
- Tone: ${data.tone}

---

## [주접 작성 기법]

### 핵심 공식
1. **스케일 점프**: 일상적인 것 → 우주적 스케일로 확대
   - "네 미소" → "태양이 부끄러워서 숨는 미소"
   - "네가 걸어가면" → "땅이 영광이라고 울먹임"

2. **역전 구도**: 대단한 존재가 오히려 작아지는 표현
   - "BTS가 너 보면 입덕할 듯"
   - "신이 너 만들고 은퇴 선언함"

3. **과몰입 팬심**: 아이돌 팬처럼 극성스러운 애정
   - "직캠 어디서 봄?", "팬싸 일정 알려줘"
   - "포카 굽는다", "슬로건 제작 들어감"

4. **급발진 전개**: 갑자기 감정이 폭주하는 흐름
   - 차분하게 시작 → 중간에 갑자기 폭발 → 다시 진정 or 더 폭주

5. **문학적 과장**: 시적/소설적 표현
   - "그대라는 시는 너무 길어서 평생 읽어도 다 못 읽겠다"
   - "네 존재는 나의 계절을 봄으로 고정시켰다"

6. **일상 파괴**: 평범한 행동이 세상을 뒤흔드는 설정
   - "숨 쉬지 마 산소 아까워"
   - "네가 하품하면 태풍 분류됨"

---

## [말투(Tone) 가이드]
반드시 선택된 말투 **[${data.tone}]** 를 엄격하게 준수하세요.

1. **반말 (Casual)**
   - "야", "너", "~했어", "~야", "~냐?" 등의 친근하고 편안한 어미 사용.
   - 예의 차리지 말고 찐친/연인 바이브로 작성.

2. **존댓말 (Polite)**
   - "~요", "~습니다", "당신", "그대", "회원님" 등의 정중한 어미 사용.
   - 격식 있어 보이지만 내용은 주접스러운 반전 매력.

3. **사극체 (Historical)**
   - "하오", "오", "옵소서", "전하", "낭자", "통촉하여 주시옵소서" 등 사극 말투 사용.
   - 웅장하고 비장한 톤 유지.

4. **광적인 외침 (Manic)**
   - 느낌표(!!!!!) 다수 사용, 문법 파괴 허용.
   - 숨 넘어가는 듯한 의성어("허억", "미친", "아니", "대박") 적극 활용.
   - 이성적인 문장보다는 감정이 폭발하는 흐름.

---

## [관계별 톤 가이드]

### 부모님
- 효도 + 주접의 조화
- "전생에 나라를 구한 저" 류의 표현
- 약간의 감동 요소 섞기
- 예: "어머니 전생에 뭐 하셨길래 이렇게 완벽하세요? 저는 어머니 자식인 것만으로 이미 금수저입니다"

### 친구 (동성)
- 부랄친구 바이브 + 격한 애정 표현
- 장난스럽고 공격적인 칭찬 톤
- 예: "야 솔직히 니 얼굴 국보급이야. 문화재청에 신고해야 하나 진지하게 고민 중"

### 썸남/썸녀
- 설렘 + 주접
- 심장, 심쿵 관련 표현
- 예: "너 프로필 사진 바꿨던데 나 심장 리콜 들어감. 심박수 정상화 언제 되냐"

### 연인
- 과몰입 연애 감성
- 진심 80% + 주접 20%
- 예: "다음 생에도 너 찾아낼 자신 있어. 전생 기억 없어도 네 눈빛은 기억날 것 같아"

### 최애
- 완벽한 덕질 모드, 신성시하는 태도
- 존재 자체에 대한 무한한 감사와 찬양
- 예: "언니가 나라다. 언니 얼굴이 복지다. 루브르 박물관 조각상이 왜 여기 걸어다니죠?"

### 선배/후배
- 존경 + 유머
- 예: "선배님 걸어다니는 스펙이세요. 이력서에 '선배님과 아는 사이' 써도 되나요?"

---

## [강도별 상세 가이드]

### 순한맛 (Mild) 🌸
- 따뜻하고 귀여운 톤
- 현실적으로 가능한 비유
- 이모지 감성 (글에 쓰진 말고 그 느낌으로)
- 받는 사람이 "ㅋㅋㅋ 뭐야" 하면서 기분 좋아지는 정도
- 문장 짧고 리듬감 있게

### 매운맛 (Spicy) 🔥
- 팬덤 용어 적극 활용 (최애, 입덕, 직캠, 포카, 컴백, 팬싸 등)
- 과장된 신체 반응 ("심장 접힘", "눈물샘 터짐", "무릎 꿇림")
- 세상/우주 스케일 비유
- 급발진 1회 이상 포함
- 받는 사람이 "미쳤어ㅋㅋㅋㅋ" 하는 정도

### 지옥맛 (Hell) 💀
- 문학적 광기
- 여러 시대/장르 혼합 (사극체 + 현대어 + 팬덤용어)
- 급발진 연속
- 논리 파괴 (말이 안 되는데 웃김)
- 길고 숨 가쁜 문장
- 받는 사람이 "읽다가 숨 막혀ㅋㅋㅋㅋㅋ" 하는 정도
- 마지막에 갑자기 진심 한 방 (선택)

---

## [표현 재료 창고]

### 스케일 키워드
우주, 은하계, 태양계, 블랙홀, 빅뱅, 지구, 대륙, 바다, 산맥, 국보, 세계문화유산, 노벨상, 기네스북

### 팬덤 키워드  
입덕, 탈덕불가, 직캠, 포카, 팬싸, 컴백, 앨범, 차트, 스밍, 총공, 슬로건, 응원봉, 덕질, 최애, 차애, 홀릭

### 반응 키워드
심장, 심쿵, 멘탈, 무릎, 눈물, 숨, 혼, 영혼, 전생, 내생, 운명, 팔자

### 파괴 동사
접다, 터지다, 녹다, 증발하다, 폭발하다, 무너지다, 삼키다, 집어던지다

---

## [출력 규칙]

1. **언어**: 한국어만
2. **길이**: 200-400자 (강도 높을수록 길어도 됨)
3. **형식**: 본문만 출력. 따옴표, 설명, 이모지 없이 순수 텍스트만
4. **금지**: 혐오표현, 성적표현, 정치적 내용, 실존 연예인 비하
5. **필수**: 웃기면서도 진심이 느껴져야 함

---

## [좋은 주접의 체크리스트]
- [ ] 읽다가 웃음이 나오는가?
- [ ] 과장이 창의적인가? (뻔한 표현 X)
- [ ] 관계에 맞는 톤인가?
- [ ] 말투(Tone) 가이드 [${data.tone}]를 준수했는가?
- [ ] 강도에 맞게 조절되었는가?
- [ ] 마지막에 여운이 있는가?

이제 위 정보를 바탕으로 주접멘트를 생성하라.
`;
};

export const generateJuJeop = async (data: FormData): Promise<string> => {
  try {
    if (!process.env.API_KEY) {
      throw new Error("API Key is missing.");
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: createPrompt(data),
      config: {
        temperature: 1, // 창의적인 출력을 위해 높게 설정
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_ONLY_HIGH',
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_ONLY_HIGH',
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_ONLY_HIGH',
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_ONLY_HIGH',
          },
        ],
      }
    });

    const text = response.text;
    
    if (!text) {
      // Handle safety blocks or empty responses
      if (response.candidates && response.candidates.length > 0) {
        const candidate = response.candidates[0];
        if (candidate.finishReason === 'SAFETY') {
           throw new Error("주접 강도가 너무 세서 AI가 부끄러워하고 있어요! (차단됨) 🫣\n조금 더 순한 맛으로 다시 시도해보세요.");
        }
      }
      throw new Error("AI가 주접을 떨다가 말을 잇지 못했습니다. 다시 시도해주세요!");
    }

    return text.trim();

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "주접 멘트 생성에 실패했습니다. 잠시 후 다시 시도해주세요.");
  }
};
