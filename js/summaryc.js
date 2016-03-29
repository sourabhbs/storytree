/*! StoryTree v1.0
 *  Written by Sourabh Bhangaonkar
 *  Aug 29 2015
 */

var introList = [];	// holds tree nodes that are classified as 'Intro' Nodes under Summary Operation
var midList = []; // holds tree nodes that are classified as 'Middle' Nodes under Summary Operation
var endList = [];	// holds tree nodes that are classified as 'End' Nodes under Summary Operation
var bd1List = []; 
var bd2List = []; 
var conList = [];
var deleteList = []; // holds user selected options which needs to be removed from multi-select lists
var cwn = null;
var queue = [];
var delIntroList = [];
var delMidList = [];
var delEndList = [];
var delBd1List = [];
var delBd2List = [];
var delConList = [];
var stVersion = 0; // Story Version

function addToIntro(){

	var len1 = selectList.length;
	var len2 = introList.length;

	if(len1 == 0){
		alert("Please select Node!");
	}
										 	//	alert("selectList.length = " + len1);
										 	// 	alert("introList.length = " + len2);	
	// Accessing multiselect element
	var selectIntro = document.getElementById("sm_2");
											// 	alert("selectList length = " + selectList.length);		
	for(var i = 0; i< len1; i++){		
		// Check if selected option is redundunt for introList.
		var index = $.inArray(selectList[i],introList);
											//	alert("index = " + index);
		/*
		 * Following code adds selected nodes in introList and UI's multiselect area 
		 */

		if(index == -1){
		   	// Adding element in the introList
		   	introList.push(selectList[i]);	 

		   									//alert("Option Id = " + selectList[i].id);
			// creating option
		    var option = document.createElement("option");    
		    option.setAttribute("id","sm_2_opt_" + selectList[i].id);
										    //alert(option.id);
										    //alert("Node Name = " + selectList[i].name);
		    
		    option.text = selectList[i].name;
											    //alert(option.text);
		    selectIntro.add(option);   
		}		 
	}
	selectList = [];
	update(root);
	    log("i");

 }


 function removeIntro(){
													 	//alert("Reset Introduction!");
 	var optionList = document.getElementById("sm_2");
 	var len1 = optionList.options.length;

    for (var i=0, len1; i<len1; i++) {
        option = optionList.options[i];
        // check if selected
        if (option.selected) {
        	// Adding option to delete list
        	deleteList.push(option);
        }
    }
    // Removing element from the select list and introlist
    removeListElement("i");
    log("ri");

 }

function addToBd1(){
	//alert("Add To Body1!");
	var len1 = selectList.length;
	var len2 = bd1List.length;

	if(len1 == 0){
		alert("Please select Node!");
	}

 	//alert("selectList.length = " + len1);
 	// alert("bd1List.length = " + len2);	

	// Accessing multiselect element
	var selectIntro = document.getElementById("sm_5");

	// /alert("selectList length = " + selectList.length);		
	
	for(var i = 0; i< len1; i++){
		
		// Check if selected option is redundunt for bd1List.

		var index = $.inArray(selectList[i],bd1List);
		//alert("index = " + index);
		/*
		 * Following code adds selected nodes in bd1List and UI's multiselect area 
		 */
		if(index == -1){
		   	// Adding element in the bd1List
		   	bd1List.push(selectList[i]);	 

			// creating option
		    var option = document.createElement("option");    
		    option.setAttribute("id","sm_5_opt_" + selectList[i].id);
		    //alert(option.id);
		    //var optElement = selectList.pop();
		    //alert("Node Name = " + selectList[i].name);
		    
		    option.text = selectList[i].name;
		    //alert(option.text);
		    selectIntro.add(option);   
		}		 
	}
	selectList = [];
	update(root);
    log("bd1");

}

function removeBd1(){
	//alert("Remove Body1!");
 	var optionList = document.getElementById("sm_5");
 	var len1 = optionList.options.length;

    for (var i=0, len1; i<len1; i++) {
        option = optionList.options[i];
        // check if selected
        if (option.selected) {
        	// Adding option to delete list
        	deleteList.push(option);
        }
    }
    // Removing element from the select list and introlist
    removeListElement("bd1");	
    log("rbd2");

}

