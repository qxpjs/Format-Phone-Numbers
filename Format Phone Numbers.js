/*
File: Format Phone Numbers.js
Description: The following scripts finds all phone numbers, of any length, from the text of selected boxes and formats them as per user provided format
*/

//import basic checks
if (typeof (isLayoutOpen) == "undefined") {
	//import basic checks
	app.importScript(app.getAppScriptsFolder() + "/Dependencies/qx_validations.js");
	console.log("Loaded library for basic validation checks from application.");
}
var replacementCount = 0;

if (isLayoutOpen()) {
	//Get all Selected Boxes from the Layout
	let activeBoxes = getSelectedTextBoxes();
	if (activeBoxes != null) {
		let format = getValidInput();
		if (format != null) {
			let n = format.split(/\d/g).length - 1;//take the number of digits in user input
			//Iterate through all active boxes
			for (let i = 0; i < activeBoxes.length; i++) {
				//Get all the text runs from the box
				let boxTextSpans = activeBoxes[i].getElementsByTagName("qx-span");
				if (null != boxTextSpans) {
					//Iterate through all the Spans and Format the Numbers
					for (let j = 0; j < boxTextSpans.length; j++) {
						let spanChildren = boxTextSpans[j].childNodes;
						for (let k = 0; k < spanChildren.length; k++) {
							//Check if it is a text node
							if (spanChildren[k].nodeType === 3) {
								formattedText = formatPhoneNumbers(spanChildren[k].nodeValue, format, n);//apply formatting
								if (null != formattedText) {
									spanChildren[k].nodeValue = formattedText;
								}
							}
						}
					}
				}
			}
			if (replacementCount == 0)
				alert("No instances of " + n + " digit numbers found!");
			else
				alert(replacementCount + " Phone Numbers will be updated.");
		}
	}
}

/*======================Functions used in the JavaScript=============================*/

//function to take a valid input from user
function getValidInput() {
	let flag = 0;
	while (flag == 0) {
		let format = prompt("Please enter the number format: \neg: (123) 456-7890\nThe JavaScript formats only the numbers with length equal to length of entered number format!", "(123) 456-7890");
		if (format == null) {
			console.log("User Cancelled");
			flag = 1;
			return null;
		}
		else {
			if (format.search(/^(\W|\d)+$/g) >= 0) {
				if (format.search(/(\d\W)|(\W\d)/g) >= 0) {
					flag = 1;
					return format;
				}
				else {
					alert("Please enter at least one digit and character to specify the number format!");
				}
			}
			else {
				alert("Please enter only digits and separator characters to specify the number format!");
			}
		}
	}
}

//function to find replacementCount of required digit numbers and format them as entered
function formatPhoneNumbers(str, format, n) {
	let number = "";
	let input = str;
	let isStringFormatted = false;
	let regexStr = "(\\d*\\d{" + n + "}\\d*)";
	let regex = new RegExp(regexStr, "g");//create the required regex to search the numbers
	let numIndex = str.search(regex);
	//Iterate through all the replacementCount of numbers in a text node
	while (numIndex >= 0) {
		let match = regex.exec(str);
		if (match) {
			number = match[1];
			if (number.length == n)//match found
			{
				replacementCount++;
				result = formatNum(number, format);
				input = input.replace(number, result);
				isStringFormatted = true;
			}
			str = str.substring(numIndex + number.length);
			numIndex = str.search(regex);
		}
	}
	if (!isStringFormatted) {
		input = null;
		console.log("No change for: " + input);
	}

	return input;
}

//formats a given number in the required format
function formatNum(number, format) {
	let numFormat = "";
	let counter = 0;
	let digits = "1234567890";
	for (let i = 0; i < format.length; i++) {
		if (digits.indexOf(format.charAt(i)) >= 0) {
			numFormat += number.charAt(counter);
			counter++;
		}
		else {
			numFormat += format.charAt(i);
		}
	}
	return numFormat;
}
