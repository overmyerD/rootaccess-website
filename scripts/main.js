writing = false;

document.getElementById("intro").addEventListener('click', function (e) {
  if(!writing){
    writing = true;
    catFile("introduction.txt", introOutput).then(function() {
      writing = false;
    });
  }
  return;
});
document.getElementById("dalton").addEventListener('click', function (e) {
  if(!writing){
    writing = true;
    openPDF("/team/dalton/", "dalton_resume.pdf").then(function() {
      writing = false;
    });
  }
  return;
});
document.getElementById("chris").addEventListener('click', function (e) {
  if(!writing){
    writing = true;
    openPDF("/team/christopher/", "christopher_resume.pdf").then(function() {
      writing = false;
    });
  }
  return;
});
document.getElementById("thomas").addEventListener('click', function (e) {
  if(!writing){
    writing = true;
    openPDF("/team/thomas/", "thomas_cv.pdf").then(function() {
      writing = false;
    });
  }
  return;
});
document.getElementById("project-git").addEventListener('click', function (e) {
  if(!writing){
    writing = true;
    openLink("https://github.com/overmyerD/rootaccess-senior-project").then(function() {
      writing = false;
    });
  }
  return;
});
document.getElementById("website-git").addEventListener('click', function (e) {
  if(!writing){
    writing = true;
    openLink("https://github.com/overmyerD/rootaccess-website").then(function() {
      writing = false;
    });
  }
  return;
});
document.getElementById("project-def").addEventListener('click', function (e) {
  if(!writing){
    writing = true;
    openLink("https://google.com").then(function() {
      writing = false;
    });
  }
  return;
});

function openLink(link) {
  return new Promise(async function(resolve, reject) {
    await addText("xdg-open " + link, 15);
    await wait(100);
    addCMDLine();
    clearCMD();
    document.getElementById("terminal").scrollTop = document.getElementById("terminal").scrollHeight;
    window.open(link);
    resolve();
});
}

function openPDF(directory, file) {
    return new Promise(async function(resolve, reject) {
      await addText("xdg-open ." + directory + file, 15);
      await wait(100);
      addCMDLine();
      clearCMD();
      document.getElementById("terminal").scrollTop = document.getElementById("terminal").scrollHeight;
      window.open("../root" + directory + file);
      resolve();
  });
}

async function catFile(file, output) {
  return new Promise(async function(resolve, reject) {
    await addText("cat " + file, 20);
    await wait(100);
    addCMDLine();
    clearCMD();
    for(var i=0;i<output.length;i++) addLine(output[i]);
    document.getElementById("terminal").scrollTop = document.getElementById("terminal").scrollHeight;
    resolve();
  });
}


window.onkeydown = function pressed(e) {
  if      (printableKey(e))       addChar(e.key);
  else if (e.key == " ")          addChar('\u00A0');
  else if (e.key == "ArrowLeft")  moveCursorLeft();
  else if (e.key == "ArrowRight") moveCursorRight();
  else if (e.key == "Backspace")  backspaceCharacter();
  else if (e.key == "Delete")     deleteCharacter();
}

function addCMDLine() {
  var output = document.getElementById("output");
  var lineDiv = document.createElement("div");
  lineDiv.id = "line";
  lineDiv.className = "line";
  var cmdText = document.getElementById("cmd").textContent;
  lineDiv.innerHTML = "<span class='green'>rootaccess@linux-desktop</span>:<span class='blue'>/root</span>$&nbsp;" + cmdText;
  output.appendChild(lineDiv);
}

function addLine(text) {
  var output = document.getElementById("output");
  var lineDiv = document.createElement("div");
  lineDiv.id = "line";
  lineDiv.className = "line";
  for(var i=0;i<text.length;i++){
    if(text.charAt(i) == " "){
      lineDiv.innerHTML += '\u00A0' + "<wbr>";
    }
    else if(text.charAt(i) == "\n"){
      lineDiv.appendChild(document.createElement("br"));
    }
    else{
      lineDiv.innerHTML += text.charAt(i) + "<wbr>";
    }
  }
  output.appendChild(lineDiv);
}


function addChar(char) {
  var cmd = document.querySelector('#cmd');
  var blink = document.querySelector('#cmd .blink');
  var wbr = document.createElement("wbr");

  wbr.id = char;
  if(char == "\n"){
    cmd.insertBefore(document.createElement("br"), blink);
  }
  else{
    cmd.insertBefore(document.createTextNode(char), blink);
  }
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

function wait(time) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve();
    }, time);
  });
}

function clearCMD() {
  document.getElementById("cmd").innerHTML = "<span class='blink'>&nbsp;<wbr class='end' id='&nbsp;'>";
}
