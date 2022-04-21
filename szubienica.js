function init() {
  const kategoriePrzyslowia = [
    "Bez pracy nie ma kołaczy",
    "Jak Kuba Bogu tak Bóg Kubie",
    "Nadzieja umiera ostatnia",
  ];

  const kategorieFilmy = ["Kiler", "Chłopaki nie płaczą", "Titanic"];

  const kategorieGeografia = ["Jezioro Gopło", "Bieszczady", "Morze Bałtyckie"];

  var haslo = kategorieFilmy;

  var mode = "kategoria1";
  var wylosowane = haslo[Math.floor(Math.random() * haslo.length)];

  function updateImage(src) {
    contentElement = document.createElement("img");
    contentElement.src = src;
    const parent = document.querySelector("#szubienica");
    removeAllChildNodes(parent);
    parent.appendChild(contentElement);
  }

  function changer() {
    wylosowane = haslo[Math.floor(Math.random() * haslo.length)];
    wylosowane = wylosowane.toUpperCase();
    wylosowane1 = "";
    dlugosc = wylosowane.length;
    ile_skuch = 0;
    for (let i = 0; i < dlugosc; i++) {
      if (wylosowane.charAt(i) == " ") wylosowane1 = wylosowane1 + " ";
      else wylosowane1 = wylosowane1 + "-";
      removeAllChildNodes(alfabet);
      document.getElementById("szubienica").innerHTML =
        '<img src="img/s0.jpg" alt=""></img>';
      start();
    }
  }
  function onModeChange(newModeValue) {
    if (newModeValue === "kategoria1") {
      haslo = kategoriePrzyslowia;
      changer();
    } else if (newModeValue === "kategoria2") {
      haslo = kategorieFilmy;
      changer();
    } else {
      haslo = kategorieGeografia;
      changer();
    }

    mode = newModeValue;
  }
  var kategoria1 = document.querySelector("#kategoria1");
  var kategoria2 = document.querySelector("#kategoria2");
  var kategoria3 = document.querySelector("#kategoria3");

  kategoria1.addEventListener("click", function () {
    onModeChange("kategoria1");
  });
  kategoria2.addEventListener("click", function () {
    onModeChange("kategoria2");
  });
  kategoria3.addEventListener("click", function () {
    onModeChange("kategoria3");
  });

  wylosowane = wylosowane.toUpperCase();
  var wylosowane1 = "";
  var dlugosc = wylosowane.length;
  var ile_skuch = 0;

  var yes = new Audio("yes.wav");
  var no = new Audio("no.wav");

  for (let i = 0; i < dlugosc; i++) {
    if (wylosowane.charAt(i) == " ") wylosowane1 = wylosowane1 + " ";
    else wylosowane1 = wylosowane1 + "-";
  }

  function wypisz_wylosowane() {
    document.getElementById("plansza").innerHTML = wylosowane1;
  }

  const litery = "AĄBCĆDEĘFGHIJKLŁMNŃOÓPQRSŚTUVWXYZŻŹ";

  function start() {
    for (let i = 0; i <= 34; i++) {
      var element = `lit ${i}`;
      var letterDiv = document.createElement("div");
      letterDiv.id = element;
      letterDiv.innerHTML = litery[i];
      document.querySelector("#alfabet").appendChild(letterDiv);
      letterDiv.addEventListener("click", function (e) {
        console.log("Event clock:", e);
        e.target.disabled = true;
        e.target.style.pointerEvents = "none";
        //console.log(e.target);
        sprawdz(i);
      });
    }

    wypisz_wylosowane();
  }

  String.prototype.ustawZnak = function (miejsce, znak) {
    if (miejsce > this.length - 1) return this.toString();
    else return this.substr(0, miejsce) + znak + this.substr(miejsce + 1);
  };

  function sprawdz(nr) {
    var trafiona = false;

    for (let i = 0; i < dlugosc; i++) {
      if (wylosowane.charAt(i) == litery[nr]) {
        wylosowane1 = wylosowane1.ustawZnak(i, litery[nr]);
        trafiona = true;
      }
    }
    const elementId = `lit ${nr}`;

    const letter = document.getElementById(elementId);
    if (trafiona === true) {
      yes.play();

      letter.style.background = "#003300";
      letter.style.color = "#00C000";
      letter.style.border = "3px solid #00C000";
      letter.style.cursor = "default";

      wypisz_wylosowane();
    } else {
      no.play();

      letter.style.background = "#330000";
      letter.style.color = "#C00000";
      letter.style.border = "3px solid #C00000";
      letter.style.cursor = "default";

      //skucha
      ile_skuch++;
      var obraz = "img/s" + ile_skuch + ".jpg";
      updateImage(obraz);
    }

    //wygrana
    if (wylosowane == wylosowane1)
      updateResult("Tak jest! Podano prawidłowe hasło: " + wylosowane);

    //  document.getElementById("alfabet").innerHTML =
    //    "Tak jest! Podano prawidłowe hasło: " +
    //    wylosowane +
    //    '<br /><br /><span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>';

    //przegrana
    if (ile_skuch >= 9)
      updateResult("Przegrana! Prawidłowe hasło: " + wylosowane);

    // document.getElementById("alfabet").innerHTML =
    //  "Przegrana! Prawidłowe hasło: " +
    //  wylosowane +
    //  '<br /><br /><span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>';
  }
  function removeAllChildNodes(alfabet) {
    while (alfabet.firstChild) {
      alfabet.removeChild(alfabet.firstChild);
    }
  }
  function updateResult(message) {
    let strong = document.createElement("strong");
    let button = document.createElement("button");
    removeAllChildNodes(alfabet);
    alfabet.appendChild(strong);
    alfabet.appendChild(button);
    button.id = "button";
    strong.innerText = message;
    button.innerText = "Zagraj jeszcze raz";
  }
  /*
function restart() {
  if (kategoria1.checked == true){
    onModeChange("kategoria1");
  }
  if else (kategoria2.checked == true){
    onModeChange("kategoria2");
  }
  else {
    onModeChange("kategoria3");
  }
  
}

    button.addEventListener("click", function () {

  });
*/
  start();
}
window.onload = init;
