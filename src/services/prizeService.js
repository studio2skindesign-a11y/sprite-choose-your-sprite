const STORAGE_KEY    = 'spriteEventData'
const BOTTLE_INTERVAL = 66
const TOTAL_BOTTLES   = 30
const TOTAL_BOWFELL   = 3

export const EVENT_DAY_LABELS = {
  'day-1': 'Τετ 07/05/2026',
  'day-2': 'Πεμ 08/05/2026',
  'day-3': 'Παρ 09/05/2026',
}

function getAllData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const d = JSON.parse(stored)
      if (d.bowfellGiven  === undefined) d.bowfellGiven  = 0
      if (d.currentDay    === undefined) d.currentDay    = 1
      return d
    }
  } catch {}
  return { totalGames: 0, bottlesGiven: 0, stressBallsGiven: 0, bowfellGiven: 0, currentDay: 1, days: {} }
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function determinePrize() {
  const data   = getAllData()
  const dayKey = `day-${data.currentDay}`

  data.totalGames++

  if (!data.days[dayKey]) {
    data.days[dayKey] = { day: data.currentDay, totalGames: 0, bottlesGiven: 0, stressBallsGiven: 0, bowfellGiven: 0 }
  }
  if (data.days[dayKey].bowfellGiven === undefined) data.days[dayKey].bowfellGiven = 0
  data.days[dayKey].totalGames++

  const isHundredthPlay = data.days[dayKey].totalGames === 100
  const todayHasBowfell = data.days[dayKey].bowfellGiven > 0
  const bowfellLeft     = data.bowfellGiven < TOTAL_BOWFELL

  let prize
  if (isHundredthPlay && bowfellLeft && !todayHasBowfell) {
    prize = 'bowfell'
    data.bowfellGiven++
    data.days[dayKey].bowfellGiven++
  } else {
    const isBottleTurn = data.totalGames % BOTTLE_INTERVAL === 0
    const bottlesLeft  = data.bottlesGiven < TOTAL_BOTTLES

    if (isBottleTurn && bottlesLeft) {
      prize = 'bottle'
      data.bottlesGiven++
      data.days[dayKey].bottlesGiven++
    } else {
      prize = 'stressBall'
      data.stressBallsGiven++
      data.days[dayKey].stressBallsGiven++
    }
  }

  saveData(data)
  return prize
}

export function advanceDay() {
  const data = getAllData()
  if (data.currentDay < 3) {
    data.currentDay++
    saveData(data)
  }
  return data.currentDay
}

export function getDashboardData() {
  const data = getAllData()
  const days = [1, 2, 3]
    .map(n => data.days[`day-${n}`] || { day: n, totalGames: 0, bottlesGiven: 0, stressBallsGiven: 0, bowfellGiven: 0 })
  const playsUntilNextBottle = BOTTLE_INTERVAL - (data.totalGames % BOTTLE_INTERVAL)
  return {
    totalGames:           data.totalGames,
    bottlesGiven:         data.bottlesGiven,
    stressBallsGiven:     data.stressBallsGiven,
    bowfellGiven:         data.bowfellGiven,
    currentDay:           data.currentDay,
    playsUntilNextBottle: data.bottlesGiven >= TOTAL_BOTTLES ? null : playsUntilNextBottle,
    days,
  }
}

export function resetAllData() {
  localStorage.removeItem(STORAGE_KEY)
}

export const PRIZES = {
  bottle: {
    image: '/assets/GIFTS/SPRITE_BOTTLE.png',
    name: 'Sprite Bottle',
  },
  stressBall: {
    image: '/assets/GIFTS/stress-ball.png',
    name: 'Antistress Ball',
  },
  bowfell: {
    image: '/assets/GIFTS/Majority_Bowfell_Plus.png',
    name: 'Majority Bowfell Plus',
  },
}
