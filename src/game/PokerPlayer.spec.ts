import { CardRank } from "./CardRank";
import { PokerCard } from "./PokerCard"
import { PokerPlayer } from "./PokerPlayer"

describe('PokerPlayer', () => {

    let player = new PokerPlayer(0);

    beforeEach(() => {
        player = new PokerPlayer(0);
    })

    describe('receiveCard', () => {
        it('should add card to player cards', () => {
            // Arrange
            const card = new PokerCard('heart', 3);
            // Act
            player.receiveCard(card);
            // Assert
            expect(player.getCards()).toContain(card);
            expect(player.getCards().length).toEqual(1);
        });

        it('should append card to player cards', () => {
            // Arrange
            const card1 = new PokerCard('heart', 2);
            const card2 = new PokerCard('spade', 13);
            // Act
            player.receiveCard(card1);
            player.receiveCard(card2);
            // Assert
            expect(player.getCards()).toEqual([
                card1, card2
            ])
        });
    });

    describe('receiveChips', () => {
        it('should add the amount to chips', () => {
            // Arrange
            const amount = 100;
            // Act
            player.receiveChips(amount);
            // Assert
            expect(player.getChips()).toEqual(100);
        });
    })

    describe('giveChips', () => {
        it('should remove the amount of chips if the player has enought chips', () => {
            // Arrange
            const amount = 100;
            player.receiveChips(500);
            // Act
            player.giveChips(amount);
            // Assert
            expect(player.getChips()).toEqual(400);
        });

        it('should add the amount to the player stash', () => {
            // Arrange
            const amount = 100;
            player.receiveChips(500);
            // Act
            player.giveChips(amount);
            // Assert
            expect(player.getStash()).toEqual(amount);
        })

        it('should add the amount to the player stash if stash is already set', () => {
            // Arrange
            player.receiveChips(500);
            // Act
            player.giveChips(10);
            player.giveChips(40);
            // Assert
            expect(player.getStash()).toEqual(50);
        });

        it('should give all his chips if he dont have the amount', () => {
            // Arrange
            player.receiveChips(10);
            // Act
            player.giveChips(100);
            // Assert
            expect(player.getStash()).toEqual(10);
            expect(player.getChips()).toEqual(0);
        });
    });

    describe('emptyCards', () => {
        it('should empty the cards', () => {
            // Arrange
            player.receiveCard(new PokerCard('spade', 4));
            player.receiveCard(new PokerCard('club', 8));
            // Act
            player.emptyCards();
            // Assert
            expect(player.getCards()).toEqual([]);
        });
    });
});