/*! StoryTree v1.0
 *  Written by Sourabh Bhangaonkar
 *  Aug 29 2015
 */

var iteration = [];
var sumIteration = {};
var iterationNum = 0;
var state = {};
var sumState = {};
var nodeNum = 2;
var listNum = 2;
var selectList = [];
var latestNode = null;
var selected = null;
// Data 
var treeData = [{"name": "Story Name",
                 "sname": "Story Name",
                 "type":"root",
                 "desc":"",
                 "sdesc":"",
                 "isIntro":"0",
                 "isSelected":"1",                  
                 "parent": "null",
                 "children": [{
                                "name": "node_0",
                                "sname": "node_0",
                                "type":"list_0",
                                "desc":"",
                                "sdesc":"",
                                "isIntro":"0",
                                "isSelected":"0", 
                                "parent": "0",
                             },
                             {
                                "name": "node_1",
                                "sname": "node_1",
                                "type":"list_0",
                                "desc":"",
                                "sdesc":"",
                                "isIntro":"0",
                                "isSelected":"0", 
                                "parent": "0",
                             }
                             ]
                }]


// ************** Generate the tree diagram  *****************
var margin = {top: 20, right: 320, bottom: 20, left: 10},
  width = 1700 - margin.right - margin.left, //960
  height = 1700 - margin.top - margin.bottom; // Defines the dimension of the canvas.
  
var i = 0;
var duration = 500; // time taken to expand or shrink the tree, default 750
var root; // tree root

var tree = d3.layout.tree().size([height, width]); // Defines a tree object, determines tree layout.
var diagonal = d3.svg.diagonal().projection(function(d) { return [d.x, d.y];});

var div = d3.select("#content").append("div").attr("class","tooltip").style("opacity",0);
//div.append("div").attr("class","tooltipTail").style("opacity",0);

var svg = d3.select("#content").append("svg:svg")
  .attr("width", width + margin.right + margin.left)
  .attr("height", height + margin.top + margin.bottom)
  .style("background-color","#404040")
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
root = treeData[0];
root.x0 = 100;//height / 2;
root.y0 = 0;

d3.select(self.frameElement).style("height", "500px");

update(root);

selected = root;

// Resetting Sidebar elements.
var txtField = document.getElementById("tr_4");
var txtArea = document.getElementById("tr_6");
txtArea.value = " ";
txtField.value = " ";

