function init() {
  var kategoriePrzyslowia = new Array(3);
  kategoriePrzyslowia[0] = "Bez pracy nie ma kołaczy";
  kategoriePrzyslowia[1] = "Jak Kuba Bogu tak Bóg Kubie";
  kategoriePrzyslowia[2] = "Nadzieja umiera ostatnia";

  var kategorieFilmy = new Array(3);
  kategorieFilmy[0] = "Kiler";
  kategorieFilmy[1] = "Chłopaki nie płaczą";
  kategorieFilmy[2] = "Titanic";

  var kategorieGeografia = new Array(3);
  kategorieGeografia[0] = "Jezioro Gopło";
  kategorieGeografia[1] = "Bieszczady";
  kategorieGeografia[2] = "Morze Bałtyckie";

  var haslo = kategorieFilmy;

  var mode = "kategoria1";
  var wylosowane = haslo[Math.floor(Math.random() * haslo.length)];

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

  var litery = new Array(35);

  litery[0] = "A";
  litery[1] = "Ą";
  litery[2] = "B";
  litery[3] = "C";
  litery[4] = "Ć";
  litery[5] = "D";
  litery[6] = "E";
  litery[7] = "Ę";
  litery[8] = "F";
  litery[9] = "G";
  litery[10] = "H";
  litery[11] = "I";
  litery[12] = "J";
  litery[13] = "K";
  litery[14] = "L";
  litery[15] = "Ł";
  litery[16] = "M";
  litery[17] = "N";
  litery[18] = "Ń";
  litery[19] = "O";
  litery[20] = "Ó";
  litery[21] = "P";
  litery[22] = "Q";
  litery[23] = "R";
  litery[24] = "S";
  litery[25] = "Ś";
  litery[26] = "T";
  litery[27] = "U";
  litery[28] = "V";
  litery[29] = "W";
  litery[30] = "X";
  litery[31] = "Y";
  litery[32] = "Z";
  litery[33] = "Ż";
  litery[34] = "Ź";

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
    var element = `lit ${nr}`;
    if (trafiona == true) {
      yes.play();

      document.getElementById(element).style.background = "#003300";
      document.getElementById(element).style.color = "#00C000";
      document.getElementById(element).style.border = "3px solid #00C000";
      document.getElementById(element).style.cursor = "default";

      wypisz_wylosowane();
    } else {
      no.play();

      document.getElementById(element).style.background = "#330000";
      document.getElementById(element).style.color = "#C00000";
      document.getElementById(element).style.border = "3px solid #C00000";
      document.getElementById(element).style.cursor = "default";
      document.getElementById(element).setAttribute("onclick", ";");

      //skucha
      ile_skuch++;
      var obraz = "img/s" + ile_skuch + ".jpg";
      document.getElementById("szubienica").innerHTML =
        '<img src="' + obraz + '" alt="" />';
    }

    //wygrana
    if (wylosowane == wylosowane1)
      document.getElementById("alfabet").innerHTML =
        "Tak jest! Podano prawidłowe hasło: " +
        wylosowane +
        '<br /><br /><span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>';

    //przegrana
    if (ile_skuch >= 9)
      document.getElementById("alfabet").innerHTML =
        "Przegrana! Prawidłowe hasło: " +
        wylosowane +
        '<br /><br /><span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>';
  }
  function removeAllChildNodes(alfabet) {
    while (alfabet.firstChild) {
      alfabet.removeChild(alfabet.firstChild);
    }
  }
  start();
}

window.onload = init;
