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
public class HandHasZeroCards {
    
    @Test
    public void test() {
       
        /* User Hand has 0 cards */
        Hand myHand = new Hand(new Hid(Seat.YOU));
        //Card card1 = new Card(null);
        //Card card2 = new Card(null);
        //myHand.hit(card1);
        //myHand.hit(card2);

        // Dealer Upcard: K
        Card upCard = new Card(Card.KING, Card.Suit.HEARTS);

        // Advisor: NONE
        IAdvisor advisor = new Advisor();
        Play advice = advisor.advise(myHand, upCard);
        assertEquals(advice, Play.NONE);
    }
}
