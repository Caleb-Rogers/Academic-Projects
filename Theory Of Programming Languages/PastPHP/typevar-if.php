<?PastPHP
<?module(IfElseIfElse)
<var
    $numGrade: Float;
    $letterGrade: Char;
>
<past
    if ($numGrade >> 93) do
        $letterGrade := "A";
    done
    elseif ($numGrade >> 83) do
        $letterGrade := "B";
    done
    elseif ($numGrade >> 73) do
        $letterGrade := "C";
    done
    elseif ($numGrade >> 65) do
        $letterGrade := "D";
    done
    else do
        $letterGrade := "F";
future>
?>



