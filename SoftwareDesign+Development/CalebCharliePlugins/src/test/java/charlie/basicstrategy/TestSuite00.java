package charlie.basicstrategy;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;

import charlie.basicstrategy.section1.Test00_12_2;
import charlie.basicstrategy.section1.Test01_12_2;
import charlie.basicstrategy.section1.Test02_16_6;
import charlie.basicstrategy.section1.Test03_12_3;
import charlie.basicstrategy.section1.Test04_14_7;
import charlie.basicstrategy.section1.Test05_19_7;
import charlie.basicstrategy.section2.Test06_11_2;
import charlie.basicstrategy.section2.Test07_11_10;
import charlie.basicstrategy.section2.Test08_11_A;
import charlie.basicstrategy.section2.Test09_10_10;
import charlie.basicstrategy.section2.Test10_5_2;
import charlie.basicstrategy.section3.Test11_A2_2;
import charlie.basicstrategy.section3.Test12_A2_4;
import charlie.basicstrategy.section3.Test13_A2_5;
import charlie.basicstrategy.section3.Test14_A2_7;
import charlie.basicstrategy.section4.Test15_55_7;
import charlie.basicstrategy.section4.Test16_22_7;
import charlie.basicstrategy.section4.Test17_44_9;
import charlie.basicstrategy.section4.Test18_77_8;
import charlie.basicstrategy.section3.Test19_A6_7;
import charlie.basicstrategy.section3.Test20_A5_3;
import charlie.basicstrategy.section3.Test21_A7_6;
import charlie.basicstrategy.section3.Test22_A7_8;
import charlie.basicstrategy.section3.Test23_A8_8;
import charlie.basicstrategy.invalid.HandHasZeroCards;
import charlie.basicstrategy.invalid.HandHaslessthantwoCards;
import charlie.basicstrategy.invalid.HandIsBlackjack;
import charlie.basicstrategy.invalid.InvalidHandTest;
import charlie.basicstrategy.invalid.InvalidUpCardTest;
import charlie.basicstrategy.invalid.UpCardValueLessThanZero;

/**
 *
 * @author calebrogers
 */
@RunWith(Suite.class)

@Suite.SuiteClasses({ Test00_12_2.class, Test01_12_2.class, Test02_16_6.class,
    Test03_12_3.class, Test04_14_7.class, Test05_19_7.class, Test06_11_2.class,
    Test07_11_10.class, Test08_11_A.class, Test09_10_10.class, Test10_5_2.class,
    Test11_A2_2.class, Test12_A2_4.class, Test13_A2_5.class, Test14_A2_7.class,
    Test15_55_7.class, Test16_22_7.class, Test17_44_9.class, Test18_77_8.class,
    Test19_A6_7.class, Test20_A5_3.class, Test21_A7_6.class, Test22_A7_8.class,
    Test23_A8_8.class, HandHasZeroCards.class, HandHaslessthantwoCards.class,
    HandIsBlackjack.class, InvalidHandTest.class, InvalidUpCardTest.class, 
    UpCardValueLessThanZero.class })

public class TestSuite00 { 

    @BeforeClass
    public static void setUpClass() throws Exception { }

    @AfterClass
    public static void tearDownClass() throws Exception { }

    @Before
    public void setUp() throws Exception { }

    @After
    public void tearDown() throws Exception { }
    
}
