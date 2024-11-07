import React from "react";

const PuzzlePiece = ({ piece, index, movePiece, emptyTile }) => {
  const isEmpty = piece.image === null; 

  const handleClick = () => {
    if (!isEmpty) {
      movePiece(index);
    }
  };

  return (
    <div
      onClick={handleClick}
      style={{
        width: "100px",
        height: "100px",
        margin: "5px",
        backgroundColor: isEmpty ? "red" : "transparent",
        backgroundImage: isEmpty ? "none" : `url(${piece.image})`,
        backgroundSize: "cover",
        border: "1px solid #333",
        cursor: "pointer",
      }}
    />
  );
};

export default PuzzlePiece;
