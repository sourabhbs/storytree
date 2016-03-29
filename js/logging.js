var iteration = [];
var iterationNum = 0;
var state = {};


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
 
console.log("tmp = " + JSON.stringify(tmp));
iteration.push(tmp);
 
while(queue.length != 0){
 	logging(queue.shift());
}

}

console.log("treeState = " + JSON.stringify(treeState));