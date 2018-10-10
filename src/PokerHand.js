export class PokerHand {

	compareWith() {
		return Result.TIE;
	}

}

export const Result = {
	WIN: 1,
	LOSS: 2,
	TIE: 3
};

export default PokerHand;
