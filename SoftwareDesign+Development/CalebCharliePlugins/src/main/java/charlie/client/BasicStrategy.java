package charlie.client;

import charlie.card.Card;
import charlie.card.Hand;
import charlie.util.Play;
 
/**
 * 
 * @author Caleb Rogers, Prudvi Raj Ravula
 */
public class BasicStrategy {
    // These help make table formatting compact to look like the pocket card.
    public final static Play P = Play.SPLIT;
    public final static Play H = Play.HIT;
    public final static Play S = Play.STAY;
    public final static Play D = Play.DOUBLE_DOWN;
    
    /** Rules for section 1; see Instructional Services (2000) pocket card */
    Play[][] section1Rules = {
        /*         2  3  4  5  6  7  8  9  T  A  */
        /* 21 */ { S, S, S, S, S, S, S, S, S, S },
        /* 20 */ { S, S, S, S, S, S, S, S, S, S },
        /* 19 */ { S, S, S, S, S, S, S, S, S, S  },
        /* 18 */ { S, S, S, S, S, S, S, S, S, S  },
        /* 17 */ { S, S, S, S, S, S, S, S, S, S  },
        /* 16 */ { S, S, S, S, S, H, H, H, H, H  },
        /* 15 */ { S, S, S, S, S, H, H, H, H, H  },
        /* 14 */ { S, S, S, S, S, H, H, H, H, H  },
        /* 13 */ { S, S, S, S, S, H, H, H, H, H  },
        /* 12 */ { H, H, S, S, S, H, H, H, H, H  }
    };
    
    /** Rules for section 2 */
    Play[][] section2Rules = {
                // 2  3  4  5  6  7  8  9  T  A
        /* 11 */ { D, D, D, D, D, D, D, D, D, H  },
        /* 10 */ { D, D, D, D, D, D, D, D, H, H  },
        /*  9 */ { H, D, D, D, D, H, H, H, H, H  },
        /*  8 */ { H, H, H, H, H, H, H, H, H, H  },
        /*  7 */ { H, H, H, H, H, H, H, H, H, H  },
        /*  6 */ { H, H, H, H, H, H, H, H, H, H  },
        /*  5 */ { H, H, H, H, H, H, H, H, H, H  }
    };
    
    /** Rules for section 3 */
    Play[][] section3Rules = {
                 // 2  3  4  5  6  7  8  9  T  A
        /* A10 */ { S, S, S, S, S, S, S, S, S, S  },
        /*  A9 */ { S, S, S, S, S, S, S, S, S, S  },
        /*  A8 */ { S, S, S, S, S, S, S, S, S, S  },
        /*  A7 */ { S, D, D, D, D, S, S, H, H, H  },
        /*  A6 */ { H, D, D, D, D, H, H, H, H, H  },
        /*  A5 */ { H, H, D, D, D, H, H, H, H, H  },
        /*  A4 */ { H, H, D, D, D, H, H, H, H, H  },
        /*  A3 */ { H, H, H, D, D, H, H, H, H, H  },
        /*  A2 */ { H, H, H, D, D, H, H, H, H, H  }
    };
    
    /** Rules for section 4 */
    Play[][] section4Rules = {
                  // 2  3  4  5  6  7  8  9  T  A
        /*  A,A */ { P, P, P, P, P, P, P, P, P, P  },
        /*10,10 */ { S, S, S, S, S, S, S, S, S, S  },
        /*  9,9 */ { P, P, P, P, P, S, P, P, S, S  },
        /*  8,8 */ { P, P, P, P, P, P, P, P, P, P  },
        /*  7,7 */ { P, P, P, P, P, P, H, H, H, H  },
        /*  6,6 */ { P, P, P, P, P, H, H, H, H, H  },
        /*  5,5 */ { D, D, D, D, D, D, D, D, H, H  },
        /*  4,4 */ { H, H, H, P, P, H, H, H, H, H  },
        /*  3,3 */ { P, P, P, P, P, P, H, H, H, H  },
        /*  2,2 */ { P, P, P, P, P, P, H, H, H, H  }
    };
    
    /**
     * Gets the play for player's hand vs. dealer up-card.
     * @param hand Hand player hand
     * @param upCard Dealer up-card
     * @return Play based on basic strategy
     */
    public Play getPlay(Hand hand, Card upCard) {
        
        // helper method to validate
        if (!isValid(hand, upCard)) {
             return Play.NONE;
        }
        
        // get cards from Hand
        Card card1 = hand.getCard(0);
        Card card2 = hand.getCard(1);
        
        // determine Play
        if(hand.isPair()) {
            return doSection4(hand,upCard);
        }
        else if(hand.size() == 2 && (card1.getRank() == Card.ACE || card2.getRank() == Card.ACE)) {
            return doSection3(hand,upCard);
        }
        else if(hand.getValue() >=5 && hand.getValue() < 12) {
            return doSection2(hand,upCard);
        }
        else if(hand.getValue() >= 12)
            return doSection1(hand,upCard);
        
        
        return Play.NONE;
    }
    
