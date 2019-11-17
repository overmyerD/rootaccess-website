


var typing = false;
window.onload = function() {
  var f = document.getElementById('blink');

  setInterval(function() {

    if(!typing){
      if(f.style.backgroundColor === ""){
        f.style.backgroundColor = "white";
      }
      else{
        f.style.backgroundColor = "";
      }
    }
  }, 500);
};

const forLoop = async _ => {
    await addText("Daltom Ove", 150);
    await removeText(5, 75);
    await addText("n Overmer", 150);
    await removeText(2, 500);
    await addText("yer", 150);
}

function addText(input, time) {
  typing = true;
  return new Promise(function(resolve, reject) {
    var text = document.getElementById("cmd");
    document.getElementById('blink').style.backgroundColor = "white";
    setTimeout(function() {
      for (var i = 0; i < input.length; i++) {
          (function(index) {
              setTimeout(function() {
                if(input.charAt(index) == " ") text.innerHTML += "&nbsp;";
                else if(input.charAt(index) == "\n")text.innerHTML += "<br />> ";
                else text.innerHTML += input.charAt(index);
                if(index+1 == input.length){
                  typing = false;
                  resolve(input);
                }
              }, i * time);
          })(i);
      }
    }, time);
  });
}

function removeText(num, time) {
  typing = true;
  return new Promise(function(resolve, reject) {
    var text = document.getElementById("cmd");
    document.getElementById('blink').style.backgroundColor = "white";
    setTimeout(function() {
      for (var i = 0; i < num; i++) {
          (function(index) {
              setTimeout(function() {
                var length = text.innerHTML.length;
                if((text.innerHTML.lastIndexOf("&nbsp;")+5) == length-1) text.innerHTML = text.innerHTML.substring(0, length-6);
                else if((text.innerHTML.lastIndexOf("&gt;")+3) == length-1) text.innerHTML = text.innerHTML.substring(0, length-4);
                else text.innerHTML = text.innerHTML.substring(0, length-1);
                if(index+1 == num){
                  typing = false;
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

function reverseString(str) {
    return str.split("").reverse().join("");
}
