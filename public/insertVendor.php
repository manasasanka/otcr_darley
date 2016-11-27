<html>
<body>

<?php
    // define variables and set to empty values
    $companyName =$nameErr = $emailErr = $email = "";
    echo "HERE";
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if (empty($_POST["VendorArray[companyName]"])) {
            $nameErr = "Company name is required";
        } else {
            $companyName = test_input($_POST["VendorArray[companyName]"]);
        }

        if (empty($_POST["VendorArray[email]"])) {
            $emailErr = "Email is required";
        } else {
            $email = test_input($_POST["VendorArray[email]"]);
        }

      $firstName = test_input($_POST["VendorArray[firstName]"]);
      $lastName = test_input($_POST["VendorArray[lastName]"]);
      //$email = test_input($_POST["VendorArray[email]"]);
      $state = test_input($_POST["VendorArray[state]"]);
      $city = test_input($_POST["VendorArray[city]"]);
      $phone = test_input($_POST["VendorArray[phone]"]);
      $address = test_input($_POST["VendorArray[address]"]);

      echo "name is $firstName and lastName is $lastName";
    }

    function test_input($data) {
      $data = trim($data);
      $data = stripslashes($data);
      $data = htmlspecialchars($data);
      return $data;
    }


    $dbName = $_SERVER["DOCUMENT_ROOT"] . "/DarleyDatabse.accdb";
    if (!file_exists($dbName)) {
        die("Could not find database file.");
    }
    $db = new PDO("odbc:DRIVER={Microsoft Access Driver (*.mdb)}; DBQ=$dbName; Uid=; Pwd=;");

    /*$sql  = "INSERT INTO vendors";
    $sql .= "       (name, description, price, sale_status) ";
    $sql .= "VALUES (" . $db->quote($strName) . ", " . $db->quote($strDescription) . ", " . $strPrice . ", " . $db->quote($strStatus) . ")";
    */
    //insert into vendors
    $sql = "INSERT INTO vendors(Company name) VALUES (" . $db->quote($VendorArray[companyName]) .")";



    //INSERT INTO products VALUES (Product Name, Product Description, MSRP, Size of Product, Size of Packaging, Weight, Quantity, Uses/Application, Distribution Location, Company Name)



    $db->query($sql);

?>

</body>
</html>