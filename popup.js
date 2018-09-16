var work = [];
var school = [];
var home = [];
var travel = [];

var saveNodes = [];


chrome.storage.sync.get(['home'], function(result){
  if(result.definedURL!=undefined){
    home = result;
  }
});

chrome.storage.sync.get(['school'], function(result){
  if(result.definedURL!=undefined){
    school = result;
  }
});

chrome.storage.sync.get(['travel'], function(result){
  if(result.definedURL!=undefined){
    travel = result;
  }
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
  area.setAttribute("rows","13");
  area.setAttribute("cols", "26");
  area.style.margin = "0px 0px 20px 0px";

  for(i=0;i<work.length;i++){
    x = document.createTextNode(work[i]+"\n");
    area.appendChild(x);
  }

if(area.value == ""){
  chrome.storage.sync.get(["work"], function(result){
    alert(result.work);
    work = result.work.split("\n");
    area.append(result.work);
  });
}

  myNode.append(area);
  myNode.append(node);
  document.getElementById("saveWork").addEventListener('click', revertWork);
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
  area.setAttribute("rows","13");
  area.setAttribute("cols", "26");
  area.style.margin = "0px 0px 20px 0px";

  for(i=0;i<travel.length;i++){
    x = document.createTextNode(travel[i]+"\n");

    area.appendChild(x);
  }
  myNode.append(area);
  myNode.append(node);
  document.getElementById("saveTravel").addEventListener('click', revertTravel);
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
  area.setAttribute("rows","13");
  area.setAttribute("cols", "26");
  area.style.margin = "0px 0px 20px 0px";

  for(i=0;i<home.length;i++){
    x = document.createTextNode(home[i]+"\n");
    area.appendChild(x);
  }
  myNode.append(area);
  myNode.append(node);
  document.getElementById("saveHome").addEventListener('click', revertHome);
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
  area.setAttribute("rows","13");
  area.setAttribute("cols", "26");
  area.style.margin = "0px 0px 20px 0px";

  for(i=0;i<school.length;i++){
    x = document.createTextNode(school[i]+"\n");
    area.appendChild(x);
  }
  myNode.append(area);
  myNode.append(node);
  document.getElementById("saveSchool").addEventListener('click', revertSchool);
}

function revertSchool(e){
   var myNode = document.getElementById("content");

   area = myNode.firstChild.value.split("\n");

   /*tempCheckWeb = area.split('www.');
   if(tempCheckWeb[0]==undefined){
     ("www.").concat(area);
   }

   tempCheckTransfer = area.split("https://");
   if(tempCheckTransfer[0]==undefined){
     ("https://").concat(area);
   }*/

   school = area;

   noWWW = true;
   noHTTP = true;

   /*Regex problem
   for(var i=0;i<school.length;i++){
     tempCheckHTTP = school[i].split('');
     for(var j=0;j<('https://').length&&noHTTP;j++){
       if(('https://')[j]!==(tempCheckHTTP[j])){
         noHTTP = true;
       }else{
         noHTTP = false;
       }
     }
     if(noHTTP){
       school[i] = 'https://'+school[i];
     }else{
       for(var k=0;k<school.length;k++){
         tempCheckWeb = school[k].split('');
         for(var l=0;l<('www.').length&&noWWW;l++){
           if(('www.')[l]!==(tempCheckWeb[8+l])){
             noWWW = true;
           }else{
             noWWW = false;
           }
         }
         if(noWWW){
           lengthofS = school[k].length;
           part1 = 'https://www.'
           part2 = school[k].slice(8,lengthofS);
           school[k]= part1+part2;
         }
       }
     }
   }*/

   for(var i=0;i<school.length;i++){
     tempCheckWeb = school[i].split('');
     for(var j=0;j<('www.').length&&noWWW;j++){
       if(('www.')[j]!==(tempCheckWeb[j])){
         noWWW = true;
       }else{
         noWWW = false;
       }
     }
     if(noWWW){
       school[i] = 'www.'+school[i];
     }
   }

   for(var i=0;i<school.length;i++){
     tempCheckHTTP = school[i].split('');
     for(var j=0;j<('https://').length&&noHTTP;j++){
       if(('https://')[j]!==(tempCheckHTTP[j])){
         noHTTP = true;
       }else{
         noHTTP = false;
       }
     }
     if(noHTTP){
       school[i] = 'https://'+school[i];
     }
   }

   chrome.storage.sync.set({'school':school},function(){
      console.log('Value is set to'+school);
   })


  myNode.removeChild(myNode.firstChild);
  myNode.removeChild(myNode.firstChild);
  for(i = 0;i<saveNodes.length;i++){
    myNode.appendChild(saveNodes[i]);
  }
}

function revertHome(e){
   var myNode = document.getElementById("content");

   area = myNode.firstChild.value.split("\n");

   home = area;

   noWWW = true;
   noHTTP = true;

   /*Regex problem
   for(var i=0;i<school.length;i++){
     tempCheckHTTP = school[i].split('');
     for(var j=0;j<('https://').length&&noHTTP;j++){
       if(('https://')[j]!==(tempCheckHTTP[j])){
         noHTTP = true;
       }else{
         noHTTP = false;
       }
     }
     if(noHTTP){
       school[i] = 'https://'+school[i];
     }else{
       for(var k=0;k<school.length;k++){
         tempCheckWeb = school[k].split('');
         for(var l=0;l<('www.').length&&noWWW;l++){
           if(('www.')[l]!==(tempCheckWeb[8+l])){
             noWWW = true;
           }else{
             noWWW = false;
           }
         }
         if(noWWW){
           lengthofS = school[k].length;
           part1 = 'https://www.'
           part2 = school[k].slice(8,lengthofS);
           school[k]= part1+part2;
         }
       }
     }
   }*/

   for(var i=0;i<school.length;i++){
     tempCheckWeb = school[i].split('');
     for(var j=0;j<('www.').length&&noWWW;j++){
       if(('www.')[j]!==(tempCheckWeb[j])){
         noWWW = true;
       }else{
         noWWW = false;
       }
     }
     if(noWWW){
       school[i] = 'www.'+school[i];
     }
   }

   for(var i=0;i<school.length;i++){
     tempCheckHTTP = school[i].split('');
     for(var j=0;j<('https://').length&&noHTTP;j++){
       if(('https://')[j]!==(tempCheckHTTP[j])){
         noHTTP = true;
       }else{
         noHTTP = false;
       }
     }
     if(noHTTP){
       school[i] = 'https://'+school[i];
     }
   }

   chrome.storage.sync.set({'home':home},function(){
      console.log('Value is set to1'+home);
   })


  myNode.removeChild(myNode.firstChild);
  myNode.removeChild(myNode.firstChild);
  for(i = 0;i<saveNodes.length;i++){
    myNode.appendChild(saveNodes[i]);
  }
}

function revertTravel(e){
   var myNode = document.getElementById("content");

   area = myNode.firstChild.value.split("\n");

   travel = area;

   noWWW = true;
   noHTTP = true;

   /*Regex problem
   for(var i=0;i<school.length;i++){
     tempCheckHTTP = school[i].split('');
     for(var j=0;j<('https://').length&&noHTTP;j++){
       if(('https://')[j]!==(tempCheckHTTP[j])){
         noHTTP = true;
       }else{
         noHTTP = false;
       }
     }
     if(noHTTP){
       school[i] = 'https://'+school[i];
     }else{
       for(var k=0;k<school.length;k++){
         tempCheckWeb = school[k].split('');
         for(var l=0;l<('www.').length&&noWWW;l++){
           if(('www.')[l]!==(tempCheckWeb[8+l])){
             noWWW = true;
           }else{
             noWWW = false;
           }
         }
         if(noWWW){
           lengthofS = school[k].length;
           part1 = 'https://www.'
           part2 = school[k].slice(8,lengthofS);
           school[k]= part1+part2;
         }
       }
     }
   }*/

   for(var i=0;i<school.length;i++){
     tempCheckWeb = school[i].split('');
     for(var j=0;j<('www.').length&&noWWW;j++){
       if(('www.')[j]!==(tempCheckWeb[j])){
         noWWW = true;
       }else{
         noWWW = false;
       }
     }
     if(noWWW){
       school[i] = 'www.'+school[i];
     }
   }

   for(var i=0;i<school.length;i++){
     tempCheckHTTP = school[i].split('');
     for(var j=0;j<('https://').length&&noHTTP;j++){
       if(('https://')[j]!==(tempCheckHTTP[j])){
         noHTTP = true;
       }else{
         noHTTP = false;
       }
     }
     if(noHTTP){
       school[i] = 'https://'+school[i];
     }
   }

   chrome.storage.sync.set({'travel':travel},function(){
      console.log('Value is set to5'+travel);
   })


  myNode.removeChild(myNode.firstChild);
  myNode.removeChild(myNode.firstChild);
  for(i = 0;i<saveNodes.length;i++){
    myNode.appendChild(saveNodes[i]);
  }
}

function revertWork(e){
   var myNode = document.getElementById("content");

   var d = document.getElementById("workarea").value;

   work = d.split("\n");

   noWWW = true;
   noHTTP = true;

   /*Regex problem
   for(var i=0;i<school.length;i++){
     tempCheckHTTP = school[i].split('');
     for(var j=0;j<('https://').length&&noHTTP;j++){
       if(('https://')[j]!==(tempCheckHTTP[j])){
         noHTTP = true;
       }else{
         noHTTP = false;
       }
     }
     if(noHTTP){
       school[i] = 'https://'+school[i];
     }else{
       for(var k=0;k<school.length;k++){
         tempCheckWeb = school[k].split('');
         for(var l=0;l<('www.').length&&noWWW;l++){
           if(('www.')[l]!==(tempCheckWeb[8+l])){
             noWWW = true;
           }else{
             noWWW = false;
           }
         }
         if(noWWW){
           lengthofS = school[k].length;
           part1 = 'https://www.'
           part2 = school[k].slice(8,lengthofS);
           school[k]= part1+part2;
         }
       }
     }
   }*/

   for(var i=0;i<school.length;i++){
     tempCheckWeb = school[i].split('');
     for(var j=0;j<('www.').length&&noWWW;j++){
       if(('www.')[j]!==(tempCheckWeb[j])){
         noWWW = true;
       }else{
         noWWW = false;
       }
     }
     if(noWWW){
       school[i] = 'www.'+school[i];
     }
   }

   for(var i=0;i<school.length;i++){
     tempCheckHTTP = school[i].split('');
     for(var j=0;j<('https://').length&&noHTTP;j++){
       if(('https://')[j]!==(tempCheckHTTP[j])){
         noHTTP = true;
       }else{
         noHTTP = false;
       }
     }
     if(noHTTP){
       school[i] = 'https://'+school[i];
     }
   }

   chrome.storage.sync.set({'work': d},function(){
      alert('Value is set to4'+ d);
   });

   chrome.storage.sync.get(['work'],function(result){
     alert(result.data);
     document.getElementById("workarea") = work.data;
     alert(document.getElementById("workarea").innerText);
   })

  myNode.removeChild(myNode.firstChild);
  myNode.removeChild(myNode.firstChild);
  for(i = 0;i<saveNodes.length;i++){
    myNode.appendChild(saveNodes[i]);
  }
}


function loadWork(e){
  for(i = 0;i<work.length;i++){
    chrome.tabs.create({url:work[i], selected: false});
  }
}

function loadSchool(e){
  for(i = 0;i<school.length;i++){
    chrome.tabs.create({url:school[i], selected: false});
  }
}

function loadHome(e){
  for(i = 0;i<home.length;i++){
    chrome.tabs.create({url:home[i], selected: false});
  }
}

function loadTravel(e){
  for(i = 0;i<travel.length;i++){
    chrome.tabs.create({url:travel[i], selected: false});
  }
}
