//This library contains functions to add basic checks to the JavaScripts.

//Function to check if a layout is open
function isLayoutOpen(){
	var layout= app.activeLayout();//get the layout
	if(layout.layoutID >= 0)
	{//if layout is open
		return true;
	}
	else{
		alert("Please open a layout to run the script");//if no layout is open
		return false;
	}
}

//Function to check if a layout is open
function isBoxSelected(){
	var box= app.activeBoxes();//get the box
	if(box != "")
	{//if layout is open
		return true;
	}
	else{
		alert("Please select a box to run the script");//if no box is selected
		return false;
	}
}

//function to return all selected text boxes
function getSelectedTextBoxes(){
	var activeBoxes= app.activeBoxesDOM();//gets the array of selected boxes
	var textBoxes=[];
	if(activeBoxes != null)// check if atleast one box is selected
	{
		for(var i=0; i<activeBoxes.length; i++)
		{
			if(activeBoxes[i].getAttribute('box-content-type')== "text")
			{
				textBoxes.push(activeBoxes[i]);
			}
		}
	}
	if(textBoxes.length == 0)
	{
		alert("Please select at least one text box to run the script");
		return null;//if no box is selected
	}
	else
	{
		return textBoxes;
	}
}

//function to return all selected picture boxes
function getSelectedPictureBoxes(){
	var activeBoxes= app.activeBoxesDOM();//gets the array of selected boxes
	var picBoxes=[];
	if(activeBoxes != null)// check if atleast one box is selected
	{
		for(var i=0; i<activeBoxes.length; i++)
		{
			if(activeBoxes[i].getAttribute('box-content-type')== "picture")
			{
				picBoxes.push(activeBoxes[i]);
			}
		}
	}
	if(picBoxes.length == 0)
	{
		alert("Please select at least one picture box to run the script");
		return null;//if no box is selected
	}
	else
	{
		return textBoxes;
	}
}

//function to check whether a single text box is selected and return it
function getSelectedBox(){
	var activeBoxes= app.activeBoxesDOM();//gets the array of selected boxes
	if(activeBoxes != null && activeBoxes.length == 1 )// check if single, text box is selected
		return activeBoxes[0];
		alert("Please select a single box to run the script. Tables, Grouped Items, and Composition Zones are not supported."); //if no text box or more than one box is selected
	return null;
}
