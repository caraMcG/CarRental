//finding clients
var xhr = new XMLHttpRequest();
var r;//reference to parsed JSON file
window.onload=loadData;

function loadData() 
{
	//GET DATE
	var toDay = new Date();	
	document.getElementById("datefield").innerHTML = toDay;
	
	//SETUP EVENT LISTENERS
	document.getElementById("searchLast").addEventListener("keyup", function(){displayData(this.value);},false);
	document.getElementById("parsed").addEventListener("onclick", function(){editData();},false);
		
	xhr.onreadystatechange = function() 
	{
		if (xhr.readyState == 4 && xhr.status == 200) 
		{
			r = JSON.parse(xhr.responseText);
		}
	};
  xhr.open("GET", "rentalclients.json", true);
  xhr.send();
}

function displayData(name) 
{
	//Clear old data
	document.getElementById("rentalForm").reset();
	document.getElementById("completeOrder").innerHTML = "";	
	document.getElementById("parsed").innerHTML = "";
	document.getElementById("editForm").style.display="none";	
	document.getElementById("complete").style.display="none";
	
	
	var lName = "";
	var output = "";
	
	for (var i = 0; i < r.length; i++) 
	{ 
		var obj=r[i];
		//get name from object
		lName = obj.last_name;
		
			//check if lName starts with name
			if (lName.startsWith(name)) 
			{
				output += "<tr onclick=\"editData(this)\"><td>"
						+ obj.last_name 
						+ "</td>" + "<td>"
						+ obj.first_name
						+ "</td></tr>";
			}
			
	}

	document.getElementById("parsed").innerHTML = output;
}


function editData(e)
{
	document.getElementById("parsed").innerHTML = "";
	
	//show editable form
	document.getElementById("editForm").style.display="block";
	
	//last name = 0
	//first name = 1
	//console.log(e.getElementsByTagName("td")[0].innerHTML + e.getElementsByTagName("td")[1].innerHTML);
	
	var lname = e.getElementsByTagName("td")[0].innerHTML;
	var fname = e.getElementsByTagName("td")[1].innerHTML;
	
	var tFirst = document.getElementById("fname");
	var tLast = document.getElementById("lname");
	var tAddress = document.getElementById("address");
	var tState = document.getElementById("state");
	var tEmail = document.getElementById("email");
	var tPhone = document.getElementById("phone");
	
	for (var i = 0; i < r.length; i++) 
	{ 
		//console.log(lname);
		var obj=r[i];		
		
		//get last and first name from object
		var last = obj.last_name;
		var first = obj.first_name;
		
			if (lname == last && fname == first) 
			{
				//console.log(obj.last_name); 
				tFirst.value = obj.first_name;
				tLast.value = obj.last_name;
				tAddress.value = obj.address;
				tState.value = obj.state_prov; 
				tEmail.value = obj.email; 
				tPhone.value = obj.phone;			
				
			}
	}
	
}

function calcTotal()
{
	//ALLOW VISIBLE
	document.getElementById("complete").style.display="block";
	
	//VARIABLES
	var rentTotal = parseFloat(0);
	var carType = parseFloat(0);
	var length = parseFloat(0);
	var completeTotal = parseFloat(0);
	var extraMessage = ""; 
	var typeMessage = "";
	var concatMessage = "";
	
	//GET CUSTOMER INFORMATION
	var tFirst = document.getElementById("fname").value;
	var tLast = document.getElementById("lname").value;
	var tEmail = document.getElementById("email").value;
	var tPhone = document.getElementById("phone").value;
	
	//GET LENGTH OF RENTAL
	length = document.getElementById("num").value;
	
	//GET RADIO BOX SELECTION: TYPE OF CARTYPE
	carType = document.querySelector('input[name=rental]:checked').value;
	carType = parseFloat(carType);
	
		//IFS FOR VALUE OF CAR TYPE RADIO BOXES
		if(carType == 1) //compact
		{
			rentTotal += 15;
			typeMessage = "Compact";
		}
		else if(carType == 2) //mid-size
		{
			rentTotal += 20;
			typeMessage = "Mid-Size";
		}
		else if(carType == 3) //luxury
		{
			rentTotal += 35;
			typeMessage = "Luxury";
		}
		else //van/truck option 4
		{
			rentTotal += 40;
			typeMessage = "Van/Truck";
		}
	
		//IFS FOR VALUE OF EXTRAS CHECKBOXES
		if(document.rentalForm.rack.checked)
		{
			rentTotal += 5;
			extraMessage += "Roof Rack"; 
		}
		
		if(document.rentalForm.gps.checked)
		{
			rentTotal += 10;
			extraMessage += " GPS"; 
		}
		
		if(document.rentalForm.seat.checked)
		{
			rentTotal += 0;
			extraMessage += "ChildSeat";
		}
		
		//CALCULATE TOTAL 		
		completeTotal = rentTotal * length;
		
		//CONCAT A MESSAGE
		concatMessage = "Thank you " + tFirst + " " + tLast + " for your rental order! We will be contacting you at " + tPhone + " and forwarding you details of your order to " + tEmail + " in order to ensure everything is set up appropriately. Thank you for using DBrakes! <br> <br>" + typeMessage + "<br>" + extraMessage + "<br>" + length + " days" + "<br>" +  "<br>" + "Total Cost $" + completeTotal;

		console.log(completeTotal);
	
		document.getElementById("completeOrder").innerHTML = concatMessage;
}

function reset()
{
	//in case display data does not clear appropriately
	document.getElementById("rentalForm").reset();
	document.getElementById("completeOrder").innerHTML = "";	
	document.getElementById("parsed").innerHTML = "";
	
	document.getElementById("editForm").style.display="none";	
	document.getElementById("complete").style.display="none";	
}