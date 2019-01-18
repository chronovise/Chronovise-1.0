//Authors: Kevin Li, Kevin Li, Ethan Jiang, Pesara Amarasekera
var work = [];
var school = [];
var home = [];
var travel = [];

var saveNodes = [];

chrome.storage.sync.get(["work"], function(result) {
  work = result.work.split("\n");
});

chrome.storage.sync.get(["home"], function(result) {
  home = result.home.split("\n");
});

chrome.storage.sync.get(["school"], function(result) {
  school = result.school.split("\n");
});

chrome.storage.sync.get(["travel"], function(result) {
  travel = result.travel.split("\n");
});

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("button1").addEventListener("click", function() {
    load(work);
  });
  document.getElementById("button2").addEventListener("click", function() {
    load(school);
  });
  document.getElementById("button3").addEventListener("click", function() {
    load(home);
  });
  document.getElementById("button4").addEventListener("click", function() {
    load(travel);
  });
  document.getElementById("edit1").addEventListener("click", function() {
    status(work, "work");
  });
  document.getElementById("edit2").addEventListener("click", function() {
    status(school, "school");
  });
  document.getElementById("edit3").addEventListener("click", function() {
    status(home, "home");
  });
  document.getElementById("edit4").addEventListener("click", function() {
    status(travel, "travel");
  });
  document.getElementById("suggest").addEventListener("click", openWebsite);
});

function load(tempLinks) {
  for (i = 0; i < tempLinks.length; i++) {
    if (tempLinks[i].startsWith("https") || tempLinks[i].startsWith("http")) {
      chrome.tabs.create({ url: tempLinks[i], selected: false });
    }
  }
}

function status(arr, id) {
  var myNode = document.getElementById("content");

  while (myNode.firstChild) {
    saveNodes.push(myNode.firstChild);
    myNode.removeChild(myNode.firstChild);
  }

  var node = document.createElement("button");
  node.setAttribute("id", "save" + id);
  var node1 = document.createTextNode("Save Changes");
  node.appendChild(node1);
  node.style.margin = "0px 0px 0px 0px";

  var area = document.createElement("textarea");
  area.setAttribute("id", id + "area");
  area.setAttribute("rows", "10");
  area.setAttribute("cols", "26");
  area.style.margin = "0px 0px 20px 0px";

  for (i = 0; i < arr.length; i++) {
    temp = arr[i];
    if (arr[i].startsWith("https")) {
      x = document.createTextNode(arr[i] + "\n");
      area.appendChild(x);
    } else {
      arr.splice(i, 1);
    }
  }

  myNode.append(area);
  myNode.append(node);
  document.getElementById("save" + id).addEventListener("click", function() {
    revert(id);
  });
}

function revert(id) {
  var myNode = document.getElementById("content");

  var d = document.getElementById(id + "area").value;

  if (id == "work") {
    work = d.split("\n");
  } else if (id == "home") {
    home = d.split("\n");
  } else if (id == "school") {
    school = d.split("\n");
  } else if (id == "travel") {
    travel = d.split("\n");
  }

  chrome.storage.sync.set({
    [id]: d
  });

  myNode.removeChild(myNode.firstChild);
  myNode.removeChild(myNode.firstChild);
  for (i = 0; i < saveNodes.length; i++) {
    myNode.appendChild(saveNodes[i]);
  }
}

function openWebsite(e) {
  chrome.tabs.create({ url: "https://chronovise.github.io", selected: true });
}