function update(source) {

  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse(),
      links = tree.links(nodes);

  // Normalize for fixed-depth.
      nodes.forEach(function(d) { d.y = d.depth * 150; });

  // Update the nodes…
  var node = svg.selectAll("g.node").data(nodes, function(d) { return d.id || (d.id = ++i); });

  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node.enter().append("g")
    .attr("class", "node")
    .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
    .on("click", click)
    .on("mouseover",function(d){
      div.transition().duration(200).style("opacity",0.9);
      div.html("<br/><b>" + d.name + "</b><br/><br/>" + d.desc).style("left",(d3.event.pageX)+"px")
      .style("top",(d3.event.pageY-20)+"px");
    })
    .on("mouseout",function (d){
      div.transition().duration(500).style("opacity",0);
    })
    .attr("id",function(d) { return "g_"+ d.id; });

  nodeEnter.append("circle")
    .attr("r", 1e-6)
    .attr("id", function(d) { return "c_" + d.id; })
    //.style("fill", function(d) { return d._children ? "#1cc" : "#1cc"; });
    .style("fill", "#1cc");

  nodeEnter.append("text")
    .attr("id", function(d) { return "t_" + d.id; })
    .attr("x", function(d) { return d.children || d._children ? -15 : 15; })
    .attr("dy", ".35em")
    .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
    .text(function(d) {return d.sname + " : " + d.sdesc;}) // This line displays the text associated with the node.
    .style("fill-opacity", 1e-6);

// Transition nodes to their new position.
  var nodeUpdate = node.transition()
    .duration(duration)
    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  nodeUpdate.select("circle")
    .attr("r", 10)
    //.style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });
    .style("fill", function(d){
      if(d.isSelected.localeCompare("1") == 0){
        //console.log("The node is selected!");
        return "#ff0000"; 
      } else {
        return "#a6a6a6";
      }
    })    
    .attr("stroke","#a6a6a6")
    //.attr("stroke-opacity","1");
     .attr("fill-opacity", function(d) { 
          if(d.desc.localeCompare("") == 0){ // if description is empty then apply lighter stroke color
            return "0.5"; 
          } else {
            return "1";            
          }
      });

  nodeUpdate.select("text")
  .text(function(d) {return d.sname + " : " + d.sdesc;})
  .style("fill","#ffffff")
  .style("fill-opacity", 1);

  // Transition exiting nodes to the parent's new position.
  var nodeExit = node.exit().transition()
    .duration(duration)
    .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
    .remove();

  nodeExit.select("circle").attr("r", 1e-6);

  nodeExit.select("text").style("fill-opacity", 1e-6);

  // Update the links…
  var link = svg.selectAll("path.link")
    .data(links, function(d) { return d.target.id; });

  // Enter any new links at the parent's previous position.
  link.enter().insert("path", "g")
    .attr("class", "link")
    .attr("d", function(d) {
    var o = {x: source.x0, y: source.y0};
    return diagonal({source: o, target: o});
    });

  // Transition links to their new position.
  link.transition()
    .duration(duration)
    .attr("d", diagonal);

  // Transition exiting nodes to the parent's new position.
  link.exit().transition()
    .duration(duration)
    .attr("d", function(d) {
    var o = {x: source.x, y: source.y};
    return diagonal({source: o, target: o});
    })
    .remove();

  // Stash the old positions for transition.
  nodes.forEach(function(d) {
  d.x0 = d.x;
  d.y0 = d.y;
  });
}

