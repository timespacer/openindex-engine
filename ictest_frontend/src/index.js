import { ictest_backend } from "../../declarations/ictest_backend";

var searchBtn = document.getElementById("searchBtn");
var outputField = document.getElementById("maintext");
var sectionField = document.getElementById("section");
var searchField;

async function searchClick(value){
  document.getElementById("output").style.display="";
  let splat = value.split(" ");
  let code = splat[0].toLowerCase();
  let index = splat[1].toLowerCase();
  const searchResult = await ictest_backend.search_(code, index);
  const parsedResult = JSON.parse(searchResult);
  console.log(parsedResult);
  print(parsedResult);
}

//prints section
function print(passage){
  let titleField = document.getElementById("title");
  let pathField = document.getElementById("path-title-0");
  let outputField = document.getElementById("maintext");
  let sectionField = document.getElementById("section");
  let path = passage[0].split(":::");
  titleField.innerHTML= path[0];
  //pathField.innerHTML = path[path.length-1];
  if (passage[1][1] == "undefined"){
    outputField.innerHTML = "<a href='#'>Add index '" + passage[1][0] + "'</a>";
  } else {
    outputField.innerHTML = passage[1][1];
    pathField.innerHTML = path[path.length-1];
  }
  sectionField.innerHTML = passage[1][0];
}

window.onload = function(){
  searchField = document.getElementById("search");
  searchField.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      searchClick(document.getElementById("search").value);
    }
  })
  searchField.onclick = function() {this.value = "";}
  var searchBtn = document.getElementById("searchBtn");
  searchBtn.onclick = function(){
    switchMenu("search");
    searchClick(document.getElementById("search").value)
  };
  //COLLAPSIBLE
  var coll = document.getElementsByClassName("collapsible");
  var i;

  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var content = this.previousElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  }
}

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const button = e.target.querySelector("button");

  const name = document.getElementById("name").value.toString();

  button.setAttribute("disabled", true);

  // Interact with foo actor, calling the greet method
  const greeting = await ictest_backend.search_(name);

  button.removeAttribute("disabled");
  console.log(greeting[0]);
  //document.getElementById("greeting").innerText = greeting[0];

  return false;
});

function menuSwitch(value){
  if (value == "documents"){
    document.getElementById('output').style.display='none';
    document.getElementById('newdocument').style.display='none';
    document.getElementById('documents').style.display='';
  } else if (value == "newdocument"){

  } else if (value == "search"){

  }
}
