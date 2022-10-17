

//alert("ko");
for (var i = 0; i < document.querySelectorAll(".drum").length; i++) {
  document.querySelectorAll(".drum")[i].addEventListener("click", handleClick);

}


function handleClick() {
  makesnd(this.innerHTML);
  anime(this.innerHTML);

}
document.addEventListener("keypress", function (event) {
  makesnd(event.key);
  anime(event.key);

});

function makesnd(key) {
  switch (key) {
    case "1": var a = new Audio('snd/crash.mp3');
      a.play();
      break;


    case "2": var a = new Audio('snd/kick-bass.mp3');
      a.play();
      break;
    case "3": var a = new Audio('snd/snare.mp3');
      a.play();
      break;
    case "4": var a = new Audio('snd/tom-1.mp3');
      a.play();
      break;
    case "5": var a = new Audio('snd/tom-2.mp3');
      a.play();
      break;
    case "6": var a = new Audio('snd/tom-3.mp3');
      a.play();
      break;
    case "7": var a = new Audio('snd/tom-4.mp3');
      a.play();
      break;
  }
}

function anime(activeKeyLetter) {
  var activeButton = document.querySelector('.' + activeKeyLetter);
  activeButton.classList.add("pressed");

  setTimeout(function () { activeButton.classList.remove("pressed"); }, 100);;
}
