import { useState } from 'react';
import type { ConsultationData, Question } from '../types';

interface ConsultationFormProps {
  questions: Question[];
  onSubmit: (data: ConsultationData) => void;
}

const ConsultationForm = ({ questions, onSubmit }: ConsultationFormProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<ConsultationData>({});
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswer = (answer: boolean) => {
    const newAnswers = {
      ...answers,
      [currentQuestion.id]: answer
    };
    setAnswers(newAnswers);

    if (isLastQuestion) {
      onSubmit(newAnswers);
      setIsComplete(true);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  if (isComplete) {
    return (
      <article>
        <header>
          <h2>Thank You!</h2>
        </header>
        <p>Your consultation has been submitted successfully. A qualified Genovian doctor will review your answers within 24 hours.</p>
        <p>If approved, your prescription will be created and your monthly medication delivery will begin.</p>
      </article>
    );
  }

  return (
    <article>
      <header>
        <p><small>Question {currentQuestionIndex + 1} of {questions.length}</small></p>
        <progress value={currentQuestionIndex + 1} max={questions.length}></progress>
      </header>

      <h2>{currentQuestion.text}</h2>

      <footer>
        <div className="grid">
          <button onClick={() => handleAnswer(true)}>Yes</button>
          <button className="secondary" onClick={() => handleAnswer(false)}>No</button>
        </div>
      </footer>
    </article>
  );
};

export default ConsultationForm;
