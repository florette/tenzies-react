import { useState, useEffect } from "react";
import Die from "./Die";
import React from "react";

const Main = () => {
    const diceNum = 10;
    const randomNum = () => Math.floor(Math.random() * 6) + 1;

    const [dice, setDice] = useState([]);
    const [gameVal, setGameVal] = useState(0);
    const [rollCount, setRollCount] = useState(0);
    const [gameEnd, setGameEnd] = useState(false);

    useEffect(() => {
        initDice();
    }, []);

    useEffect(() => {
        stopGame();
    }, [dice]);

    const initDice = () => {
        setDice(() => {
            let diceArr = [];
            for (let i = 0; i < diceNum; i++) {
                diceArr.push({
                    id: `die-${i + 1}`,
                    value: randomNum(),
                    selected: false,
                });
            }
            return diceArr;
        });

        setRollCount(0);
    };

    const stopGame = () => {
        setGameEnd(dice.every((die) => die.selected));
    };

    const selectDice = (id, val) => {
        const isOneSelected = dice.find((die) => die.selected);
        const isGameVal = val === gameVal;

        // Fist selection
        if (!isOneSelected) {
            setGameVal(val);

            setDice((prevState) => {
                return prevState.map((die) => {
                    if (die.id === id) {
                        return { ...die, selected: true };
                    } else {
                        return die;
                    }
                });
            });
        }
        // Select if same die value
        else if (isGameVal) {
            setDice((prevState) => {
                return prevState.map((die) => {
                    if (die.id === id) {
                        return { ...die, selected: true };
                    } else {
                        return die;
                    }
                });
            });
        }
    };

    const changeDice = () => {
        setDice((prevState) => {
            return prevState.map((die) => {
                if (!die.selected) {
                    return {
                        ...die,
                        value: randomNum(),
                    };
                } else {
                    return die;
                }
            });
        });
    };

    const rollDice = () => {
        changeDice();
        setRollCount((prevCount) => prevCount + 1);
    };

    const diceList = dice.map((die) => (
        <Die
            id={die.id}
            value={die.value}
            key={die.id}
            selectDice={selectDice}
            selected={die.selected}
        />
    ));

    return (
        <div className="main">
            {diceList}
            {gameEnd ? (
                <>
                    <h2>
                        Congrats! You finished the game in {rollCount} moves!
                    </h2>
                    <button onClick={initDice}>Play again</button>
                </>
            ) : (
                <button onClick={rollDice}>Roll</button>
            )}
        </div>
    );
};
export default Main;
