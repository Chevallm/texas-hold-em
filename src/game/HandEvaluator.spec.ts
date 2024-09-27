import { CardRank } from "./CardRank";
import { HandEvaluator } from "./HandEvaluator";
import { HandRank } from "./HandRank";
import { PokerCard } from "./PokerCard";

describe("HandEvaluator", () => {
  const he = new HandEvaluator();

  describe("evaluate", () => {
    it("should find Royal Flush", () => {
      // Arrange
      const playerCards = [
        new PokerCard("♥", CardRank.J),
        new PokerCard("♠", CardRank[10]),
      ];
      const cards = [
        new PokerCard("♥", CardRank.A),
        new PokerCard("♥", CardRank.K),
        new PokerCard("♥", CardRank.Q),
        new PokerCard("♥", CardRank[10]),
        new PokerCard("♣", CardRank[4]),
      ];

      // Act
      const hand = he.evaluate(playerCards, cards);

      // Assert
      expect(hand.rank).toEqual(HandRank.RoyalFlush);
      expect(hand.highestCard).toEqual(CardRank.J);
    });

    it("should find Straight Flush", () => {
      // Arrange
      const playerCards = [
        new PokerCard("♥", CardRank.J),
        new PokerCard("♥", CardRank[7]),
      ];
      const cards = [
        new PokerCard("♥", CardRank[10]),
        new PokerCard("♥", CardRank[9]),
        new PokerCard("♥", CardRank[8]),
        new PokerCard("♣", CardRank[10]),
        new PokerCard("♣", CardRank[4]),
      ];

      // Act
      const hand = he.evaluate(playerCards, cards);

      // Assert
      expect(hand.rank).toEqual(HandRank.StraightFlush);
      expect(hand.highestCard).toEqual(CardRank.J);
    });

    it("should find Four of a kind", () => {
      // Arrange
      const playerCards = [
        new PokerCard("♥", CardRank.A),
        new PokerCard("♥", CardRank[7]),
      ];
      const cards = [
        new PokerCard("♥", CardRank[10]),
        new PokerCard("♦", CardRank.A),
        new PokerCard("♣", CardRank.A),
        new PokerCard("♣", CardRank[10]),
        new PokerCard("♠", CardRank.A),
      ];

      // Act
      const hand = he.evaluate(playerCards, cards);

      // Assert
      expect(hand.rank).toEqual(HandRank.FourOfAKind);
      expect(hand.highestCard).toEqual(CardRank.A);
    });

    it("should find Full House", () => {
      // Arrange
      const playerCards = [
        new PokerCard("♥", CardRank.A),
        new PokerCard("♥", CardRank[10]),
      ];
      const cards = [
        new PokerCard("♥", CardRank[5]),
        new PokerCard("♦", CardRank.A),
        new PokerCard("♣", CardRank.J),
        new PokerCard("♣", CardRank[10]),
        new PokerCard("♠", CardRank.A),
      ];

      // Act
      const hand = he.evaluate(playerCards, cards);

      // Assert
      expect(hand.rank).toEqual(HandRank.FullHouse);
      expect(hand.highestCard).toEqual(CardRank.A);
    });

    it("should find Flush", () => {
      // Arrange
      const playerCards = [
        new PokerCard("♥", CardRank.K),
        new PokerCard("♥", CardRank[7]),
      ];
      const cards = [
        new PokerCard("♥", CardRank[6]),
        new PokerCard("♦", CardRank.A),
        new PokerCard("♥", CardRank.J),
        new PokerCard("♥", CardRank[10]),
        new PokerCard("♠", CardRank[5]),
      ];

      // Act
      const hand = he.evaluate(playerCards, cards);

      // Assert
      expect(hand.rank).toEqual(HandRank.Flush);
      expect(hand.highestCard).toEqual(CardRank.K);
    });

    it("should find Straight", () => {
      // Arrange
      const playerCards = [
        new PokerCard("♥", CardRank.J),
        new PokerCard("♥", CardRank[7]),
      ];
      const cards = [
        new PokerCard("♥", CardRank[10]),
        new PokerCard("♣", CardRank[9]),
        new PokerCard("♥", CardRank[8]),
        new PokerCard("♣", CardRank[10]),
        new PokerCard("♣", CardRank[4]),
      ];

      // Act
      const hand = he.evaluate(playerCards, cards);

      // Assert
      expect(hand.rank).toEqual(HandRank.Straight);
      expect(hand.highestCard).toEqual(CardRank.J);
    });

    it("should find Three of a kind", () => {
      // Arrange
      const playerCards = [
        new PokerCard("♥", CardRank.A),
        new PokerCard("♥", CardRank[7]),
      ];
      const cards = [
        new PokerCard("♥", CardRank[5]),
        new PokerCard("♦", CardRank.A),
        new PokerCard("♣", CardRank.J),
        new PokerCard("♣", CardRank[10]),
        new PokerCard("♠", CardRank.A),
      ];

      // Act
      const hand = he.evaluate(playerCards, cards);

      // Assert
      expect(hand.rank).toEqual(HandRank.ThreeOfAKind);
      expect(hand.highestCard).toEqual(CardRank.A);
    });

    it("should find Double Pair", () => {
      // Arrange
      const playerCards = [
        new PokerCard("♥", CardRank.A),
        new PokerCard("♥", CardRank[7]),
      ];
      const cards = [
        new PokerCard("♥", CardRank[5]),
        new PokerCard("♦", CardRank.A),
        new PokerCard("♣", CardRank.J),
        new PokerCard("♣", CardRank[10]),
        new PokerCard("♠", CardRank[5]),
      ];

      // Act
      const hand = he.evaluate(playerCards, cards);

      // Assert
      expect(hand.rank).toEqual(HandRank.DoublePair);
      expect(hand.highestCard).toEqual(CardRank.A);
    });

    it("should find Pair", () => {
      // Arrange
      const playerCards = [
        new PokerCard("♥", CardRank.Q),
        new PokerCard("♥", CardRank[7]),
      ];
      const cards = [
        new PokerCard("♥", CardRank[5]),
        new PokerCard("♦", CardRank.A),
        new PokerCard("♣", CardRank.J),
        new PokerCard("♣", CardRank[10]),
        new PokerCard("♠", CardRank[5]),
      ];

      // Act
      const hand = he.evaluate(playerCards, cards);

      // Assert
      expect(hand.rank).toEqual(HandRank.Pair);
      expect(hand.highestCard).toEqual(CardRank.Q);
    });

    it("should find High Card (K)", () => {
      // Arrange
      const playerCards = [
        new PokerCard("♥", CardRank.K),
        new PokerCard("♥", CardRank[7]),
      ];
      const cards = [
        new PokerCard("♥", CardRank[6]),
        new PokerCard("♦", CardRank.A),
        new PokerCard("♣", CardRank.J),
        new PokerCard("♣", CardRank[10]),
        new PokerCard("♠", CardRank[5]),
      ];

      // Act
      const hand = he.evaluate(playerCards, cards);

      // Assert
      expect(hand.rank).toEqual(HandRank.HighCard);
      expect(hand.highestCard).toEqual(CardRank.K);
    });
  });
});
