import PokerHand, { Result,PokerCardValues } from './PokerHand.js';
import {HandValues} from "./PokerHand";

describe('PokerHand', () => {

    describe("Handling incorrect input",()=>{
        let handOne;
        let handTwo;
        beforeEach(()=>{
            handOne = new PokerHand(null);
            handTwo = new PokerHand(null);
        });
        test("throws Error on null input",()=>{
            expect(()=>{handOne.validate(null)}).toThrowError(Error);
            expect(()=>{handOne.validate(null)}).toThrowError(/^Please provide a valid input$/);
        });
        test("throws Error on empty string",()=>{
            expect(()=>{handOne.validate("")}).toThrowError(Error);
            expect(()=>{handOne.validate("")}).toThrowError(/^Please provide a valid input$/);
        });
        test("doesn't throw Error on valid input",()=>{
            expect(handOne.validate("AC 4S 5S 8C AH")).toBe(undefined);
        });
        test("doesn't throw Error on valid mixed case input",()=>{
            expect(handOne.validate("Ac 4S 5s 8c ah")).toBe(undefined);
        });
        test("throw Error on valid input, but invalid characters",()=>{
            expect(()=>{handOne.validate("LC 4M KS NQ AH")}).toThrowError(Error);
            expect(()=>{handOne.validate("")}).toThrowError(/^Please provide a valid input$/);
        });
        test("throw Error on long invalid characters",()=>{
            expect(()=>{handOne.validate("LC 4M KS NQ AH 9I pL 2A SD AS")}).toThrowError(Error);
            expect(()=>{handOne.validate("")}).toThrowError(/^Please provide a valid input$/);
        });

        test("throw Error on invalid format",()=>{
            expect(()=>{handOne.validate("LC sdssas4M KS sdasNQsdasAHdasds9I pL 2A")}).toThrowError(Error);
            expect(()=>{handOne.validate("")}).toThrowError(/^Please provide a valid input$/);
        });

        //boolean - duplicate values ;
        test("containsDuplicate - return true if duplicate values exist ", ()=>{
            expect(handOne.containsDuplicate(["4S", "5S" ,"8C","AS", "AS"])).toBeTruthy();
        });

        test("containsDuplicate - return false if duplicate values doesn't exist ", ()=>{
            expect(handOne.containsDuplicate(["4S", "5S" ,"8C","AD", "AS"])).toBeFalsy();
        });

        test("containsDuplicate - throw Error on duplicate values ",()=>{
            expect(()=>{handOne.validate("4S 5S AA AA AA")}).toThrowError(Error);
            expect(()=>{handOne.validate("")}).toThrowError(/^Please provide a valid input$/);
        });

    });

    describe("Processing the input data - user's hand",()=>{
        let handOne;

        beforeEach(()=>{
             handOne = new PokerHand(null);
        });

        test("should contain all card values", ()=>{
            let cardValues = {"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"T":10,"J":11,"Q":12,"K":13,"A":14};
            expect(cardValues).toEqual(PokerCardValues);
        });

        test("toMap - should return an object",()=>{
            handOne = new PokerHand('4S 5S 8C AS AD');
            expect(handOne.toMap('4S 5S 8C AS AD') instanceof Object).toBeTruthy();
        });

        test("toMap - should return only process poker hand",()=>{
            handOne = new PokerHand('4S 5S 8C AS AD');
            expect(()=>{handOne.toMap('4S 5S 8C AS AD 9D')}).toThrowError(Error);
        });

        test("toMap - should create a map of card values with index 0",()=>{
            handOne = new PokerHand('4S 5S 8C AS AD');
            let outputOne = {"4":1,"5":1,"8":1,"A":2};
            expect(handOne.toMap('4S 5S 8C AS AD',0)).toEqual(outputOne);
        });

        test("toMap - should create a map of suit values with index 1",()=>{
            handOne = new PokerHand('4S 5S 8C AS AD');
            let outputOne = {"S":3,"C":1,"H":0,"D":1};
            expect(handOne.toMap('4S 5S 8C AS AD',1)).toEqual(outputOne);
        });

        test("toMap - should create a map of suit values with index more than 1",()=>{
            handOne = new PokerHand('4S 5S 8C AS AD');
            let outputOne = {"S":3,"C":1,"H":0,"D":1};
            expect(handOne.toMap('4S 5S 8C AS AD',1000)).toEqual(outputOne);
        });
        test("toMap - should create a map of card values with index less than 0",()=>{
            handOne = new PokerHand('4S 5S 8C AS AD');
            let outputOne = {"4":1,"5":1,"8":1,"A":2};
            expect(handOne.toMap('4S 5S 8C AS AD',-1000)).toEqual(outputOne);
        });

        //Tests for suitMap function
        test("suitMap - should return an object",()=>{
            handOne = new PokerHand('4S 5S 8C AS AD');
            expect(handOne.suitMap('4S 5S 8C AS AD') instanceof Object).toBeTruthy();
        });

        test("suitMap - should return an object with 4 properties. ",()=>{
            handOne = new PokerHand('4S 5S 8C AS AD');
            let map = handOne.suitMap('4S 5S 8C AS AD');
            let count =0;
            for(let i in map) count++;
            expect(count).toEqual(4);
        });

        test("suitMap - should return an object with 4 properties. Each property in following order S,C,H,D ",()=>{
            handOne = new PokerHand('4S 5S 8C AS AD');
            let map = handOne.suitMap('4S 5S 8C AS AD');
            let expectedKeys= ["S","C","H","D"];
            let count =0;
            for(let key in map) {
                expect(key).toEqual(expectedKeys[count]);
                count++;
            }
        });

        test("suitMap - should return valid suit value data", ()=>{
            handOne = new PokerHand('4S 5S 8C AS AD');
            let suitM =  {"S":3,"C":1,"H":0,"D":1};
            expect(handOne.suitMap('4S 5S 8C AS AD')).toEqual(suitM);
        });


        //Tests for cardMap function
        test("cardMap - should return an object",()=>{
            handOne = new PokerHand('4S 5S 8C AS AD');
            expect(handOne.cardMap('4S 5S 8C AS AD') instanceof Object).toBeTruthy();
        });

        test("cardMap - should return an object with 4 properties. ",()=>{
            handOne = new PokerHand('4S 5S 8C AS AD');
            let map = handOne.cardMap('4S 5S 8C AS AD');
            let count =0;
            for(let i in map) count++;
            expect(count).toEqual(4);
        });

        test("cardMap - should return an object with 5 properties. ",()=>{
            handOne = new PokerHand('4S 5S 8C AS AD');
            let map = handOne.cardMap('4S 5S 8C 3S AD');
            let count =0;
            for(let i in map) count++;
            expect(count).toEqual(5);
        });
        test("cardMap - should return an object with 5 properties. Each property must be a number or A,T,J,Q,K ",()=>{
            handOne = new PokerHand('4S 5S 8C AS AD');
            let map = handOne.cardMap('4S 5S 8C 3S AD');
            let count =0;
            for(let key in map) {
                let patt = /[2,3,4,5,6,8,9,A,T,J,Q,K]/gmi;
                expect(key.match(patt)).toBeTruthy();
                count++;
            }
        });

        test("cardMap - should return an object with 4 properties. Each property must be a number or A,T,J,Q,K ",()=>{
            handOne = new PokerHand('4S 5S 8C AS AD');
            let map = handOne.cardMap('4S 5S 8C AS AD');
            let count =0;
            for(let key in map) {
                let patt = /[2,3,4,5,6,8,9,A,T,J,Q,K]/gmi;
                expect(key.match(patt)).toBeTruthy();
                count++;
            }
        });

        test("cardMap - must return valid map", ()=>{
            handOne = new PokerHand('4S 5S 8C AS AD');
            let map = {"4":1,"5":1,"8":1,"A":2};
            expect(handOne.cardMap('4S 5S 8C AS AD')).toEqual(map);
        });

        //Tests for cardNumbers function
        test("cardValues - should return array", ()=>{
            handOne = new PokerHand('4S 5S 8C AS AD');
            let values = handOne.cardNumbers("4S 5S 8C AS AD");
            expect(values instanceof Array).toBeTruthy();
        });
        test("cardValues - array should have 5 elements in total", ()=>{
            handOne = new PokerHand('4S 5S 8C AS AD');
            let actualValues = handOne.cardNumbers('4S 5S 8C AS AD');
            expect(actualValues.length === 5).toBeTruthy();
        });

        test("cardValues - should store values as Number in array", ()=>{
            handOne = new PokerHand('4S 5S 8C AS AD');
            let expectedValues = [4,5,8,14,14];
            let actualValues = handOne.cardNumbers('4S 5S 8C AS AD');
            expect(actualValues.length === 5).toBeTruthy();
            for(let i in actualValues) expect(Number.isInteger(actualValues[i])).toBeTruthy();
        });

        test("cardValues - should contain numbers only", ()=>{
            handOne = new PokerHand('4S 5S 8C AS AD');
            let expectedValues = [4,5,8,14,14];
            let actualValues = handOne.cardNumbers('4S 5S 8C AS AD');
            expect(actualValues).toEqual(expectedValues);

        });

        test("cardValues - should be sorted", ()=>{
            handOne = new PokerHand('4S 5S 8C AS AD');
            let expectedValues = [4,5,8,14,14];
            let actualValues = handOne.cardNumbers('AS 8C 5H AC 4S');
            expect(actualValues).toEqual(expectedValues);
        });

        //Tests for processHand
        test("processHand - process valid hand - valid hand suit, card values and suits info", ()=>{
            handOne = new PokerHand('4S 5S 8C AS AD');
            let processedHand = {
                cardMap: {"4":1,"5":1,"8":1,"A":2},
                cardValues:[4,5,8,14,14],
                suits: {"S":3,"C":1,"H":0,"D":1}
            };
            expect(handOne.processHand('4S 5S 8C AS AD')).toEqual(processedHand);
        });
    });

    describe("Analysing user's hand",()=> {
        let handOne;
        beforeEach(() => {
            handOne = new PokerHand(null);
        });
        //maxValue
        test("should throw error for incorrect type param ",()=>{
            expect(()=>{handOne.maxCard(null)}).toThrowError(Error);
        });
        test("should throw error for incorrect type param2 ",()=>{
            expect(()=>{handOne.maxCard("hello")}).toThrowError(Error);
        });
        test("should throw error for empty array param ",()=>{
            expect(()=>{handOne.maxCard([])}).toThrowError(Error);
        });
        test("should throw error for empty object param ",()=>{
            expect(()=>{handOne.maxCard({})}).toThrowError(Error);
        });
        test("should throw error for  object param ",()=>{
            expect(()=>{handOne.maxCard({A:2,B:3,X:6})}).toThrowError(Error);
        });
        test("should return the value of the highest card",()=>{
            handOne = new PokerHand("AC 4S 5S 8C AH");
            let processed = handOne.processHand("AC 4S 5S 8C AH");
            expect(handOne.maxCard(processed.cardValues)).toBe(14);
        });

        //maxPair
        test("should throw error for incorrect type param - null ",()=>{
            expect(()=>{handOne.maxPair(null)}).toThrowError(Error);
        });
        test("should throw error for incorrect type param - string ",()=>{
            expect(()=>{handOne.maxPair("hello")}).toThrowError(Error);
        });
        test("should throw error for incorrect type param - empty array ",()=>{
            expect(()=>{handOne.maxPair([])}).toThrowError(Error);
        });
        test("should throw error for empty object param",()=>{
            expect(()=>{handOne.maxPair({})}).toThrowError(Error);
        });
        test("should return the value max number of pairs - 2 Pairs",()=>{
            handOne = new PokerHand("AC 4S 5S 8C AH");
            let processed = handOne.processHand();
            console.log("processed",processed);
            expect(handOne.maxPair(processed.cardMap)).toBe(1);
        });
        test("should return the value of max number of pairs - 4 of a kind",()=>{
            handOne = new PokerHand("AC AS AD 8C AH");
            let processed = handOne.processHand();
            console.log("processed",processed);
            expect(handOne.maxPair(processed.cardMap)).toBe(2);
        });
        test("should return the value of max number of pairs - two different pairs",()=>{
            handOne = new PokerHand("8D AS AD 8C 7H");
            let processed = handOne.processHand();
            console.log("processed",processed);
            expect(handOne.maxPair(processed.cardMap)).toBe(2);
        });

        //max occurrance

        test("maxOccurrance - should throw error for incorrect type param - null ",()=>{
            expect(()=>{handOne.maxOccurrance(null)}).toThrowError(Error);
        });
        test("maxOccurrance - should throw error for incorrect type param - string ",()=>{
            expect(()=>{handOne.maxOccurrance("hello")}).toThrowError(Error);
        });
        test("maxOccurrance - should throw error for incorrect type param - empty array ",()=>{
            expect(()=>{handOne.maxOccurrance([])}).toThrowError(Error);
        });
        test("maxOccurrance - should throw error for empty object param",()=>{
            expect(()=>{handOne.maxOccurrance({})}).toThrowError(Error);
        });

        test("maxOccurrance - should return max no of occurrances of a value - One Pair",()=>{
            handOne = new PokerHand("AC 4S 5S 8C AH");
            let processed = handOne.processHand();
            console.log("processed",processed);
            expect(handOne.maxOccurrance(processed.cardMap)).toBe(2);
        });
        test("maxOccurrance - should return the value of max number of occurrances - 4 of a kind",()=>{
            handOne = new PokerHand("AC AS AD 8C AH");
            let processed = handOne.processHand();
            console.log("processed",processed);
            expect(handOne.maxOccurrance(processed.cardMap)).toBe(4);
        });
        test("should return the value of max number of occurrances - two different pairs",()=>{
            handOne = new PokerHand("8D AS AD 8C 7H");
            let processed = handOne.processHand();
            console.log("processed",processed);
            expect(handOne.maxOccurrance(processed.cardMap)).toBe(2);
        });

        //max consec
        test("maxConsec - should return max no of consecutive values - 0 consecutive numbers",()=>{
            handOne = new PokerHand("AC 4S 8S 8C AH");
            let processed = handOne.processHand();
            expect(handOne.maxConsec(processed.cardValues)).toBe(0);
        });
        test("maxConsec - should return max no of consecutive values - 2 consecutive numbers",()=>{
            handOne = new PokerHand("AC 9S 2S 8C AH");
            let processed = handOne.processHand();
            expect(handOne.maxConsec(processed.cardValues)).toBe(2);
        });
        test("maxConsec - should return max no of consecutive values - 4 consecutive numbers",()=>{
            handOne = new PokerHand("KC QS AD JC 7H");
            let processed = handOne.processHand();
            expect(handOne.maxConsec(processed.cardValues)).toBe(4);
        });
        test("maxConsec - should return max no of consecutive values - straight",()=>{
            handOne = new PokerHand("KC QS AD TC JH");
            let processed = handOne.processHand();
            expect(handOne.maxConsec(processed.cardValues)).toBe(5);
        });
        test("maxConsec - should return max no of consecutive values - 3 consecutive values",()=>{
            handOne = new PokerHand("KC 2S AD TC JH");
            let processed = handOne.processHand();
            expect(handOne.maxConsec(processed.cardValues)).toBe(3);
        });
        test("maxConsec - should return max no of consecutive values - straight 2",()=>{
            handOne = new PokerHand("KC QH AD TC JH");
            let processed = handOne.processHand();
            expect(handOne.maxConsec(processed.cardValues)).toBe(5);
        });



        //tenToAce
        test("tenToAce - should return false if all values are not consec",()=>{
            handOne = new PokerHand("AC 4S 8S 8C AH");
            let processed = handOne.processHand();
            expect(handOne.tenToAce(processed.cardValues)).toBe(false);
        });
        test("tenToAce - should return true - straight and between 10 to A",()=>{
            handOne = new PokerHand("QC TS KS JC AH");
            let processed = handOne.processHand();
            expect(handOne.tenToAce(processed.cardValues)).toBe(true);
        });
        test("tenToAce - should return false - straight, but not between 10 to A",()=>{
            handOne = new PokerHand("2c 5s 4S 6C 3H");
            let processed = handOne.processHand();
            expect(handOne.tenToAce(processed.cardValues)).toBe(false);
        });


        //isRoyalFlush

        test("isRoyalFlush - should return false as values aren't consec",()=>{
            handOne = new PokerHand("AC 4S 8S 8C AH");
            let processed = handOne.processHand();
            expect(handOne.isRoyalFlush(processed.cardValues,processed.suits)).toBe(false);
        });
        test("isRoyalFlush - should return false - straight, between 10 to A, but not all in same suit",()=>{
            handOne = new PokerHand("QC TS KS JC AH");
            let processed = handOne.processHand();
            expect(handOne.isRoyalFlush(processed.cardValues,processed.suits)).toBe(false);
        });
        test("isRoyalFlush - should return false - straight, but not between 10 to A",()=>{
            handOne = new PokerHand("Qh th jh ah kH");
            let processed = handOne.processHand();
            expect(handOne.isRoyalFlush(processed.cardValues,processed.suits)).toBe(true);
        });



    });

    describe('points(Hand)',()=>{
            let handOne;
            beforeEach(()=>{
                handOne = null;
            });
            test("should return object with properties - highcard and points",()=>{
                    handOne = new PokerHand("Ad As Tc 9s 8h");
                 expect(handOne.pointsData(handOne) instanceof Object).toBe(true);
                 expect(handOne.pointsData(handOne).hasOwnProperty("highCard")).toBe(true);
                 expect(handOne.pointsData(handOne).hasOwnProperty("points")).toBe(true);
                 expect(handOne.pointsData(handOne).hasOwnProperty("handValue")).toBe(true);
            });
            test("should return correct points value - highcard",()=>{
                handOne = new PokerHand("Ad 3s Tc 9s 8h");
                let expectedReturn = {
                    highCard:14,
                    points:1,
                    handValue:HandValues[1]
                }
                expect(handOne.pointsData(handOne)).toEqual(expectedReturn);
            });
            test("should return correct points value - pair",()=>{
                handOne = new PokerHand("Ad As Tc 9s 8h");
                let expectedReturn = {
                    highCard:14,
                    points:2,
                    handValue:HandValues[2]
                }
                expect(handOne.pointsData(handOne)).toEqual(expectedReturn);
            });
            test("should return correct points value - 2 pairs",()=>{
                handOne = new PokerHand("Ad As Tc Ts 8h");
                let expectedReturn = {
                    highCard:14,
                    points:3,
                    handValue:HandValues[3]
                }
                expect(handOne.pointsData(handOne)).toEqual(expectedReturn);
            });
            test("should return correct points value - three of a kind",()=>{
                handOne = new PokerHand("Ad As Ac Ts 8h");
                let expectedReturn = {
                    highCard:14,
                    points:4,
                    handValue:HandValues[4]
                }
                expect(handOne.pointsData(handOne)).toEqual(expectedReturn);

            });
            test("should return correct points value - straight",()=>{
                handOne = new PokerHand("2d 3s 4c 5s 6h");
                let expectedReturn = {
                    highCard:6,
                    points:5,
                    handValue:HandValues[5]
                }
                expect(handOne.pointsData(handOne)).toEqual(expectedReturn);

            });
            test("should return correct points value - flush",()=>{
                handOne = new PokerHand("7c Ac 9c Tc 8c");
                let expectedReturn = {
                    highCard:14,
                    points:10,
                    handValue:HandValues[10]
                }
                expect(handOne.pointsData(handOne)).toEqual(expectedReturn);

            });
            test("should return correct points value - full house - 1 pair and 3 of a kind",()=>{
                handOne = new PokerHand("Ac Ad Ah Th Td");
                let expectedReturn = {
                    highCard:14,
                    points:15,
                    handValue:HandValues[15]
                }
                expect(handOne.pointsData(handOne)).toEqual(expectedReturn);

            });
            test("should return correct points value - four of a kind",()=>{
                handOne = new PokerHand("Ac Ad Ah As Td");
                let expectedReturn = {
                    highCard:14,
                    points:25,
                    handValue:HandValues[25]
                }
                expect(handOne.pointsData(handOne)).toEqual(expectedReturn);

            });
            test("should return correct points value - straight flush",()=>{
                handOne = new PokerHand("2c 3c 4c 5c 6c");
                let expectedReturn = {
                    highCard:6,
                    points:50,
                    handValue:HandValues[50]

                }
                expect(handOne.pointsData(handOne)).toEqual(expectedReturn);
            });
            test("should return correct points value - royal flush - 100",()=>{
                handOne = new PokerHand("Ac Tc Qc Jc Kc");
                let expectedReturn = {
                    highCard:14,
                    points:100,
                    handValue:HandValues[100]
                }
                expect(handOne.pointsData(handOne)).toEqual(expectedReturn);
            });
        });

    describe('compareWith()', () => {

		it(`ties`, () => {

			const hand1 = new PokerHand('AC 4S 5S 8C AH');
			const hand2 = new PokerHand('4S 5S 8C AS AD');
			expect(hand1.compareWith(hand2)).toBe(Result.TIE);

		});

		test(`wins`, () => {
            const hand1 = new PokerHand('AC AS 5S 8C AH');
            const hand2 = new PokerHand('4S 5S 8C AS AD');
            expect(hand1.compareWith(hand2)).toBe(Result.WIN);
        });

		test(`loses`, () => {
            const hand1 = new PokerHand('AC AS 5S 8C AH');
            const hand2 = new PokerHand('4S 5S 6S 7S 9S');
            expect(hand1.compareWith(hand2)).toBe(Result.LOSS);
        });



	});

});
