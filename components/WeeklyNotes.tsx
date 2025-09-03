interface WeeklyNotesProps {
  weekly_notes?: {
    moments: string[];
    lessons: string[];
    ideas: string[];
    quotes: string[];
    feelings: string[];
  };
}

export default function WeeklyNotes({ weekly_notes }: WeeklyNotesProps) {
  if (!weekly_notes) {
    return (
      <section className="rounded-lg border bg-white p-5 shadow-sm">
        <h3 className="font-semibold mb-3">주간 발굴 노트</h3>
        <div className="text-gray-500 text-sm">주간 노트 데이터를 불러오는 중...</div>
      </section>
    );
  }

  return (
    <section className="rounded-lg border bg-white p-5 shadow-sm">
      <h3 className="font-semibold mb-3">주간 발굴 노트</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium text-sm text-gray-600 mb-2">⭐ 모멘트</h4>
          <ul className="space-y-1">
            {weekly_notes.moments?.map((moment, idx) => (
              <li key={idx} className="text-sm text-gray-800">• {moment}</li>
            )) || <li className="text-gray-500 text-sm">데이터 없음</li>}
          </ul>
        </div>
        <div>
          <h4 className="font-medium text-sm text-gray-600 mb-2">📚 교훈</h4>
          <ul className="space-y-1">
            {weekly_notes.lessons?.map((lesson, idx) => (
              <li key={idx} className="text-sm text-gray-800">• {lesson}</li>
            )) || <li className="text-gray-500 text-sm">데이터 없음</li>}
          </ul>
        </div>
        <div>
          <h4 className="font-medium text-sm text-gray-600 mb-2">💡 아이디어</h4>
          <ul className="space-y-1">
            {weekly_notes.ideas?.map((idea, idx) => (
              <li key={idx} className="text-sm text-gray-800">• {idea}</li>
            )) || <li className="text-gray-500 text-sm">데이터 없음</li>}
          </ul>
        </div>
        <div>
          <h4 className="font-medium text-sm text-gray-600 mb-2">💬 문장</h4>
          <ul className="space-y-1">
            {weekly_notes.quotes?.map((quote, idx) => (
              <li key={idx} className="text-sm text-gray-800">• {quote}</li>
            )) || <li className="text-gray-500 text-sm">데이터 없음</li>}
          </ul>
        </div>
        <div className="md:col-span-2">
          <h4 className="font-medium text-sm text-gray-600 mb-2">❤️ 감정</h4>
          <ul className="space-y-1">
            {weekly_notes.feelings?.map((feeling, idx) => (
              <li key={idx} className="text-sm text-gray-800">• {feeling}</li>
            )) || <li className="text-gray-500 text-sm">데이터 없음</li>}
          </ul>
        </div>
      </div>
    </section>
  );
}
