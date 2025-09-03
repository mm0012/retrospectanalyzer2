import fs from 'node:fs';
import path from 'node:path';
import { analyze } from '@/lib/analyze';
import type { AnalyzeResponse } from '@/lib/types';

const fx = (p: string) => fs.readFileSync(path.join(__dirname, '..', '__fixtures__', p), 'utf8');

describe('analyze API', () => {
  it('retro1 구조 검증', async () => {
    const raw = fx('retro1.txt');
    const res: AnalyzeResponse = await analyze(raw);
    const narrative = JSON.parse(fx('retro1.narrative.json'));
    const analysis = JSON.parse(fx('retro1.analysis.json'));

    expect(Array.isArray(res.narrative.sections)).toBe(true);
    expect(res.analysis.summary_card.character).toBeTruthy();
    expect(res.analysis.life_scores.work).toBeGreaterThanOrEqual(0);

    expect(res.analysis.qa.length).toBeGreaterThan(0);
    expect(res.analysis.declaration).toMatch(/"?.+"?/);

    // Optional loose comparison to ensure shape compatibility
    const resKeys = Object.keys(res.analysis);
    const fxKeys = Object.keys(analysis);
    // 키 존재 + 순서 최소 보장 (앞 5개 비교)
    expect(resKeys.slice(0, 5)).toEqual(fxKeys.slice(0, 5));

    // 타입 검증: life_scores
    expect(typeof res.analysis.life_scores.work).toBe('number');
    expect(typeof res.analysis.life_scores.health).toBe('number');
    expect(typeof res.analysis.life_scores.relationships).toBe('number');
    expect(typeof res.analysis.life_scores.sleep).toBe('number');

    // 배열 타입 검증
    expect(Array.isArray(res.analysis.tags)).toBe(true);
    expect(Array.isArray(res.analysis.todos)).toBe(true);
    expect(Array.isArray(res.narrative.sections)).toBe(true);
  });
});


