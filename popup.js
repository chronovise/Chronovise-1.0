var work = [];
var school = [];
var home = [];
var travel = [];

var saveNodes = [];

chrome.storage.sync.get(["work"], function(result){
    work = result.work.split("\n");
});

chrome.storage.sync.get(['home'], function(result){
    home = result.home.split("\n");

});

chrome.storage.sync.get(['school'], function(result){
    school = result.school.split("\n");

});

chrome.storage.sync.get(['travel'], function(result){
    travel = result.travel.split("\n");

});

document.addEventListener('DOMContentLoaded', function(){
  document.getElementById('button1').addEventListener('click',loadWork);
  document.getElementById('button2').addEventListener('click',loadSchool);
  document.getElementById('button3').addEventListener('click',loadHome);
  document.getElementById('button4').addEventListener('click',loadTravel);
  document.getElementById('edit1').addEventListener('click',workstatus);
  document.getElementById('edit2').addEventListener('click',schoolStatus);
  document.getElementById('edit3').addEventListener('click',homeStatus);
  document.getElementById('edit4').addEventListener('click',travelStatus);
  document.getElementById('suggest').addEventListener('click',openWebsite);
});

function openWebsite(e){
    chrome.tabs.create({url:"Website/chronoviseHome.html", selected: true});
}

function workstatus(e){

  var myNode = document.getElementById("content");

  while(myNode.firstChild){
    saveNodes.push(myNode.firstChild);
    myNode.removeChild(myNode.firstChild);
  }

  var node = document.createElement("button")
  node.setAttribute("id", "saveWork");
  var node1 = document.createTextNode("Save Changes");
  node.appendChild(node1);
  node.style.margin = "0px 0px 0px 0px";

  var area = document.createElement("textarea");
  area.setAttribute("id", "workarea");
  area.setAttribute("rows","10");
  area.setAttribute("cols", "26");
  area.style.margin = "0px 0px 20px 0px";

  for(i=0;i<work.length;i++){
    temp = work[i];
    if(work[i].startsWith("https")){
        x = document.createTextNode(work[i]+"\n");
        area.appendChild(x);
    }else{
        work.splice(i,1);
    }
  }

  myNode.append(area);
  myNode.append(node);
  document.getElementById("saveWork").addEventListener('click', revertWork);
}

function revertWork(e){
   var myNode = document.getElementById("content");

   var d = document.getElementById("workarea").value;

   work = d.split("\n");

   chrome.storage.sync.set({'work': d},function(){
      console.log('Value is set to'+ d);
   });

  myNode.removeChild(myNode.firstChild);
  myNode.removeChild(myNode.firstChild);
  for(i = 0;i<saveNodes.length;i++){
    myNode.appendChild(saveNodes[i]);
  }
}

function travelStatus(e){

  var myNode = document.getElementById("content");

  while(myNode.firstChild){
    saveNodes.push(myNode.firstChild);
    myNode.removeChild(myNode.firstChild);
  }

  var node = document.createElement("button")
  node.setAttribute("id", "saveTravel");
  var node1 = document.createTextNode("Save Changes");
  node.appendChild(node1);
  node.style.margin = "0px 0px 0px 0px";

  var area = document.createElement("textarea");
  area.setAttribute("id", "travelarea");
  area.setAttribute("rows","10");
  area.setAttribute("cols", "26");
  area.style.margin = "0px 0px 20px 0px";

  for(i=0;i<travel.length;i++){
      temp = travel[i];
      if(travel[i].startsWith("https")){
          x = document.createTextNode(travel[i]+"\n");
          area.appendChild(x);
      }else{
          travel.splice(i,1);
      }
  }

  myNode.append(area);
  myNode.append(node);
  document.getElementById("saveTravel").addEventListener('click', revertTravel);
}

