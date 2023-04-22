package charlie.sidebetodds;

import charlie.card.Card;
import charlie.card.Shoe;

/**
 *
 * @author calebrogers
 */
public class RoyalMatch {
    
    public final static int NUM_SAMPLES = 100000;
    
    public static void main(String args[]) {
        
        Shoe deck = new Shoe(1);
        int count = 0;

        for(int i=1; i<=NUM_SAMPLES; i++) {
            deck.init();
            Card playerCard1 = deck.next();
            deck.next();
            Card playerCard2 = deck.next();
            deck.next();
            
            if(playerCard1.getRank() == Card.KING) {
                if(playerCard2.getRank() == Card.QUEEN && playerCard1.getSuit().equals(playerCard2.getSuit())) {
                    count++;
                }
            } else if(playerCard1.getRank() == Card.QUEEN) {
                if(playerCard2.getRank() == Card.KING && playerCard1.getSuit().equals(playerCard2.getSuit())) {
                    count++;
                }
            }
        }
        
        double p = (count / (double)NUM_SAMPLES);
        int odds = (int) (((1 - p) / p) + 0.5);

        System.out.println("Royal Match prob = " + String.format("%.6f", p) + " odds = "+(int)odds+":1");
    }
}