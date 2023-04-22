package charlie.server.bot;

import charlie.client.BasicStrategy;

import charlie.card.Card;
import charlie.card.Hand;
import charlie.util.Play;

/**
 *
 * @author Caleb Rogers, Prudvi Raj Ravula
 */
public class BotBasicStrategy extends BasicStrategy {
    
    @Override
    public Play getPlay(Hand hand, Card upCard) {
        
        // get Play
        Play play = super.getPlay(hand,upCard);
        
        // continue if not SPLIT
        if(play != play.SPLIT) {
          return play;
        }
        // else handle Play on SPLIT
        else if(play == play.SPLIT) {
            if(hand.isPair()) {
                if(hand.getValue() >= 4 && hand.getValue() < 12) {
                    return super.doSection2(hand,upCard);
                }
                if(hand.getValue() >= 12 && hand.getValue() < 22) {
                    return super.doSection1(hand,upCard);
                }
            }
        }
        
        return Play.NONE;
    }
    
}
