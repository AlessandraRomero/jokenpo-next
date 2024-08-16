"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";
import styles from "./Jokenpo.module.css";

const choices = ["Pedra", "Papel", "Tesoura"];

const Jokenpo = () => {
  const [playerName, setPlayerName] = useState("");
  const [playerChoice, setPlayerChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const [result, setResult] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [rounds, setRounds] = useState(0);
  const [playerWins, setPlayerWins] = useState(0);
  const [computerWins, setComputerWins] = useState(0);
  const [ties, setTies] = useState(0);
  const [bestOfFive, setBestOfFive] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const playGame = (choice) => {
    if (!playerName) {
      setErrorMessage("Por favor, insira seu nome antes de jogar.");
      return;
    }

    if (gameOver) return;

    setErrorMessage("");
    setPlayerChoice(choice);
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    setComputerChoice(computerChoice);

    let newPlayerWins = playerWins;
    let newComputerWins = computerWins;
    let newTies = ties;
    let newRounds = rounds;
    let newResult = "";

    if (choice === computerChoice) {
      newResult = "Empate!";
      newTies++;
    } else if (
      (choice === "Pedra" && computerChoice === "Tesoura") ||
      (choice === "Papel" && computerChoice === "Pedra") ||
      (choice === "Tesoura" && computerChoice === "Papel")
    ) {
      newResult = `${playerName} ganhou esta rodada!`;
      newPlayerWins++;
    } else {
      newResult = "Computador ganhou esta rodada!";
      newComputerWins++;
    }

    newRounds++;

    if (bestOfFive && newRounds >= 5) {
      setGameOver(true);
      newResult =
        newPlayerWins > newComputerWins
          ? `${playerName} venceu o melhor de 5!`
          : "Computador venceu o melhor de 5!";
    }

    setResult(newResult);
    setRounds(newRounds);
    setPlayerWins(newPlayerWins);
    setComputerWins(newComputerWins);
    setTies(newTies);
  };

  const resetGame = () => {
    setPlayerName("");
    setPlayerChoice("");
    setComputerChoice("");
    setResult("");
    setRounds(0);
    setPlayerWins(0);
    setComputerWins(0);
    setTies(0);
    setErrorMessage("");
    setGameOver(false);
  };

  const toggleBestOfFive = () => {
    setBestOfFive(!bestOfFive);
    resetGame();
  };

  return (
    <div
      className="p-5 max-w-md mx-auto border border-gray-900 mt-6"
      style={{ boxShadow: "0 4px 15px rgba(0, 0, 0, 0.9)" }}
    >
      <h1 className="mb-3 mt-6 text-lg font-bold uppercase text-gray-400 text-center">
        JO KEN Pô
      </h1>
      <div className="flex flex-col items-center mb-4  gap-2">
        <Input
          type="text"
          placeholder="Digite seu nome para iniciar o jogo"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="w-full max-w-xs"
        />
        {errorMessage && (
          <p className="text-red-500 text-center text-sm">{errorMessage}</p>
        )}
        <Button onClick={toggleBestOfFive} className="px-4 py-2 mt-3">
          {bestOfFive ? "Modo Normal" : "Modo Melhor de 5"}
        </Button>
      </div>
      <div className="mt-6 mb-6 flex justify-center gap-2">
        {choices.map((choice) => (
          <Image
            key={choice}
            src={`/${choice.toLowerCase()}.png`}
            alt={choice}
            onClick={() => !gameOver && playGame(choice)}
            width={70}
            height={70}
            className={`cursor-pointer ${!playerName ? "opacity-50" : ""} ${
              styles.choiceImage
            } ${playerChoice === choice ? styles.activeChoice : ""}`}
          />
        ))}
      </div>
      <h2
        style={{ color: "#8162FF" }}
        className="flex justify-center gap-2 mb-6 text-lg font-bold"
      >
        {result}
      </h2>
      {playerChoice && computerChoice && !gameOver && (
        <p className="flex justify-center gap-2 mb-6 text-sm">
          {playerName} escolheu {playerChoice}, o computador escolheu{" "}
          {computerChoice}.
        </p>
      )}
      {!gameOver && (
        <div className="flex justify-center gap-2 mb-6">
          <p>Vitórias: {playerWins}</p>
          <p>Derrotas: {computerWins}</p>
          <p>Empates: {ties}</p>
        </div>
      )}
      <div className="flex justify-center mb-6">
        <button onClick={resetGame} className={`${styles.resetButton}`}>
          Parar
        </button>
      </div>
    </div>
  );
};

export default Jokenpo;
