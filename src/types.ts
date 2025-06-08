export interface Question {
  id: string;
  text: string;
}

export interface ConsultationData {
  [questionId: string]: boolean;
}