function addToBd2(){

	var len1 = selectList.length;
	var len2 = bd2List.length;

	if(len1 == 0){
		alert("Please select Node!");
	}

 	//alert("selectList.length = " + len1);
 	// alert("bd1List.length = " + len2);	

	// Accessing multiselect element
	var selectIntro = document.getElementById("sm_8");

	// /alert("selectList length = " + selectList.length);		
	
	for(var i = 0; i< len1; i++){
		
		// Check if selected option is redundunt for bd1List.

		var index = $.inArray(selectList[i],bd2List);
		//alert("index = " + index);
		/*
		 * Following code adds selected nodes in bd1List and UI's multiselect area 
		 */
		if(index == -1){
		   	// Adding element in the bd1List
		   	bd2List.push(selectList[i]);	 

			// creating option
		    var option = document.createElement("option");    
		    option.setAttribute("id","sm_8_opt_" + selectList[i].id);
		    //alert(option.id);
		    //var optElement = selectList.pop();
		    //alert("Node Name = " + selectList[i].name);
		    
		    option.text = selectList[i].name;
		    //alert(option.text);
		    selectIntro.add(option);   
		}		 
	}
	selectList = [];
	update(root);
    log("bd2");

}

function removeBd2(){

	//alert("Remove Body1!");

 	var optionList = document.getElementById("sm_8");
 	var len1 = optionList.options.length;

    for (var i=0, len1; i<len1; i++) {
        option = optionList.options[i];
        // check if selected
        if (option.selected) {
        	// Adding option to delete list
        	deleteList.push(option);
        }
    }
    // Removing element from the select list and introlist
    removeListElement("bd2");	
    log("rbd2");
}

function addToCon(){
	//alert("Add to Conclusion!");
	var len1 = selectList.length;
	var len2 = conList.length;

	if(len1 == 0){
		alert("Please select Node!");
	}

 	//alert("selectList.length = " + len1);
 	//alert("midList.length = " + len2);	

	// Accessing multiselect element
	var selectIntro = document.getElementById("sm_11");

	// /alert("selectList length = " + selectList.length);		
	
	for(var i = 0; i< len1; i++){
		
		// Check if selected option is redundunt for midList.

		var index = $.inArray(selectList[i],conList);
		//alert("index = " + index);
		/*
		 * Following code adds selected nodes in midList and UI's multiselect area 
		 */
		if(index == -1){
		   	// Adding element in the midList
		   	conList.push(selectList[i]);	 

			// creating option
		    var option = document.createElement("option");    
		    option.setAttribute("id","sm_11_opt_" + selectList[i].id);
		    //alert(option.id);
		    //var optElement = selectList.pop();
		    //alert("Node Name = " + selectList[i].name);
		    
		    option.text = selectList[i].name;
		    //alert(option.text);
		    selectIntro.add(option);   
		}		 
	}
	selectList = [];
	update(root);
	log("con");
}

