import { Query } from 'azle';
import { bank, addDocument, removeDocument, addSection, addPassage } from './documents/bank';

let docList = [
    ["Critique of Pure Reason", "Immanuel Kant", "cpr"]
]
var path = "";
const rindex = /^([ab][0-9]{1,3}(,[ ]{0,1}[ab][0-9]{1,3}){0,})+$/;

export function getDoc(code: string): Query<string> {
    if (exists(code)){
      return JSON.stringify(bank[code]);
    } else {
      return "Document with that code doesn't exist.";
    }
}
 
export function getDocList(): Query <string> {
    return JSON.stringify(docList);
}

export function addDoc(title: string, author: string, code: string): Update <string>{
    if (exists(code)){
      return "A document with that code already exists.";
    }
    docList[docList.length] = [title, author, code]; // add doc to local list
    addDocument(title, author, code); // add doc to bank
    return "Document added, access code is '"+code+"'";
}

export function removeDoc(code: string): Update <string> {
  // validate authorship
  // remove doc from docList
  // set code to undefined on bank
}

export function addSec(code: string, s: string, location: string): Update <string> {
  if (exists(code)){
    let r = addSection(code, s, location);
    return r;
  } else {
    return "Document with that code doesn't exist.";
  }
}

export function addPass(code:string, index: string, p: string, location: string): Update <string> {
  if (exists(code)){
    let r = addPassage(code, index, p, location);
    return r;
  } else {
    return "Document with that code doesn't exist.";
  }
}

export function search_( code: string, value: string ): Query <string> {
  path = "";
  var res = search(value, bank[code]);
  if (res){
    return JSON.stringify([path, res]);
  }
  else {
    return JSON.stringify([path, [value, "undefined"]]);
  }
}

function search(value: string, body){
    if (typeof body[0] == "object") { // body is a passage
      console.log("Found passage! " + body[0]);
      if (body[0].indexOf(value) != -1) { // found the passage
        return(body);
      } else {
        return false;
      }
    }
    if (typeof body[0] == "string") { // body is a section
      path == '' ? path += body[0] : path+= ":::" + body[0];
      console.log("Found section: " + body[0]);
      var count = 1;
      while (count < body.length) {
        var sv = search(value, body[count]);
        if (!sv){
          count++;
        } else {
          return sv;
        }
      }
      return false;
    }
    return false;
}
  
function exists(code){
  for (let d=0; d < docList.length; d++){
    if (code == docList[d][2]){
        return true;
    }
  }
  return false;
}

function getTitle(code){
  for (let d=0; d < docList.length; d++){
    if (code == docList[d][2]){
      return docList[d][0];
    }
  }
}
