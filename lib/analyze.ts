import type { AnalyzeResult, NarrativePayload, AnalysisPayload } from "@/lib/types";
import fs from "node:fs";
import path from "node:path";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

function readPrompt(file: string): string {
  try {
    return fs.readFileSync(path.join(process.cwd(), "prompts", file), "utf8");
  } catch {
    return "";
  }
}

const DEFAULTS = {
  narrative: (): NarrativePayload => ({
    sections: [
      {
        title: "🌙 수면과 체력",
        body:
          "이번 주 평일 평균 수면 시간은 약 5시간이었는데, 지난주보다 조금 나아졌어. 6시간 잔 날도 두 번이나 있었고, 점심 낮잠을 30분으로 제한한 게 살짝 효과가 있었던 것 같다. 앞으로 낮잠을 조금씩 줄이고 점심시간을 잘 활용할 수 있으면 좋겠다.",
        improvements: ["밤 수면시간 6시간 이상 확보하기", "낮잠 30분 제한 유지하기", "점심시간 효율적 활용하기"],
      },

      {
        title: "🏃 운동과 몸",
        body:
          "헬스 2회, 러닝 1회, 클라이밍 1회로 꾸준히 운동했어. 러닝 5.5km 달성해서 체력이 늘어나는 게 느껴졌다. 클라이밍에서는 아직 기술이 부족해서 전완근만 아프고, 몸을 조금 더 잘 쓰면 등이랑 전신이 아플 텐데 아직은 팔만 아픈 것 같다.",
        improvements: ["러닝 6km 도전하기", "클라이밍 기술 향상하기", "웨이트 주 2회 이상 유지하기"],
      },
      {
        title: "📖 독서와 대화",
        body:
          "트레바리에서 카피라이팅 기술서를 다뤘는데, '나를 포장하는 일'에 대한 거부감이 공감을 얻었어. '빈 수레가 요란하다'는 피드백이 의외로 위로가 되었고, 보기 좋게 포장하는 용기가 필요하다는 걸 깨달았다. 다양한 사람과 다양한 경험을 해보면서 내 인생에 수많은 점을 찍고 있다는 생각이 들어.",
        improvements: ["트레바리 피드백을 포트폴리오에 적용하기", "모임에서 실시간 메모 습관화하기", "자신감 있는 자기 표현 연습하기"],
      },
    ],
  }),
  analysis: (): AnalysisPayload => ({
    summary_card: {
      character: "운동과 자기계발로 몸과 마음을 다지는 탐험가",
      one_liner: "러닝 5.5km 달성과 면접 피드백으로 자신감을 발견한 한 주",
    },
    tags: ["수면 관리", "운동 꾸준함", "자기 표현", "독서와 대화"],
    emotion_tags: ["#긴장", "#자극", "#성취감", "#위로", "#성장"],
    hidden_theme:
      "나는 나를 증명해야 한다는 압박감과, 그럼에도 있는 그대로의 나를 존중하려는 마음 사이에서 고민하고 있다",
    life_scores: { work: 7, health: 8, relationships: 7.5, sleep: 5 },
    todos: [
      "수면 시간 6시간 이상 확보하고 낮잠 30분 제한 유지",
      "자기 표현을 자신감 있게 하는 연습",
      "러닝 6km 도전하고 헬스 주 2회 이상 유지",
      "트레바리에서 실시간 메모 습관 들이기",
    ],
    insights: {
      patterns: ["운동으로 스트레스를 해소하려는 경향", "완벽을 추구하다가 오히려 지치는 패턴"],
      simulations: ["단계별 목표 설정", "동반자와의 협력", "체계적 계획 수립"],
      self_explainer:
        "자신을 낮게 평가하는 습관에서 오는 안전감과 성취욕구와 완벽주의 사이의 갈등",
    },
    coaching: {
      ST: "수면 시간을 23:30 취침으로 고정하고, 포트폴리오 강점을 구체적으로 정리하세요. 운동은 현재 패턴을 유지하면서 점진적으로 강도를 높이세요.",
      NF: "이미 꾸준한 운동과 자기 성찰을 통해 많은 성장을 하고 있어요. 이제는 자신의 가치를 더 믿고 표현해도 괜찮습니다.",
    },
    weekly_notes: {
      moments: ["러닝 5.5km 완주", "트레바리에서 공감받은 경험", "수면 패턴 개선"],
      lessons: ["겸손함도 과하면 기회를 놓칠 수 있다", "꾸준함이 체력과 자신감을 만든다"],
      ideas: ["포트폴리오를 '겸손+자신감' 균형으로 재구성", "수면 패턴을 데이터로 추적"],
      quotes: ["체력이 좋으면 더 먼곳을 갈 수 있다", "내 인생에 일어나는 일과 사람을 해석하는 건 오로지 내 몫이다", "점점 조금씩 할 수록 는다"],
      feelings: ["운동 성취의 뿌듯함", "대화에서 얻은 위로", "수면 개선의 만족감"],
    },
    long_term_metrics: {
      sleep_avg_hours: 5,
      workouts: { gym: 2, run: 1, climb: 1 },
      job_activity: { portfolio: "진행중", interviews: 0 },
      reading_talk: 1,
    },
    qa: [
      { q: "다음 주에 가장 먼저 시도할 건?", a: "수면 시간을 23:30으로 고정하기" },
      { q: "이번 주 가장 뿌듯했던 순간은?", a: "러닝 5.5km 완주" },
      { q: "면접에서 배운 가장 중요한 교훈은?", a: "겸손함과 자신감의 균형" },
    ],
    quote: { text: "진정한 성공은 준비된 자에게 찾아오는 기회다.", author: "벤저민 프랭클린" },
    support: {
      walking_friend: "민영아, 이번 주는 정말 의미있는 시간이었어. 4년 만의 면접에서 '평범해 보여도 타인에겐 강점'이라는 피드백을 받은 것, 러닝 거리를 3km에서 5.5km까지 늘린 것, 트레바리에서 '포장'에 대한 새로운 인식을 얻은 것까지. 이런 경험들이 쌓이면서 네가 점점 더 자신 있게 변해가는 게 느껴져. 특히 '선물은 예쁘게 포장하는데 왜 나 자신 포장은 창피할까?'라는 질문을 던지는 모습에서 진짜 성장을 봐. 커리어에서도 일상에서도, 자신의 가치를 제대로 어필하는 건 부끄러운 일이 아니야. 오히려 그게 진정성 있는 커뮤니케이션이라고 생각해. 다음 주엔 더 자신 있게 나아가보자! 😊",
      supportive_colleague: "민영님, 이번 주 정말 수고 많으셨어요! 4년 만의 면접에서 받은 피드백이 '평범함도 강점'이라고 하신 건 정말 중요한 깨달음이었을 것 같아요. 러닝 3km에서 5.5km까지 늘린 체력적 성과도 대단하지만, 그보다 더 인상적인 건 'MSG를 못 넣은 아쉬움'과 '포장에 대한 거부감' 사이에서 고민하시는 모습이에요. 이런 세심함과 성찰력이야말로 진짜 강점이에요. 커리어에서도 이런 꼼꼼함과 자기 성찰 능력은 정말 큰 자산이 될 거예요. 다음 주 포트폴리오 구조 뜯어고치기 화이팅! 조금씩 자신의 가치를 더 잘 표현해나가시길 바라요 💪",
      growth_mentor: "민영님의 이번 주 회고에서 가장 인상적인 건 '증명 부담'과 '포장 거부감' 사이의 내적 갈등이었어요. 4년 만의 면접에서 '평범함도 강점'이라는 피드백을 받으면서도 '정직+매력 포장'의 균형을 탐색하시는 모습이 진정한 성숙함을 보여줍니다. 러닝 거리 확장과 헬스 꾸준함은 외적 성장이지만, '선물 포장 vs 자기 포장'에 대한 성찰은 내적 성장의 증거예요. 이런 자기 인식의 변화가 커리어와 인생 전반에 미치는 영향은 정말 클 거예요. 자신의 가치를 제대로 표현하는 것은 겸손함과 상충되지 않습니다. 오히려 진정성 있는 자기 표현이 더 깊은 신뢰를 만들어내죠. 계속 이런 식으로 열린 마음으로 배워나가시길 바라요 📚"
    },
    declaration: "나는 겸손하면서도 자신감 있게 나를 표현할 수 있다.",
  }),
};

