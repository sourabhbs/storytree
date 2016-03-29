/*! StoryTree v1.0
 *  Written by Sourabh Bhangaonkar
 *  Aug 29 2015
 */

var iteration = [];
var sumIteration = {};
var iterationNum = 0;
var nodeNum = 1;
var state = {};
var sumState = {};
var selectList = [];
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
                                "name": "Introduction_0",
                                "sname": "Introduction_0",
                                "type":"intro",
                                "desc":"",
                                "sdesc":"",
                                "isIntro":"1",
                                "isSelected":"0",
                                "parent": "0",
                                "children": [{
                                              "name": "Middle_0",
                                              "sname": "Middle_0",
                                              "type":"middle",
                                              "desc":"",
                                              "sdesc":"",
                                              "isIntro":"0",
                                              "isSelected":"0",
                                              "parent": "1",
                                              "children": [{
                                                             "name": "Resolution_0",
                                                             "sname": "Resolution_0",
                                                             "type":"end",
                                                             "desc":"",
                                                             "sdesc":"",
                                                             "isIntro":"0",
                                                             "isSelected":"0",
                                                             "parent": "2",
                                                             "children": []
                                                          }]
                                            }]
                             }]
                }]


// ************** Generate the tree diagram  *****************
var margin = {top: 20, right: 320, bottom: 20, left: 10},
  width = 1700 - margin.right - margin.left, //960
  height = 1700 - margin.top - margin.bottom; // Defines the dimension of the canvas.
  
var i = 0;
duration = 500; // time taken to expand or shrink the tree // default 750
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

// Resetting Sidebar elements.
var txtField = document.getElementById("tr_4");
var txtArea = document.getElementById("tr_6");
txtArea.value = " ";
txtField.value = " ";
selected = root;

