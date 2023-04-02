import React from "react";
import { useState } from "react";
import ReactDOM from "react-dom/client";
import "./css/globals.css";

import * as pL from "./Logic.js";
import Piece from "./Piece Sprites/Images.js";
import { generateKey, startBoard } from "./data";

function Row({ rowNumber, squares, onSquareClick }) {
	let square_rows = [];
	square_rows.push(
		<Square
			key={generateKey()}
			value={8 - rowNumber}
			isCoord={true}
		></Square>
	);

	for (let i = 0; i < 8; ++i) {
		let piece;
		let pieceComp;
		const curSquare = squares[rowNumber][i];
		if (curSquare.length > 1) {
			let c;
			if (curSquare.charAt(0) === "b") {
				c = "black";
				piece = curSquare.slice(1);
			} else {
				c = "white";
				piece = curSquare;
			}
			pieceComp = <Piece piece={piece} color={c}></Piece>;
		} else if (curSquare === "L") {
			pieceComp = <div className="legalMark"></div>;
		}
		square_rows.push(
			<Square
				key={`${rowNumber}-${i}`}
				value={pieceComp}
				rowNumber={rowNumber}
				colNumber={i}
				onSquareClick={() => onSquareClick([rowNumber, i])}
			></Square>
		);
	}
	return square_rows;
}

function FileNumRow({ rowNumber }) {
	let squares = [];
	squares.push(<Square isCoord={true} key={generateKey()}></Square>);
	for (let i = 1; i < 9; i++)
		squares.push(
			<Square
				key={generateKey()}
				isCoord={true}
				value={String.fromCharCode(96 + i)}
			></Square>
		);
	return squares;
}

function Square({ rowNumber, colNumber, value, isCoord, onSquareClick }) {
	if (!isCoord) {
		const clsName = !((rowNumber + colNumber - 2) % 2 !== 0)
			? "square white"
			: "square black";
		return (
			<button className={clsName} onClick={onSquareClick}>
				{value}
			</button>
		);
	}

	return (
		<button
			className="square disabled"
			id="coordinate"
			onClick={onSquareClick}
		>
			{value}
		</button>
	);
}

function Board({
	whiteIsNext,
	squares,
	handlePlay,
	isHoldingPiece,
	toBeLeft,
	currentMove,
	handleLegalMoves,
	curLegalMoves,
}) {
	squares = squares[currentMove];

	function generateBoard() {
		let board = [];
		for (let i = 0; i < 8; i++) {
			board.push(
				<div className="board-row" key={generateKey()}>
					<Row
						rowNumber={i}
						squares={squares}
						onSquareClick={handleClick}
					/>
				</div>
			);
		}
		board.push(
			<div className="board-row" key={generateKey()}>
				<FileNumRow rowNumber={9} />
			</div>
		);
		return board;
	}

	function handleClick(position) {
		const i = position[0],
			j = position[1];

		if (
			squares[i][j] !== "" &&
			!isHoldingPiece &&
			((whiteIsNext && squares[i][j].charAt(0) !== "b") ||
				(!whiteIsNext && squares[i][j].charAt(0) === "b"))
		) {
			console.log("b");
			const color = squares[i][j].charAt(0) === "b" ? "black" : "white";
			const moves = pL.calculateMoves(
				position,
				squares[i][j],
				squares,
				color
			);
			for (let k = 0; k < moves.length; k++) {
				const curPos = moves[k];
				squares[curPos[0]][curPos[1]] = "L";
			}
			handleLegalMoves(moves, position, true);
			toBeLeft = position;
			// console.log(moves);
			// console.log("holding");
			// console.log(position);
		} else if (isHoldingPiece) {
			console.log("a");
			if (squares[i][j] === "L") {
				squares[i][j] = squares[toBeLeft[0]][toBeLeft[1]];
				squares[toBeLeft[0]][toBeLeft[1]] = "";
				isHoldingPiece = false;
				handleLegalMoves(null, null, false);
				handlePlay(squares);
			}
			// console.log("placed in " + position);
			// console.log(squares);
		}
	}

	return <div className="board">{generateBoard()}</div>;
}

export default function App() {
	// Modifies list for move history.
	const [currentMove, setCurrentMove] = useState(0);

	// Capping move limit at 250
	const [moveHistory, setMoveHistory] = useState(Array(250).fill(null));
	const [legalMoves, setLegalMoves] = useState([]);
	moveHistory[0] = startBoard;
	const currentSquares = moveHistory[currentMove];

	const [isHolding, setIsHolding] = useState(false);
	const [curLegalMoves, setCurLegalMoves] = useState(0);
	const [toBeLeft, setToBeLeft] = useState(0);
	const [whiteIsNext, setWhiteIsNext] = useState(true);

	function handlePlay(nextSquares) {
		const updatedHistory = [
			...moveHistory.slice(0, currentMove + 1),
			nextSquares,
		];
		setMoveHistory(updatedHistory);
		setCurrentMove(updatedHistory.length - 1);
		if (!whiteIsNext) setCurrentMove(currentMove + 1);
		setWhiteIsNext(!whiteIsNext);
		setIsHolding(false);
	}

	function handleLegalMoves(legalMoves, position, add) {
		if (add) {
			setCurLegalMoves(legalMoves.slice());
			setToBeLeft(position);
			setIsHolding(true);
		} else {
			for (let i = 0; i < curLegalMoves.length; i++) {
				const row = curLegalMoves[i][0],
					col = curLegalMoves[i][1];
				console.log(moveHistory);
				console.log(currentMove);
				const curSquare = moveHistory[currentMove][row][col];
				if (curSquare === "L") moveHistory[currentMove][row][col] = "";
			}
			console.log(moveHistory[currentMove]);
		}
	}

	function screenHistoryState(nextMove) {
		setCurrentMove(nextMove);
	}

	function setHistoryView() {}

	// const moves = history.map((squares, move) => {
	//     return (
	//         null
	//     );
	// })

	return (
		<Board
			squares={moveHistory}
			isHoldingPiece={isHolding}
			toBeLeft={toBeLeft}
			currentMove={currentMove}
			handlePlay={handlePlay}
			handleLegalMoves={handleLegalMoves}
			whiteIsNext={whiteIsNext}
			curLegalMoves={curLegalMoves}
		/>
	);
}