function removeCon(){
	//alert("Remove Conclusion!");
 	var optionList = document.getElementById("sm_11");
 	var len1 = optionList.options.length;

    for (var i=0, len1; i<len1; i++) {
        option = optionList.options[i];
        alert("option = " + option);

        // check if selected
        if (option.selected) {
        	// Adding option to delete list
        	deleteList.push(option);
        }
    }
    // Removing element from the select list and introlist
    removeListElement("c");
    log("rcon");
}

 function genSum(){
	//alert("Generate Summary!");
	//var summaryText = "";
	var face = "sabon"; //"Book Antiqua";////"verdana";//"Papyrus"; 
    var color = "#ffffff";//#ffffff"; //b8b8b8
    var size = 3.0;
	var intro = " ";
	var bd1 = " ";
	var bd2 = " ";
	var con = " ";

	var vnum = stVersion;
	vnum = vnum.toFixed(1);

	for(var i = 0, len = introList.length; i< len; i++){
		intro += introList[i].name + " : " + introList[i].desc + "<br>";	
	}

	for(var i = 0, len = bd1List.length; i< len; i++){
		bd1 += bd1List[i].name + " : " + bd1List[i].desc + "<br>";	
	}

	for(var i = 0, len = bd2List.length; i< len; i++){
		bd2 += bd2List[i].name + " : " + bd2List[i].desc + "<br>";	
	}
	for(var i = 0, len = conList.length; i< len; i++){
		con += conList[i].name + " : " + conList[i].desc + "<br>";	
	}

	var summaryText = "<html><head><title>"+ "Story Version " + 
					vnum + "</title></head><body bgcolor='#404040'>" +

					"<font" + " face = " + face + " color = " + color + " size = " + size + ">" +					
					"<b><u>" + root.name + "</u></b>" + "<br><br>" +  "</font>" +

					"<font" + " face = " + face + " color = " + color + " size = " + size + ">" +
					"<b>" + "Introduction - " + "</b><br><br>" + "</font>" + 

					"<font" + " face = " + face + " color = " + color + " size = " + size + ">" +
					intro + "<br><br>" + "</font>" + 
					
					"<font" + " face = " + face + " color = " + color + " size = " + size + ">" +
					"<b>" + "Body 1 - " + "</b><br><br>" + "</font>" + 

					"<font" + " face = " + face + " color = " + color + " size = " + size + ">" + 
					bd1 + "<br><br>" + "</font>" +

					"<font" + " face = " + face + " color = " + color + " size = " + size + ">" +
					"<b>" + "Body 2 - " + "</b><br><br>" + "</font>" + 					
	
					"<font" + " face = " + face + " color = " + color + " size = " + size + ">" +
					bd2  +"<br><br>" + "</font>" + 
						
					"<font" + " face = " + face + " color = " + color + " size = " + size + ">" +
					"<b>" + "Conclusion - " + "</b><br><br>" + "</font>" + 					
	
					"<font" + " face = " + face + " color = " + color + " size = " + size + ">" +
					con  + "</font>" 

					+ "</body></html>";
					
	var opened = window.open("");
	opened.document.write(summaryText);
	stVersion += 1;
	log("gs");

 }
// Following function accepts object id, and removes object from the given list
 function removeListElement(listType){
 	/* 
 	for each element in deleteList, check if element is present in given intro or middle or end
 	list. 
 	If element is present, remove that element from the given list and also remove that 
 	element from the multi-selection list.
	*/
											//alert("List Type = " + listType);

		var objId = " ";
		var param = 0;
		var index1 = -1;
		var optLen = 0;
		var diff = 0;
		var list = [];
		var selectListId = " ";

		//console.log("----- Inside removeListElement -----");
		// List type selection
		if(listType == "i"){
			param = 9;			
			list = introList;
		} else if(listType == "m"){
			param = 9;			
			list = midList;
		} else if(listType == "e"){
			param = 9;			
			list = endList;
		} else if(listType == "bd1"){
			param = 9;
			list = bd1List;
		} else if(listType == "bd2"){
			param = 9;
			list = bd2List;
		} else if(listType == "c"){
			param = 10;
			//console.log("List is a conList!");
			list = conList;
		}

		var len1 = deleteList.length;
												//		alert("deleteList len = " + len1);
												//console.log("deleteList Length = " + len1);
												//console.log("Traversing deleteList!");	
		// Updating list
		for(var i = 0;i<len1;i++){ // traversing deleteList 
												//console.log("Index i = " + i);
			var option = deleteList[i];
			var optId = option.id; // Option Id
												 // alert("optId = " + optId);
												 //console.log("optId = " + optId);
			// generating object id 

			optLen = optId.length;
												 //console.log("optLen = " + optLen);			
												// alert("optLen = " + optLen);
			diff = optLen - param;
												// alert("tmp = " + diff);
												 //console.log("diff = " + diff);			

			objId = optId.substring(optLen,param); // Object Id
												// alert("ObjId = " + objId);
												 //console.log("objId = " + objId);												
			// Generating multi-select list id

			if(listType != "c"){

				selectListId = optId.substring(0,4);
												 //alert("selectListId = " + selectListId);
												 //console.log("selectListId = " + selectListId);		
			} else {
				selectListId = optId.substring(0,5);
												 //alert("selectListId = " + selectListId);
												 //console.log("selectListId = " + selectListId);														 
			}

			// Getting given list length
			var len2 = list.length;
												// alert("list length = " + len2);
												 //console.log("List Length - len2 = " + len2);														
												 //console.log("Removing element from given List! ");		

			// Removing element from given List
			for(var j = 0; j < len2; j++){
												//console.log("j = " + j);		
												//console.log("list[" + j + "]" + list[j].id);

				if(objId.localeCompare(list[j].id) == 0){
												 //console.log("objId matched with the list element");							
					index1 = j;
					j = len2; // terminating loop					
												// alert("index1 = " + index1)
												// alert("Exiting inner for loop!");
												// alert("j = " + j);
										
												 //console.log("Exiting inner loop");														


				}
			}
			// Removing element from list 
												 //console.log("index 1 =" + index1);				
												 //console.log("Removing element from List using 'splice'");														
			if(index1 != -1){
													//alert("removing element from list at index = " + index1);
				list.splice(index1,1);  
													 //console.log("Removing element from multi-select list!");				
				// Removing element from multi-select list
				var optionList = document.getElementById(selectListId);
													 //console.log("Checking if element is inside optionList!");							
				var index2 = $.inArray(deleteList[i],optionList);
													 //console.log("index 2 =" + index2);							
													 //alert("index2 = " + index2);
				optionList.options.remove(index2); 
			}												 
		}
		deleteList = [];
 }

