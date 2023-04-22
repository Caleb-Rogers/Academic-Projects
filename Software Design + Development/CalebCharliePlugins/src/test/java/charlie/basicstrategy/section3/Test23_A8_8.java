package charlie.basicstrategy.section3;

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
public class Test23_A8_8 {
    
    @Test
    public void test() {
       
        // User Hand: A+8
        Hand myHand = new Hand(new Hid(Seat.YOU));
        Card card1 = new Card(Card.ACE, Card.Suit.SPADES);
        Card card2 = new Card(8, Card.Suit.HEARTS);
        myHand.hit(card1);
        myHand.hit(card2);

        // Dealer Upcard: 8
        Card upCard = new Card(8, Card.Suit.SPADES);

        // Advisor: STAY
        IAdvisor advisor = new Advisor();
        Play advice = advisor.advise(myHand, upCard);
        assertEquals(advice, Play.STAY);
    }
}