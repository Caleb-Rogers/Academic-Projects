<?PastPHP
<?module(Comments)
<var
    $a: Int;
    $b: Int;
    $c: Int;
>
<past
    // Single-line comment
    <//
     // Muli-line Comments
        <<///
          /// Nested Comments
          ///>>
     //>

    $a := 365;      // Days per Year
    $b := 24;       // Hours per Day
    $c := $a * $b;  // Hours per Year
future>
?>








