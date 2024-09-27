import { CardRank } from "./CardRank";
import { CardSuit } from "./CardSuit";
import { PokerCard } from "./PokerCard";

export class PokerDeck {
  private cards: PokerCard[] = [];

  constructor() {
    this.initializeDeck();
    this.shuffle();
  }

  drawCard(): PokerCard | undefined {
    return this.cards.pop();
  }

  private initializeDeck(): void {
    Object.values(CardSuit).forEach((suit) => {
      Object.values(CardRank).forEach((rank) => {
        const card = new PokerCard(suit, rank);
        this.cards.push(card);
      });
    });
  }

  private shuffle(): void {
    for (let cardIndex = 0; cardIndex < this.cards.length - 1; cardIndex++) {
      const randomIndex = Math.floor(Math.random() * (cardIndex + 1));
      // Inversion
      [this.cards[cardIndex], this.cards[randomIndex]] = [
        this.cards[randomIndex],
        this.cards[cardIndex],
      ];
    }
  }
}
