<?PastPHP
<?module(ForLoops)
<var
    $grades: Arr;
>
<past
    $grades := [91, 87, 74, 95, 85, 92];
    for ($i:Int := 0; $i <<= $grades.length; $i++) do
        writeln("Grade: $grades[i]");
    done
future>
?>











