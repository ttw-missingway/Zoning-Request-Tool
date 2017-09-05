//initialize booleans
var zcl = confirm("zoning letter");
var sitePlan = confirm("site plans");
var variances = confirm("variances");
var zoningVio = confirm("zoning vios");
var buildingVio = confirm("building vios");
var fireVio = confirm("fire vios");
var co = confirm("co");

//initialize float
var promptAmount = prompt("Please enter check amount. If no check, enter 0. Do not include dollar sign ($)");
var checkAmount = parseFloat(promptAmount);

//initialize string
var promptProperty = prompt("Please enter property name.");
var promptName = prompt("Please enter full name.");
var promptTitle = prompt("Please enter title. (Example: Zoning Analyst)");
var promptEmail = prompt("Please enter email");
var promptFax = prompt("Please enter fax number with correct formatting.");

//initialize auxilliary variables
var codeVio = false;
var check = false;

if (checkAmount > 0){
	check = true;
}

if (buildingVio===true||fireVio===true||zoningVio===true){
	codeVio = true;
}


//initialize date variables
var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
var today = new Date();
var dd = today.getDate();
var mm = monthNames[today.getMonth()]; //January is 0!
var yyyy = today.getFullYear();

//assemble code violation request
var bvInt = buildingVio ? 1 : 0;
var fvInt = fireVio ? 1 : 0;
var zvInt = zoningVio ? 1 : 0;
var codeAssembled = 0;
var bvText = " building";
var zvText = " zoning";
var fvText = " fire";

switch (bvInt + fvInt + zvInt){
	case 0:{
  	codeVio = false;
    break;
  }
  case 1:{
  	if (bvInt === 1){
    	codeAssembled = bvText;
    }
    if (zvInt === 1){
    	codeAssembled = zvText;
    }
    if (fvInt === 1){
    	codeAssembled = fvText;
    }
    break;
  }
  case 2:{
  	if (bvInt + zvInt === 2){
    	codeAssembled = zvText + ", or" + bvText;
    }
    if (bvInt + fvInt === 2){
    	codeAssembled = fvText + ", or" + bvText;
    }
    if (fvInt + zvInt === 2){
    	codeAssembled = zvText + ", or" + fvText;
    }
    break;
  }
  default:{
  	codeAssembled = zvText + ", " + fvText + ", or" + bvText;
    break;
  }
}

//make check amount into dollar sign
var formatCheck = checkAmount.toFixed(2);
var formatCheckBold = ("$" + formatCheck).bold();

//initialize text variables
var or = "or";
var faxText = "toll free fax ".bold() + promptFax.bold();
var phoneText = "toll-free at (800) 787-8390".bold();
var email = promptEmail.bold();
var property = "&#8192 &#8192 &#8192 " + promptProperty.bold();
var zclBold1 = "Zoning Compliance/Verification Letter: ";
var zclBold2 = "Adjacent Property Designations and Uses (if known): ";
var variancesBold = "Any Variances, Special Permits, Conditions, etc: ";
var codeBold = "Code Violations: ";
var coBold = "Certificates of Occupancy: ";
var siteBold = "Approved Site Plan and/or Conditions of Approval, if applicable: ";
var checkText = "Enclosed, please find a check in the amount of " + (formatCheckBold) + " to process this request.";
var endText = "Please advise us at your earliest convenience of any additional fees or forms, if any of these items is not available or if I should be directing any portion of my request to another party.  We are on a strict timeline, and your prompt attention to this request is greatly appreciated.  Upon completion, please forward the information via email or " + (faxText) + ".  We truly appreciate your help with this request and look forward to your reply.  Please feel free to contact me " + (phoneText) + " or via email at " + (email) + " with any questions or concerns you may have regarding this request.";  
var closerText = "Thank you very much for your assistance!";
var signature = promptName + ", Bock & Clark Zoning (" + promptTitle + ")";
var opener = "Dear Municipality Official,";
var clientRequest = "At our clientÅfs request, we are seeking the following information: ";
var zclBody1 = "Please supply a letter (or use the enclosed template and copy onto letterhead) stating in which zoning district the subject property is currently located, permissiveness of current use and any compliance information you may be able to provide.  Please use municipality letterhead, or, if this is not possible for some reason, please enclose a municipality fax coversheet showing that the zoning letter is enclosed.";
var zclBody2 = "Current zoning district in which properties adjacent to the subject property (North, South, East & West) are located.";
var variancesBody = "Please note the existence of these items as they relate to the subject property and supply documentation, if available.";
var codeBody = "Please note whether or not there are currently any open/outstanding" + (codeAssembled) + " code violations on record that apply to the subject property.";
var coBody = "Please supply copies of any existing certificates of occupancy for the subject property.  If none are available, please state the reason for this and whether there is any expected enforcement action due to the lack of certificate copies";
var siteBody = "Please supply available documents, particularly if the subject property is located in a Planned Development.";


