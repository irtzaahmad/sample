export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ExplanationResponse {
  title: string;
  explanation: string;
  example: string;
  quiz: QuizQuestion[];
}
