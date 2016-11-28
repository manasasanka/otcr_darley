<?php
    // define variables and set to empty values
        
    $val = file_get_contents('php://input');
    $res = json_decode($val, true);
    //var_dump($val);

    $companyName = $res["companyName"];


//    print('{}');

    $dbName = $_SERVER["DOCUMENT_ROOT"] . "/DarleyDatabase.accdb";

    if (!file_exists($dbName)) {
        die("Could not find database file.");
    }
    $db = new PDO("odbc:DRIVER={Microsoft Access Driver (*.mdb, *.accdb)}; DBQ=$dbName; Uid=; Pwd=;");

    /*$sql  = "INSERT INTO vendors";
    $sql .= "       (name, description, price, sale_status) ";
    $sql .= "VALUES (" . $db->quote($strName) . ", " . $db->quote($strDescription) . ", " . $strPrice . ", " . $db->quote($strStatus) . ")";
    */
    //query by company name

    //SELECT * WHERE Vendors.CompanyName= ‘Company Name’ AND Products.CompanyName= ‘Company Name’ AND ContactInformation.CompanyName= ‘Company Name’

    $sql = "SELECT * FROM vendors, ContactInformation WHERE vendors.CompanyName = " . $db->quote($companyName) . "  AND ContactInformation.CompanyName= vendors.CompanyName";
    $result = $db->query($sql);

    echo json_encode($result);  //the "return" information

?>