async function callOpenAI(prompt: string, rawText: string): Promise<any | undefined> {
  if (!OPENAI_API_KEY) {
    console.log("❌ OpenAI API 키가 설정되지 않음");
    return undefined;
  }

  console.log("🚀 OpenAI API 호출 시작:", { 
    model: OPENAI_MODEL, 
    promptLength: prompt.length, 
    textLength: rawText.length 
  });

  const body = {
    model: OPENAI_MODEL,
    messages: [
      {
        role: "system",
        content:
          "당신은 회고 분석을 JSON으로 산출하는 도우미입니다. 개발 패킷의 스키마와 키 순서, 이모지와 라벨을 100% 준수하세요. 반드시 유효한 JSON만 출력합니다.",
      },
      { role: "user", content: `${prompt}\n\n입력 원문:\n${rawText}` },
    ],
    temperature: 0.2,
    response_format: { type: "json_object" },
  } as any;

  try {
    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify(body),
    });

    if (!resp.ok) {
      const errorText = await resp.text();
      console.log("❌ OpenAI API 응답 오류:", { 
        status: resp.status, 
        statusText: resp.statusText,
        error: errorText,
        model: OPENAI_MODEL,
        hasApiKey: !!OPENAI_API_KEY
      });
      return undefined;
    }

    const data = await resp.json();
    const content = data?.choices?.[0]?.message?.content;
    
    if (!content) {
      console.log("❌ OpenAI API 응답에 content 없음:", data);
      return undefined;
    }

    try {
      const parsed = JSON.parse(content);
      console.log("✅ OpenAI API 응답 파싱 성공");
      return parsed;
    } catch (parseError) {
      console.log("❌ OpenAI API 응답 JSON 파싱 실패:", { content, error: parseError });
      return undefined;
    }
  } catch (fetchError) {
    console.log("❌ OpenAI API 호출 중 네트워크 오류:", fetchError);
    return undefined;
  }
}

