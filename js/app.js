'use strict';

let characterName = document.getElementById('name');
let race = document.getElementById('race');
let characterClass = document.getElementById('class');
let backgrounds = document.getElementById('backgrounds');
let submitForm = document.getElementById('form');
let modList = document.getElementById('modList');
let statValueList = document.getElementById('statValueList');
let viewPage = document.getElementById('characterList');
let deletePage = document.getElementById('deleteList');
let formDeleteButton = document.getElementById('deleteButton');
let viewButton = document.getElementById('viewButton');


const Character = function (
  charName,
  charClass,
  race,
  strength,
  dexterity,
  constitution,
  intelligence,
  wisdom,
  charisma
) {
  this.charName = charName;
  this.race = race;
  this.strength = strength;
  this.dexterity = dexterity;
  this.constitution = constitution;
  this.intelligence = intelligence;
  this.wisdom = wisdom;
  this.charisma = charisma;
  this.charClass = charClass;
};


let loadCharacter = false;
let sheets = [];

Storage.prototype.setObject = function (key, value) {
  this.setItem(key, JSON.stringify(value));
};

Storage.prototype.getObject = function (key) {
  let value = this.getItem(key);
  return value && JSON.parse(value);
};


function getRandomNumber() {
  return Math.floor(Math.random() * (20 - 1 + 1) + 1);
}

function modifier(stat) {
  stat = stat - 10;
  stat = stat / 2;
  let result = Math.floor(stat);
  return result;
}

function diceRoll(modifier) {
  let roll = getRandomNumber();
  console.log(`dice roll is, ${roll}`);
  let result = roll + modifier;
  return result;
}

function save() {
  localStorage.setObject('sheets', sheets);
  localStorage.setObject('loadCharacter', loadCharacter);
}

function loadList() {
  sheets = localStorage.getObject('sheets') || [];
  loadCharacter = localStorage.getObject('loadCharacter') || false;
}

function handleSubmit(event) {
  event.preventDefault();
  addToCharacter();
  render();
}

function handleView(event) {
  event.preventDefault();
  let holdObject = localStorage.getObject('sheets');
  console.log(holdObject);
  for (let i = 0; i < holdObject.length; i++) {
    console.log(viewPage.value, holdObject.charName);

    if (viewPage.value === holdObject[i].charName) {
      loadCharacter = new Character(holdObject[i]);
      save();
      window.location.replace('sheet.html');
      display(loadCharacter);
    }
  }
}

function addToCharacter() {
  let nameInput = document.getElementById('nameInput').value;
  let classInput = document.getElementById('classInput').value;
  let raceInput = document.getElementById('raceInput').value;
  let strengthInput = document.getElementById('strengthInput').value;
  let dexterityInput = document.getElementById('dexterityInput').value;
  let constitutionInput = document.getElementById('constitutionInput').value;
  let intelligenceInput = document.getElementById('intelligenceInput').value;
  let wisdomInput = document.getElementById('wisdomInput').value;
  let charismaInput = document.getElementById('charismaInput').value;
  let everyCharacter = new Character(
    nameInput,
    classInput,
    raceInput,
    strengthInput,
    dexterityInput,
    constitutionInput,
    intelligenceInput,
    wisdomInput,
    charismaInput
  );
  sheets.push(everyCharacter);
  console.log(sheets);
  save();
}


function render() {
  loadList();
  clear();
  populateForm();
  if (modList) {
    display(loadCharacter);
  }
}

function clear() {
  if (viewPage) {
    while (viewPage.firstChild) {
      viewPage.removeChild(viewPage.firstChild);
    }
    while (deletePage.firstChild) {
      deletePage.removeChild(deletePage.firstChild);
    }
  }
}


function populateForm() {
  if (viewPage) {
    for (let i = 0; i < sheets.length; i++) {
      let formTarget = document.createElement('option');
      formTarget.textContent = sheets[i].charName;
      viewPage.appendChild(formTarget);
    }
    for (let i = 0; i < sheets.length; i++) {
      let formTarget = document.createElement('option');
      formTarget.textContent = sheets[i].charName;
      deletePage.appendChild(formTarget);
    }
  }
}

function display(character) {
  let strengthModifier = modifier(character.charName.strength);
  let dexterityModifier = modifier(character.charName.dexterity);
  let constitutionModifier = modifier(character.charName.constitution);
  let intelligenceModifier = modifier(character.charName.intelligence);
  let wisdomModifier = modifier(character.charName.wisdom);
  let charismaModifier = modifier(character.charName.charisma);
  let length = statValueList.children;
  length[0].textContent = `${character.charName.strength}`;
  length[1].textContent = `${character.charName.dexterity}`;
  length[2].textContent = `${character.charName.constitution}`;
  length[3].textContent = `${character.charName.intelligence}`;
  length[4].textContent = `${character.charName.wisdom}`;
  length[5].textContent = `${character.charName.charisma}`;

  length = modList.children;
  length[0].textContent = `${strengthModifier}`;
  length[1].textContent = `${dexterityModifier}`;
  length[2].textContent = `${constitutionModifier}`;
  length[3].textContent = `${intelligenceModifier}`;
  length[4].textContent = `${wisdomModifier}`;
  length[5].textContent = `${charismaModifier}`;
  characterName.textContent = `${character.charName.charName}`;
  race.textContent = `${character.charName.race}`;
  characterClass.textContent = `${character.charName.charClass}`;

  length = backgrounds.children;
  for (let i = 0; i < length.length; i++) {
    length[i].addEventListener('click', imageHandler);
  }
}

function handleDelete(event) {
  event.preventDefault();
  for (let i = 0; i < sheets.length; i++) {
    if (deletePage.value === sheets[i].charName) {
      sheets.splice(i, 1);
    }
  }
  save();
  render();
}

function imageHandler(event) {
  event.preventDefault();
  loadList();
  let keys = Object.keys(loadCharacter.charName);
  let values = Object.values(loadCharacter.charName);
  for (let i = 0; i < keys.length; i++) {
    if (keys[i] === event.target.id) {
      alert(diceRoll(modifier(values[i])));
    }
  }
}

if (formDeleteButton) {
  formDeleteButton.addEventListener('submit', handleDelete);
}
if (submitForm) {
  submitForm.addEventListener('submit', handleSubmit);
}
if (viewButton) {
  viewButton.addEventListener('submit', handleView);
}


render();
