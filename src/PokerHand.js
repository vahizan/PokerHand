export class PokerHand {
    constructor(pokerHand){
        this.pokerHand = pokerHand;
    }
	compareWith() {
		return Result.TIE;
	}

	maxCard(){
	    return 0;
    }

    maxOccurrance(){
	    return 0;
    }

    maxConsec(){
        return 0;
    }

    validate(pokerHand){
        //const pattern = /([\w]{2}\s{1}){4}([\w]{2})$/gmi;
        const pattern = /^([T,J,Q,K,A,2,3,4,5,6,7,8,9]{1}[S,H,D,C]{1}\s{1}){4}([T,J,Q,K,A,2,3,4,5,6,7,8,9]{1}[S,H,D,C]{1})$/gmi;
        console.log("pokerHand",pokerHand);
        if(pattern.test(pokerHand)) {
            return;
        }
        throw new Error("Please provide a valid input");
    }
}

export const Result = {
	WIN: 1,
	LOSS: 2,
	TIE: 3
};

export default PokerHand;
