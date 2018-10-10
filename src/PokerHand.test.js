import PokerHand, { Result } from './PokerHand.js';

describe('PokerHand', () => {

    describe("handling incorrect input",()=>{
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
        test("throw Error on valid input, but invalid characters",()=>{
            expect(()=>{handOne.validate("LC 4M KS NQ AH")}).toThrowError(Error);
            expect(()=>{handOne.validate("")}).toThrowError(/^Please provide a valid input$/);
        });

    });

	describe('compareWith()', () => {

		it(`ties`, () => {

			const hand1 = new PokerHand('AC 4S 5S 8C AH');
			const hand2 = new PokerHand('4S 5S 8C AS AD');

			expect(hand1.compareWith(hand2)).toBe(Result.TIE);

		});

	});

});
