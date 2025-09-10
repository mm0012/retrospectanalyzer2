export interface NarrativeSection {
  title: string;
  body: string;
  improvements: string[];
}

export interface NarrativePayload {
  sections: NarrativeSection[];
}

export interface AnalysisPayload {
  summary_card: {
    character: string;
    one_liner: string;
  };
  tags: string[];
  emotion_tags: string[];
  hidden_theme: string;
  life_scores: {
    work: number;
    health: number;
    relationships: number;
    sleep: number;
    emotions?: number;
  };
  todos: string[];
  insights: {
    patterns: string[];
    simulations: string[];
    self_explainer: string;
  };
  coaching: {
    ST: string;
    NF: string;
  };
  weekly_notes: {
    moments: string[];
    lessons: string[];
    ideas: string[];
    quotes: string[];
    feelings: string[];
  };
  long_term_metrics: {
    sleep_avg_hours: number;
    workouts: { gym: number; run: number; climb: number };
    job_activity: { portfolio: string; interviews: number };
    reading_talk: number;
  };
  qa: { q: string; a: string }[];
  quote: { text: string; author: string };
  support: string;
  declaration: string;
}

export interface Payload {
  narrative: NarrativePayload;
  analysis: AnalysisPayload;
}

export interface AnalyzeResult {
  narrative: NarrativePayload;
  analysis: AnalysisPayload;
}

export interface AnalyzeResponse {
  narrative: NarrativePayload;
  analysis: AnalysisPayload;
}
