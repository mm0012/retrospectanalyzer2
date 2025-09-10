import type { AnalyzeResult, NarrativePayload, AnalysisPayload } from "@/lib/types";
import fs from "node:fs";
import path from "node:path";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-5-2025-08-07";

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
          "이번 주 평일 평균 수면 시간은 약 5시간. 지난주보다 조금 나아졌고, 6시간 잔 날도 두 번 있었다. 점심 낮잠 30분 제한이 어느 정도 효과가 있었다. 앞으로 낮잠을 줄이고 점심시간을 더 효과적으로 활용해 컨디션을 관리하자.",
        improvements: ["밤 최소 6시간 확보", "낮잠 30분 제한 유지", "점심시간 효율적 활용"],
      },

      {
        title: "🏃 운동과 몸",
        body:
          "헬스 2회, 러닝 1회, 클라이밍 1회로 꾸준한 운동을 이어갔다. 러닝 5.5km 달성을 통해 체력 향상을 체감했다. 클라이밍에서는 전완근만 혹사되는 느낌이라 기술을 더 익힐 필요가 있다.",
        improvements: ["러닝 6km 도전", "클라이밍 기술 향상", "웨이트 주 2회 이상 유지"],
      },
      {
        title: "📖 독서와 대화",
        body:
          "트레바리에서 카피라이팅 기술서를 다뤘다. '나를 포장하는 일'에 대한 거부감이 공감을 얻었고, '빈 수레가 요란하다'는 피드백이 의외의 위로가 되었다. 보기 좋게 포장하는 용기의 필요성을 깨달았다.",
        improvements: ["트레바리 피드백을 포트폴리오에 적용", "모임에서 실시간 메모 습관화", "자신감 있는 자기 표현 연습"],
      },
    ],
  }),
  analysis: (): AnalysisPayload => ({
    summary_card: {
      character: "꾸준히 성장하는 연습생",
      one_liner: "수면, 운동, 독서를 통해 '자신감'과 '포장'의 균형을 배우다",
    },
    tags: ["수면 관리", "운동 꾸준함", "자기 표현", "독서와 대화"],
    emotion_tags: ["#긴장", "#자극", "#성취감", "#위로", "#성장"],
    hidden_theme:
      "자신을 낮게 평가하는 습관과, 그럼에도 성장하려는 의지 사이의 균형을 찾는 여정",
    life_scores: { work: 7, health: 8, relationships: 7.5, sleep: 5, emotions: 6 },
    todos: [
      "수면 시간 6시간 이상 확보하고 낮잠 30분 제한 유지",
      "자기 표현을 자신감 있게 하는 연습",
      "러닝 6km 도전하고 헬스 주 2회 이상 유지",
      "트레바리에서 실시간 메모 습관 들이기",
    ],
    insights: {
      patterns: ["자신을 낮게 평가하는 습관", "꾸준함을 통한 성장", "피드백을 통한 자기 이해"],
      simulations: ["자신감 있는 자기 표현 → 더 강한 인상", "체계적 수면 관리 → 컨디션 향상"],
      self_explainer:
        "겸손함과 자신감 사이의 균형을 찾고 있으며, 꾸준함을 통해 점진적 성장을 추구하는 성향",
    },
    coaching: {
      ST: "수면 시간을 23:30 취침으로 고정하고, 포트폴리오 강점을 구체적으로 정리하세요. 운동은 현재 패턴을 유지하면서 점진적으로 강도를 높이세요.",
      NF: "이미 꾸준한 운동과 자기 성찰을 통해 많은 성장을 하고 있어요. 이제는 자신의 가치를 더 믿고 표현해도 괜찮습니다.",
    },
    weekly_notes: {
      moments: ["러닝 5.5km 완주", "트레바리에서 공감받은 경험", "수면 패턴 개선"],
      lessons: ["겸손함도 과하면 기회를 놓칠 수 있다", "꾸준함이 체력과 자신감을 만든다"],
      ideas: ["포트폴리오를 '겸손+자신감' 균형으로 재구성", "수면 패턴을 데이터로 추적"],
      quotes: ["빈 수레가 요란하다는 말이 위로가 되었다", "선물은 예쁘게 포장하는데 왜 나는 창피할까?"],
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
    quote: { text: "성공은 준비와 기회의 만남이다.", author: "세네카" },
    support:
      "이번 주는 정말 많은 시도를 했네요. 수면 관리, 면접 준비, 운동까지 꾸준히 해내고 있어요. 이제는 자신의 가치를 더 믿어도 됩니다!",
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
        error: errorText 
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
        emotions: Number(v.life_scores?.emotions ?? d.life_scores.emotions),
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
      support: String(v.support || d.support),
      declaration: String(v.declaration || d.declaration),
    };
  } catch {
    return d;
  }
}

export async function analyze(rawText: string): Promise<AnalyzeResult> {
  const narrativePrompt = readPrompt("narrative.prompt.md");
  const analysisPrompt = readPrompt("analysis.prompt.md");

  // 1) Narrative call
  const narJson = await callOpenAI(narrativePrompt, rawText);
  const narrative = ensureNarrativeShape(narJson);

  // 2) Analysis call
  const anaJson = await callOpenAI(analysisPrompt, rawText);
  const analysis = ensureAnalysisShape(anaJson);

  return { narrative, analysis } as AnalyzeResult;
}