// Toggle children on click.
function click(d) {
  
  var element;

  /* 
    For mode 1 single select is allowed, 
    for mode 2 multiple select is allowed.
  */

  if(mode == "op_1"){   // single select 
/*
    // Reset already selected node.
    if(selected != null){

        var nodeColor = "";
        
    //    if(selected.type == "pros"){
    //      nodeColor = "#f38563";
    //    } else if (selected.type == "cons"){
    //      nodeColor = "#70c5e5";
    //    } else if(selected.type == "root"){
    //      nodeColor =  "#a6a6a6";
    //    }
        

        // -----------
        if(selected.type == "pros"){
            if(selected.desc.localeCompare("") == 0){ // if description is empty then apply lighter fill color
              nodeColor =  "#efcdc2"; 
            } else {
              nodeColor =  "#f38563";            
            }
        } else if (selected.type == "cons"){
            if(selected.desc.localeCompare("") == 0){ // if description is empty then apply lighter fill color
              nodeColor =  "#b1d3e0";
            } else {
              nodeColor =  "#70c5e5";
            }
        } else if(selected.type == "root"){
            if(selected.desc.localeCompare("") == 0){ // if description is empty then apply lighter stroke color
              nodeColor =  "#a6a6a6";
            } else {
              nodeColor =  "#363636"; //"#797878";            
            }
        }

          // -----------



        element = document.getElementById("c_" + selected.id);
        element.style.fill = nodeColor;
    }

    selected = d;
      //alert(d.id);
    element = document.getElementById("c_" + selected.id);
    element.style.fill = "red";
    element.setAttribute("stroke-opacity","1");  

    // Following code sets node name and description details to text field and text area
    var name = selected.name;
    var desc = selected.desc;

    document.getElementById("tr_4").value = name; // UI label
    document.getElementById("tr_6").value = desc; // UI Description

    //alert("Mode = " + mode);
  */


     // Reset already selected node.

      if(selected == d){
      
        d.isSelected = "1";
        
      } else {
        
       // var nodeColor = "";
        selected.isSelected = "0"; // resetting earlier selected node
        selected = d;
        selected.isSelected = "1";

      }

    // Following code sets node name and description details to text field and text area
    var name = selected.name;
    var desc = selected.desc;

    document.getElementById("tr_4").value = name; // UI label
    document.getElementById("tr_6").value = desc; // UI Description 
    update(root);  

  } else { // multi select

    if(d.type == "root"){ // selected node is a root node

      alert("This operation is not allowed for Project Node!");
    
    } else { // selected node is not a root node
                // set selected node to null (?)
    //  selected = null;
      var selectFlag = 0;
      /* 
       * For each node in selectList, check if selected node is alreay present, 
       * if not add to selectList
       */

      var len = selectList.length;
      //  alert("len = " + len);

      if(len == 0){ // first selected node    
        //  alert("Adding first element!");

        selectList.push(d);
        element = document.getElementById("c_" + d.id);
        element.style.fill = "orange";
        element.setAttribute("stroke-opacity","1");  

      } else {  // additional nodes

          // alert("Verifying existing nodes!");
          
          // verifying existing node, in selectList

          for(var i = 0; i< len; i++){
              //  alert("selectList[" + i + "].id = " + selectList[i].id + " d.id = " + d.id);
                if(selectList[i].id == d.id){
                  selectFlag = 1;
                  i = len;
                } else {
                  selectFlag = 0;
                }
          }
          // alert("selectFlag = " + selectFlag);
          if(selectFlag == 0){

                selectList.push(d);
                // alert("Adding selected node!");
                // alert("selectList length = " + selectList.length);
                element = document.getElementById("c_" + d.id);
                // alert("Id = " + element.id);
                element.style.fill = "orange";
                element.setAttribute("stroke-opacity","1");  
          } else {
          
              //  alert("Node already selected!");

                var index = $.inArray(d,selectList);
                selectList.splice(index,1); 
                element = document.getElementById("c_" + d.id); 
                /*
                if(d.type == "pros"){
                    if(d.desc.localeCompare("") == 0){ // if description is empty then apply lighter fill color
                      nodeColor =  "#efcdc2"; 
                    } else {
                      nodeColor =  "#f38563";            
                    }
                } else if (d.type == "cons"){
                    if(d.desc.localeCompare("") == 0){ // if description is empty then apply lighter fill color
                      nodeColor =  "#b1d3e0";
                    } else {
                      nodeColor =  "#70c5e5";
                    }
                } 
                */

                element.style.fill = "#a6a6a6";
                element.setAttribute("stroke-opacity","1");   


          } 
      } // additional nodes else part close
    } // selected node is not a root node else part close
      
  } // multi select else part close
}

function addPros(selected){
  var cwn = null;
  getLatestNode(selected);
  cwn = latestNode;
                                              // alert(cwn);
                                              // alert("Current Node Type = " + cwn.type);
                                              // console.log("parent = " + cwn.parent.id);
  
  // Add new Pros child.
  cwn.children = [{"name": "list1",
                              "sname": "list1", 
                              "type":"pros",
                              "desc":"",
                              "sdesc":"",
                              "isIntro" : "0",
                              "parent": cwn.parent.id
                            }];
  update(selected);
  linkClick("op_1");
  latestNode = null;
  var tmp = "l1_" + selected.id;
  log(tmp);

  //log("l1");
}

function addCons(selected){
                                              //alert("Add Cons!");
  var cwn = null;
                                              //alert("Add Pros!");
                                              //alert("Getting latest Node!");
                                              //alert(cwn);

  getLatestNode(selected);
  cwn = latestNode;
  //alert(cwn);
  //alert("Current Node Type = " + cwn.type);
  // console.log("parent = " + cwn.parent.id);
  cwn.children = [{"name": "list2",
                              "sname": "list2", 
                              "type":"cons",
                              "desc":"",
                              "sdesc":"",
                              "isIntro" : "0",
                              "parent": cwn.parent.id
                            }];
  update(selected);
  linkClick("op_1");
  latestNode = null;
  var tmp = "l2_" + selected.id;
  log(tmp);

  //log("l2");

}