function revertTravel(e){
   var myNode = document.getElementById("content");

   var d = document.getElementById('travelarea').value;

   area = d.split("\n");

   travel = area;

   chrome.storage.sync.set({'travel':d},function(){
      console.log('Value is set to'+d);
  });


  myNode.removeChild(myNode.firstChild);
  myNode.removeChild(myNode.firstChild);
  for(i = 0;i<saveNodes.length;i++){
    myNode.appendChild(saveNodes[i]);
  }
}

function homeStatus(e){

  var myNode = document.getElementById("content");

  while(myNode.firstChild){
    saveNodes.push(myNode.firstChild);
    myNode.removeChild(myNode.firstChild);
  }

  var node = document.createElement("button")
  node.setAttribute("id", "saveHome");
  var node1 = document.createTextNode("Save Changes");
  node.appendChild(node1);
  node.style.margin = "0px 0px 0px 0px";

  var area = document.createElement("textarea");
  area.setAttribute("id", "homearea");
  area.setAttribute("rows","10");
  area.setAttribute("cols", "26");
  area.style.margin = "0px 0px 20px 0px";

  for(i=0;i<home.length;i++){
      temp = home[i];
      if(home[i].startsWith("https")){
          x = document.createTextNode(home[i]+"\n");
          area.appendChild(x);
      }else{
          home.splice(i,1);
      }
  }
  myNode.append(area);
  myNode.append(node);
  document.getElementById("saveHome").addEventListener('click', revertHome);
}


function revertHome(e){
   var myNode = document.getElementById("content");

   var d = document.getElementById("homearea").value;

   area = d.split("\n");

   home = area;

   chrome.storage.sync.set({'home':d},function(){
      console.log('Value is set to'+d);
  });


  myNode.removeChild(myNode.firstChild);
  myNode.removeChild(myNode.firstChild);
  for(i = 0;i<saveNodes.length;i++){
    myNode.appendChild(saveNodes[i]);
  }
}

function schoolStatus(e){

  var myNode = document.getElementById("content");

  while(myNode.firstChild){
    saveNodes.push(myNode.firstChild);
    myNode.removeChild(myNode.firstChild);
  }

  var node = document.createElement("button")
  node.setAttribute("id", "saveSchool");
  var node1 = document.createTextNode("Save Changes");
  node.appendChild(node1);
  node.style.margin = "0px 0px 0px 0px";

  var area = document.createElement("textarea");
  area.setAttribute("id","schoolarea");
  area.setAttribute("rows","10");
  area.setAttribute("cols", "26");
  area.style.margin = "0px 0px 20px 0px";

  for(i=0;i<school.length;i++){
      temp = school[i];
      if(school[i].startsWith("https")){
          x = document.createTextNode(school[i]+"\n");
          area.appendChild(x);
      }else{
          school.splice(i,1);
      }
  }
  myNode.append(area);
  myNode.append(node);
  document.getElementById("saveSchool").addEventListener('click', revertSchool);
}

function revertSchool(e){
   var myNode = document.getElementById("content");

   var d = document.getElementById('schoolarea').value;

   area = d.split("\n");

   school = area;

   chrome.storage.sync.set({'school':d},function(){
      console.log('Value is set to'+d);
   })


  myNode.removeChild(myNode.firstChild);
  myNode.removeChild(myNode.firstChild);
  for(i = 0;i<saveNodes.length;i++){
    myNode.appendChild(saveNodes[i]);
  }
}



function loadWork(e){
  for(i = 0;i<work.length;i++){
      link = work[i];
      if(link.startsWith("https")){
          chrome.tabs.create({url:link, selected: false});
      }
  }
}

function loadSchool(e){
    for(i = 0;i<school.length;i++){
      link = school[i];
      if(link.startsWith("https")){
          chrome.tabs.create({url:link, selected: false});
      }
  }
}

function loadHome(e){
  for(i = 0;i<home.length;i++){
      link = home[i];
      if(link.startsWith("https")){
          chrome.tabs.create({url:link, selected: false});
      }
  }
}

function loadTravel(e){
  for(i = 0;i<travel.length;i++){
      link = travel[i];
      if(link.startsWith("https")){
          chrome.tabs.create({url:link, selected: false});
      }
  }
}
