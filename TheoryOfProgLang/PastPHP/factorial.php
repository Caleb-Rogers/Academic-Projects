<?PastPHP
<?module(Factorial)
<past
    <var
        $input: Int;
        $factorial: Int;
        $i: Int;
    >
    <begin
        $input := readln("How many grades would you like to enter? ");
        $factorial = 1;  
        for ($i := $input; $i >>= 1; $i--) do
            $factorial = $factorial * $i;  
        done
        writeln("Factorial of $input is $factorial");
    end>
future>
?>