function getLatestNode(node){
  //alert("getLatestNode!");
  var cwn = node;
  // console.log("Current Working Node Type " + cwn.type);
  if(cwn.hasOwnProperty("children")){
    
    // console.log("Node has child");
    cwn = cwn.children[0];
    // console.log("New Current working Node Type " + cwn.type);
    // console.log("recursion!");
    
    getLatestNode(cwn); // recursion

  } else {
    // console.log("Node has No child node! Return = " + cwn.type);
  //return cwn;
  latestNode = cwn;
  }
}
function addNode(){
  //alert("Hi from Add Node!");
    var nodeName = "node_" + nodeNum;
    var len = 0;
    var type = "";
    var cwn = null;
    var index = 0;

    if(selected != null){

      // If selected node is root add New list!
      if(selected.type === "root"){

        // If selected node is root, create new list.
        // Create a node id, node name 
        // Node type will be the list name e.g. list_0

        type = "list_" + listNum; // This is a unique list type       

        if(selected.hasOwnProperty("children")){  // root has children (1 or 2)

          selected.children.push({"name": nodeName, 
                                      "sname": nodeName, 
                                      "type":type,
                                      "desc":"",
                                      "sdesc":"",
                                      "isIntro":"0",
                                      "isSelected":"0",                                      
                                      "parent": selected.id});
        } else {

          selected.children = [{"name": nodeName,
                              "sname": nodeName,  
                              "type":type,
                              "desc":"",
                              "sdesc":"",
                              "isIntro" : "0",
                              "isSelected":"0",
                              "parent": selected.id
                              //"children": []
                            }];
      }
        // alert("This is root!");
        listNum += 1;

        // Setting focus to newly added node

        selected.isSelected = "0";
        index = selected.children.length -1;
                                                                  //alert(index);
        selected.children[index].isSelected = "1";
        selected = selected.children[index];
        update(root);
      } else { // If selected node is a list node, add new node to the list.

        // If selected node is root, create new list.
        // Create a node id, node name 
        // Node type will be the list name e.g. list_0
        // If selected node is a child node, add new list node to the given list.

        // Following function gets latest node reference, and sets it to the "latestNode"
        getLatestNode(selected); // console.log("Current Node = " + latestNode.name);
        cwn = latestNode;
        
        cwn.children = [{"name": nodeName,
                              "sname": nodeName,  
                              "type":cwn.type,
                              "desc":"",
                              "sdesc":"",
                              "isIntro" : "0",
                              "isSelected":"0",
                              "parent": cwn.id
                              //"children": []
                            }];       
      }

              // Setting focus to newly added node
        
        cwn.isSelected = "0";
        index = cwn.children.length -1;
                                                                  //alert(index);
        selected.isSelected = "0";      // unfocuing selected node
        var tmp = "a_" + cwn.id;
        selected = cwn.children[index];
        selected.isSelected = "1";      // setting focus to newly added node.
        nodeNum += 1;                   // incrementing node count
  

        // Following code sets node name and description details to text field and text area
        var name = selected.name;
        var desc = selected.desc;
        document.getElementById("tr_4").value = name; // UI label
        document.getElementById("tr_6").value = desc; // UI Description 


        update(root);

        //logging Tree updates
        log(tmp);

  
    } else {
      
      alert("Please select a node!");
    
    }
}
/*
function addNode(nodeType){

  var prosFlag = 0;
 // alert("Add Node Type = " + nodeType);

  if(selected != null){
      
      if(selected.type == "root"){
        // Adding Pros
        if(nodeType.localeCompare("tr_0") == 0){ // Add pros node option selected
          if(selected.hasOwnProperty("children")){  // root has children (1 or 2)
            var len = selected.children.length;       // console.log("selected children len = " + len);
            if(len == 1){ // if root has one child
              // check root child type
              if(selected.children[0].type.localeCompare("pros") == 0){ // if root child type is "pros"
                addPros(selected.children[0]);  // add new pros child to root.children[0]
              } else { // if root child type is "cons" 
                // splice(position, numberOfItemsToRemove, item)
                selected.children.splice(0,0,{"name": "list1",
                                              "sname": "list1", 
                                              "type":"pros",
                                              "desc":"",
                                              "sdesc":"",
                                              "isIntro" : "0",
                                              "parent": selected.id
                            });
                update(selected);
              }

            } else { // if root has two children, add pros to root.children[0]
              addPros(selected.children[0]);
            }
          } else { // root node does not have any children
            addPros(selected);             
          }
        } // Add pros node option selected closed

        // Adding Cons
        if(nodeType.localeCompare("tr_1") == 0){ 
          if(selected.hasOwnProperty("children")){  // root has children (1 or 2)
                    var len = selected.children.length;       // console.log("selected children len = " + len);
                    if(len == 1){ // if root has one child
                      // check root child type
                      if(selected.children[0].type.localeCompare("cons") == 0){ // if root child type is "cons"
                        addCons(selected.children[0]);  // add new pros child to root.children[0]
                      } else { // if root child type is "pros" 
                        // splice(position, numberOfItemsToRemove, item)
                        selected.children.splice(1,0,{"name": "list2",
                                                      "sname": "list2", 
                                                      "type":"cons",
                                                      "desc":"",
                                                      "sdesc":"",
                                                      "isIntro" : "0",
                                                      "parent": selected.id
                                    });
                        update(selected);
                      }

                    } else { // if root has two children, add pros to root.children[0]
                      addCons(selected.children[1]);
                    }
                  } else { // root node does not have any children
                    addCons(selected);             
                  }
        }

      } else {

        // Following code checks node type, 
        // only pros can be added to pros list and cons can be added to cons list

        if(selected.type.localeCompare("pros") == 0){ 
          
          prosFlag = 1;

        } else {
          
          prosFlag = 0;

        } 

        if(prosFlag == 1 && nodeType.localeCompare("tr_0") == 0){
          
          addPros(selected);
        
        } else if(prosFlag == 0 && nodeType.localeCompare("tr_1") == 0){
        
          addCons(selected);
        
        } else {
        
          alert("Operation Not Allowed!");
          update(root);
        
        }
      }
      selected = null;

    } else {

      alert("Please select node!");
  }
}
*/

