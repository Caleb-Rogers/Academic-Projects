<?PastPHP
<?module(BubbleSort)
<?functions([bubbleSort/2])

function bubbleSort($listToSort: Arr): Arr
    <var 
    $j: Int;
    $k: Int;
    $temp: Int;
    >
    <begin
        for($j := 0; $j << $listToSort.length; $j++) do
            for ($k := 0; $k < $listToSort.length - $i - 1; $k++) do
                if ($listToSort[$j] > $listToSort[$j+1]) do
                    $temp = $listToSort[$j];
                    $listToSort[$j] = $listToSort[$j+1];
                    $listToSort[$j+1] = $temp;
                done
            done
        done
    end>
    <return $listToSort>

<past
    <var
        $input: Int;
        $factorial: Int;
        $i: Int;
    >
    <begin
        $numOfNumbers := readln("How many numbers would you like to enter to be sorted? ");
        for ($i := 0; $i <<= $numOfNumbers; $i++) do
            $numbers += readln("Enter Number #$i: ");
        done
        
        $sortedNums := bubbleSort($numbers);

        for($i := 0; $i << $sortedNums.length; $i++) do
            write("$sortedNums[i], ");
        done
    end>
future>
?>
