import React, { useState, useEffect } from "react";
import PuzzlePiece from "./PuzzlePiece";

import referenceImage from "./images/cattoff.png";

const imagePaths = [
  require("./images/1.png"),
  require("./images/2.png"),
  require("./images/3.png"),
  require("./images/4.png"),
  require("./images/5.png"),
  require("./images/6.png"),
  require("./images/7.png"),
  require("./images/8.png"),
  require("./images/9.png"),
  require("./images/10.png"),
  require("./images/11.png"),
  require("./images/12.png"),
  require("./images/13.png"),
  require("./images/14.png"),
  require("./images/15.png"),
];

const generateShuffledPieces = () => {
    // Generate pieces with 15 images
    const pieces = Array.from({ length: 16 }, (_, index) => ({
      id: index + 1,
      image: index < 15 ? imagePaths[index] : null, // The 16th piece is empty, so it has no image
    }));
    return pieces;
  };
  
  const PuzzleGame = () => {
    const [pieces, setPieces] = useState(generateShuffledPieces());
    const [emptyTile, setEmptyTile] = useState(15); 
    const [timeLeft, setTimeLeft] = useState(600); 
    const [isGameOver, setIsGameOver] = useState(false);
  
    useEffect(() => {
      if (timeLeft === 0) return;
      const interval = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(interval);
    }, [timeLeft]);
  
    const checkWin = () => {
      const isSolved = pieces.every((piece, index) => piece.id === index + 1);
      if (isSolved) {
        setIsGameOver(true);
      }
    };
  
    const handleTileClick = (index) => {
      // Get the row and column of the clicked tile and the empty tile
      const emptyRow = Math.floor(emptyTile / 4);
      const emptyCol = emptyTile % 4;
      const clickedRow = Math.floor(index / 4);
      const clickedCol = index % 4;
  
      // If the clicked tile is adjacent to the empty tile, swap them
      if (
        (Math.abs(emptyRow - clickedRow) === 1 && emptyCol === clickedCol) ||
        (Math.abs(emptyCol - clickedCol) === 1 && emptyRow === clickedRow)
      ) {
        const updatedPieces = [...pieces];
        updatedPieces[emptyTile] = pieces[index];
        updatedPieces[index] = pieces[emptyTile];
        setPieces(updatedPieces);
        setEmptyTile(index); // Update the empty tile's position
      }
    };
  
    // Shuffle pieces function
    const shufflePieces = () => {
      const shuffled = generateShuffledPieces();
      setPieces(shuffled);
      setEmptyTile(15); 
      setTimeLeft(600);
      setIsGameOver(false);
    };
  
    return (
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 100px)", 
            gridTemplateRows: "repeat(4, 100px)", 
            gap: "0", 
          }}
        >
          {pieces.map((piece, index) => (
            <PuzzlePiece
              key={piece.id}
              piece={piece}
              index={index}
              movePiece={handleTileClick}
              emptyTile={emptyTile}
            />
          ))}
        </div>
  
        <div>
          <h2>Reference Image</h2>
          <img
            src={referenceImage}
            alt="CatoffLogo"
            width={200}
            style={{ border: "1px solid #333", marginBottom: "10px" }}
          />
  
          <h3>Timer: {timeLeft}s</h3>
  
          <button onClick={shufflePieces}>Reshuffle</button>
  
          {isGameOver && <h2>You Win!</h2>}
        </div>
      </div>
    );
  };
  
  export default PuzzleGame;