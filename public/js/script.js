//when form is submitted with start and end pionts, send to the server
$("#newVendorForm").submit(function(e){
	e.preventDefault();
	var inputData = {}
	inputData["companyName"]=$("#companyName").val();//$("#startPoint").value;
	inputData["firstName"]=$("#firstName").val();
	inputData["lastName"]=$("#lastName").val();
	inputData["phone"]=$("#phone").val();
	inputData["email"]=$("#email").val();
	inputData["address"]=$("#address").val();
	inputData["city"]=$("#city").val();
	inputData["state"]=$("#state").val();

	console.log(JSON.stringify(inputData))

   /* var inputData = $(this).serialize();
    var str = JSON.stringify(inputData);

    var request = new XMLHttpRequest();
    request.open("POST", "insertVendor.php", true);
    request.setRequestHeader("Content-type", "application/json");
    request.send(str);

    function respond() {
        if (request.readyState == 4 && request.status == 200) {
            console.log("SUCCESSFUL");
        }
    }*/

	$.ajax({
		type:'POST',
		data: JSON.stringify(inputData),
		url: "insertVendor.php"
//		dataType: 'json'
		//contentType: 'application/json; charset=UTF-8',
	}).done(function(res){
		console.log("Successful!", res)
	}).fail(function () {
		console.log("Error sending input")
	})
})


$("#newProductForm").submit(function(e){
	e.preventDefault();

	var productInfo = {}
	productInfo["productName"]=$("#productName").val();//$("#startPoint").value;
	productInfo["description"]=$("#description").val();
	productInfo["msrp"]=$("#msrp").val();
	productInfo["productSize"]=$("#productSize").val();
	productInfo["packagingSize"]=$("#packagingSize").val();
	productInfo["weight"]=$("#weight").val();
	productInfo["quantity"]=$("#quantity").val();
	productInfo["uses"]=$("#uses").val();
	productInfo["distributionLocation"]=$("#distributionLocation").val();
	productInfo["companyName"]=$("#productInsertCompanyName").val();

	//	(Product Name, Product Description, MSRP, Size of Product, Size of Packaging, Weight, Quantity, Uses/Application, Distribution Location, Company Name)

	$.ajax({
		type:'POST',
		data: JSON.stringify(productInfo),
		url: "insertProduct.php"
	}).done(function(res){
		console.log("Successful!", res)
	}).fail(function () {
		console.log("Error sending input")
	})
})

$("#resultsByCompanyForm").submit(function(e){
	e.preventDefault();

	var compName = {companyName: $("#getResultsCompanyName").val()};
	$.ajax({
		type:'POST',
		data: JSON.stringify(compName),
		url: "getInformation.php"
	}).done(function(res){
		console.log("Successful!", res)
		printQueryResults(res);
	}).fail(function () {
		console.log("Error sending input")
	})

})

var printQueryResults = function(rows){
	$("#companyResults").html("")
	$("#companyResults").append("<tr><th>Company Name</th><th>First Name</th></tr>")
}


