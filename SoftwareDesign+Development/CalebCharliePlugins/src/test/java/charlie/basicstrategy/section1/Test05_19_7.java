package charlie.basicstrategy.section1;

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
public class Test05_19_7 {
    
    @Test
    public void test() {
       
        // User Hand: 9+10
        Hand myHand = new Hand(new Hid(Seat.YOU));
        Card card1 = new Card(9, Card.Suit.SPADES);
        Card card2 = new Card(10, Card.Suit.HEARTS);
        myHand.hit(card1);
        myHand.hit(card2);

        // Dealer Upcard: 7
        Card upCard = new Card(7, Card.Suit.SPADES);

        // Advisor: STAY
        IAdvisor advisor = new Advisor();
        Play advice = advisor.advise(myHand, upCard);
        assertEquals(advice, Play.STAY);
    }
}