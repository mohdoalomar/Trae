import React from 'react';

const Card = ({ id, image, isFlipped, isMatched, onClick }) => {
  return (
    <div
      className={`relative w-16 h-24 sm:w-20 sm:h-28 md:w-24 md:h-32 lg:w-28 lg:h-36 cursor-pointer transform-gpu transition-transform ${isMatched ? 'opacity-50 cursor-default' : ''}`}
      onClick={() => !isMatched && onClick(id)}
      style={{ perspective: '1000px' }}
    >
      <div 
        className={`w-full h-full transition-all duration-500 transform absolute
        ${isFlipped ? '[transform:rotateY(180deg)]' : '[transform:rotateY(0deg)]'}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front of card */}
        <div 
          className={`absolute w-full h-full rounded-lg md:rounded-xl 
          bg-gradient-to-br from-dark-secondary via-dark-accent to-dark-secondary 
          shadow-xl border border-dark-accent/50 flex items-center justify-center
          transform transition-all duration-300 
          ${!isFlipped && !isMatched ? 'hover:scale-105 hover:border-white/30' : ''}`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(0deg)' }}
        >
          <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white/70 select-none">?</div>
        </div>
        
        {/* Back of card */}
        <div 
          className="absolute w-full h-full rounded-lg md:rounded-xl 
          bg-gradient-to-br from-white/20 to-white/5 backdrop-blur p-2 sm:p-3 md:p-4 lg:p-6
          shadow-2xl border border-white/30 flex items-center justify-center"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          {isFlipped && (
            <img
              src={image}
              alt="card"
              className="w-full h-full object-contain filter drop-shadow-xl transition-transform duration-300 hover:scale-110"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;