import { createContext, useState, useEffect, useContext } from "react";

// Create Context
const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [quizs, setQuizs] = useState([]);
  const [question, setQuestion] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [marks, setMarks] = useState(0);

  const [score, setScore] = useState({ correct: 0, incorrect: 0, skipped: 0 });

  const [showStart, setShowStart] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // Load quiz.json only once on initial mount
  useEffect(() => {
    fetch('quiz.json')
      .then(res => res.json())
      .then(data => setQuizs(data));
  }, []);

  // Update question whenever index changes
  useEffect(() => {
    if (quizs.length > questionIndex) {
      setQuestion(quizs[questionIndex]);
    }
  }, [quizs, questionIndex]);

  const startQuiz = () => {
    setShowStart(false);
    setShowQuiz(true);
  };

  const checkAnswer = (event, selected) => {
    if (!selectedAnswer) {
      setCorrectAnswer(question.answer);
      setSelectedAnswer(selected);

      if (selected === question.answer) {
        event.target.classList.add('bg-success');
        setMarks(prev => prev + 5);
        setScore(prev => ({ ...prev, correct: prev.correct + 1 }));
      } else {
        event.target.classList.add('bg-danger');
        setScore(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));
      }
    }
  };

  const skipQuestion = () => {
    setScore(prev => ({ ...prev, skipped: prev.skipped + 1 }));
    nextQuestion();
  };

  const nextQuestion = () => {
    setCorrectAnswer('');
    setSelectedAnswer('');

    // Cleanup visual button states
    document.querySelector('button.bg-danger')?.classList.remove('bg-danger');
    document.querySelector('button.bg-success')?.classList.remove('bg-success');

    setQuestionIndex(prev => prev + 1);
  };

  const showTheResult = () => {
    setShowQuiz(false);
    setShowStart(false);
    setShowResult(true);
  };

  const startOver = () => {
    setCorrectAnswer('');
    setSelectedAnswer('');
    setQuestionIndex(0);
    setMarks(0);
    setScore({ correct: 0, incorrect: 0, skipped: 0 });
    setShowResult(false);
    setShowStart(false);
    setShowQuiz(true);

    // Cleanup visuals
    document.querySelector('button.bg-danger')?.classList.remove('bg-danger');
    document.querySelector('button.bg-success')?.classList.remove('bg-success');
  };

  // ✅ Replace Flashcards
  const replaceFlashcards = (newData) => {
    setQuizs(newData);
    setQuestionIndex(0);
  };

  // ✅ Merge Flashcards
  const mergeFlashcards = (newData) => {
    setQuizs(prev => [...prev, ...newData]);
  };

  return (
    <DataContext.Provider value={{
      startQuiz,
      showStart,
      showQuiz,
      question,
      quizs,
      checkAnswer,
      correctAnswer,
      selectedAnswer,
      questionIndex,
      nextQuestion,
      showTheResult,
      showResult,
      marks,
      startOver,
      skipQuestion,
      score,
      replaceFlashcards,
      mergeFlashcards
    }}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook for using context
export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};

export default DataContext;
