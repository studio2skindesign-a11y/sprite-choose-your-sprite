const STORAGE_KEY = 'spriteEventData'
const BOTTLE_INTERVAL = 66
const TOTAL_BOTTLES = 30

function getTodayKey() {
  return new Date().toISOString().split('T')[0]
}

function getAllData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch {}
  return { totalGames: 0, bottlesGiven: 0, stressBallsGiven: 0, days: {} }
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function determinePrize() {
  const data = getAllData()

  data.totalGames++

  // Keep per-day records for the dashboard only
  const todayKey = getTodayKey()
  if (!data.days[todayKey]) {
    data.days[todayKey] = { date: todayKey, totalGames: 0, bottlesGiven: 0, stressBallsGiven: 0 }
  }
  data.days[todayKey].totalGames++

  const isBottleTurn    = data.totalGames % BOTTLE_INTERVAL === 0
  const bottlesLeft     = data.bottlesGiven < TOTAL_BOTTLES

  let prize
  if (isBottleTurn && bottlesLeft) {
    prize = 'bottle'
    data.bottlesGiven++
    data.days[todayKey].bottlesGiven++
  } else {
    prize = 'stressBall'
    data.stressBallsGiven++
    data.days[todayKey].stressBallsGiven++
  }

  saveData(data)
  return prize
}

export function getDashboardData() {
  const data = getAllData()
  const days = Object.values(data.days).sort((a, b) => a.date.localeCompare(b.date))
  const playsUntilNextBottle = BOTTLE_INTERVAL - (data.totalGames % BOTTLE_INTERVAL)
  return {
    totalGames: data.totalGames,
    bottlesGiven: data.bottlesGiven,
    stressBallsGiven: data.stressBallsGiven,
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
}
