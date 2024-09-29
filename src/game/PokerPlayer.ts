import { PokerAction } from "./PokerAction";
import { PokerCard } from "./PokerCard";

export class PokerPlayer {
  private cards: PokerCard[] = [];
  private chips: number = 0;
  isFolded: boolean = false;
  private stash = 0;
  private lastAction: PokerAction = PokerAction.NONE;

  constructor(tokens: number) {
    this.chips = tokens;
  }

  receiveCard(card: PokerCard) {
    this.cards.push(card);
  }

  emptyCards(): void {
    this.cards = [];
  }

  receiveChips(amount: number): void {
    this.chips += amount;
  }

  giveChips(amount: number): void {
    if (this.chips < amount) {
      const chipsGiven = this.chips;
      this.chips = 0;
      this.stash = chipsGiven;
    } else {
      this.chips -= amount;
      this.stash += amount;
    }
    
  }

  getCards(): PokerCard[] {
    return this.cards;
  }

  getStash(): number {
    return this.stash;
  }

  getChips(): number {
    return this.chips;
  }

  getLastAction(): PokerAction {
    return this.lastAction;
  }

  setLastAction(action: PokerAction): void {
    this.lastAction = action;
  }
}
