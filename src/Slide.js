import React, { useState, useEffect } from 'react';
import './Slide.css';

const numbers = (() => {
    const nums = [];
    for (let i = 0; i < 2000; i++) {
        if (i % 199 === 0) {
            nums.push({ num: 0, color: 'Branco' });
        } else if (i % 2 === 0) {
            nums.push({ num: 1 + Math.floor(Math.random() * 7), color: 'Vermelho' });
        } else {
            nums.push({ num: 8 + Math.floor(Math.random() * 7), color: 'Preto' });
        }
    }
    return nums;
})();

const Slide = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [position, setPosition] = useState(0);
    const [velocity, setVelocity] = useState(300);
    const [selectedColor, setSelectedColor] = useState(null);
    const [betAmount, setBetAmount] = useState('');

    const startGame = () => {
        if (!selectedColor || !betAmount) {
            alert("Por favor, selecione uma cor e insira um valor de aposta.");
            return;
        }
        setPosition(0);
        setVelocity(300);
        setIsRunning(true);
    };

    useEffect(() => {
        let intervalId = null;
        if (isRunning) {
            intervalId = setInterval(() => {
                setPosition(prev => prev + velocity);
                if (velocity > 2) {
                    setVelocity(vel => vel * 0.99);
                } else {
                    clearInterval(intervalId);
                    setPosition(Math.round(position / 100) * 100);
                    setVelocity(0);
                    setIsRunning(false);

                    setTimeout(() => {
                        setPosition(0);
                    }, 10000);
                }
            }, 10);
        }
        return () => clearInterval(intervalId);
    }, [isRunning, position, velocity]);

    return (
        <div className="main-container">
            <div className="vertical-line"></div>
            <div className="horizontal-line"></div>
            <div className="controls-slide">
                <input type="text" placeholder="Quantia R$" value={betAmount} onChange={e => setBetAmount(e.target.value)} />
                <div className="color-selectors">
                    <button className="color-selector red" onClick={() => setSelectedColor('red')}>x2</button>
                    <button className="color-selector white" onClick={() => setSelectedColor('white')}>x14</button>
                    <button className="color-selector black" onClick={() => setSelectedColor('black')}>x2</button>
                </div>
                <button className="start-game-button" onClick={startGame}>Começar o jogo</button>
            </div>
            <div className="slide-container">
                <div className="indicator-line"></div>
                <div className="belt" style={{ transform: `translateX(-${position}px)` }}>
                    {numbers.map((item, i) => (
                        <div key={i} className={`number ${item.color}`}>{item.num}</div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Slide;
