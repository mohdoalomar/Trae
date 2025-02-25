import { useState, useEffect } from 'react'
import Card from './components/Card'
import './App.css'

function App() {
  const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [matchedPairs, setMatchedPairs] = useState([])
  const [moves, setMoves] = useState(0)

  const initializeGame = () => {
    const images = [
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg'
    ]

    const cardPairs = [...images, ...images].map((image, index) => ({
      id: index,
      image,
      isFlipped: false,
      isMatched: false
    }))

    const shuffledCards = cardPairs.sort(() => Math.random() - 0.5)
    setCards(shuffledCards)
    setFlippedCards([])
    setMatchedPairs([])
    setMoves(0)
  }

  useEffect(() => {
    initializeGame()
  }, [])

  const handleCardClick = (id) => {
    if (flippedCards.length === 2) return

    const clickedCard = cards.find(card => card.id === id)
    if (clickedCard.isFlipped || clickedCard.isMatched) return

    const updatedCards = cards.map(card =>
      card.id === id ? { ...card, isFlipped: true } : card
    )
    setCards(updatedCards)
    setFlippedCards([...flippedCards, clickedCard])

    if (flippedCards.length === 1) {
      setMoves(moves + 1)
      setTimeout(() => {
        const [firstCard] = flippedCards
        if (firstCard.image === clickedCard.image) {
          setMatchedPairs([...matchedPairs, firstCard.image])
          setCards(updatedCards.map(card =>
            card.image === firstCard.image ? { ...card, isMatched: true } : card
          ))
        } else {
          setCards(updatedCards.map(card =>
            card.id === firstCard.id || card.id === clickedCard.id
              ? { ...card, isFlipped: false }
              : card
          ))
        }
        setFlippedCards([])
      }, 1000)
    }
  }

  return (
    <div className="min-h-screen h-screen bg-dark-primary flex flex-col items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">Memory Game</h1>
          <div className="flex items-center gap-4 sm:gap-8">
            <p className="text-lg sm:text-xl text-white">Moves: {moves}</p>
            <button
              onClick={initializeGame}
              className="px-4 py-2 bg-dark-accent hover:bg-dark-secondary text-white rounded-lg
                transition-colors duration-300 font-semibold text-sm sm:text-base"
            >
              New Game
            </button>
          </div>
        </div>
      </div>
      <div className="w-full max-w-4xl grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 gap-4 sm:gap-6 justify-items-center">
        {cards.map(card => (
          <Card
            key={card.id}
            {...card}
            onClick={handleCardClick}
          />
        ))}
      </div>
      {matchedPairs.length === 8 && (
        <div className="text-xl sm:text-2xl text-white text-center mt-8">
          Congratulations! You've won in {moves} moves!
        </div>
      )}
    </div>
  )
}

export default App
