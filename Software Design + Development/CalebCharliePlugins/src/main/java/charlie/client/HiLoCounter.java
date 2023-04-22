package charlie.client;

import charlie.card.Card;
import charlie.plugin.ICardCounter;
import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.Font;
import java.text.DecimalFormat;
import org.apache.log4j.Logger;

/**
 *
 * @author Caleb Rogers, Prudvi Raj Ravula 
 */
public class HiLoCounter implements ICardCounter {
    
    private final Logger LOG = Logger.getLogger(HiLoCounter.class);
    
    public final static int startingX = 15;
    public final static int startingY = 280;
    public final static int xOffset = 20;
    public final static int yOffset = 20;
    public final static int DIAMETER = 50;
    protected Font font = new Font("Arial", Font.BOLD, 18);
    protected Font fontPayouts = new Font("Arial", Font.BOLD, 15);
    protected BasicStroke stroke = new BasicStroke(3);
    
    double shoeSize = 0.0;
    double numDecks = 0.0;
    int runningCount = 0;
    int trueCount = 0;
    int betChips = 1;
    boolean shufflePending = false;
    
    private static final DecimalFormat df = new DecimalFormat("0.00");
    

    @Override
    public void startGame(int shoeSize) {
        this.shoeSize = shoeSize;
        LOG.info("[HiLoCounter - DEBUG]: Shoe Size " + shoeSize);
        this.numDecks = this.shoeSize/52.0;
        // If burn card
        if (shufflePending) {
            this.runningCount = 0;
            this.trueCount = 0;
            this.betChips = 1;
            this.shufflePending = false;
        }
    }

    @Override
    public void endGame(int shoeSize) { }

    @Override
    public void update(Card card) {
        // remove a card from shoe
        --this.shoeSize;
        this.numDecks = this.shoeSize/52.0;
        
        // determine running count
        if(card.getRank() == 10 || card.isFace() || card.isAce()) {
            this.runningCount -= 1;
            LOG.info("decrement runningCount: " + this.runningCount);
        } 
        else if(card.getRank() <= 6) {
            this.runningCount += 1;
            LOG.info("increment runningCount: " + this.runningCount);
        }
        
        // calculate true count & bet amoount
        this.trueCount = (int) Math.round((this.runningCount / this.numDecks));
        this.betChips = Math.max(1,(trueCount + 1));
        
        LOG.info("[HiLoCounter]: "
                + " | shoeSize: " + this.shoeSize
                + " | numDecks: " + this.numDecks
                + " | runningCount: " + this.runningCount
                + " | trueCount: " + this.trueCount
                + " | bet amount: " + this.betChips);
    }

    @Override
    public void render(Graphics2D g) {        
       
        // Hi-Lo
        g.setColor(Color.GRAY);
        g.setFont(font);
        g.drawString("Hi-Lo Card Counting", startingX, startingY);
        
        // set font
        g.setFont(fontPayouts);
        
        // Shoe Size
        g.setColor(Color.WHITE);
        g.drawString("Shoe Size: ", startingX, (startingY+yOffset));
        g.drawString(Double.valueOf(df.format(this.numDecks)).toString(), (startingX+80),(startingY+yOffset));
        
        // Running Count
        g.setColor(Color.WHITE);
        g.drawString("Running Count: ", startingX, (startingY+(yOffset*2)));
        g.setColor(determineColor(this.runningCount));
        g.drawString(Double.valueOf(this.runningCount).toString(), (startingX+115),(startingY+(yOffset*2)));
        
        // True Count
        g.setColor(Color.WHITE);
        g.drawString("True Count: ", startingX, (startingY+(yOffset*3)));
        g.setColor(determineColor(this.trueCount));
        g.drawString(Double.valueOf(this.trueCount).toString(), (startingX+88),(startingY+(yOffset*3)));
                
        // Bet
        g.setColor(Color.WHITE);
        g.drawString("Bet chips: ", startingX, (startingY+(yOffset*4)));
        g.drawString(Double.valueOf(this.betChips).toString(), (startingX+75),(startingY+(yOffset*4)));
    }

    @Override
    public void shufflePending() {
        shufflePending = true;
    }
    
    public int getBetChips() {
        return this.betChips;   
    }
    
    private Color determineColor(int count) {
        Color color = Color.WHITE;
        if (count < 0) {
            color = Color.RED;
        } 
        else if ((count >= 0) && (count <= 2)) {
            color = Color.YELLOW;
        }
        else if (count > 2) {
            color = Color.GREEN;
        }
        return color;
    }
   
}