    /**
     * Does section 1 processing of the basic strategy, 12-21 (player) vs. 2-A (dealer)
     * @param hand Player's hand
     * @param upCard Dealer's up-card
     * @return Play
     */
    protected Play doSection1(Hand hand, Card upCard) {
        
        int value = hand.getValue();
        
        // Section 1 supports value>=12
        if(value < 12)
            return Play.NONE;
        
        ////// Get the row in the table.
        
        // Subtract 21 since the player's hand starts at 21 and we're working
        // our way down through section 1.
        int rowIndex = 21 - value;
        
        Play[] row = section1Rules[rowIndex];
        
        ////// Get the column in the table
        
        // Subtract 2 since the dealer's up-card starts at 2
        int colIndex = upCard.getRank() - 2;
         
        if(upCard.isFace())
            colIndex = 10 - 2;

        // Ace is the 10th card (index 9)
        else if(upCard.isAce())
            colIndex = 9;
        
        // At this row, col we have the correct play defined.
        Play play = row[colIndex];
        
        
        return play;
    }
    
    /**
     * Does section 2 processing of the basic strategy, 5-11 (player) vs. 2-A (dealer)
     * @param hand Player's hand
     * @param upCard Dealer's up-card
     * @return Play
     */
    protected Play doSection2(Hand hand, Card upCard) {
        
        int value = hand.getValue();
        
        // Section two table built only for hand values >=5 and <12 
        if(value >= 12 || value < 5)
            return Play.NONE;
        
       
        // subract 11 since player card starts at 11
        int rowIndex = 11 - value;
        
        Play[] row = section2Rules[rowIndex];
        
        // Subtract 2 since the dealer's up-card start at 2
        int colIndex = upCard.getRank() - 2;
         
        if(upCard.isFace())
            colIndex = 10 - 2;

        // Ace is the 10th card (index 9)
        else if(upCard.isAce())
            colIndex = 9;
        
        Play play = row[colIndex];
        
        if (play == D && hand.size() > 2) {
            play = H;
        }
        
        
        return play;
    }
    
    /**
     * Does section 3 processing of the basic strategy
     * @param hand Player's hand
     * @param upCard Dealer's up-card
     * @return Play
     */
    protected Play doSection3(Hand hand, Card upCard) {
        
        int value = hand.getValue();
        
        // Section three table built only for hands with one ACE.
        if(hand.size() != 2 || (hand.getCard(0).getRank() != Card.ACE && hand.getCard(1).getRank() != Card.ACE))
            return Play.NONE;
        
       
        // our way down through section 3
        int rowIndex = 21 - value;
        
        Play[] row = section3Rules[rowIndex];
        
        // Subtract 2 since the dealer's up-card start at 2
        int colIndex = upCard.getRank() - 2;
         
        if(upCard.isFace())
            colIndex = 10 - 2;

        // Ace is the 10th card (index 9)
        else if(upCard.isAce())
            colIndex = 9;
        
        Play play = row[colIndex];
        
        if (play == D && hand.size() > 2) {
            play = H;
        }
        
        
        return play;
    }
    
    /**
     * Does section 4 processing of the basic strategy
     * @param hand Player's hand
     * @param upCard Dealer's up-card
     * @return Play
    */
    protected Play doSection4(Hand hand, Card upCard) {
        
        int value = hand.getValue();
        
        // Section 4 table built only where hand is pair. 
        if(hand.isPair() == false)
            return Play.NONE;
        
        int rowIndex = 11 - (value/2);
        
        Play[] row = section4Rules[rowIndex];
        
        // Subtract 2 since the dealer's up-card start at 2
        int colIndex = upCard.getRank() - 2;
         
        if(upCard.isFace())
            colIndex = 10 - 2;

        // Ace is the 10th card (index 9)
        else if(upCard.isAce())
            colIndex = 9;
        
        Play play = row[colIndex];
        
        if (play == D && hand.size() > 2){
            play = H;
        }
        
        return play;
    }
    
    
    protected boolean isValid(Hand hand, Card upCard) {
        return isValidHand(hand) && isValidCard(upCard);
    }

    protected boolean isValidHand(Hand hand) {
        // hand is null
        if(hand == null ) {
            return false;
        }
        // hand size less than 2
        if(hand.size() < 2)
            return false;
        
        // hand value less than 0
        if(hand.getCard(0).value()<0 ||hand.getCard(1).value()<0 )
            return false;
                
        // invalid hand card
        for(int c=0;c<hand.size();c++) {
            if(hand.getCard(c).value() > 10) {
                return false;
            }
        }
        
        // if hand is blackjack
        if(hand.size() == 2 && hand.getCard(0).value() == Card.ACE && 
           hand.getCard(1).value() == 10 || hand.getCard(0).value() == 10 && 
           hand.getCard(1).value()== Card.ACE) {
            return false;
        }
        
        
        return true;
    }

    protected boolean isValidCard(Card upCard) {
        //upcard is null
        if( upCard == null)
            return false;

        // invalid up card
        if(upCard.value() > 10)
            return false;
        
        // upcard value less than zero
        if(upCard.value() < 0)
            return false;
        
        
        return true;
    }
}