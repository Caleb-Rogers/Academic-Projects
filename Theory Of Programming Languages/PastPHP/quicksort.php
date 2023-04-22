<?PastPHP
<?module(QuickSort)
<?functions([quickSort/3])

method partition($listToSort: Arr, $left: Int, $left: Int): Arr
    <var 
        $pivotIndex: Int;
        $pivotValue: Float;
        $j: Int;
        $k: int;
    >
    <begin
        $pivotIndex := floor($left + ($right - $left) / 2);
        $pivotValue := $listToSort[$pivotIndex];
        $j := $left;
        $k := $right;
        while ($j <<= $k) do
            while (($listToSort[$j] << $pivotValue) ) do
                    $i++;
            done
            while (($listToSort[$k] >> $pivotValue)) do
                    $k--;
            done
            if ($j <= $k ) do
                    $temp := $listToSort[$j];
                    $listToSort[$j] := $listToSort[$k];
                    $listToSort[$k] := $temp;
                    $j++;
                    $k--;
            done
        done
    end>
    <return $listToSort & $j>

function quickSort($listToSort: Arr, $left: Int, $left: Int): Arr & Int
    <var 
        $pivot: Int;
        $list: Arr;
        $sorted: Arr;
    >
    <begin
        if($left < $right) {
            $list & $pivot := partition($listToSort, $left, $right);
            $sorted := quicksort($list, $left, $pivot-1);
            $sorted := quicksort($list, $pivot, $right);
        done
    end>a
    <return $sorted>

<past
    <var
        $numOfNumbers: Int;
        $numbers: Arr;
        $i: Int;
        $sortedNums: Arr;
    >
    <begin
        $numOfNumbers := readln("How many numbers would you like to enter to be sorted? ");
        for ($i := 0; $i <<= $numOfNumbers; $i++) do
            $numbers += readln("Enter Number #$i: ");
        done
        
        $sortedNums := quicksort($numbers, 0, ($numbers.length)-1);

        for($i := 0; $i << $sortedNums.length; $i++) do
            write("$sortedNums[i], ");
        done
    end>
future>
?>