function delNode(){
  //alert("Delete Node!");
  if(selected != null){

    if(selected.type == "root"){
      
      alert("Can not delete Project Node!");

    } else {
      var child = null;
      var parent = null;
      var index = 0;

      parent = selected.parent; // selected node's parent
      index = $.inArray(selected,parent.children); // selected node's index in the parent.children list 

      if(selected.hasOwnProperty("children")){
        child = selected.children[0];
        parent.children.splice(index,1); // removing selected node from parent's children list
        parent.children.splice(index,0,child); // adding selected node's child to parent's children list
      } else {
        parent.children.splice(index,1); // removing selected node from parent's children list
      }
      
      // clearing summary 
      clearSummary(selected);

      var tmp = "d_" + selected.id;
      log(tmp);

      if(child != null){
        selected = child;
      } else {
        selected = parent;
      }
      selected.isSelected = "1";
      update(root);
    }         

  } else {
    alert("Please select node!");
  }
}
/*
function delNode(){
  //alert("Delete Node!");
  var child = null;
  var parent = null;
  var type = "";
    // check if selected node is null.
  if(selected != null){

    if(selected.type == "root"){
        alert("Can not delete Project Node!");
    } else {
      var key = null;
      var nodeDelete = 0;
      parent = selected.parent;
      type = selected.type;

        var conFlag = confirm("Deleting This Node deletes also deletes Summary operations associated with it! Do you want to delete this node?");

        if(conFlag == true){  // User is sure to delete selected node.
            nodeDelete = 1;
        } else {              // User cancel deleting selected node.
              nodeDelete = 0;
        }


      if(selected.hasOwnProperty("children")){ // selected Node has child node
        child = selected.children[0];

      } else {  // Selected node does not have child node

           child = null;
      }

      // User wishes to delete selected node
      if(nodeDelete == 1){
        // <Delete Node functionality>

        if(parent.type.localeCompare("root") != 0){ // selected node's parent is not root

          if( child != null){ // selected node has child node
            parent.children.splice(0,1); // removing selected node from parent's children list
            parent.children.splice(0,0,child); // adding selected node's child to parent's children list
          } else { // selected node does not have child node
            parent.children.splice(0,1);
            // remove children attribute of parent
            delete parent.children;
          }

        } else { // selected node's parent is a root node
          var len = parent.children.length;
          if(len == 2){ // root has two children
            if(type.localeCompare("pros") == 0){ // selected node is of type "pros"

              if(child != null){  // selected node has child
                parent.children.splice(0,1);  // removing selected node from root's children's '0' location
                parent.children.splice(0,0,child); // adding selected node's child at root's children's '0' location
              } else { // selected node does not have children
                parent.children.splice(0,1); // removing selected node from root's children's '0' location
              }
            
            } else { // selected node is of type "cons"

              if(child != null){  // selected node has child
                parent.children.splice(1,1);  // removing selected node from root's children's '1' location
                parent.children.splice(1,0,child); // adding selected node's child at root's children's '0' location
              } else { // selected node does not have children
                parent.children.splice(1,1); // removing selected node from root's children's '0' location
              }

            }
          } else { // root has only one child

              if(child != null){  // selected node has child
                parent.children.splice(0,1);  // removing selected node from root's children's '1' location
                parent.children.splice(0,0,child); // adding selected node's child at root's children's '0' location
              } else { // selected node does not have children
                parent.children.splice(0,1); // removing selected node from root's children's '0' location
                // remove children attribute of parent
                delete parent.children;
              }
          }
        }
        update(root);
        clearSummary(selected);
        var tmp = "d_" + selected.id;
        log(tmp);
        selected = null;
      } // nodeDelete == 1 close
    }  


    // This refreshes the Node Label and Node Description fields
    linkClick("op_1");
    

      
    //log("d");

  } else {
      alert("Please select node!");
  }
}
*/
/* 
 * Following function updates node details in json data scructure, with details provided by the user.
 */

