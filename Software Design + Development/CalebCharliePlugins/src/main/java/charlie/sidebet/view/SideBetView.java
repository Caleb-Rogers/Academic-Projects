package charlie.sidebet.view;

import charlie.audio.Effect;
import charlie.audio.SoundFactory;
import charlie.card.Hid;
import charlie.plugin.ISideBetView;
import charlie.view.AMoneyManager;
import charlie.view.sprite.AtStakeSprite;
import charlie.view.sprite.Chip;

import charlie.view.sprite.ChipButton;
import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics2D;
import java.util.ArrayList;
import java.util.List;
import org.apache.log4j.Logger;


/**
 * This class implements the side bet view
 * @author calebrogers
 */
public class SideBetView implements ISideBetView {
    private final Logger LOG = Logger.getLogger(SideBetView.class);

    public final static int X = 425;
    public final static int Y = 200;
    public final static int DIAMETER = 50;

    protected Font font = new Font("Arial", Font.BOLD, 18);
    protected Font fontPayouts = new Font("Arial", Font.BOLD, 15);
    protected BasicStroke stroke = new BasicStroke(3);

    protected float dash1[] = {10.0f};
    protected BasicStroke dashed
            = new BasicStroke(3.0f,
                    BasicStroke.CAP_BUTT,
                    BasicStroke.JOIN_MITER,
                    10.0f, dash1, 0.0f);

    protected List<ChipButton> buttons;
    protected int amt = 0;
    protected int p = 0;
    protected int q = 0;
    private double Payment;
    Graphics2D graphicsObject;
    protected AMoneyManager moneyManager;
    
    protected List<Chip> chips = new ArrayList<>();
    
    protected AtStakeSprite sideBetWager = new AtStakeSprite(X,Y,0);
    
    
    
    public SideBetView() {
        LOG.info("side bet view constructed");
    }

    /**
     * Sets the money manager.
     * @param moneyManager
     */
    @Override
    public void setMoneyManager(AMoneyManager moneyManager) {
        this.moneyManager = moneyManager;
        this.buttons = moneyManager.getButtons();
    }

    /**
     * Registers a click for the side bet.
     * This method gets invoked on right mouse click.
     * @param x X coordinate
     * @param y Y coordinate
     */
    @Override
    public void click(int x, int y) {
        int oldAmt = amt;

        // Test if any chip button has been pressed.
        for(ChipButton button: buttons) {
            if(button.isPressed(x, y)) {
                
                // update bet and play sound for side bets
                amt += button.getAmt();
                SoundFactory.play(Effect.CHIPS_IN);
                LOG.info("A. side bet amount "+button.getAmt()+" updated new amt = "+amt);
                
                // add sidebet to array of Chip instances
                p = (int) ((425 + Math.random()*20)+ chips.size() * 5);
                q = (int) (170 + (Math.random()*20));
                Chip chip = new Chip(button.getImage(),p,q,amt);
                chips.add(chip);
            }
        }
        
            if(oldAmt == amt) {
                amt = 0;
                SoundFactory.play(Effect.CHIPS_OUT); // play sound when clear sidebet
                chips.clear();
                LOG.info("B. side bet amount cleared");
            }
        
    }

    /**
     * Informs view the game is over and it's time to update the bankroll for the hand.
     * @param hid Hand id
     */
    @Override
    public void ending(Hid hid) {
        double bet = hid.getSideAmt();

        if(bet == 0)
            return;
        
        LOG.info("side bet outcome = "+bet);

        // Update the bankroll
        moneyManager.increase(bet);
        Payment = bet;

        LOG.info("new bankroll = "+moneyManager.getBankroll());
    }

    /**
     * Informs view the game is starting.
     */
    @Override
    public void starting() {
        Payment = 0;
        
    }

    /**
     * Gets the side bet amount.
     * @return Bet amount
     */
    @Override
    public Integer getAmt() {
        return amt;
    }

    /**
     * Updates the view.
     */
    @Override
    public void update() {
    }

    /**
     * Renders the view.
     * @param g Graphics context
     */
    @Override
    public void render(Graphics2D g) {
        // Draw the at-stake place on the table
        graphicsObject = g;
        g.setColor(Color.RED);
        g.setStroke(dashed);
        g.drawOval(X-DIAMETER/2, Y-DIAMETER/2, DIAMETER, DIAMETER);

        // Draw the at-stake amount
        g.setFont(font);
        g.setColor(Color.WHITE);
        g.drawString(""+amt, X-5, Y+5);
        
        // Hi-Lo
        g.setColor(Color.GRAY);
        g.drawString("Side Bet Odds", X + 50, Y + 80);
        
        // Each Sidebet Payout  
        g.setFont(fontPayouts);
        g.setColor(Color.WHITE);
        g.drawString("SUPER 7 pays 3:1", X + 50, Y + 100);
        g.drawString("ROYAL MATCH pays 25:1", X + 50, Y + 120);
        g.drawString("EXACTLY 13 pays 1:1", X + 50, Y + 140);
    
        // Draw the chips
        for(Chip chip : chips) {
            chip.render(g);
        }
        renderStake(graphicsObject);
    }

     /**
     * renderStake method 
     * Renders highlight “WIN” or “LOSE”, respectively, over the at-stake chips, if the side bet wins or loses respectively. 
     * @param 
     */
        
    public void renderStake(Graphics2D g) {
        try {
            String res;

            if (Payment == 0) {
                return;
            } else if (Payment >= amt) {
                res = "WIN";
            } else {
                res = "LOSE";
            }

            if ("LOSE".equals(res)) {
                g.setColor(new Color(205, 92, 92));
            } else if ("WIN".equals(res)) {
                g.setColor(new Color(0, 255, 0));
            }

            Font f = new Font("Arial", Font.BOLD, 18);
            FontMetrics metrics = g.getFontMetrics(f);
            
            String Text = " " + res.toUpperCase() + " ! ";
           
            int w = metrics.charsWidth(Text.toCharArray(), 0, 
                    Text.length());
            int h = metrics.getHeight();
            g.fillRoundRect(X + 10, Y - h + 50, w, h, 5, 5);

            if ("LOSE".equals(res)) {
                g.setColor(Color.WHITE);
            } else if ("WIN".equals(res)) {
                g.setColor(Color.BLACK);
            }

            g.setFont(f);
            g.drawString(Text, X + 10, Y + 45);
        } 
        catch (Exception ex) {
            System.out.println("Error in SideBetView() renderStake method:" + ex.getMessage());
        }
    }
}