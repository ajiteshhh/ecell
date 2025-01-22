import { useState } from "react";
import Card from "../components/Card.jsx";
import logo from "../assets/ecell.jpg";
const GridPage = () => {
    const [squareColours, setSquareColours] = useState(Array(9).fill("blue"));
    const [sequence, setSequence] = useState([]);

    const handleClick = (index) => {
        if (squareColours[index] === "red") return;
        const newColours = [...squareColours];
        newColours[index] = "red";
        setSquareColours(newColours);
        setSequence(prev => [...prev, index]);
    };

    const handleLastSquareClick = () => {
        const newColours = [...squareColours];
        sequence.forEach((index, i) => {
            setTimeout(() => {
                newColours[index] = "blue";
                setSquareColours(newColours);
                setSequence(prev => [...prev, index]);
            }, i * 200);
        });
        setSequence([]);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-14 max-w-7xl mx-auto w-full">
            <div className="order-3 md:order-1 md:col-span-2 md:max-h-96 lg:col-span-1 aspect-square md:aspect-[2/1] lg:aspect-square">
                <Card className="h-full w-full shadow-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 overflow-hidden" />
            </div>

            <div className="order-2 aspect-square md:max-h-96">
                <Card className="h-full w-full bg-white overflow-hidden">
                    <img
                        alt="logo"
                        src={logo}
                        className="w-full h-full object-contain p-2"
                    />
                </Card>
            </div>

            <div className="order-1q md:order-3 aspect-square md:max-h-96">
                <Card className="h-full w-full bg-zinc-300 grid grid-cols-3 gap-2 p-4 overflow-hidden">
                    {squareColours.map((colour, index) => (
                        <div
                            key={index}
                            className={`aspect-square rounded-xl ${
                                colour === "blue" ? "bg-blue-900" : "bg-red-900"
                            } shadow-md cursor-pointer transition-all duration-300 hover:scale-110`}
                            onClick={() => (index === 8 ? handleLastSquareClick() : handleClick(index))}
                        />
                    ))}
                </Card>
            </div>
        </div>
    );
};
export default GridPage;