/*
 	Following checkes if either introList or midList or endList are non-empty.
 	If any of these lists are non-empty, this function traverse all the nodes 
 	under selected node (all children), and creates a list of all these nodes.
 	This list is then used to see which one of these nodes belong to either of these lists.
 	Then it removes such nodes from the summary section before they are removed completly. 

 */
 function clearSummary(selected){
 	
 	var introLen = 0;
 	var bd1Len = 0;
 	var bd2Len = 0;
 	var conLen = 0;
 	var middleLen = 0;
 	var endLen = 0;
 	var proceedFlag = 0;
 	var tmpId = " ";

 	//alert("Hi from clearSummary! ");
 	//alert("clearing " + selected.name);
 	//console.log("----- clearSummary ------");
 	//console.log("Clearing = " + selected.name);

 	introLen = introList.length;
 	bd1Len = bd1List.length;
 	bd2Len = bd2List.length;
	conLen = conList.length;
 	middleLen = midList.length;
 	endLen = endList.length;

 	//alert("conLen = " + conLen);
	//console.log("conLen = " + conLen);


	// check if introList or midList or endList is empty
 	//if(introLen != 0 || middleLen != 0 || endLen != 0){
	if(introLen != 0 || bd1Len != 0 || bd2Len != 0 || conLen != 0){ 		
 		proceedFlag = 1;
 	} else {
 		proceedFlag = 0;
 	}

 	if(proceedFlag == 1){

 		// Collect all nodes under 'selected' node in 'orphanList'
 		// For each element in orphanList, check if element present in any or all intro, middle & end lists
 		// if element belong to either of the list, sort them in iDelList, mDelList & eDelList
 		// with the help of these lists remove each element from introList, midList and endList 
 		// also remove all these elements from multi-select list.

 		//console.log(" ------- Calling traverse! ------- ");
 		traverse(selected);

 		// clearing introduction
 		if(delIntroList.length != 0){
 			for(var i = 0, len = delIntroList.length; i< len; i++){
 				tmpId = "sm_2_opt_" + delIntroList[i].id;
				deleteList.push(document.getElementById(tmpId));
 			}
 			removeListElement("i");				
 			delIntroList = [];
 		}

 		// clearing body 1
 		if(delBd1List.length != 0){
 			for(var i = 0, len = delBd1List.length; i< len; i++){
 				tmpId = "sm_5_opt_" + delBd1List[i].id;
 				//console.log
				deleteList.push(document.getElementById(tmpId));
 			}
 			removeListElement("bd1");				
 			delBd1List = [];
 		}

 		// clearing body 2
 		if(delBd2List.length != 0){
 			for(var i = 0, len = delBd2List.length; i< len; i++){
 				tmpId = "sm_8_opt_" + delBd2List[i].id;
				deleteList.push(document.getElementById(tmpId));
 			}
 			removeListElement("bd2");				
 			delBd2List = [];
 		}	

 		//console.log("delConList length = " + delConList.length);

 		// clearing conclusion
 		if(delConList.length != 0){
 			for(var i = 0, len = delConList.length; i< len; i++){
 				tmpId = "sm_11_opt_" + delConList[i].id;
				deleteList.push(document.getElementById(tmpId));
 			}
 			//console.log("deleteList Length = " + deleteList.length);
 			//console.log("--- Calling removeListElement ---");
 			removeListElement("c");				
 			delConList = [];
 		}	
 	}
 }

 function traverse(node){
 

 	cwn = node; // cwn = current working node
 	//console.log("----- Inside traverse -----");

 	/* 
 	// For control there is no need to traverse through rest of the sub tree to delete associated node, hence commenting out this part.
 	if(node.hasOwnProperty("children")){
	 	
	 	for(var i = 0, len = node.children.length; i < len; i++){
	 		queue.push(node.children[i]);
	 	} 		
 	}
	*/
 	// check if node is present either in introList or midList or endList
 	
 	// check for introList
 	var index1 = $.inArray(node,introList);
 	
 	if(index1 != -1){
 		delIntroList.push(introList[index1]);
 	}
 	//check for bd1List
 	var index2 = $.inArray(node,bd1List);
 	
 	if(index2 != -1){
 		delBd1List.push(bd1List[index2]);
 	}

 	//check for bd2List
 	var index3 = $.inArray(node,bd2List);
 	
 	if(index3 != -1){
 		delBd2List.push(bd2List[index3]);
 	}

 	//check for conList
 	var index4 = $.inArray(node,conList);
 	
 	if(index4 != -1){
 		//console.log("node present in conList!");
 		delConList.push(conList[index4]);
 	}

 	/*
 	// check for midList
 	var index2 = $.inArray(node,midList);
 	if(index2 != -1){
 		delMidList.push(midList[index2]);
 	}
 	 	// check for endList
 	var index3 = $.inArray(node,endList);
 	if(index3 != -1){
 		delEndList.push(endList[index3]);
 	}
	*/

 	//console.log(node.name);
 	while(queue.length != 0){
 		traverse(queue.shift());

 	}
 }

 function updateEltName(selected){

 	// Check in each list, if selected element is present.
 	// if yes then get list option and update it with the updated element name

	var index = 0;
 	
 	// checking if selected element is in introList
	
 	index = $.inArray(selected,introList);
 	
 	if(!(index == -1)){

 	//	console.log("Selected node is in the introList!");
 	//	console.log("id = " + selected.id);
		var id = "sm_2_opt_" + selected.id;
	//	console.log("id = " + id);
		var option = document.getElementById(id);
	//	console.log("option value before change = " + option.text);
		option.text = selected.name;
	//	console.log("option value after change = " + option.text);
 	}

 	// checking if selected element is in Body 1 List
	
 	index = $.inArray(selected,bd1List);
 	
 	if(!(index == -1)){

 	//	console.log("Selected node is in the bd1List!");
 	//	console.log("id = " + selected.id);
		var id = "sm_5_opt_" + selected.id;
	//	console.log("id = " + id);
		var option = document.getElementById(id);
	//	console.log("option value before change = " + option.text);
		option.text = selected.name;
	//	console.log("option value after change = " + option.text);
 	}

 	// checking if selected element is in Body 2 List
	
 	index = $.inArray(selected,bd2List);
 	
 	if(!(index == -1)){

 	//	console.log("Selected node is in the bd1List!");
 	//	console.log("id = " + selected.id);
		var id = "sm_8_opt_" + selected.id;
	//	console.log("id = " + id);
		var option = document.getElementById(id);
	//	console.log("option value before change = " + option.text);
		option.text = selected.name;
	//	console.log("option value after change = " + option.text);
 	}

 	// checking if selected element is in Con List
	
 	index = $.inArray(selected,conList);
 	
 	if(!(index == -1)){

 	//	console.log("Selected node is in the conList!");
 	//	console.log("id = " + selected.id);
		var id = "sm_11_opt_" + selected.id;
	//	console.log("id = " + id);
		var option = document.getElementById(id);
	//	console.log("option value before change = " + option.text);
		option.text = selected.name;
	//	console.log("option value after change = " + option.text);
 	}


 }



