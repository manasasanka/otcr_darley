<?php
    // define variables and set to empty values
        
    $val = file_get_contents('php://input');
    $res = json_decode($val, true);
    //var_dump($val);

    $productName = $res["productName"];
    $description = $res["description"];
    $msrp = $res["msrp"];
    $productSize = $res["productSize"];
    $packagingSize = $res["packagingSize"];
    $weight = $res["weight"];
    $quantity = $res["quantity"];
    $uses = $res["uses"];
    $distributionLocation = $res["distributionLocation"];
    $companyName = $res["companyName"];

    echo "VAL is $res";

    print('{}');

    $dbName = $_SERVER["DOCUMENT_ROOT"] . "/DarleyDatabse.accdb";
    echo " in $dbName and ";
    if (!file_exists($dbName)) {
        die("Could not find database file.");
    }
    $db = new PDO("odbc:DRIVER={Microsoft Access Driver (*.mdb)}; DBQ=$dbName; Uid=; Pwd=;");

    /*$sql  = "INSERT INTO vendors";
    $sql .= "       (name, description, price, sale_status) ";
    $sql .= "VALUES (" . $db->quote($strName) . ", " . $db->quote($strDescription) . ", " . $strPrice . ", " . $db->quote($strStatus) . ")";
    */
    //insert into vendors
    $sql = "INSERT INTO products(Product Name, Product Description, MSRP, Size of Product, Size of Packaging, Weight, Quantity, Uses/Application, Distribution Location, Company Name) VALUES ("
 . $db->quote($productName) . ", " . $db->quote($description) . ", " . $db->quote($msrp) .
 ", " . $db->quote($productSize) .", " . $db->quote($packagingSize) .", " . $db->quote($weight) . 
 ", " . $db->quote($quantity) .", " . $db->quote($uses) ", " . $db->quote($distributionLocation) .", " . $db->quote($companyName).")";

    //INSERT INTO products VALUES (Product Name, Product Description, MSRP, Size of Product, Size of Packaging, Weight, Quantity, Uses/Application, Distribution Location, Company Name)

    $db->query($sql);

?>