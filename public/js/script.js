//when form is submitted with start and end pionts, send to the server
$("#submit_vendor_insert").click(function(e){
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

	/*inputData["interests"] = $(".chosenInterest:checked").map(function () {
		return this.value;
	}).get(); */

	$.ajax({
		type:'POST',
		data: JSON.stringify(inputData),
		url: '/sendInsertVendor',
		dataType: 'json',
		contentType: 'application/json; charset=UTF-8',
		success: function(data){
			console.log("Received Data: ", data);
		}
	}).error(function () {
		console.log("Error sending input")
	})
})


$("#submit_product_insert").click(function(e){
	e.preventDefault();
	var productInfo = {}
	productInfo["productName"]=$("#companyName").val();//$("#startPoint").value;
	productInfo["firstName"]=$("#firstName").val();
	productInfo["lastName"]=$("#lastName").val();
	productInfo["phone"]=$("#phone").val();
	productInfo["email"]=$("#email").val();
	productInfo["address"]=$("#address").val();
	productInfo["city"]=$("#city").val();
	productInfo["state"]=$("#state").val();

	//	(Product Name, Product Description, MSRP, Size of Product, Size of Packaging, Weight, Quantity, Uses/Application, Distribution Location, Company Name)

	$.ajax({
		type:'POST',
		data: JSON.stringify(productInfo),
		url: '/sendInsertProduct',
		dataType: 'json',
		contentType: 'application/json; charset=UTF-8',
		success: function(data){
			console.log("Received Data: ", data);
		}
	}).error(function () {
		console.log("Error sending input")
	})
})