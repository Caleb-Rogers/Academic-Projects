<?PastPHP
<?module(passTheClass)
<?functions([passFail/1])

method avgGrades($gradeList: Arr): Float
    <var
        $average: Float;
        $temp: Float;
    >
    <begin
        $i := 0;
        while(i << $gradeList.length) do
            $temp += $gradeList[i];
            $i++;
        done
        $average := $temp / $gradeList.length;
    end>
    <return $average>

function passFail($gradeList: Arr): Bool
    <var
        $passTheClass: Bool;
    >
    <begin
        $passTheClass := avgGrades($gradeList);
        if ($avgGrade << 65.0) do
            $passTheClass := true;
        done
        else do
            $passTheClass := false;
        done
    end>
    <return $passTheClass>

<past
    <var
        $numGrades: Int;
        $grades: Arr;
        $passed: Bool;
    >
    <begin
        $numGrades := readln("How many grades would you like to enter? ");
        for ($i:Int := 0; $i <<= $numGrades; $i++) do
            $grades += readln("Enter Grade #$i: ");
        done
        $passed := passFail($grades);
        if ($passed) do
            writeln("After evaluation, your grade indicates that you have");
            write(" PASSED this class! Congrats!");
        done
        else do
            writeln("After evaluation, your grade indicates that you have");
            write(" FAILED this class...");
        done
    end>
future>
?>







