// FindMeGame.jsx
import { useState, useRef, useEffect } from 'react';

const FindMeGame = () => {
    const [found, setFound] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [gameTime, setGameTime] = useState(0);
    const [targetPosition, setTargetPosition] = useState({ x: 65, y: 50 }); // Adjust these coordinates to your image
    const imageRef = useRef(null);
    const intervalRef = useRef(null);

    // Timer
    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setGameTime((prev) => prev + 1);
        }, 1000);
        return () => clearInterval(intervalRef.current);
    }, []);

    const handleImageClick = (e) => {
        if (found) return;

        const rect = imageRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        setAttempts(prev => prev + 1);

        // Check if click is within target area (adjust tolerance as needed)
        if (
            Math.abs(x - targetPosition.x) < 5 &&
            Math.abs(y - targetPosition.y) < 5
        ) {
            setFound(true);
            clearInterval(intervalRef.current);
            // Add explosion sound effect here
        }
    };

    const resetGame = () => {
        setFound(false);
        setAttempts(0);
        setGameTime(0);
        // Reset timer
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setGameTime((prev) => prev + 1);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl font-bold text-red-600 mb-8 font-squid">
                FIND THE PLAYER
            </h1>

            <div className="relative mb-8">
                <img
                    ref={imageRef}
                    src="/squid-workers.jpg" // Replace with your image path
                    alt="Squid Game Workers"
                    className="max-w-full h-auto border-4 border-red-600 rounded-lg cursor-crosshair"
                    onClick={handleImageClick}
                />

                {/* Target Indicator (for debugging) */}
                {/* <div
          className="absolute w-2 h-2 bg-yellow-400 rounded-full"
          style={{
            left: `${targetPosition.x}%`,
            top: `${targetPosition.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
        /> */}
            </div>

            <div className="text-white text-center space-y-4">
                <div className="text-2xl">
                    <span className="text-red-500">Attempts:</span> {attempts}
                </div>
                <div className="text-2xl">
                    <span className="text-red-500">Time:</span> {gameTime}s
                </div>

                {found && (
                    <div className="animate-pulse">
                        <p className="text-4xl text-green-500 font-bold mb-4">
                            ELIMINATION SUCCESS!
                        </p>
                        <button
                            onClick={resetGame}
                            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
                        >
                            PLAY AGAIN
                        </button>
                    </div>
                )}

                {!found && (
                    <p className="text-xl text-yellow-500">
                        Click on the player you think is hiding among the workers!
                    </p>
                )}
            </div>

            {/* Game Instructions */}
            <div className="mt-8 p-4 border-2 border-red-600 rounded-lg text-white max-w-md">
                <h2 className="text-xl font-bold mb-2 text-red-500">Rules:</h2>
                <ul className="list-disc list-inside space-y-2">
                    <li>Find the hidden player among the Squid Game workers</li>
                    <li>Click anywhere on the image to make your guess</li>
                    <li>Fewer attempts and faster time = better score</li>
                    <li>Wrong guesses will cost you points!</li>
                </ul>
            </div>
        </div>
    );
};

export default FindMeGame;