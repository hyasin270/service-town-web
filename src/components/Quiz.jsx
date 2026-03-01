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
    <div className="fade-in mt-8 p-6 bg-surface-alt rounded-xl border border-gold/30">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-display text-xl text-gold">
          {quiz.title}
        </h4>
        <span className="text-xs text-text-muted font-medium font-ui">
          {currentQ + 1} / {quiz.questions.length}
        </span>
      </div>
      <p className="text-sm text-text-secondary mb-5">{quiz.description}</p>

      {/* Scenario */}
      <div className="bg-surface p-4 rounded-lg border border-border mb-4">
        <p className="text-sm font-medium text-text-muted mb-1 font-ui">Scenario:</p>
        <p className="text-text">{q.scenario}</p>
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
        <div className={`p-4 rounded-lg mb-4 ${isCorrect ? 'bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.3)]' : 'bg-[rgba(224,85,80,0.1)] border border-[rgba(224,85,80,0.3)]'}`}>
          <p className="font-semibold text-sm mb-1 text-text">
            {isCorrect ? 'Correct!' : 'Not quite.'}
          </p>
          <p className="text-sm text-text-secondary">{q.explanation}</p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center gap-3">
        {answered && currentQ < quiz.questions.length - 1 && (
          <button
            onClick={next}
            className="px-5 py-2 bg-gold text-navy text-sm font-semibold font-ui rounded-lg hover:bg-gold/90 transition-all"
          >
            Next Question →
          </button>
        )}
        {allDone && (
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-text font-ui">
              Score: {score}/{quiz.questions.length}
            </span>
            <button
              onClick={reset}
              className="text-sm text-text-muted underline hover:text-text font-ui"
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
              answers[i] !== undefined ? (answers[i] === quiz.questions[i].correct ? 'bg-[#4ade80]' : 'bg-red-team') :
              'bg-border'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
