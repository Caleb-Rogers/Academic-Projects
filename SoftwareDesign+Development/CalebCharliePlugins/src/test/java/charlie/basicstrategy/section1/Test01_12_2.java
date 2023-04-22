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
public class Test01_12_2 {
    
    @Test
    public void test() {
       
        // User Hand: 8+4
        Hand myHand = new Hand(new Hid(Seat.YOU));
        Card card1 = new Card(8, Card.Suit.SPADES);
        Card card2 = new Card(4, Card.Suit.HEARTS);
        myHand.hit(card1);
        myHand.hit(card2);

        // Dealer Upcard: 2
        Card upCard = new Card(2, Card.Suit.SPADES);

        // Advisor: HIT
        IAdvisor advisor = new Advisor();
        Play advice = advisor.advise(myHand, upCard);
        assertEquals(advice, Play.HIT);
    }
}