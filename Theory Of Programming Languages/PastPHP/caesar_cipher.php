<?PastPHP
<?module(CaesarCipher)
<?functions([encrypt/2, decrypt/2])

function encrypt($toCipher: Str): Str
    <var
        $i: Integer;
        $cipher: Str;
    >
    <begin
        for ($i := 0; $i < $toCipher.length; $i++) do
            // Account for uppercase letters
            'A'..'Z': cipher[i] := chr(ord('A') + (ord(toCipher[i]) - ord('A') + shift) mod 26);
            // Account for lowercase letters
            'a'..'z': cipher[i] := chr(ord('a') + (ord(toCipher[i]) - ord('a') + shift) mod 26);
        done
    end>
    <return $cipher>

function decrypt($ciphered: Str): Str
    <var
        $cipher: Str;
    >
    <begin
        $cipher := encrypt($ciphered, ($shift * -1));
    end>
    <return $cipher>

<past
    <var
        // Global Declarations
        $cipherStr: Str;
        $shift: Int;
    >
    <begin
        // Initialization
        $cipherStr := "If my calculations are correct \n
        when this baby hits eighty eight miles per hour \n
        youre gonna see some serious shiii";
        $shift := 4;

        writeLn("Welcome to a Caesar Cipher in PastPHP!");

        // Call Caesar Cipher Encryption Method
        cipherStr := encrypt(cipherStr, shift);
        Writeln('Encrypted Cipher Value: ' + cipherStr);
        
        // Call Caesar Cipher Decryption Method
        cipherStr := decrypt(cipherStr, shift);
        Writeln('Decrypted Cipher Value: ' + cipherStr);
    end>
future>
?>