function ensureNarrativeShape(v: any): NarrativePayload {
  const d = DEFAULTS.narrative();
  if (!v || !Array.isArray(v.sections)) return d;
  return {
    sections: v.sections
      .filter((s: any) => s && s.title && s.body && Array.isArray(s.improvements))
      .map((s: any) => ({
        title: String(s.title),
        body: String(s.body),
        improvements: s.improvements.map((x: any) => String(x)),
      })),
  };
}

function ensureAnalysisShape(v: any): AnalysisPayload {
  const d = DEFAULTS.analysis();
  if (!v) return d;
  try {
    return {
      summary_card: {
        character: String(v.summary_card?.character || d.summary_card.character),
        one_liner: String(v.summary_card?.one_liner || d.summary_card.one_liner),
      },
      tags: Array.isArray(v.tags) ? v.tags.map((x: any) => String(x)) : d.tags,
      emotion_tags: Array.isArray(v.emotion_tags)
        ? v.emotion_tags.map((x: any) => String(x))
        : d.emotion_tags,
      hidden_theme: String(v.hidden_theme || d.hidden_theme),
      life_scores: {
        work: Number(v.life_scores?.work ?? d.life_scores.work),
        health: Number(v.life_scores?.health ?? d.life_scores.health),
        relationships: Number(v.life_scores?.relationships ?? d.life_scores.relationships),
        sleep: Number(v.life_scores?.sleep ?? d.life_scores.sleep),
      },
      todos: Array.isArray(v.todos) ? v.todos.map((x: any) => String(x)) : d.todos,
      insights: {
        patterns: Array.isArray(v.insights?.patterns)
          ? v.insights.patterns.map((x: any) => String(x))
          : d.insights.patterns,
        simulations: Array.isArray(v.insights?.simulations)
          ? v.insights.simulations.map((x: any) => String(x))
          : d.insights.simulations,
        self_explainer: String(v.insights?.self_explainer || d.insights.self_explainer),
      },
      coaching: {
        ST: String(v.coaching?.ST || d.coaching.ST),
        NF: String(v.coaching?.NF || d.coaching.NF),
      },
      weekly_notes: {
        moments: Array.isArray(v.weekly_notes?.moments)
          ? v.weekly_notes.moments.map((x: any) => String(x))
          : d.weekly_notes.moments,
        lessons: Array.isArray(v.weekly_notes?.lessons)
          ? v.weekly_notes.lessons.map((x: any) => String(x))
          : d.weekly_notes.lessons,
        ideas: Array.isArray(v.weekly_notes?.ideas)
          ? v.weekly_notes.ideas.map((x: any) => String(x))
          : d.weekly_notes.ideas,
        quotes: Array.isArray(v.weekly_notes?.quotes)
          ? v.weekly_notes.quotes.map((x: any) => String(x))
          : d.weekly_notes.quotes,
        feelings: Array.isArray(v.weekly_notes?.feelings)
          ? v.weekly_notes.feelings.map((x: any) => String(x))
          : d.weekly_notes.feelings,
      },
      long_term_metrics: {
        sleep_avg_hours: Number(v.long_term_metrics?.sleep_avg_hours ?? d.long_term_metrics.sleep_avg_hours),
        workouts: {
          gym: Number(v.long_term_metrics?.workouts?.gym ?? d.long_term_metrics.workouts.gym),
          run: Number(v.long_term_metrics?.workouts?.run ?? d.long_term_metrics.workouts.run),
          climb: Number(v.long_term_metrics?.workouts?.climb ?? d.long_term_metrics.workouts.climb),
        },
        job_activity: {
          portfolio: String(v.long_term_metrics?.job_activity?.portfolio ?? d.long_term_metrics.job_activity.portfolio),
          interviews: Number(v.long_term_metrics?.job_activity?.interviews ?? d.long_term_metrics.job_activity.interviews),
        },
        reading_talk: Number(v.long_term_metrics?.reading_talk ?? d.long_term_metrics.reading_talk),
      },
      qa: Array.isArray(v.qa)
        ? v.qa.map((x: any) => ({ q: String(x.q), a: String(x.a) }))
        : d.qa,
      quote: {
        text: String(v.quote?.text || d.quote.text),
        author: String(v.quote?.author || d.quote.author),
      },
      support: {
        walking_friend: String(v.support?.walking_friend || d.support.walking_friend),
        supportive_colleague: String(v.support?.supportive_colleague || d.support.supportive_colleague),
        growth_mentor: String(v.support?.growth_mentor || d.support.growth_mentor),
      },
      declaration: String(v.declaration || d.declaration),
    };
  } catch {
    return d;
  }
}