function update(source) {
//  console.log("Hi from Update!");
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
    //.style("fill","#1cc");
    .style("fill", function(d) { 
      if(d.isSelected.localeCompare("1") == 0){
        //console.log("The node is selected!");
        return "#ff0000"; 
      } else {
        if(d.type == "intro"){
            if(d.desc.localeCompare("") == 0){ // if description is empty then apply lighter fill color
              return "#efcdc2";
            } else {         
              return "#f38563";            
            }
        } else if (d.type == "middle"){
            if(d.desc.localeCompare("") == 0){ // if description is empty then apply lighter fill color
              return "#b1d3e0";
            } else {
              return "#70c5e5";
            }
        } else if(d.type == "end"){
              if(d.desc.localeCompare("") == 0){ // if description is empty then apply lighter fill color
                return "#a9e0c5";                
              } else {
                return "#479e74";
              }
        }
        else if(d.type == "root"){
            if(d.desc.localeCompare("") == 0){ // if description is empty then apply lighter stroke color
              return "#a6a6a6";
            } else {
              return "#a6a6a6";              
              //return "#363636"; //"#797878";            
            }
        }
      }  
      })
    .attr("stroke",function(d) { 
      if(d.type == "intro" && d.isIntro == "0"){
          //console.log("Executed!");
          if(d.desc.localeCompare("") == 0){ // if description is empty then apply lighter stroke color
            return "#efcdc2"; 
          } else {
            return "#f38563";            
          }
      } else if (d.type == "middle" && d.isIntro == "0"){

          if(d.desc.localeCompare("") == 0){ // if description is empty then apply lighter stroke color
            return "#b1d3e0";
          } else {
            return "#70c5e5";
          }

      } else if(d.type == "end" && d.isIntro == "0"){
          
          if(d.desc.localeCompare("") == 0){ // if description is empty then apply lighter fill color
              return "#a9e0c5";
          } else {
              return "#479e74";
          }
      } else if(d.type == "intro" && d.isIntro == "1"){
          
        //  console.log("This was Executed!");
          
          if(d.desc.localeCompare("") == 0){ // if description is empty then apply lighter fill color
            return "#efcdc2"; 
          } else {
            return "#f38563";            
          }
      } else if(d.type == "middle" && d.isIntro == "1"){

          if(d.desc.localeCompare("") == 0){ // if description is empty then apply lighter stroke color
            return "#efcdc2";             
          } else {
            return "#f38563";            
          }
      } else if(d.type == "end" && d.isIntro == "1"){
          if(d.desc.localeCompare("") == 0){ // if description is empty then apply lighter stroke color
            return "#efcdc2"; 
          } else {
            return "#f38563";            
          }
      } else if(d.type == "root"){
            if(d.desc.localeCompare("") == 0){ // if description is empty then apply lighter stroke color
              return "#a6a6a6";
            } else {
              return "#a6a6a6";              
              //return "#363636"; //"#797878";            
            }
      }
      })
    .attr("stroke-opacity","1")
    .attr("fill-opacity", function(d) { 
      if(d.type == "intro" && d.isIntro == "0"){
          //console.log("Executed!");
          if(d.desc.localeCompare("") == 0){ // if description is empty then apply lighter stroke color
            return "0.5"; 
          } else {
            return "1";            
          }
      } else if (d.type == "middle" && d.isIntro == "0"){

          if(d.desc.localeCompare("") == 0){ // if description is empty then apply lighter stroke color
            return "0.5";
          } else {
            return "1";
          }

      } else if(d.type == "end" && d.isIntro == "0"){
          
          if(d.desc.localeCompare("") == 0){ // if description is empty then apply lighter fill color
              return "0.5";
          } else {
              return "1";
          }
      } else if(d.type == "intro" && d.isIntro == "1"){
          
        //  console.log("This was Executed!");
          
          if(d.desc.localeCompare("") == 0){ // if description is empty then apply lighter fill color
            return "0.5"; 
          } else {
            return "1";            
          }
      } else if(d.type == "middle" && d.isIntro == "1"){
          if(d.desc.localeCompare("") == 0){ // if description is empty then apply lighter stroke color
            return "0.5";             
          } else {
            return "1";            
          }
      } else if(d.type == "end" && d.isIntro == "1"){
          if(d.desc.localeCompare("") == 0){ // if description is empty then apply lighter stroke color
            return "0.5"; 
          } else {
            return "1";            
          }
      } else if(d.type == "root"){
            if(d.desc.localeCompare("") == 0){ // if description is empty then apply lighter stroke color
              return "0.5";
            } else {
              return "1";              
              //return "#363636"; //"#797878";            
            }
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
  // Adding note for short cut 
 // addShortCut();
// console.log("Bye from Update!");
  opVal = "";
}

// Toggle children on click.
function click(d) {
//  console.log("Hi from click!");
 // var element;
  //alert("selected = "+ selected.name);
  /* 
    For mode 1 single select is allowed, 
    for mode 2 multiple select is allowed.
  */

  if(mode == "op_1"){   // single select 
    
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

      alert("Project node can't be classified!");
    
    } else { // selected node is not a root node

      //selected = null;
      var selectFlag = 0;

      /* 
       * For each node in selectList, check if selected node is alreay present, 
       * if not add to selectList
       */

      var len = selectList.length;

      if(len == 0){ // first selected node    
        //  alert("Adding first element!");

        selectList.push(d);
        element = document.getElementById("c_" + d.id);
        element.style.fill = "orange";
        element.setAttribute("stroke-opacity","1");  

      } else {  // additional nodes
          
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
          if(selectFlag == 0){ // node is not present in selectList, hence add the node to select list

                selectList.push(d);
                element = document.getElementById("c_" + d.id);
                element.style.fill = "orange";
                element.setAttribute("stroke-opacity","1");  

          } else {
          
                // if node is already selected, remove it from the select list
                var index = $.inArray(d,selectList);
                selectList.splice(index,1); 
                element = document.getElementById("c_" + d.id); 

                if(d.type == "intro"){
                    if(d.desc.localeCompare("") == 0){ // if description is empty then apply lighter fill color
                      nodeColor =  "#efcdc2"; 
                    } else {
                      nodeColor =  "#f38563";            
                    }
                } else if (d.type == "middle"){
                    if(d.desc.localeCompare("") == 0){ // if description is empty then apply lighter fill color
                      nodeColor =  "#b1d3e0";
                    } else {
                      nodeColor =  "#70c5e5";
                    }
                } else if(d.type == "end"){
                      if(d.desc.localeCompare("") == 0){ // if description is empty then apply lighter fill color
                        nodeColor =  "#a9e0c5";
                      } else {
                        nodeColor =  "#479e74";
                      }
                } 

                element.style.fill = nodeColor;
                element.setAttribute("stroke-opacity","1");   
          } 
      } // additional nodes else part close
    } // selected node is not a root node else part close
      
  } // multi select else part close

  //console.log("Bye from click!");
}

function addIntroduction(selected){
      var nodeName = "Introduction_" + nodeNum;
      //alert("Hello From addMiddle");
      if (selected.hasOwnProperty("children")) {
              selected.children.push({"name": nodeName, 
                                      "sname": nodeName, 
                                      "type":"intro",
                                      "desc":"",
                                      "sdesc":"",
                                      "isIntro":"0",
                                      "isSelected":"0",                                      
                                      "parent": selected.id});
                                      //"children": []});
      } else {
       // alert("Node does not have children! Adding Child");
        selected.children = [{"name": nodeName,
                              "sname": nodeName,  
                              "type":"intro",
                              "desc":"",
                              "sdesc":"",
                              "isIntro" : "0",
                              "isSelected":"0",
                              "parent": selected.id
                              //"children": []
                            }];
      }
      //selected.isIntro = "1";
      update(selected);
      nodeNum += 1;
}

function addMiddle(selected){
  var nodeName = "Middle_" + nodeNum;
      //alert("Hello From addMiddle");
      if (selected.hasOwnProperty("children")) {
              selected.children.push({"name": nodeName, 
                                      "sname": nodeName, 
                                      "type":"middle",
                                      "desc":"",
                                      "sdesc":"",
                                      "isIntro":"0",
                                      "isSelected":"0",
                                      "parent": selected.id,
                                      "children": []
                                    }); 
      } else {
       // alert("Node does not have children! Adding Child");
        selected.children = [{"name": nodeName,
                              "sname": nodeName,  
                              "type":"middle",
                              "desc":"",
                              "sdesc":"",
                              "isIntro" : "0",
                              "isSelected":"0",
                              "parent": selected.id,
                              "children": []
                            }];
      }
      //selected.isIntro = "1";
      update(selected);
      nodeNum += 1;
}

function addEnd(selected){
var nodeName = "Resolution_" + nodeNum;
      if (selected.hasOwnProperty("children")) {
              selected.children.push({"name": nodeName, 
                                      "sname": nodeName, 
                                      "type":"end",
                                      "desc":"",
                                      "sdesc":"",
                                      "isIntro":"0",
                                      "isSelected":"0",
                                      "parent": selected.id,
                                      "children": []
                                    }); 
                                      
      } else {
       // alert("Node does not have children! Adding Child");
        selected.children = [{"name": nodeName,
                              "sname": nodeName,  
                              "type":"end",
                              "desc":"",
                              "sdesc":"",
                              "isIntro" : "0",
                              "isSelected":"0",
                              "parent": selected.id,
                              "children": []
                            }];
      }
      //selected.isIntro = "1";
      update(selected);
      nodeNum += 1;
}

function addNode(){
  var index = 0;
  if(selected != null){
      if(selected.type == "root"){
      
            addIntroduction(selected);


            selected.isSelected = "0";

            index = selected.children.length -1;
                                                                  //alert(index);
            selected.children[index].isSelected = "1";
            selected = selected.children[index];
            update(root);

      
      } else if(selected.type == "intro"){
            
            addMiddle(selected);

            selected.isSelected = "0";
            index = selected.children.length -1;
                                                                  //alert(index);
            selected.children[index].isSelected = "1";
            selected = selected.children[index];
            update(root);

      } else if(selected.type == "middle"){

        addEnd(selected);

       //selected.isIntro = "1";

        selected.isSelected = "0";
        index = selected.children.length -1;
                                                          //alert(index);
        selected.children[index].isSelected = "1";
        selected = selected.children[index];
        update(root);
      
      } else if(selected.type == "end"){
        alert("Resolution node can only have Story Plot!");
        //update(selected);
      }
      // Following code sets node name and description details to text field and text area
            var name = selected.name;
            var desc = selected.desc;
            document.getElementById("tr_4").value = name; // UI label
            document.getElementById("tr_6").value = desc; // UI Description 

            //logging Tree updates
            var tmp = "a_" + selected.id;
            log(tmp);
    //  selected = null;
  } else {

      alert("Please select node!");
  }

}

function addPlot(){
  //alert("Add Plot!");
  var index;
  var parent;
  
  if(selected != null){
      if(selected.type == "root"){

        // Adding Introduction
        addIntroduction(selected);
        
        // Adding Middle
        index = selected.children.length - 1;
        parent = selected.children[index];
        addMiddle(parent);

        // Adding Resolution/End
        index = parent.children.length - 1;
        parent = parent.children[index];
        addEnd(parent);

        // Setting story plot - resolution as selected node.
        index = parent.children.length - 1;
                                                            //alert(index);
                                                            //alert(parent.children[index].name);
        selected.isSelected = "0";
        selected = parent.children[index];
        selected.isSelected = "1";

        // Following code sets node name and description details to text field and text area
        var name = selected.name;
        var desc = selected.desc;
        document.getElementById("tr_4").value = name; // UI label
        document.getElementById("tr_6").value = desc; // UI Description 
        update(root);

      } else{
        // Setting selected node as introduction
        selected.isIntro = "1";
        // Adding Middle
        addMiddle(selected);

        // Adding Resolution/End        
        index = selected.children.length - 1;
        parent = selected.children[index];
        addEnd(parent);

        // Setting story plot - resolution as selected node.
        index = parent.children.length - 1;
                                                            //alert(index);
                                                            //alert(parent.children[index].name);
        selected.isSelected = "0";
        selected = parent.children[index];
        selected.isSelected = "1";

        // Following code sets node name and description details to text field and text area
        var name = selected.name;
        var desc = selected.desc;
        document.getElementById("tr_4").value = name; // UI label
        document.getElementById("tr_6").value = desc; // UI Description 

        update(root);
      }

      //logging Tree updates
      var tmp = "p_" + selected.id;
      log(tmp);
     // selected = null;
      //log("p");
    } else {
      alert("Please select node!");
  }
}

function delNode(){
  //alert("Delete Node!");

    // check if selected node is null.
  if(selected != null){

    if(selected.type == "root"){
        alert("Can not delete Project Node!");
  } else {
      var key = null;
      var nodeDelete = 0;

      if(selected.hasOwnProperty("children")){
        //alert("This will also delete all the nodes associated with this node!");
        // check user confirmation for deleting node and all its children.

        var conFlag = confirm("Deleting This Node deletes all the Nodes & Summary operations associated with it! Do you want to delete this node?");

        if(conFlag == true){

            nodeDelete = 1;

        } else {
              nodeDelete = 0;
        }

      } else {

           nodeDelete = 1;
      }

      if(nodeDelete == 1){
        
            var parent = selected.parent;
            var index = 0;
            var len = parent.children.length;
            var array = parent.children;
                                                        //alert("Node can be deleted!");
                                                        //alert("Node Id = " + selected.id);
                                                        //alert("Parent = " + parent.id);
                                                        //alert("Children Length = " + len);
            // Following function clears selected node and it's children's association from Summary                                                        
            clearSummary(selected);  
            // Getting index of a child node.
            for(var j = 0; j<len;j++){
                                                        //console.log("j = " + j); 
              if(parent.children[j].id == selected.id){
                  index = j;
                                                        //alert("Selected Node index = " + index);
                  j = len;
              }
            } 
            // Removing child node from the children array    
            parent.children.splice(index,1);       

            // Following code removes concentric Introduction notation if there are no children or a single child to the given node
            if(parent.hasOwnProperty("children")){
              
              if(parent.children.length == 0){
                          parent.isIntro = "0";        
              } else {
                
                if(!(parent.children[0].type.localeCompare("middle") == 0)){

                          parent.isIntro = "0";                  
                }
              }
            } 

            // If child
            var tmp = "d_" + selected.id;
            log(tmp);            
            //selected = null;
            nodeDelete = 0;

            // Setting focus to the parent node 
            selected = parent;
            selected.isSelected = "1";

            // Following code sets node name and description details to text field and text area
            var name = selected.name;
            var desc = selected.desc;
            document.getElementById("tr_4").value = name; // UI label
            document.getElementById("tr_6").value = desc; // UI Description 

            update(root);
      }
    }  
    //linkClick("op_1");

    //logging Tree updates

  //  log("d");
  } else {
      alert("Please select node!");
  }
}
/* 
 * Following function updates node details in json data scructure, with details provided by the user.
 */

function updateNode(){

  //alert("Update Node!");
  //Get Field details
  var element;

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
      selected.isSelected = "1";

      // Updating multi select list option text value
      updateEltName(selected);
      
      // Updating node
      update(selected);

      //selected = null;
      
      var tmp = "u_" + selected.id;
      log(tmp);

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