function updateNode(){

  //alert("Update Node!");
  //Get Field details

  if(selected != null){

  //  if(selected.type != "root"){

      var name = document.getElementById("tr_4").value; // UI label
      var desc = document.getElementById("tr_6").value; // UI Description
      
      //alert("Name = " + name);
      //alert("Description = " + desc);
      // Short Description
      if(desc.length > 10){
        var sdesc = desc.substring(0,10)+ "..";
      } else {
        sdesc = desc;
      }

      // Introduction
      if(name.length > 10){
        var sname = name.substring(0,10)+ "..";
      } else {
        sname = name;
      }

      selected.name = name;
      selected.sname = sname;
      selected.desc = desc;
      selected.sdesc = sdesc;


      // Updating multi select list option text value
      updateEltName(selected);
      
      // Updating node

      update(selected);

      var tmp = "u_" + selected.id;
      log(tmp);
      
    //  selected = null;

  //  } else {
  //    alert("This operation not allowed for Project Node!");
  //  }
  } else {
      alert("Please select a node!");
  }
}




// Logging functions
// Following function calls logiing and sumLogging functions
function log(operation){
iteration = [];
sumIteration = {};
iteration.push(operation);
sumIteration["op"] = operation;
logging(root);
sumLogging();
//console.log("iterationNum" + iterationNum + "iteration = " + iteration);
state[iterationNum] = iteration;
sumState[iterationNum] = sumIteration;
iterationNum += 1;

}

