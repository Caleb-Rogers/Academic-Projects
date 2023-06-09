/*
 Copyright (c) 2014 Ron Coleman

 Permission is hereby granted, free of charge, to any person obtaining
 a copy of this software and associated documentation files (the
 "Software"), to deal in the Software without restriction, including
 without limitation the rights to use, copy, modify, merge, publish,
 distribute, sublicense, and/or sell copies of the Software, and to
 permit persons to whom the Software is furnished to do so, subject to
 the following conditions:

 The above copyright notice and this permission notice shall be
 included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
package charlie.message.view.from;

import charlie.message.Message;
import charlie.server.Ticket;
import java.net.InetAddress;

/**
 * This class implements remote myAddress arrival post login.
 * @author Ron Coleman
 */
public class Arrival extends Message {
    protected final Ticket ticket;
    protected boolean botEnabled;
    private final int port;
    
    /**
     * Constructor
     * @param ticket Ticket
     * @param source Source address
     * @param port Port number
     */
    public Arrival(Ticket ticket, InetAddress source, int port) {
        super(source);
        this.port = port;
        this.ticket = ticket;
        this.botEnabled = true;
    }

    /**
     * Gets the ticket.
     * @return Ticket
     */
    public Ticket getTicket() {
        return ticket;
    }
    
    /**
     * Tests whether bots are to be enabled.
     * @return True if bot enabled, false otherwise
     */
    public boolean isBotEnabled() {
        return botEnabled;
    }
    
    /**
     * Enables bot.
     * @param enable Enable
     */
    public void enableBot(boolean enable) {
        botEnabled = enable;
    }
    
    public int getPort() {
        return port;
    }
}
