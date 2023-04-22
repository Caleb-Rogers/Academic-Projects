<?PastPHP
<?module(WhileLoops)
<var
    $grades: Arr;
    $i: Int;
>
<past
    $grades := [91, 87, 74, 95, 85, 92];
    $i := 0;
    while($i << $grades.length) do
        writeln("Grade: $grades[i]");
        $i++;
    done
future>
?>








