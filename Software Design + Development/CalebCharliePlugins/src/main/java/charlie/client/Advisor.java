package charlie.client;

import charlie.card.Card;
import charlie.card.Hand;
import charlie.plugin.IAdvisor;
import charlie.util.Play;

import org.apache.log4j.Logger;

/**
 *
 * @author calebrogers
 */
public class Advisor implements IAdvisor {
    protected BasicStrategy bs = new BasicStrategy();
    
    Logger LOG = null;
    public Advisor() {
        LOG = Logger.getLogger(Advisor.class);
    }

    /**
     * Gets advice using the Basic Strategy.
     * @param myHand Player hand
     * @param upCard Dealer up-card
     * @return Play advice
     */
    @Override
    public Play advise(Hand myHand, Card upCard) {
        
        LOG.info("[Advisor]: " + bs.getPlay(myHand, upCard));
        
        return bs.getPlay(myHand, upCard);
    }
    
}
