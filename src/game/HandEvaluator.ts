import { CardRank } from "./CardRank";
import { HandRank } from "./HandRank";
import { PokerCard } from "./PokerCard";

export class HandEvaluator {

    evaluate(playerCards: PokerCard[], communautaryCards: PokerCard[]): {rank: HandRank, highestCard: number} {
        const cards = [...playerCards, ...communautaryCards];

        const sortedRanksCounter = Array.from(this.countRanks(cards).entries())
            .sort(([,countA], [,countB]) => countB - countA);
        const straight = this.checkStraight(cards);
        const flush = this.checkFlush(cards);
        const highestPlayerCard = this.getHighestCard(playerCards);
        const highestCard = this.getHighestCard(cards);

        let handRank = HandRank.HighCard;
        if (flush && straight && highestCard.rank === CardRank.A) {
            handRank = HandRank.RoyalFlush
        }
        else if (flush && straight) {
            handRank = HandRank.StraightFlush
        }
        else if (sortedRanksCounter[0][1] === 4) {
            handRank = HandRank.FourOfAKind
        }
        else if (sortedRanksCounter[0][1] === 3 && sortedRanksCounter[1][1] === 2) {
            handRank = HandRank.FullHouse
        }
        else if (flush) {
            handRank = HandRank.Flush
        }
        else if (straight) {
            handRank = HandRank.Straight
        }
        else if (sortedRanksCounter[0][1] === 3) {
            handRank = HandRank.ThreeOfAKind
        }
        else if (sortedRanksCounter[0][1] === 2 && sortedRanksCounter[1][1] === 2) {
            handRank = HandRank.DoublePair
        }
        else if (sortedRanksCounter[0][1] === 2) {
            handRank = HandRank.Pair
        }
        return {rank: handRank, highestCard: highestPlayerCard.rank}
    }


    private getHighestCard(cards: PokerCard[]): PokerCard {
        const sortedCards = this.sortCards([...cards]);
        return sortedCards.pop()!;
    }

    private countRanks(cards: PokerCard[]): Map<number, number> {
        return cards.reduce((counter, card) => {
            const count = counter.get(card.rank) || 0;
            counter.set(card.rank, count + 1);
            return counter;
        }, new Map<number, number>());
    }

    private checkFlush(cards: PokerCard[]): boolean {
        const flushMap = new Map<string, number>();
        for (let cardIndex = 0; cardIndex < cards.length; cardIndex++) {
            const card = cards[cardIndex];
            const counter = flushMap.get(card.suit) || 0;
            const nextValue = counter + 1;
            if (nextValue > 4) {
                return true;
            }
            flushMap.set(card.suit, counter + 1);
        }
        return false;
    }

    private checkStraight(cards: PokerCard[]): boolean {
        let straight = 0;
        const sortedRanks = Array.from(new Set(this.sortCards(cards).map(card => card.rank)));
        for (let actualCardIndex = 0; actualCardIndex < cards.length - 1; actualCardIndex++) {
            if (sortedRanks[actualCardIndex] + 1 !== sortedRanks[actualCardIndex + 1]) {
                straight = 0;
            }
            straight++;
            if (straight > 4) {
                return true;
            }
        }
        return false;
    }

    private sortCards(cards: PokerCard[]): PokerCard[] {
        return cards.sort((a, b) => a.rank - b.rank);
    }
}