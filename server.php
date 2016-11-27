<?php
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