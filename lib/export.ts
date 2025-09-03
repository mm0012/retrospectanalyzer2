import type { AnalyzeResponse } from '@/lib/types';

function sanitizeFilename(name: string) {
  return name.replace(/[^a-zA-Z0-9가-힣-_\.\s]/g, '').trim() || 'report';
}

export function buildMarkdown(payload: AnalyzeResponse): string {
  const { narrative, analysis: a } = payload;
  const lines: string[] = [];
  lines.push(`# AI 회고 분석 리포트`);
  lines.push('');
  lines.push(`## 서술형`);
  narrative.sections.forEach((s) => {
    lines.push(`### ${s.title}`);
    lines.push('');
    lines.push(s.body);
    if (s.improvements?.length) {
      lines.push('');
      lines.push('#### 개선 포인트');
      s.improvements.forEach((it) => lines.push(`- ${it}`));
    }
    lines.push('');
  });

  lines.push('');
  lines.push(`## 분석`);
  // 1. summary card
  lines.push(`### 🎭 ${a.summary_card.character}`);
  lines.push(`> ${a.summary_card.one_liner}`);
  lines.push('');
  // 2. tags/emotions/hidden
  lines.push(`**태그**: ${a.tags.join(', ')}`);
  lines.push(`**감정**: ${a.emotion_tags.join(', ')}`);
  lines.push(`**숨겨진 주제**: ${a.hidden_theme}`);
  lines.push('');
  // 3. life scores
  lines.push(`### 삶의 영역 점수`);
  lines.push(`- 일: ${a.life_scores.work}`);
  lines.push(`- 건강: ${a.life_scores.health}`);
  lines.push(`- 관계: ${a.life_scores.relationships}`);
  lines.push(`- 수면: ${a.life_scores.sleep}`);
  lines.push('');
  // 4. todos
  lines.push(`### 개선 포인트 (To-Do)`);
  a.todos.forEach((t) => lines.push(`- [ ] ${t}`));
  lines.push('');
  // 5. insights
  lines.push(`### 인사이트`);
  lines.push(`- 패턴:`);
  a.insights.patterns.forEach((p) => lines.push(`  - ${p}`));
  lines.push(`- 가정 시뮬레이션:`);
  a.insights.simulations.forEach((s) => lines.push(`  - ${s}`));
  lines.push(`- 자기 설명: ${a.insights.self_explainer}`);
  lines.push('');
  // 6. coaching
  lines.push(`### 코칭 멘트`);
  lines.push(`- ST: ${a.coaching.ST}`);
  lines.push(`- NF: ${a.coaching.NF}`);
  lines.push('');
  // 7. weekly notes
  lines.push(`### 주간 발굴 노트`);
  lines.push(`- ⭐ 모멘트:`);
  a.weekly_notes.moments.forEach((m) => lines.push(`  - ${m}`));
  lines.push(`- 📚 교훈:`);
  a.weekly_notes.lessons.forEach((m) => lines.push(`  - ${m}`));
  lines.push(`- 💡 아이디어:`);
  a.weekly_notes.ideas.forEach((m) => lines.push(`  - ${m}`));
  lines.push(`- 💬 문장:`);
  a.weekly_notes.quotes.forEach((m) => lines.push(`  - ${m}`));
  lines.push(`- ❤️ 감정:`);
  a.weekly_notes.feelings.forEach((m) => lines.push(`  - ${m}`));
  lines.push('');
  // 8. long term metrics
  lines.push(`### 장기 추적 지표`);
  lines.push(`- 평균 수면: ${a.long_term_metrics.sleep_avg_hours}시간`);
  lines.push(
    `- 운동: 헬스 ${a.long_term_metrics.workouts.gym}, 러닝 ${a.long_term_metrics.workouts.run}, 클라이밍 ${a.long_term_metrics.workouts.climb}`
  );
  lines.push(
    `- 이직 활동: 포트폴리오 ${a.long_term_metrics.job_activity.portfolio}, 면접 ${a.long_term_metrics.job_activity.interviews}`
  );
  lines.push(`- 독서/대화 참여: ${a.long_term_metrics.reading_talk}`);
  lines.push('');
  // 9. QA
  lines.push(`### 1문 1답`);
  a.qa.forEach((qa) => {
    lines.push(`- Q: ${qa.q}`);
    lines.push(`  - A: ${qa.a}`);
  });
  lines.push('');
  // 10. quote
  lines.push(`> “${a.quote.text}” — ${a.quote.author}`);
  lines.push('');
  // 11. support + declaration
  lines.push(`**응원**: ${a.support}`);
  lines.push(`**한 줄 선언**: “${a.declaration}”`);
  lines.push('');
  return lines.join('\n');
}

export function buildNotionMarkdown(payload: AnalyzeResponse): string {
  // Notion-friendly: use HTML details/summary to create toggles on import
  const md = buildMarkdown(payload);
  // Simple approach: wrap major sections in details
  const sections = md.split('\n## ');
  if (sections.length <= 1) return md;
  const head = sections[0];
  const bodyWrapped = sections.slice(1).map((block) => {
    const nl = block.indexOf('\n');
    const title = block.substring(0, nl);
    const rest = block.substring(nl + 1);
    return `<details><summary>## ${title}</summary>\n\n${rest}\n\n</details>`;
  });
  return [head, ...bodyWrapped].join('\n\n');
}

export function downloadFile(filename: string, content: string, mime = 'text/plain;charset=utf-8') {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = sanitizeFilename(filename);
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function exportMarkdown(payload: AnalyzeResponse) {
  const md = buildMarkdown(payload);
  downloadFile(`retro-report.md`, md, 'text/markdown;charset=utf-8');
}

export function exportNotion(payload: AnalyzeResponse) {
  const md = buildNotionMarkdown(payload);
  downloadFile(`retro-report-notion.md`, md, 'text/markdown;charset=utf-8');
}

export function exportPdf(payload: AnalyzeResponse) {
  const md = buildMarkdown(payload);
  const html = `<!doctype html>
  <html lang="ko">
  <head>
    <meta charset="utf-8" />
    <title>AI 회고 분석 리포트</title>
    <style>
      @page { size: A4; margin: 16mm; }
      body { font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji; }
      h1,h2,h3,h4 { margin: 0 0 8px; }
      .container { white-space: pre-wrap; }
    </style>
  </head>
  <body>
    <div class="container">${md.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
    <script>window.print();</script>
  </body>
  </html>`;
  const w = window.open('', '_blank');
  if (!w) return;
  w.document.write(html);
  w.document.close();
}







