import { PokerCard } from "./PokerCard";

export class PokerPlayer {
  public name: string = "";
  private cards: PokerCard[] = [];
  private chips: number = 0;
  isFolded: boolean = false;
  private stash = 0;

  constructor(tokens: number) {
    this.chips = tokens;
  }

  receiveCard(card: PokerCard) {
    this.cards.push(card);
  }

  receiveChips(amount: number): void {
    this.chips += amount;
  }

  giveChips(amount: number): void {
    if (this.chips < amount) {
      const chipsGiven = this.chips;
      this.chips = 0;
      this.stash = chipsGiven;
    }
    this.chips -= amount;
    this.stash = amount;
  }

  getCards(): PokerCard[] {
    return this.cards;
  }

  getStash(): number {
    return this.stash;
  }
}
