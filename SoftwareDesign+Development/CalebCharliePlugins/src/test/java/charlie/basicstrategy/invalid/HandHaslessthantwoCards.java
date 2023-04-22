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
public class HandHaslessthantwoCards {
    
    @Test
    public void test() {
       
        /* User Hand has 1 card, not 2 */
        Hand myHand = new Hand(new Hid(Seat.YOU));
        Card card1 = new Card(2, Card.Suit.CLUBS);
        //Card card2 = new Card(null);
        myHand.hit(card1);
        //myHand.hit(card2);

        // Dealer Upcard: K
        Card upCard = new Card(Card.KING, Card.Suit.HEARTS);

        // Advisor: NONE
        IAdvisor advisor = new Advisor();
        Play advice = advisor.advise(myHand, upCard);
        assertEquals(advice, Play.NONE);
    }
}
