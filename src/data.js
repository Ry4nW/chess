export const squareData = [
	{
		id: "a1",
	},
];

export const startBoard = [
	[
		"bRook",
		"bKnight",
		"bBishop",
		"bQueen",
		"bKing",
		"bBishop",
		"bKnight",
		"bRook",
	],
	["bPawn", "bPawn", "bPawn", "bPawn", "bPawn", "bPawn", "bPawn", "bPawn"],
	["", "", "", "", "", "", "", ""],
	["", "", "", "", "", "", "", ""],
	["", "", "", "", "", "", "", ""],
	["", "", "", "", "", "", "", ""],
	["Pawn", "Pawn", "Pawn", "Pawn", "Pawn", "Pawn", "Pawn", "Pawn"],
	["Rook", "Knight", "Bishop", "Queen", "King", "Bishop", "Knight", "Rook"],
];

export const blackPieceNames = [
	"bRook",
	"bKnight",
	"bBishop",
	"bQueen",
	"bKing",
	"bPawn",
];
export const whitePieceNames = [
	"Rook",
	"Knight",
	"Bishop",
	"Queen",
	"King",
	"Pawn",
];

// Generating cryptographically secure random numbers for component keys
export function generateKey() {
	return crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32;
}