//prioritize requested information
var request = [[zcl, zcl, variances, codeVio, co, sitePlan],[zclBold1, zclBold2, variancesBold, codeBold, coBold, siteBold],[zclBody1, zclBody2, variancesBody, codeBody, coBody, siteBody],[0,0,0,0,0,0]];

var requestPositionBold = [0, 0, 0, 0, 0, 0];
var requestPositionBody = [0, 0, 0, 0, 0, 0];


for (i=0; i<6; i++){
	for (j=0; j<6; j++){
		if (requestPositionBold[i] === 0){
  		if (request[0][j] === true){
      	if(request[3][j] === 0){
        	request[3][j] = 1;
      		requestPositionBold[i] = request[1][j].bold();
        	requestPositionBody[i] = request[2][j];
      	}
    	}
  	}
  }
}

//remove unnecessary elements
$(document).ready(function(){
	if (requestPositionBold[0] === 0){
        $("#request-1").remove();
				$('#br-1').remove();
  }
	if (requestPositionBold[1] === 0){
        $("#request-2").remove();
      	$('#br-2').remove();
  }
	if (requestPositionBold[2] === 0){
        $("#request-3").remove();
        $('#br-3').remove();
  }
	if (requestPositionBold[3] === 0){
        $("#request-4").remove();
        $('#br-4').remove();
  }
	if (requestPositionBold[4] === 0){
        $("#request-5").remove();
        $('#br-5').remove();
  }
	if (requestPositionBold[5] === 0){
        $("#request-6").remove();
        $('#br-6').remove();
  }
});

//Pull date
if(dd<10){
    dd='0'+dd;
} 
var today = mm+' '+dd+', '+yyyy;
    

//arrange text

document.getElementById('date').innerHTML = (today);
document.getElementById('subject_property').innerHTML = ("Subject Property:  ");
document.getElementById('property').innerHTML = (property);
if (requestPositionBold[0] != 0){
	document.getElementById('request-1').innerHTML = (requestPositionBold[0] + requestPositionBody[0]);}
if (requestPositionBold[1] != 0){
	document.getElementById('request-2').innerHTML = (requestPositionBold[1] + requestPositionBody[1]);}
if (requestPositionBold[2] != 0){
	document.getElementById('request-3').innerHTML = (requestPositionBold[2] + requestPositionBody[2]);}
if (requestPositionBold[3] != 0){
	document.getElementById('request-4').innerHTML = (requestPositionBold[3] + requestPositionBody[3]);}
if (requestPositionBold[4] != 0){
	document.getElementById('request-5').innerHTML = (requestPositionBold[4] + requestPositionBody[4]);}
if (requestPositionBold[5] != 0){
	document.getElementById('request-6').innerHTML = (requestPositionBold[5] + requestPositionBody[5]);}
if (check === true){
	document.getElementById('check').innerHTML = (checkText + " " + endText);}
else{
	document.getElementById('check').innerHTML = (endText);}
document.getElementById('closer').innerHTML = (closerText);
document.getElementById('sig').innerHTML = (signature);
document.getElementById('test').innerHTML = (result);