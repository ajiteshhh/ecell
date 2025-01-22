import { useState, useRef, useEffect } from 'react';
import squidworkers from '../assets/squid-worker.jpg';
import squidworkerhighlighted from '../assets/me.jpg';
import squidCardFront from '../assets/front card.png';
import squidCardBack from '../assets/back card.png';
import { Link } from "react-router-dom";

const HomePage = () => {
    const [found, setFound] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [gameTime, setGameTime] = useState(30);
    const [showInstructions, setShowInstructions] = useState(true);
    const [showCard, setShowCard] = useState(false);
    const [showName, setShowName] = useState(false);
    const [targetPosition, setTargetPosition] = useState({ x: 65, y: 50 });
    const imageRef = useRef(null);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (!showInstructions && gameTime > 0) {
            intervalRef.current = setInterval(() => {
                setGameTime((prev) => prev - 1);
            }, 1000);
        }

        if (gameTime === 0) {
            setFound(true);
            clearInterval(intervalRef.current);
            setTimeout(() => setShowCard(true), 1000);
        }

        return () => clearInterval(intervalRef.current);
    }, [showInstructions, gameTime]);

    const handleImageClick = (e) => {
        if (found || showInstructions) return;

        const rect = imageRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        setAttempts(prev => prev + 1);

        if (
            Math.abs(x - targetPosition.x) < 5 &&
            Math.abs(y - targetPosition.y) < 5
        ) {
            setFound(true);
            clearInterval(intervalRef.current);
            setTimeout(() => setShowCard(true), 1000);
        }
    };

    const handleCardClick = () => {
        setShowName(true);
    };

    return (
        <div className="min-h-screen bg-gray-900 relative overflow-hidden">
            <img
                ref={imageRef}
                src={found ? squidworkerhighlighted : squidworkers}
                alt="Squid Game Workers"
                className="w-full h-full object-cover absolute inset-0 cursor-crosshair"
                onClick={handleImageClick}
            />

            <div className="absolute top-4 right-4 bg-black bg-opacity-75 p-4 rounded-lg text-white">
                <div className="text-xl">
                    <span className="text-red-500">Attempts:</span> {attempts}
                </div>
                <div className="text-xl">
                    <span className="text-red-500">Time:</span> {gameTime}s
                </div>
            </div>
            <div className="absolute top-4 left-4 bg-black bg-opacity-75 p-4 rounded-3xl text-white">
                <Link className="hover:text-blue-600" to="/grid">Go to Grid</Link>
            </div>

            {showInstructions && (
                <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4">
                    <div className="bg-gray-800 p-8 rounded-lg max-w-md text-white text-center">
                        <h2 className="text-2xl font-bold mb-4 text-red-600">Instructions</h2>
                        <ul className="list-disc list-inside space-y-2 text-left">
                            <li>Find the hidden player among the Squid Game workers.</li>
                            <li>Click anywhere on the image to make your guess.</li>
                            <li>Hidden player will be revealed at the end of the time.</li>
                        </ul>
                        Note: This game works best on bigger screens.
                        <button
                            onClick={() => setShowInstructions(false)}
                            className="mt-6 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Start Game
                        </button>
                    </div>
                </div>
            )}

            {showCard && (
                <div
                    className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-72 h-96 cursor-pointer transition-all duration-1000 hover:scale-105 hover:shadow-2xl"
                    onClick={handleCardClick}
                >
                    {showName ? (
                        <img
                            src={squidCardBack}
                            alt="Squid Game Card"
                            className="w-full h-full object-contain rounded-lg shadow-2xl"
                            onClick={() => {window.location.href = 'https://instagram.com'}}
                        />
                    ) : (
                        <img
                            src={squidCardFront}
                            alt="Squid Game Card"
                            className="w-full h-full object-contain rounded-lg shadow-2xl"
                        />
                    )}
                </div>
            )}

            {found && !showCard && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
                    <p className="text-4xl font-bold text-green-500 animate-pulse">
                        ELIMINATION SUCCESS!
                    </p>
                </div>
            )}
        </div>
    );
};

export default HomePage;