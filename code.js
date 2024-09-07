"use strict";
$(document).ready(function($) {
	/*This is for JQuery*/
	$("#addItem").click(function(event) {
		/*This is when you click the add item button*/
	    var addItemName = document.getElementById('addItemName').value;
	    var addItemPrice = document.getElementById('addItemPrice').value;
	    var addItemQuantity = document.getElementById('addItemQuantity').value;
	    if (addItemPrice <= 0) {
	    	$("#textArea").html("Please enter a price above 0");
	    }
	    else if (addItemQuantity <= 0) {
	    	$("#textArea").html("Please enter a quantity above 0");
	    }
	    /*Checking for unexpected inputs*/
	    else if ((isNaN(addItemName)) && !(isNaN(addItemPrice)) && !(isNaN(addItemQuantity)) && addItemName != "" && addItemPrice != "" && addItemQuantity != ""){
	    	addItem(addItemName, addItemPrice, addItemQuantity);
	    	updateItems(tax)
	    }
	    else{
	    	$("#textArea").html("Please enter a valid input");
	    }
	    
	});
	$("#removeItem").click(function(event) {
		/*This is when you click the remove item button*/
	    var removeItemName = document.getElementById('removeItemName').value
	    var removeItemQuantity = document.getElementById('removeItemQuantity').value
	    if (items[removeItemName] === undefined){
	    	$("#textArea").html("Item does not exist")
	    }
	    else if (parseInt(items[removeItemName][1]) < parseInt(removeItemQuantity) || removeItemQuantity <= 0) {
	    	$("#textArea").html("Please enter a valid quantity for the respective item");
	    }
	    /*Checking for unexpected inputs*/
	    else if ((isNaN(removeItemName)) && !(isNaN(removeItemQuantity)) && removeItemName != ""){
	    	removeItem(removeItemName, removeItemQuantity);
	    	updateItems(tax)
	    }
	    else{
	    	$("#textArea").html("Please enter an integer");
	    }
	    
	});  
	$("#applyDiscount").click(function(event) {
		/*This is when you click the discount button*/
	    discount = document.getElementById('discountPercentage').value
	    if (discount > 100 || discount < 0) {
	    	$("#textArea").html("Please enter a value between 0 and 100")
	    }
	    else if (!(isNaN(discount)) && discount != ""){
	    	updateItems(tax);
	    }
	    else{
	    	$("#textArea").html("Please enter an integer");
	    }
	}); 
	$("#addTax").click(function(event) {
		/*This is when you click the add tax button*/
		tax = true
		/*This will set tax to be true, meaning apply tax from now on*/
	    updateItems(tax);
	});  
	$("#removeTax").click(function(event) {
		/*This is when you click the remove tax button*/
		tax = false
		/*This will set tax to be true, meaning do NOT apply tax from now on*/
	    updateItems(tax)
	});      
	// 	
	$("#btnNext").click(function(event) {
		/*This is when you click the next button for the display screen and it will show new text*/
		explainCalculator(counter);
		counter++;
	});
});

// Variables
var items = {};
var discount = 0; 
var tax = false;
var counter = 0;

function addItem(itemName, itemPrice, itemQuantity){
	/*This adds the item to the dictionary*/
	items[itemName] = [itemPrice, itemQuantity];
}

function removeItem(itemName, itemQuantity){
	/*This removes items from the dictionary if the quantity is greater than how many we currently have*/
	/*If we are removing less than what we currently have, it will subract it from the total*/
	if (parseInt(items[itemName][1]) > parseInt(itemQuantity)){
		items[itemName][1] = items[itemName][1]  - itemQuantity;
	}
	else{
		delete items[itemName];
	}
}

function updateItems(tax){
	/*This function updates the visual screen with new items in the list, and new prices*/
	$("#itemList").html("");
	var itemName = "";
	var itemPrice = 0;
	var totalPrice = 0;
	var itemQuantity = 0;
	for (var key in items) {
		/*Looping through all items to display and calculate values*/
		itemName = key;
		itemPrice = items[key][0];
		itemQuantity = items[key][1];
		$("#itemList").append("Item Name: " + itemName + "&nbsp" + "Price: " + itemPrice + "&nbsp" + "Quantity: " + itemQuantity + "<br>");
		totalPrice = totalPrice + parseInt(itemPrice) * itemQuantity;
	}
	totalPrice = totalPrice * (1 - (discount * 0.01));
	if (tax){
		/*Applying tax*/
		totalPrice = totalPrice * 1.13
	}
	$("#finalPrice").html("$" + Math.round(totalPrice * 100) / 100);
}

function explainCalculator(counter){
	/*This function displays all the text explaining how the calculator works*/
	if(counter == 0){
		$("#textArea").html("Welcome to my checkout price Calculator");
	}

	else if(counter == 1){
		$("#textArea").html("To begin, enter an item with the price and quantity");
	}

	else if(counter == 2){
		$("#textArea").html("Then if you want to add tax, click the button and it will apply a 13% tax");
	}

	else if(counter == 3){
		$("#textArea").html("The tax will stay applied until you click the Remove Tax button");
	}

	else if(counter == 4){
		$("#textArea").html("You can also calculate with a discount, where 50 means 50% off");
	}

	else if(counter == 5){
		$("#textArea").html("If you want to remove an item, you enter the name and the quantity of the item you want to remove");
	}

	else if(counter == 6){
		$("#textArea").html("If you want to change the price or quantity, enter the item name again and the new values will overwrite the old one");
	}

	else if(counter == 7){
		$("#textArea").html("This box will also display errors such as entering negative numbers and etc");
	}

	else{
		$("#textArea").html("...");
	}
}