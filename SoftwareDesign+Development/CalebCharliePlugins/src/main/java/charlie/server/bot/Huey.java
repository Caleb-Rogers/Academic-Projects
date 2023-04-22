package charlie.server.bot;

import charlie.card.Card;
import charlie.card.Hand;
import charlie.card.Hid;
import charlie.dealer.Dealer;
import charlie.dealer.Seat;
import charlie.plugin.IBot;
import charlie.util.Play;
import java.util.List;
import java.util.Random;
import org.apache.log4j.Logger;

/**
 *
 * @author calebrogers
 */
public class Huey implements IBot, Runnable{
    
    protected final int MAX_THINKING = 3; 
    protected Seat mine;
    protected Hand myHand;
    protected Dealer dealer;
    protected Random ran = new Random();
    protected BotBasicStrategy botStrategy = new BotBasicStrategy();
    protected Card upCard;
    protected boolean myTurn;
    
    
    Logger LOG = null;
    public Huey() {
        LOG = Logger.getLogger(Huey.class);
    }
    
    
    @Override
    public Hand getHand() {
        return myHand;
    }

    @Override
    public void setDealer(Dealer dealer) {
        this.dealer = dealer;
    }

    @Override
    public void sit(Seat seat) {
        // construct a new Hand ID & Hand
        mine = seat;
        Hid hid = new Hid(seat); 
        myHand = new Hand(hid);
    }

    @Override
    public void startGame(List<Hid> hids, int shoeSize) { }

    @Override
    public void endGame(int shoeSize) { }

    @Override
    public void deal(Hid hid, Card card, int[] values) {
        // if Dealer, then set upcard
        if(hid.getSeat() == Seat.DEALER){
            upCard = card;
        }
        // if not Dealer or my Hand, then it's Huey or Dewey so don't Play
        if(hid.getSeat() != mine){
            myTurn = false;
            return;
        }
        
        // don't play if not my turn
        if(myTurn == false){
            return;
        }
        // otherwise if my Hand, then play
        play(hid);
    }

    @Override
    public void insure() { }

    @Override
    public void bust(Hid hid) {
         myTurn = false;
    }

    @Override
    public void win(Hid hid) { }

    @Override
    public void blackjack(Hid hid) {
        myTurn = false;
    }

    @Override
    public void charlie(Hid hid) {
        myTurn = false;
    }

    @Override
    public void lose(Hid hid) { }

    @Override
    public void push(Hid hid) { }

    @Override
    public void shuffling() { }

    @Override
    public void play(Hid hid) {
        // if bot or Dealer, then don't Play
        if(hid.getSeat() != mine){
            myTurn = false;
            return;
        }
        // otherwise Play
        myTurn = true;
        new Thread(this).start();
    }

    @Override
    public void split(Hid newHid, Hid origHid) { }

    @Override
    public void run() {
        try {
            int thinking = ran.nextInt(MAX_THINKING * 1000);
            Thread.sleep(thinking);
            
            Play play = botStrategy.getPlay(myHand,upCard);
            
            if(play==Play.STAY){
                dealer.stay(this, myHand.getHid());
                return;
            }
            
            if(play==Play.HIT){
                dealer.hit(this,this.myHand.getHid());
                return;
            }
            
            if(play==Play.DOUBLE_DOWN){
                myHand.getHid().dubble();
                dealer.doubleDown(this,this.myHand.getHid());
                return;
            }
            
            if(play==Play.SPLIT){
                dealer.stay(this, this.myHand.getHid());
            }
            
        } catch(InterruptedException ex) {
            LOG.info(ex);   
        }
    }
}
