window.onkeydown = function pressed(e) {

  if(printableKey(e)){
    addChar(e.key);
  }else if(e.key == " "){
    addChar('\u00A0');
  }else if(e.key == "ArrowLeft"){
    moveCursorLeft();
  }else if(e.key == "ArrowRight"){
    moveCursorRight();
  }else if(e.key == "Backspace"){
    backspaceCharacter();
  }else if(e.key == "Delete"){
    deleteCharacter();
  }

}

function addChar(char) {
  var cmd = document.querySelector('#cmd');
  var blink = document.querySelector('#cmd .blink');
  var wbr = document.createElement("wbr");

  wbr.id = char;
  cmd.insertBefore(document.createTextNode(char), blink);
  cmd.insertBefore(wbr, blink);
}

function backspaceCharacter(){
  var cmd = document.querySelector('#cmd');
  var blink = document.querySelector('#cmd .blink');
  var wbr = blink.previousSibling;
  if(wbr == null) return;
  var text = wbr.previousSibling;

  cmd.removeChild(wbr);
  cmd.removeChild(text);
}

function deleteCharacter() {
  var cmd = document.querySelector('#cmd');
  var blink = document.querySelector('#cmd .blink');
  if(blink.children[0].className == "end") return;

  var next = blink.nextSibling;
  var nextChar = next.nextSibling;
  var newBlink = document.createElement("span");
  newBlink.className = "blink";
  var newBlinkWBR = document.createElement("wbr");
  newBlinkWBR.id = next.textContent;
  if(nextChar.className == "end") newBlinkWBR.className = "end";
  newBlinkChar = document.createTextNode(next.textContent);
  newBlink.appendChild(newBlinkChar);
  newBlink.appendChild(newBlinkWBR);

  cmd.insertBefore(newBlink, blink);
  cmd.removeChild(blink);
  cmd.removeChild(next);
  cmd.removeChild(nextChar);
}

function moveCursorLeft(){
  var cmd = document.querySelector('#cmd');
  var blink = document.querySelector('#cmd .blink');
  var char = blink.firstElementChild.id;
  var prev = blink.previousSibling;
  if(prev == null) return;
  var prevChar = prev.previousSibling;

  var newBlink = document.createElement("span");
  newBlink.className = "blink";
  var newBlinkWBR = document.createElement("wbr");
  newBlinkWBR.id = prevChar.textContent;
  var newBlinkChar = document.createTextNode(prevChar.textContent);
  newBlink.appendChild(newBlinkChar);
  newBlink.appendChild(newBlinkWBR);

  cmd.insertBefore(newBlink, blink);
  var wbr = document.createElement("wbr");
  if(blink.children[0].className == "end") wbr.className = "end";
  wbr.id = char;
  cmd.insertBefore(wbr, blink.nextSibling);
  cmd.insertBefore(document.createTextNode(char), blink.nextSibling);

  cmd.removeChild(blink);
  cmd.removeChild(prev);
  cmd.removeChild(prevChar);
}

function moveCursorRight() {
  var cmd = document.querySelector('#cmd');
  var blink = document.querySelector('#cmd .blink');
  var char = blink.firstElementChild.id;
  var next = blink.nextSibling;
  if(next == null) return;
  var nextChar = next.nextSibling;

  var newBlink = document.createElement("span");
  newBlink.className = "blink";
  var newBlinkWBR = document.createElement("wbr");
  newBlinkWBR.id = next.textContent;
  if(nextChar.className == "end") newBlinkWBR.className = "end";
  newBlinkChar = document.createTextNode(next.textContent);
  newBlink.appendChild(newBlinkChar);
  newBlink.appendChild(newBlinkWBR);

  cmd.insertBefore(newBlink, blink.nextSibling);
  var wbr = document.createElement("wbr");
  wbr.id = char;
  cmd.insertBefore(document.createTextNode(char), blink);
  cmd.insertBefore(wbr, blink);

  cmd.removeChild(blink);
  cmd.removeChild(next);
  cmd.removeChild(nextChar);
}


function printableKey(e) {
  var code = e.keyCode;
  if((code >= 48 && code <= 90) || (code >= 186 && code <= 222) || (code >= 96 && code <= 111)){
    return true;
  }
  return false;
}

const forLoop = async _ => {
    await addText("Daltom Ove", 150);
    await removeText(5, 75);
    await addText("n Overmer", 150);
    await removeText(2, 500);
    await addText("yer", 150);
}

function addText(input, time) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      for (var i = 0; i < input.length; i++) {
          (function(index) {
              setTimeout(function() {
                if(input.charAt(index) == " ") addChar('\u00A0');
                else addChar(input.charAt(index));
                if(index+1 == input.length){
                  resolve(input);
                }
              }, i * time);
          })(i);
      }
    }, time);
  });
}

function keyFunction(num, key, time) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      for (var i = 0; i < num; i++) {
          (function(index) {
              setTimeout(function() {
                if(key == "Backspace")       backspaceCharacter();
                else if(key == "Delete")     deleteCharacter();
                else if(key == "ArrowLeft")  moveCursorLeft();
                else if(key == "ArrowRight") moveCursorRight();
                if(index+1 == num){
                  resolve(num);
                }
              }, i * time);
          })(i);
      }
    }, time);
  });
}

function clearCMD() {
  document.getElementById("cmd").innerHTML = "";
}
