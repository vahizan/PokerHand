export class PokerHand {
    constructor(pokerHand){
        this.pokerHand = pokerHand;
        this.cardValues = {};
        this.valueList=[];
    }
	compareWith() {
		return Result.TIE;
	}

	//Find highest value card
	maxCard(cardValues){
        this.validateArray(cardValues);
        let maxVal = 0;
        cardValues.forEach((val,i)=>{
            maxVal = (val>maxVal)? val:maxVal;
        });
        return maxVal;
    }

    //Find max number of pairs
    maxPair(cardMap){
        this.validateMap(cardMap);
        let max =0;
        for(let key in cardMap){
            if (cardMap.hasOwnProperty(key)) {
                let val = cardMap[key];
                while(val>0){
                    if(val%2 === 0) max++;
                    val-=2;
                }
            }
        }
        return max;
    }

    maxOccurrance(cardMap){
        this.validateMap(cardMap);
        let max = 0;
        for(let key in cardMap)
            if(cardMap.hasOwnProperty(key)) max = (cardMap[key]>max)? cardMap[key]:max;
	    return max;
    }

    //if function returns 5 = straight
    //14,2 === consecutive

    maxConsec(cardValues){
        this.validateArray(cardValues);
        console.log("valuesSSSS",cardValues);
        let ccount = 0;
        if(cardValues[0]===LOWEST_CARD && cardValues[cardValues.length-1]===HIGHEST_CARD) ccount++;
        for(let i =0;i<cardValues.length;i++){
            if(i+1>=cardValues.length) break;
            if(Math.abs(cardValues[i]-cardValues[i+1]) === 1) {
                if(ccount === 0) ccount+=1;
                ccount++;
            }
        }
        console.log("COUNT ",ccount);
        return ccount;
    }

    //checks if all values are consecutive from ten to ace
    tenToAce(cardValues){
        this.validateArray(cardValues);
        return this.maxConsec(cardValues) === 5
            && cardValues[0]===CARD_10
            && cardValues[cardValues.length-1] === HIGHEST_CARD;
    }

    isRoyalFlush(cardValues,suitMap){
        this.validateArray(cardValues);
        this.validateMap(suitMap);
        return this.tenToAce(cardValues) && this.maxOccurrance(suitMap)===5;
    }

    processHand(pokerHand){
        pokerHand = pokerHand.toUpperCase();
        return {
            cardMap: this.cardMap(pokerHand),
            cardValues: this.cardNumbers(pokerHand),
            suits: this.suitMap(pokerHand)
        }
    }

    toMap(pokerHand,index){
        index = (index >= 1)?1:0;
        let map =(index>0)?{"S":0,"C":0,"H":0,"D":0}:{};
        this.validate(pokerHand);
        let hands = pokerHand.split(" ");
        for(let i in hands){
            let key = hands[i].charAt(index);
            if(!map[key]) map[key] = 1;
            else map[key] += 1;
        }
        return map;
    }
    suitMap(pokerHand){return this.toMap(pokerHand,1);}

    cardNumbers(pokerHand){
        let cards = pokerHand.split(" ");
        let values = [];
        for(let i in cards){
            let val = cards[i].charAt(0);
            if(!Number.isInteger(val)) val = PokerCardValues[val];
            values.push(parseInt(val));
        }
        values = values.sort((a,b)=> a-b);
        return values;
    }

    cardMap(pokerHand){return this.toMap(pokerHand,0);}

    containsDuplicate(strArr){
        let map = {};
        for(let i in strArr){
            if(!map[strArr[i]]) map[strArr[i]] = 1;
            else{
                if(map[strArr[i]]+1===2) return true;
                map[strArr[i]]+=1;
            }
        }
        return false;
    }
    validateMap(cardMap){
        if  (!cardMap || !(cardMap instanceof Object) || Object.keys(cardMap).length === 0
            || Array.isArray(cardMap) ) throw new Error("Could not calculate the maximum number of pairs for this hand");
    }
    validateArray(cardValues){
        if(!cardValues || !(cardValues instanceof Array) || cardValues.length===0) throw new Error("Could not calculate the maximum card value for this hand");
    }
    validate(pokerHand){
        //const pattern = /([\w]{2}\s{1}){4}([\w]{2})$/gmi;
        const pattern = /^([T,J,Q,K,A,2,3,4,5,6,7,8,9]{1}[S,H,D,C]{1}\s{1}){4}([T,J,Q,K,A,2,3,4,5,6,7,8,9]{1}[S,H,D,C]{1})$/gmi;
        if(pokerHand && pokerHand.length>0 && pattern.test(pokerHand.trim()) && !this.containsDuplicate(pokerHand.split(" "))){
            return;
        }
        throw new Error("Please provide a valid input");
    }
}

export const PokerCardValues = {"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"T":10,"J":11,"Q":12,"K":13,"A":14}
export const LOWEST_CARD = 2;
export const HIGHEST_CARD =14;
export const CARD_10 =10;
export const Result = {
	WIN: 1,
	LOSS: 2,
	TIE: 3
};

export default PokerHand;
