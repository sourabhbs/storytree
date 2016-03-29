/*! StoryTree v1.0
 *  Written by Sourabh Bhangaonkar
 *  Aug 29 2015
 */
// Registering event for shortcut keys

//alert("This is ui.js");
var mode = "op_1";
var scut = 1; // This variable is set to 1 if mode is "op_1" and 2 if mode is "op_2". It is used to display short cut options

document.addEventListener('keydown', keyDown, false );

$(function () {
  var links = $('.sidebar-links > div');
  links.on('click', function () {

    links.removeClass('selected');
    $(this).addClass('selected');
  
  });
});

 function linkClick(op){
  //alert(op);
  mode = op;

 // Following code resets either selected node or selected elements, if Operation mode is switched.
  if(mode == "op_1"){
      //scut = 1;
      if(selectList.length != 0){
        selectList = [];
        selected.isSelected = "0";
      }
      selected = root;
      selected.isSelected = "1";
      update(root);

    } else {
      //scut = 2;
      if(selected != null){
        selected.isSelected = "0";
      }
        selected = root;
        update(root);

     // addShortCut();
    }

  
  //  Following code resets Text Field and Text Area under Tree Operations
   
  var txtField = document.getElementById("tr_4");
  var txtArea = document.getElementById("tr_6");
  txtArea.value = " ";
  txtField.value = " ";
 }

function keyDown(e){

  //if (e.ctrlKey && e.keyCode == 73) {
    if(mode == "op_1"){ // Story Operations

        // Adding a node
        if (e.altKey && e.keyCode == 78) { // a = 65 n = 78
            addNode();
        }      
        // Deleting a node
        if (e.altKey && e.keyCode == 68) { // d = 68
            delNode();
        }      
        // Updating a node
        if (e.altKey && e.keyCode == 85) { // u = 85
            updateNode()
        }      
        if (e.altKey && e.keyCode == 80) { // p = 85
            addPlot();
        }      


    } else if(mode == "op_2"){ // Summary Operations

      /*
        // Classifying as Introduction
        if (e.altKey && e.keyCode == 73) { // i = 73
            addToIntro();
        } 
        // Classifying as Body 2
        if (e.altKey && e.keyCode == 49) { // 1 = 49
            addToBd1();        
        }      
        // Classifying as Body 2
        if (e.altKey && e.keyCode == 50) { // 2 = 50
            addToBd2();        
        }      
        if (e.altKey && e.keyCode == 67) { // c = 67
            addToCon();
        }      
        // Generate Summary
        if (e.altKey && e.keyCode == 71) { // g = 71
          genSum();
        }
        // Remove Selection
        if (e.keyCode == 8 || e.keyCode == 46) { // backspace = 8, delete = 46
            alert("This removes selected element from multi list!");
        }    
        */
    }
}

function addShortCut(){

  //alert("Hi from addShortCut!");

    var face = "arial"; //"Book Antiqua";////"verdana";//"Papyrus"; 
    var color = "#b8b8b8";//#ffffff";
    var size = 2.0;
    var scutTxt = "";
    //num = 6;
    switch (scut) {

      case 0: //console.log("None"); 
      break;       
      case 1: //console.log("None"); 
              scutTxt = "Add Story Plot - 'Alt + P'";
              document.getElementById("scut").innerHTML = "<font" + " face = " + face + " color = " + color + " size = " + size + ">" + scutTxt + "</font>"; 
      break;       
      case 2: //console.log("abs 1"); 
              scutTxt = "Generate Summary -'Alt + G'";
              document.getElementById("scut").innerHTML = "<font" + " face = " + face + " color = " + color + " size = " + size + ">" + scutTxt + "</font>"; 
      break;      
      default: // none
    }
}
    
