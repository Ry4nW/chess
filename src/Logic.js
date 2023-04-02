const pieces = {
	Rook: {},
};

export function calculateCheckmate(boardState) {}

// Check occupancy of one square
function checkFree(boardState, position) {
	if (
		position[0] < 0 ||
		position[0] > 7 ||
		position[1] < 0 ||
		position[1] > 7
	)
		return false;
	if (boardState[position[0]][position[1]] === "") return true;
	return false;
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
			default:
		}
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
