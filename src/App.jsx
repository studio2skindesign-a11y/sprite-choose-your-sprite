import { useState } from 'react'
import HomeScreen from './screens/HomeScreen'
import QuizScreen from './screens/QuizScreen'
import WinScreen from './screens/WinScreen'
import { determinePrize } from './services/prizeService'

function getPreview() {
  const p = new URLSearchParams(window.location.search).get('preview')
  if (p === 'win-bottle')  return { screen: 'win',      prize: 'bottle' }
  if (p === 'win-ball')    return { screen: 'win',      prize: 'stressBall' }
  if (p === 'quiz')        return { screen: 'quiz',     prize: null }
  return null
}

const preview = getPreview()

export default function App() {
  const [screen, setScreen]         = useState(preview?.screen ?? 'home')
  const [selectedCan, setSelectedCan] = useState(null)
  const [currentPrize, setCurrentPrize] = useState(preview?.prize ?? null)

  const goToQuiz = (can) => {
    setSelectedCan(can)
    setScreen('quiz')
  }

  const goToWin = () => {
    const prize = determinePrize()
    setCurrentPrize(prize)
    setScreen('win')
  }

  const goHome = () => {
    setSelectedCan(null)
    setCurrentPrize(null)
    setScreen('home')
  }

  if (screen === 'quiz') return <QuizScreen selectedCan={selectedCan} onWin={goToWin} />
  if (screen === 'win')  return <WinScreen prize={currentPrize} onHome={goHome} />
  return <HomeScreen onSelectCan={goToQuiz} />
}
