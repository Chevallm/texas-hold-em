import { CardRank } from "./CardRank";
import { CardSuit } from "./CardSuit";
import { PokerCard } from "./PokerCard";
import { PokerDeck } from "./PokerDeck"

describe('PokerDeck', () => {

    let deck = new PokerDeck();

    beforeEach(() => {
        deck = new PokerDeck();
    });

    describe('drawCard', () => {
        it('should return the first card', () => {
            // Act
            const card = deck.drawCard();
            // Assert
            expect(card).toBeDefined();
        });
    });

    describe('sort', () => {
        it('should sort cards', () => {
            // Arrange
            const sortedCards: PokerCard[] = [];
            Object.values(CardSuit).forEach(suit => {
                Object.values(CardRank).forEach(rank => {
                    const card = new PokerCard(suit, rank);
                    sortedCards.push(card);
                });
            });
            // Assert
            expect(deck['cards']).not.toEqual(sortedCards);
        })
    })
})