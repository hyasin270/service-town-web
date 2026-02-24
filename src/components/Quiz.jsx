import { useState } from 'react';

export default function Quiz({ quiz }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const q = quiz.questions[currentQ];
  const answered = answers[currentQ] !== undefined;
  const isCorrect = answers[currentQ] === q.correct;
  const allDone = Object.keys(answers).length === quiz.questions.length;
  const score = Object.entries(answers).filter(([i, a]) => a === quiz.questions[i].correct).length;

  function handleAnswer(optionIndex) {
    if (answered) return;
    setAnswers({ ...answers, [currentQ]: optionIndex });
    setShowResult(true);
  }

  function next() {
    setShowResult(false);
    if (currentQ < quiz.questions.length - 1) {
      setCurrentQ(currentQ + 1);
    }
  }

  function reset() {
    setCurrentQ(0);
    setAnswers({});
    setShowResult(false);
  }

  return (
    <div className="fade-in mt-8 p-6 bg-navy/[0.03] rounded-xl border-2 border-gold/30">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-display text-xl text-gold tracking-wide">
          {quiz.title}
        </h4>
        <span className="text-xs text-navy/40 font-medium">
          {currentQ + 1} / {quiz.questions.length}
        </span>
      </div>
      <p className="text-sm text-navy/60 mb-5">{quiz.description}</p>

      {/* Scenario */}
      <div className="bg-white p-4 rounded-lg border border-dusty/20 mb-4">
        <p className="text-sm font-medium text-navy/50 mb-1">Scenario:</p>
        <p className="text-navy/85">{q.scenario}</p>
      </div>

      {/* Options */}
      <div className="space-y-2 mb-4">
        {q.options.map((option, i) => {
          let cls = 'quiz-option';
          if (answered) {
            if (i === q.correct) cls += ' correct';
            else if (i === answers[currentQ] && i !== q.correct) cls += ' incorrect';
          }
          return (
            <button
              key={i}
              className={cls}
              onClick={() => handleAnswer(i)}
              disabled={answered}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {showResult && (
        <div className={`p-4 rounded-lg mb-4 ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <p className="font-semibold text-sm mb-1">
            {isCorrect ? 'Correct!' : 'Not quite.'}
          </p>
          <p className="text-sm text-navy/70">{q.explanation}</p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center gap-3">
        {answered && currentQ < quiz.questions.length - 1 && (
          <button
            onClick={next}
            className="px-5 py-2 bg-gold text-navy text-sm font-semibold rounded-lg hover:bg-gold/90 transition-all"
          >
            Next Question →
          </button>
        )}
        {allDone && (
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-navy">
              Score: {score}/{quiz.questions.length}
            </span>
            <button
              onClick={reset}
              className="text-sm text-navy/50 underline hover:text-navy"
            >
              Try again
            </button>
          </div>
        )}
      </div>

      {/* Progress dots */}
      <div className="flex gap-1.5 mt-4">
        {quiz.questions.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all ${
              i === currentQ ? 'bg-gold scale-125' :
              answers[i] !== undefined ? (answers[i] === quiz.questions[i].correct ? 'bg-green-400' : 'bg-red-400') :
              'bg-dusty/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
