import { startBoard } from "../data";
import blackbishop from "./black_bishop.png";
import blackking from "./black_king.png";
import blackknight from "./black_knight.png";
import blackpawn from "./black_pawn.png";
import blackqueen from "./black_queen.png";
import blackrook from "./black_rook.png";
import whitebishop from "./white_bishop.png";
import whiteking from "./white_king.png";
import whiteknight from "./white_knight.png";
import whitepawn from "./white_pawn.png";
import whitequeen from "./white_queen.png";
import whiterook from "./white_rook.png";

export default function Piece({ piece, color }) {
	const pieceName =
		piece[piece.length - 1] === "L"
			? piece.slice(0, piece.length - 1)
			: piece;
	return (
		<div className="piece" color={color}>
			<img
				src={require(`./${color}_${pieceName.toLowerCase()}.png`)}
				alt="A chess piece"
				height="75"
				width="75"
			/>
		</div>
	);
}
