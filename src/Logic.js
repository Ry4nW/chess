import { blackPieceNames } from "./data";
import { whitePieceNames } from "./data";

export function calculateCheckmate(boardState) {}

// Check occupancy of one square
function checkFree(boardState, position, take = false, pieces = []) {
	if (
		position[0] < 0 ||
		position[0] > 7 ||
		position[1] < 0 ||
		position[1] > 7
	)
		return false;
	const cur = boardState[position[0]][position[1]];
	console.log("aaaa");
	console.log(boardState);
	console.log(cur);
	if ((cur === "" && !take) || (take && pieces.includes(cur))) return true;
}

// Calculate and display all legal moves of a piece
export function calculateMoves(position, piece, boardState, color) {
	const i = position[0],
		j = position[1];
	let legalNextMoves = [];
	if (color === "white") {
		switch (piece) {
			case "Pawn":
				// Check if moving from starting square
				if (i === 6) {
					if (
						checkFree(boardState, [5, j]) &&
						checkFree(boardState, [4, j])
					)
						legalNextMoves.push([4, j]);
				}
				if (checkFree(boardState, [i - 1, j]))
					legalNextMoves.push([i - 1, j]);

				// Taking
				const potentialTakeSquares = [
					[i - 1, j - 1],
					[i - 1, j + 1],
				];
				potentialTakeSquares.forEach((pair) => {
					if (checkFree(boardState, pair, true, blackPieceNames)) {
						legalNextMoves.push(pair);
					}
				});
			default:
		}

		console.log(legalNextMoves);
		return legalNextMoves;
	}

	console.log(position, boardState);
	switch (piece) {
		case "bPawn":
			if (i === 1) {
				if (
					checkFree(boardState, [2, j]) &&
					checkFree(boardState, [3, j])
				)
					legalNextMoves.push([3, j]);
			}
			if (checkFree(boardState, [i + 1, j]))
				legalNextMoves.push([i + 1, j]);
		default:
	}
	console.log(legalNextMoves);
	return legalNextMoves;
}
