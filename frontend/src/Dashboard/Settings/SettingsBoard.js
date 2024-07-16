import React, { useState, useEffect } from 'react';

const boardSize = 10;
const initialSnake = [{ x: 2, y: 2 }];
const initialApple = { x: 5, y: 5 };

const useInterval = (callback, delay) => {
  const savedCallback = React.useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

const SettingsBoard = () => {
  const [snake, setSnake] = useState(initialSnake);
  const [apple, setApple] = useState(initialApple);
  const [direction, setDirection] = useState('RIGHT');
  const [delay, setDelay] = useState(200);

  useInterval(() => gameLoop(), delay);

  const createApple = () =>
    setApple({
      x: Math.floor(Math.random() * boardSize),
      y: Math.floor(Math.random() * boardSize),
    });

  const moveSnake = ({ x, y }) => {
    const newSnake = [...snake];
    newSnake.unshift({ x, y });
    if (newSnake[0].x === apple.x && newSnake[0].y === apple.y) {
      createApple();
    } else {
      newSnake.pop();
    }
    setSnake(newSnake);
  };

  const changeDirection = (event) => {
    switch (event.keyCode) {
      case 37: // left
        setDirection('LEFT');
        break;
      case 38: // up
        setDirection('UP');
        break;
      case 39: // right
        setDirection('RIGHT');
        break;
      case 40: // down
        setDirection('DOWN');
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', changeDirection);
    return () => window.removeEventListener('keydown', changeDirection);
  }, []);

  const gameLoop = () => {
    const head = snake[0];
    let newHead;
    switch (direction) {
      case 'RIGHT':
        newHead = { x: head.x + 1, y: head.y };
        break;
      case 'LEFT':
        newHead = { x: head.x - 1, y: head.y };
        break;
      case 'DOWN':
        newHead = { x: head.x, y: head.y + 1 };
        break;
      case 'UP':
        newHead = { x: head.x, y: head.y - 1 };
        break;
    }
    moveSnake(newHead);
  };

  return (
    <div>
      <h2>We don't have anything for you to set so Play SNAKE!</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${boardSize}, 20px)`,
        }}
      >
        {Array.from({ length: boardSize * boardSize }).map((_, index) => {
          const x = index % boardSize;
          const y = Math.floor(index / boardSize);
          const isSnake = snake.some(
            (segment) => segment.x === x && segment.y === y
          );
          const isApple = apple.x === x && apple.y === y;

          return (
            <div
              key={index}
              style={{
                width: '20px',
                height: '20px',
                backgroundColor: isSnake ? 'green' : isApple ? 'red' : 'white',
                border: '1px solid black',
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SettingsBoard;
