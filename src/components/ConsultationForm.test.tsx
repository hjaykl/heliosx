import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import ConsultationForm from './ConsultationForm'
import type { Question } from './../types'

const mockQuestions: Question[] = [
  { id: 'q1', text: 'First Question' },
  { id: 'q2', text: 'Second Question' },
  { id: 'q3', text: 'Third Question' }
]

describe('ConsultationForm', () => {
  it('renders the first question on initial load', () => {
    const mockSubmit = vi.fn()
    render(<ConsultationForm questions={mockQuestions} onSubmit={mockSubmit} />)

    expect(screen.getByText('First Question')).toBeInTheDocument()
    expect(screen.getByText('Question 1 of 3')).toBeInTheDocument()
  })

  it('shows progress bar with correct value', () => {
    const mockSubmit = vi.fn()
    render(<ConsultationForm questions={mockQuestions} onSubmit={mockSubmit} />)

    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toHaveAttribute('value', '1')
    expect(progressBar).toHaveAttribute('max', '3')
  })

  it('advances to next question when Yes is clicked', async () => {
    const mockSubmit = vi.fn()
    const user = userEvent.setup()
    render(<ConsultationForm questions={mockQuestions} onSubmit={mockSubmit} />)

    await user.click(screen.getByText('Yes'))

    expect(screen.getByText('Second Question')).toBeInTheDocument()
    expect(screen.getByText('Question 2 of 3')).toBeInTheDocument()
  })

  it('advances to next question when No is clicked', async () => {
    const mockSubmit = vi.fn()
    const user = userEvent.setup()
    render(<ConsultationForm questions={mockQuestions} onSubmit={mockSubmit} />)

    await user.click(screen.getByText('No'))

    expect(screen.getByText('Second Question')).toBeInTheDocument()
    expect(screen.getByText('Question 2 of 3')).toBeInTheDocument()
  })

  it('calls onSubmit and shows thank you message after last question', async () => {
    const mockSubmit = vi.fn()
    const user = userEvent.setup()
    render(<ConsultationForm questions={mockQuestions} onSubmit={mockSubmit} />)

    // Answer all questions
    await user.click(screen.getByText('Yes')) // Question 1
    await user.click(screen.getByText('No'))  // Question 2
    await user.click(screen.getByText('Yes')) // Question 3 (last)

    expect(mockSubmit).toHaveBeenCalledWith({
      q1: true,
      q2: false,
      q3: true
    })

    expect(screen.getByText('Thank You!')).toBeInTheDocument()
    expect(screen.getByText(/Your consultation has been submitted successfully/)).toBeInTheDocument()
  })

  it('renders both Yes and No buttons', () => {
    const mockSubmit = vi.fn()
    render(<ConsultationForm questions={mockQuestions} onSubmit={mockSubmit} />)

    expect(screen.getByText('Yes')).toBeInTheDocument()
    expect(screen.getByText('No')).toBeInTheDocument()
  })

  it('updates progress correctly through multiple questions', async () => {
    const mockSubmit = vi.fn()
    const user = userEvent.setup()
    render(<ConsultationForm questions={mockQuestions} onSubmit={mockSubmit} />)

    // First question
    expect(screen.getByText('Question 1 of 3')).toBeInTheDocument()

    await user.click(screen.getByText('Yes'))

    // Second question
    expect(screen.getByText('Question 2 of 3')).toBeInTheDocument()
    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toHaveAttribute('value', '2')

    await user.click(screen.getByText('No'))

    // Third question
    expect(screen.getByText('Question 3 of 3')).toBeInTheDocument()
    expect(progressBar).toHaveAttribute('value', '3')
  })
})
