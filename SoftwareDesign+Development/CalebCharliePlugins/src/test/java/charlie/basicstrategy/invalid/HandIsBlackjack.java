package charlie.basicstrategy.invalid;

import static org.junit.Assert.*;

import org.junit.Test;

import charlie.card.Card;
import charlie.card.Hand;
import charlie.card.Hid;
import charlie.client.Advisor;
import charlie.dealer.Seat;
import charlie.plugin.IAdvisor;
import charlie.util.Play;

/**
 *
 * @author calebrogers
 */
public class HandIsBlackjack {
    
    @Test
    public void test() {
       
        // User Hand: A+10
        Hand myHand = new Hand(new Hid(Seat.YOU));
        Card card1 = new Card(Card.ACE, Card.Suit.CLUBS);
        Card card2 = new Card(10, Card.Suit.CLUBS);
        myHand.hit(card1);
        myHand.hit(card2);

        // Dealer Upcard: 2
        Card upCard = new Card(2, Card.Suit.HEARTS);

        // Advisor: NONE
        IAdvisor advisor = new Advisor();
        Play advice = advisor.advise(myHand, upCard);
        assertEquals(advice, Play.NONE);
    }
}
