interface LongTermMetricsProps {
  long_term_metrics?: {
    sleep_avg_hours?: number;
    workouts?: {
      gym?: number;
      run?: number;
      climb?: number;
    };
    job_activity?: {
      portfolio?: string;
      interviews?: number;
    };
    reading_talk?: number;
  };
}

export default function LongTermMetrics({ long_term_metrics }: LongTermMetricsProps) {
  if (!long_term_metrics) {
    return (
      <section className="rounded-lg border bg-white p-5 shadow-sm">
        <h3 className="font-semibold mb-3">장기 추적 지표</h3>
        <div className="text-gray-500 text-sm">장기 추적 지표 데이터를 불러오는 중...</div>
      </section>
    );
  }

  return (
    <section className="rounded-lg border bg-white p-5 shadow-sm">
      <h3 className="font-semibold mb-3">장기 추적 지표</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {long_term_metrics.sleep_avg_hours !== undefined && (
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{long_term_metrics.sleep_avg_hours}h</div>
            <div className="text-xs text-gray-600">평균 수면</div>
          </div>
        )}
        {long_term_metrics.workouts && (
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {Object.values(long_term_metrics.workouts).reduce((sum, val) => sum + (val || 0), 0)}
            </div>
            <div className="text-xs text-gray-600">운동 횟수</div>
          </div>
        )}
        {long_term_metrics.job_activity?.interviews !== undefined && (
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{long_term_metrics.job_activity.interviews}</div>
            <div className="text-xs text-gray-600">면접 횟수</div>
          </div>
        )}
        {long_term_metrics.reading_talk !== undefined && (
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{long_term_metrics.reading_talk}</div>
            <div className="text-xs text-gray-600">독서/대화</div>
          </div>
        )}
      </div>
    </section>
  );
}
