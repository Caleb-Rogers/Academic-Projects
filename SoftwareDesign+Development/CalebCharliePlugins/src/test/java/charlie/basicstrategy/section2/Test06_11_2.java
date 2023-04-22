package charlie.basicstrategy.section2;

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
public class Test06_11_2 {
    
    @Test
    public void test() {
       
        // User Hand: 8+3
        Hand myHand = new Hand(new Hid(Seat.YOU));
        Card card1 = new Card(8, Card.Suit.SPADES);
        Card card2 = new Card(3, Card.Suit.HEARTS);
        myHand.hit(card1);
        myHand.hit(card2);

        // Dealer Upcard: 2
        Card upCard = new Card(2, Card.Suit.SPADES);

        // Advisor: DOUBLE DOWN
        IAdvisor advisor = new Advisor();
        Play advice = advisor.advise(myHand, upCard);
        assertEquals(advice, Play.DOUBLE_DOWN);
    }
}