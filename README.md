# **Poker Hand Comparison**

Poker Hand Comparison is a little program that will compare two hands of poker according to the rules of [Texas Hold'em rules](https://en.wikipedia.org/wiki/Texas_hold_%27em#Hand_values).

## Requirements

The characteristics of the string of cards are:
* A space is used as card seperator
* Each card consists of two characters (not case sensitive)
* The first character is the value of the card, valid characters are: `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `T`(en), `J`(ack), `Q`(ueen), `K`(ing), `A`(ce)
* The second character represents the suit, valid characters are: `S`(pades), `H`(earts), `D`(iamonds), `C`(lubs)

The result of your poker hand compare can be one of these 3 options:
* WIN should return the integer `1`
* LOSS should return the integer `2`
* TIE should return the integer `3`

You are free to use any libraries you want but please do not anything that already evaluates poker hands ;)

Good luck!