export async function analyze(rawText: string): Promise<AnalyzeResult> {
  console.log("🔍 분석 시작:", { 
    textLength: rawText.length, 
    hasApiKey: !!OPENAI_API_KEY,
    apiKeyPrefix: OPENAI_API_KEY ? OPENAI_API_KEY.substring(0, 10) + "..." : "없음",
    model: OPENAI_MODEL,
    nodeEnv: process.env.NODE_ENV
  });
  
  const narrativePrompt = readPrompt("narrative.prompt.md");
  const analysisPrompt = readPrompt("analysis.prompt.md");

  if (!narrativePrompt || !analysisPrompt) {
    console.log("❌ 프롬프트 파일을 읽을 수 없음");
    return { 
      narrative: DEFAULTS.narrative(), 
      analysis: DEFAULTS.analysis() 
    };
  }

  // 1) Narrative call
  console.log("📝 서술형 분석 시작");
  const narJson = await callOpenAI(narrativePrompt, rawText);
  if (!narJson) {
    console.log("❌ 서술형 분석 실패 - 기본값 사용");
  }
  const narrative = ensureNarrativeShape(narJson);

  // 2) Analysis call
  console.log("📊 대시보드 분석 시작");
  const anaJson = await callOpenAI(analysisPrompt, rawText);
  if (!anaJson) {
    console.log("❌ 대시보드 분석 실패 - 기본값 사용");
  }
  const analysis = ensureAnalysisShape(anaJson);

  console.log("✅ 분석 완료");
  return { narrative, analysis } as AnalyzeResult;
}


