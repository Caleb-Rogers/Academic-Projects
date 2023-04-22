package charlie.sidebet.test;

import charlie.card.Card;

/**
 * A unit test shoe
 * @author calebrogers
 */
public class Shoe extends charlie.card.Shoe {
	/**
	 * Initializes the shoe.
	 */
    @Override
    public void init() {
        
        System.out.println("charlie.sidebet.test.Shoe.java was ran ???");
        
        cards.clear();
        
        // Test case #1
        cards.add(new Card(7,Card.Suit.HEARTS));
        cards.add(new Card(Card.KING,Card.Suit.CLUBS));

        cards.add(new Card(9,Card.Suit.SPADES));
        cards.add(new Card(9,Card.Suit.DIAMONDS));

        cards.add(new Card(3,Card.Suit.CLUBS));

        // Test case #2
        cards.add(new Card(7,Card.Suit.HEARTS));
        cards.add(new Card(Card.KING,Card.Suit.CLUBS));

        cards.add(new Card(9,Card.Suit.SPADES));
        cards.add(new Card(8,Card.Suit.DIAMONDS));

        cards.add(new Card(3,Card.Suit.CLUBS));

        // Test case #3
        cards.add(new Card(9,Card.Suit.HEARTS));
        cards.add(new Card(Card.KING,Card.Suit.CLUBS));

        cards.add(new Card(7,Card.Suit.SPADES));
        cards.add(new Card(8,Card.Suit.DIAMONDS));

        cards.add(new Card(3,Card.Suit.CLUBS));
        
        // Test case #4
        cards.add(new Card(7,Card.Suit.HEARTS));
        cards.add(new Card(Card.KING,Card.Suit.CLUBS));

        cards.add(new Card(9,Card.Suit.SPADES));
        cards.add(new Card(10,Card.Suit.DIAMONDS));

        cards.add(new Card(3,Card.Suit.CLUBS));
        
        // Test case #5
        cards.add(new Card(9,Card.Suit.HEARTS));
        cards.add(new Card(Card.KING,Card.Suit.CLUBS));

        cards.add(new Card(7,Card.Suit.SPADES));
        cards.add(new Card(10,Card.Suit.DIAMONDS));

        cards.add(new Card(3,Card.Suit.CLUBS));
        
        // Test case #6
        cards.add(new Card(Card.KING,Card.Suit.HEARTS));
        cards.add(new Card(Card.KING,Card.Suit.CLUBS));
        
        cards.add(new Card(Card.QUEEN,Card.Suit.HEARTS));
        cards.add(new Card(8,Card.Suit.SPADES));
        
        // Test case #7
        cards.add(new Card(Card.KING,Card.Suit.HEARTS));
        cards.add(new Card(Card.KING,Card.Suit.CLUBS));
        
        cards.add(new Card(Card.QUEEN,Card.Suit.DIAMONDS));
        cards.add(new Card(8,Card.Suit.DIAMONDS));
        
        // Test case #8
        cards.add(new Card(8,Card.Suit.HEARTS));
        cards.add(new Card(Card.KING,Card.Suit.CLUBS));
        
        cards.add(new Card(5,Card.Suit.SPADES));
        cards.add(new Card(6,Card.Suit.DIAMONDS));
        
        cards.add(new Card(Card.KING,Card.Suit.SPADES));
        
        // Test case #9
        cards.add(new Card(7,Card.Suit.CLUBS));
        cards.add(new Card(Card.KING,Card.Suit.DIAMONDS));
        
        cards.add(new Card(6,Card.Suit.HEARTS));
        cards.add(new Card(6,Card.Suit.DIAMONDS));
        
        cards.add(new Card(Card.KING,Card.Suit.SPADES));
        
        // Test case #10
        cards.add(new Card(6,Card.Suit.SPADES));
        cards.add(new Card(Card.KING,Card.Suit.DIAMONDS));
        
        cards.add(new Card(8,Card.Suit.CLUBS));
        cards.add(new Card(6,Card.Suit.DIAMONDS));
        
        cards.add(new Card(Card.KING,Card.Suit.HEARTS));
        
        
    }

    /**
     * Returns true if shuffle needed.
     * @return True if shuffle needed, false otherwise.
     */
    @Override
    public boolean shuffleNeeded() {
        return false;
    }
}