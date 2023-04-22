package charlie.sidebet.rule;

import charlie.card.Card;
import charlie.card.Hand;
import charlie.plugin.ISideBetRule;
import org.apache.log4j.Logger;

/**
 * This class implements the side bet rule for Super 7.
 * @author calebrogers
 */
public class SideBetRule implements ISideBetRule {
    private final Logger LOG = Logger.getLogger(SideBetRule.class);

    private final Double PAYOFF_SUPER7 = 3.0;
    private final Double PAYOFF_ROYALMATCH = 25.0;
    private final Double PAYOFF_EXACTLY13 = 1.0;

    /**
     * Apply rule to the hand and return the payout if the rule matches
     * and the negative bet if the rule does not match.
     * @param hand Hand to analyze.
     * @return Payout amount: <0 lose, >0 win, =0 no bet
     */
    @Override
    public double apply(Hand hand) {
        
        /*
            if (!isHandValid(hand)) {
                LOG.error("Hand is not valid"+hand);
                return 0.0;
            }
        */
        
        Double bet = hand.getHid().getSideAmt();
        LOG.info("side bet amount = "+bet);

        if(bet == 0)
            return 0.0;

        LOG.info("side bet rule applying hand = "+hand);

        Card firstcard = hand.getCard(0);
        Card secondcard = hand.getCard(1);
        
        if((firstcard.getRank() == firstcard.QUEEN &&  secondcard.getRank() == secondcard.KING)
            || (firstcard.getRank() == firstcard.KING &&  secondcard.getRank() == secondcard.QUEEN)
            && (firstcard.getSuit() == secondcard.getSuit())) 
        {
            LOG.info("side bet ROYAL MATCH matches");
            return bet * PAYOFF_ROYALMATCH;
        }

        if(firstcard.getRank() == 7) {
            LOG.info("side bet SUPER 7 matches");
            return bet * PAYOFF_SUPER7;
        }
        
        if((firstcard.getRank() + secondcard.getRank() == 13)) {
            LOG.info("side bet EXACTLY 13 matches");
            return bet * PAYOFF_EXACTLY13;
                
            }

        LOG.info("side bet rule no match");

        return -bet;
    }
}