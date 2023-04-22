
package charlie.sidebetodds;

import charlie.card.Card;
import charlie.card.Shoe;

/**
 *
 * @author calebrogers
 */
public class Exactly13 {
    
    public final static int NUM_SAMPLES = 100000; //1,326 //100000
    
    public static void main(String args[]) {
        
        Shoe deck = new Shoe(1);
        int count = 0;

        for(int i=1; i<=NUM_SAMPLES; i++) {
            deck.init();
            Card playerCard1 = deck.next();
            Card dealerCard = deck.next();
            Card playerCard2 = deck.next();
            
            if((playerCard1.getRank() + playerCard2.getRank()) == 13) {
                // if Exactly 13, then increase count
                count++;
            }  
        }
        
        double p = (count / (double)NUM_SAMPLES);
        int odds = (int) (((1 - p) / p) + 0.5);

        System.out.println("Exactly 13 prob = " + String.format("%.6f", p) + " odds = "+(int)odds+":1");
    }
}