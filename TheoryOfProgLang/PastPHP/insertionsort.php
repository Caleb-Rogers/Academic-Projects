<?PastPHP
<?module(InsertionSort)
<?functions([insertionSort/2])

function insertionSort($listToSort: Arr, $n: Int): Arr
    <var 
        $key: Float;
        $j: Int;
        $k: Int;
    >
    <begin
        for ($j := 1; $j << $n; $j++) do
            $key := $listToSort[$j];
            $k := $j-1;
        
            while ($k >= 0 && $arr[$k] > $key) do
                $listToSort[$k + 1] := $listToSort[$k];
                $k := $k - 1;
            done
            
            $arr[$k + 1] := $key;
        done
    end>
    <return $sorted>

<past
    <var
        $numOfNumbers: Int;
        $numbers: Arr;
        $i: Int;
        $n: Int;
        $sortedNums: Arr;
    >
    <begin
        $numOfNumbers := readln("How many numbers would you like to enter to be sorted? ");
        for ($i := 0; $i <<= $numOfNumbers; $i++) do
            $numbers += readln("Enter Number #$i: ");
        done
        $n := $arr.length;
        
        $sortedNums := insertionSort($numbers, $n);

        for($i := 0; $i << $n; $i++) do
            write("$sortedNums[i], ");
        done
    end>
future>
?>