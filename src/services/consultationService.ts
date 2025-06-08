import type { ConsultationData } from '../types';

export const submitConsultationData = (data: ConsultationData): void => {
  console.log('Consultation Data Submitted:', data);
  console.log('Questions answered:');
  Object.entries(data).forEach(([questionId, answer]) => {
    console.log(`- ${questionId}: ${answer ? 'Yes' : 'No'}`);
  });
};