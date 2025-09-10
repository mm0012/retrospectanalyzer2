// 클라이언트 사이드 분석 함수 (API 없이 작동)
export async function analyzeClientSide(rawText: string) {
  // OpenAI API를 직접 호출 (클라이언트에서)
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `당신은 회고 분석 전문가입니다. 사용자의 회고 텍스트를 분석하여 다음 형식의 JSON을 반환해주세요:

{
  "narrative": {
    "sections": [
      {
        "title": "섹션 제목 (이모지 포함)",
        "body": "분석 내용",
        "improvements": ["개선점1", "개선점2", "개선점3"]
      }
    ]
  },
  "analysis": {
    "summary_card": {
      "character": "한 줄 캐릭터 설명",
      "one_liner": "핵심 요약"
    },
    "hidden_theme": "숨겨진 테마",
    "tags": ["태그1", "태그2"],
    "emotion_tags": ["감정1", "감정2"],
    "life_scores": {
      "work": 8,
      "health": 7,
      "relationships": 6,
      "emotions": 9
    },
    "todos": ["할일1", "할일2", "할일3"],
    "insights": {
      "patterns": ["패턴1", "패턴2"],
      "self_explainer": "자기 설명"
    },
    "weekly_notes": {
      "moments": ["순간1", "순간2"],
      "lessons": ["교훈1", "교훈2"],
      "ideas": ["아이디어1", "아이디어2"],
      "quotes": ["명언1", "명언2"],
      "feelings": ["감정1", "감정2"]
    },
    "quote": {
      "text": "추천 명언",
      "author": "작가"
    },
    "declaration": "한 줄 선언"
  }
}`
        },
        {
          role: 'user',
          content: rawText
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    })
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status}`);
  }

  const data = await response.json();
  const content = data.choices[0].message.content;
  
  try {
    return JSON.parse(content);
  } catch (error) {
    console.error('JSON parse error:', error);
    // 기본 응답 반환
    return {
      narrative: {
        sections: [{
          title: "📝 분석 결과",
          body: content || "분석을 완료했습니다.",
          improvements: ["더 구체적인 목표 설정", "꾸준한 실행", "피드백 수집"]
        }]
      },
      analysis: {
        summary_card: {
          character: "성장하는 사람",
          one_liner: "회고를 통해 자신을 돌아보는 시간을 가졌습니다."
        },
        hidden_theme: "자기 성찰과 성장",
        tags: ["성장", "회고"],
        emotion_tags: ["긍정적"],
        life_scores: { work: 7, health: 7, relationships: 7, emotions: 7 },
        todos: ["구체적인 목표 설정", "꾸준한 실행", "피드백 수집"],
        insights: {
          patterns: ["성장 의지", "자기 성찰"],
          self_explainer: "자신을 돌아보는 시간을 가진 사람"
        },
        weekly_notes: {
          moments: ["회고 작성"],
          lessons: ["자기 성찰의 중요성"],
          ideas: ["더 나은 미래를 위한 계획"],
          quotes: ["성장은 선택이다"],
          feelings: ["희망적"]
        },
        quote: {
          text: "성장은 선택이다",
          author: "알 수 없음"
        },
        declaration: "매일 조금씩 성장하겠습니다"
      }
    };
  }
}
