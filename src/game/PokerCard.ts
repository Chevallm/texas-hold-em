export class PokerCard {

    rank: number;
    suit: string;

    constructor(suit: string, rank: number) {
        this.suit = suit;
        this.rank = rank;
    }

    toString(): string {
        return `${this.rank} of ${this.suit}`;
    }
}