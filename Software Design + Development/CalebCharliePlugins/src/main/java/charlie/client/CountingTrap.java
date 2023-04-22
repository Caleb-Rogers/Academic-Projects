package charlie.client;
import charlie.card.Card;
import charlie.message.Message;
import charlie.message.view.to.Deal;
import charlie.plugin.ITrap;
import org.apache.log4j.Logger;
import charlie.message.view.to.GameStart;
import charlie.message.view.to.Shuffle;


/**
 * 
 * @author Caleb Rogers, Prudvi Raj Ravula
 */
public class CountingTrap implements ITrap {
    private final Logger LOG = Logger.getLogger(CountingTrap.class);
    private int shoesize = 52;
    private int runningCount = 0;
    private double numDecks = 0.0;
    private int trueCount = 0;
    private int betAmt = 0;
    private boolean shuffleEndOfGame = false;

    @Override
    public void onSend(Message msg) {
        LOG.info("onSend overriding function fromCountingTrap.java file");
    }
    
    @Override
    public void onReceive(Message msg) {
        LOG.info("onReceive overriding function fromCountingTrap.java file");

        if(msg instanceof GameStart) {
            GameStart gamestart = (GameStart)msg;
            this.shoesize = gamestart.shoeSize();
            
            if (this.shuffleEndOfGame) {
                this.runningCount = 0;
                this.numDecks = 0.0;
                this.trueCount = 0;
                this.betAmt = 0;
                this.shuffleEndOfGame = false;
            }
        }

        if(msg instanceof Deal) {
            --this.shoesize;
            Deal deal = (Deal)msg;
            Card card = deal.getCard();

            if(card == null) return;

            if(card.getRank() == 10 || card.isFace() || card.isAce()) {
                this.runningCount -= 1;
                LOG.info("decrement runningCount: " + this.runningCount);
            } 
            else if(card.getRank() <= 6) {
                this.runningCount += 1;
                LOG.info("increment runningCount: " + this.runningCount);
            }

            this.numDecks = this.shoesize / 52.0;
            this.trueCount = (int) Math.round((this.runningCount / this.numDecks));
            this.betAmt = Math.max(1,(trueCount + 1));

            LOG.info("[CountingTrap]: "
                + "| shoeSize: " + this.shoesize
                + "| numDecks: " + this.numDecks
                + "| runningCount: " + this.runningCount
                + "| trueCount: " + this.trueCount
                + "| bet amount: " + this.betAmt);
        }
        
        // Burn card
        if(msg instanceof Shuffle) {
            this.shuffleEndOfGame = true;
        }
    }
    
    public int getShoeSize() {
        return this.shoesize;
    }
}