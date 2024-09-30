import { HandEvaluator } from "./HandEvaluator";
import { PokerAction } from "./PokerAction";
import { PokerCard } from "./PokerCard";
import { PokerDeck } from "./PokerDeck";
import { PokerPlayer } from "./PokerPlayer";

export class PokerTable {
  private players: PokerPlayer[] = [];

  private playerTurn: number = 0;

  private deck: PokerDeck = new PokerDeck();

  private communautaryCards: PokerCard[] = [];

  private pot: number = 0;

  private extraPot: number = 0;

  private get globalPot(): number {
    return (
      this.pot +
      this.players.reduce((sum: number, p: PokerPlayer) => {
        sum = +p.getStash();
        return sum;
      }, 0)
    );
  }

  private handEvaluator: HandEvaluator = new HandEvaluator();

  private dealer = 0;

  private smallBlind = 5;

  constructor() {}

  addPlayer(player: PokerPlayer): void {
    this.players.push(player);
  }

  /**
   * Starts a new round of poker by changing the dealer, dealing initial cards, paying blinds,
   *  and beginning the play phase.
   */
  start(): void {
    this.changeDealer();
    this.dealInitialCards(this.dealer);
    this.payBlinds();
    this.playerTurn = this.getFirstPlayer();
    this.playPhase();
  }

  private playPhase(): void {
    const actions = this.getActions();
    // TODO: Finish implementation
  }

  private getActions() {
    const actions: PokerAction[] = [PokerAction.BET, PokerAction.FOLD];
    const previousPlayer = this.getPreviousPlayingPlayer();
    if (previousPlayer.getStash() > 0) {
      actions.push(PokerAction.CALL);
    } else if (
      previousPlayer.getLastAction() === PokerAction.CHECK ||
      previousPlayer.getLastAction() === PokerAction.NONE
    ) {
      actions.push(PokerAction.CHECK);
    }
    return actions;
  }
  private getFirstPlayer(): number {
    return (this.dealer + 2) % this.players.length;
  }

  /**
   * Checks if the player at the given index is the button.
   *
   * @param {number} playerIndex - The index of the player to check.
   * @return {boolean} True if the player is the button, false otherwise.
   */
  private isPlayerButton(playerIndex: number): boolean {
    const button = (this.dealer + 3) % this.players.length;
    return button === playerIndex;
  }

  /**
   * Pays the small and big blinds to the corresponding players.
   */
  private payBlinds() {
    const smallBlindIndex = this.getNextPlayerIndex(this.dealer);
    const smallBlindPlayer = this.players[smallBlindIndex];
    const bigBlindIndex = this.getNextPlayerIndex(smallBlindIndex);
    const bigBlindPlayer = this.players[bigBlindIndex];
    smallBlindPlayer.giveChips(this.smallBlind);
    bigBlindPlayer.giveChips(this.smallBlind * 2);
  }

  /**
   * Changes the dealer to the next player in the list, or assigns a random player as the dealer if no dealer is currently set.
   */
  private changeDealer() {
    if (this.dealer) {
      this.dealer = this.getNextPlayerIndex(this.dealer);
    } else {
      const randomPlayer = Math.floor(Math.random() * this.players.length);
      this.dealer = randomPlayer;
    }
  }

  private getNextPlayerIndex(actualPlayerIndex: number): number {
    let nextPlayer = actualPlayerIndex + 1;
    if (nextPlayer > this.players.length) {
      nextPlayer = 0;
    }
    return nextPlayer;
  }

  private getPreviousPlayerIndex(actualPlayerIndex: number): number {
    let index = actualPlayerIndex - 1;
    if (index < 0) {
      index = this.players.length - 1;
    }
    return index;
  }

  private getPreviousPlayer(): PokerPlayer {
    return this.players[this.getPreviousPlayerIndex(this.playerTurn)];
  }

  private getPreviousPlayingPlayer(): PokerPlayer {
    const previousPlayer = this.getPreviousPlayer();
    if (previousPlayer.isFolded) {
      return this.getPreviousPlayingPlayer();
    }
    return previousPlayer;
  }

  private getNextPlayer(): PokerPlayer {
    return this.players[this.getNextPlayerIndex(this.playerTurn)];
  }

  nextPhase(): void {
    if (this.communautaryCards.length === 0) {
      this.threeCardsPhase();
    }
    if (
      this.communautaryCards.length > 2 &&
      this.communautaryCards.length < 5
    ) {
      this.oneCardPhase();
    }
    if (this.communautaryCards.length === 5) {
      this.endRound();
    }
  }

  private dealInitialCards(dealerIndex: number): void {
    const firstPlayerServed = dealerIndex + 1;
    for (
      let index = firstPlayerServed;
      index < this.players.length * 2;
      index++
    ) {
      const playerIndex = index % this.players.length;
      const player = this.players[playerIndex];
      const card = this.deck.drawCard();
      player.receiveCard(card!);
    }
  }

  private threeCardsPhase(): void {
    this.deck.drawCard();
    for (let i = 0; i < 3; i++) {
      const card = this.deck.drawCard();
      this.communautaryCards.push(card!);
    }
  }

  private oneCardPhase(): void {
    this.deck.drawCard();
    const card = this.deck.drawCard();
    this.communautaryCards.push(card!);
  }

  private endRound(): void {
    const players = this.players.filter((player) => !player.isFolded);
    const sortedHands = players
      .map((player) => {
        const playerHand = player.getCards();
        return {
          ...this.handEvaluator.evaluate(playerHand, this.communautaryCards),
          player: player,
        };
      })
      .sort((previous, next) => previous.rank - next.rank);
    const ranking = sortedHands.reduce((counter, hand) => {
      const players = counter.get(hand.rank) || [];
      players.push(hand.player);
      counter.set(hand.rank, players);
      return counter;
    }, new Map<number, PokerPlayer[]>());
    const sortedRanking = Array.from(ranking.entries())
      .sort(([rankingA], [rankingB]) => rankingB - rankingA)
      .map(([rank, players]) => ({ rank, players }));
    const winners = sortedRanking[0].players;

    this.payPlayers(winners);

    const gameOver = this.checkGameOver();

    if (!gameOver) {
      this.start();
    } else {
      alert("Game Over");
    }
  }

  // this method should awards each winners the correct amount of chips based on the array winners, if a players won but has bet less chips that the other, we should award him at the same amount of chips as his bet quantity
  private payPlayers(winners: PokerPlayer[]) {
  
  }

  private checkGameOver(): boolean {
    return this.players.length < 2;
  }
}