// Following function logs summary operations
function sumLogging(){

var tmp = {};
var intro = [];
var bd1 = [];
var bd2 = [];
var con = [];

// Classification Introduction 
for(var i=0;i< introList.length;i++){
    tmp.id = introList[i].id;

    if(introList[i].parent != "null"){
                                        tmp.parent = introList[i].parent.id;
    } else {
                                        tmp.parent = introList[i].parent;
    }

    tmp.depth = introList[i].depth;
    tmp.name = introList[i].name;
    tmp.sname = introList[i].sname;
    tmp.type = introList[i].type;
    tmp.desc = introList[i].desc;
    tmp.sdesc = introList[i].sdesc;
    tmp.isIntro = introList[i].isIntro;

    intro.push(tmp);
    tmp = {};
}
sumIteration["intro"] = intro;


// Classification Body 1
for(var i=0;i< bd1List.length;i++){
    tmp.id = bd1List[i].id;

    if(bd1List[i].parent != "null"){
                                        tmp.parent = bd1List[i].parent.id;
    } else {
                                        tmp.parent = bd1List[i].parent;
    }

    tmp.depth = bd1List[i].depth;
    tmp.name = bd1List[i].name;
    tmp.sname = bd1List[i].sname;
    tmp.type = bd1List[i].type;
    tmp.desc = bd1List[i].desc;
    tmp.sdesc = bd1List[i].sdesc;
    tmp.isIntro = bd1List[i].isIntro;

    bd1.push(tmp);
    tmp = {};
}
sumIteration["bd1"] = bd1;

// Classification Body 2
for(var i=0;i< bd2List.length;i++){
    tmp.id = bd2List[i].id;

    if(bd2List[i].parent != "null"){
                                        tmp.parent = bd2List[i].parent.id;
    } else {
                                        tmp.parent = bd2List[i].parent;
    }

    tmp.depth = bd2List[i].depth;
    tmp.name = bd2List[i].name;
    tmp.sname = bd2List[i].sname;
    tmp.type = bd2List[i].type;
    tmp.desc = bd2List[i].desc;
    tmp.sdesc = bd2List[i].sdesc;
    tmp.isIntro = bd2List[i].isIntro;

    bd2.push(tmp);
    tmp = {};
}
sumIteration["bd2"] = bd2;

//Classification Conclusion

for(var i=0;i< conList.length;i++){
    tmp.id = conList[i].id;

    if(conList[i].parent != "null"){
                                        tmp.parent = conList[i].parent.id;
    } else {
                                        tmp.parent = conList[i].parent;
    }

    tmp.depth = conList[i].depth;
    tmp.name = conList[i].name;
    tmp.sname = conList[i].sname;
    tmp.type = conList[i].type;
    tmp.desc = conList[i].desc;
    tmp.sdesc = conList[i].sdesc;
    tmp.isIntro = conList[i].isIntro;

    con.push(tmp);
    tmp = {};
}
sumIteration["con"] = con;

}
// Following function logs story operations

function logging(node){
  var cwn = null;
  var tmp = {};
  var childQ = [];
  
  cwn = node;
  tmp.id = cwn.id;

  if(cwn.parent != "null"){
     tmp.parent = cwn.parent.id;
  } else {
     tmp.parent = cwn.parent;
  }
  // Adding children ids
  if(cwn.hasOwnProperty("children")){
    tmp.children = [];
    var len = cwn.children.length
    for(var i=0;i<len;i++){
      queue.push(cwn.children[i]);
      childQ.push(cwn.children[i]);
    }
    var len = childQ.length
    for(var i = 0; i < len; i++){
      tmp.children.push(childQ[i].id);
    }
    childQ = [];
  }

  tmp.depth = cwn.depth;
  tmp.name = cwn.name;
  tmp.sname = cwn.sname;
  tmp.type = cwn.type;
  tmp.desc = cwn.desc;
  tmp.sdesc = cwn.sdesc;
  tmp.isIntro = cwn.isIntro;
   
  //console.log("tmp = " + JSON.stringify(tmp));

  iteration.push(tmp);
  delete tmp;

  while(queue.length != 0){
    logging(queue.shift());
  }

}

