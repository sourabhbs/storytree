/*! StoryTree v1.0
 *  Written by Sourabh Bhangaonkar
 *  Aug 29 2015
 */
// Registering event for shortcut keys

//alert("This is ui.js");
var mode = "op_1";
document.addEventListener('keydown', keyDown, false );

$(function () {
  var links = $('.sidebar-links > div');
  links.on('click', function () {

    links.removeClass('selected');
    $(this).addClass('selected');
  
  });
});
/*
 function linkClick(op){
  //alert(op);
  mode = op;

  // Following code resets either selected node or selected elements, if Operation mode is switched.
  if(mode == "op_1"){
    //  scut = 1;
      if(selectList.length != 0){
        selectList = [];
        update(root);
      }
    } else {
    //  scut = 2;
      if(selected != null){
        selected = null;
        update(root);

      }
     // addShortCut();
    }

  
  //  Following code resets Text Field and Text Area under Tree Operations
   
  var txtField = document.getElementById("tr_4");
  var txtArea = document.getElementById("tr_6");
  txtArea.value = " ";
  txtField.value = " ";
 }
 */

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

        // Adding a Node
        if (e.altKey && e.keyCode == 78) { // n = 78
            addNode();
        }      

        // Adding a pros node
        if (e.altKey && e.keyCode == 49) { // 1 = 49
            addNode("tr_0");
        }      
        // Adding a cons node
        if (e.altKey && e.keyCode == 50) { // 2 = 50
            addNode("tr_1");
        }      
        // Deleting a node
        if (e.altKey && e.keyCode == 68) { // d = 68
            delNode();
        }      

        // Updating a node
        if (e.altKey && e.keyCode == 85) { // u = 85
            updateNode()
        }      


    } else if(mode == "op_2"){ // Summary Operations
      /*
        // Classifying as Introduction
        if (e.ctrlKey && e.keyCode == 73) { // i = 73
            addToIntro();
        }      
        // Classifying as Middle
        if (e.ctrlKey && e.keyCode == 77) { // m = 77
            addToMiddle();
        }      
        // Classifying as End
        if (e.ctrlKey && e.keyCode == 82) { // r = 82
            addToEnd();
        }      
        // Generate Summary
        if (e.ctrlKey && e.keyCode == 71) { // g = 71
          genSum();
        }
        // Remove Selection
        if (e.keyCode == 8 || e.keyCode == 46) { // backspace = 8, delete = 46
            alert("This removes selected element from multi list!");
        }     
        */
    }
}


    

    
