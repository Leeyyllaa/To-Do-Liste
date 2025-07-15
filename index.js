
let aufgabenNummer = 1;
function Erledigt(checkbox) {
  let td = checkbox.parentElement;
  let button = td.children[1];
  button.disabled = !checkbox.checked;
  console.log("Checkbox wurde geändert"); 
}

function zeileHinzufuegen() {
  let inputFeld = document.getElementById("aufgabeInput");
  let aufgabeText = inputFeld.value;

  if (aufgabeText === "") {
    alert("Bitte eine Aufgabe eingeben!");
    return;
  }

  let tabelle = document.getElementById("tbhinzufuegen");
  let tabelleBody = tabelle.getElementsByTagName("tbody")[0];
  let neueZeile = document.createElement("tr");

  neueZeile.innerHTML = `
    <td>${aufgabenNummer}</td>
    <td class="task-text">${aufgabeText}</td>
    <td>
      <input type="checkbox"  onchange="Erledigt(this)">
      <button onclick="zeileLoeschen(this)" disabled>Löschen</button>
    </td>
  `;

  tabelleBody.appendChild(neueZeile);
  aufgabenNummer++;

  inputFeld.value = ""; 
  speichern();

}

function zeileLoeschen(button) {
  let td = button.parentElement;
  let tr = td.parentElement;
  tr.remove(); 


  let tabelle = document.getElementById("tbhinzufuegen");
  let tbody = tabelle.getElementsByTagName("tbody")[0];
  let zeilen = tbody.getElementsByTagName("tr");

  for (let i = 0; i < zeilen.length; i++) {
    zeilen[i].children[0].textContent = i + 1;
  }
  aufgabenNummer = zeilen.length + 1;
  speichern();

}
function filtern() {
  let auswahl = document.getElementById("filter").value;
  let gif = document.getElementById("emojiGif");
  let filterWert = document.getElementById("filter").value;
  let tabelle = document.getElementById("tbhinzufuegen");
  let tbody = tabelle.getElementsByTagName("tbody")[0];
  let zeilen = tbody.getElementsByTagName("tr");
  if (auswahl === "erledigt") {
    gif.style.display = "block"; // GIF namayesh dade beshe
  } else {
    gif.style.display = "none";  // GIF ghayeb beshe
  }
  for (let i = 0; i < zeilen.length; i++) {
    let checkbox = zeilen[i].querySelector("input[type='checkbox']");
    let erledigt = checkbox.checked;

    if (
      filterWert === "alle" ||
      (filterWert === "erledigt" && erledigt) ||  /* Hier prüfen wir zuerst, ob der Benutzer nur erledigte Aufgaben sehen möchte. Wenn ja, ist die Aufgabe bereits abgehakt?*/
      (filterWert === "offen" && !erledigt)
    ) {
      zeilen[i].style.display = "";
    } else {
      zeilen[i].style.display = "none";
    }
  }
}

