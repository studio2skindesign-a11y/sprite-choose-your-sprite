import { useState } from 'react'
import HomeScreen from './screens/HomeScreen'
import QuizScreen from './screens/QuizScreen'
import WinScreen from './screens/WinScreen'

export default function App() {
  const [screen, setScreen] = useState('home')
  const [selectedCan, setSelectedCan] = useState(null)

  const goToQuiz = (can) => {
    setSelectedCan(can)
    setScreen('quiz')
  }

  const goToWin = () => setScreen('win')
  const goHome = () => {
    setSelectedCan(null)
    setScreen('home')
  }

  if (screen === 'quiz') return <QuizScreen selectedCan={selectedCan} onWin={goToWin} />
  if (screen === 'win')  return <WinScreen onHome={goHome} />
  return <HomeScreen onSelectCan={goToQuiz} />
}
