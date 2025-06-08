import Header from './components/Header'
import Footer from './components/Footer'
import ConsultationForm from './components/ConsultationForm'
import { consultationQuestions } from './data/questions'
import { submitConsultationData } from './services/consultationService'
import './App.css'

function App() {
  return (
    <>
      <Header />
      <main className="container">
        <ConsultationForm 
          questions={consultationQuestions} 
          onSubmit={submitConsultationData}
        />
      </main>
      <Footer />
    </>
  )
}

export default App
