'use strict';

//DONE: RNG for disagreements
// function decision() {
//   return Math.floor(Math.random() * (3 - 1 + 1) + 1);
// }
// console.log(decision());

let submitForm = document.getElementById('form');
let modList = document.getElementById('modList');
let statValueList = document.getElementById('statValueList');
let statNameList = document.getElementById('statNameList');
let viewPage = document.getElementById('characterList');
let deletePage = document.getElementById('deleteList');
let formDeleteButton = document.getElementById('deleteButton');
let viewButton = document.getElementById('viewButton');
let loadCharacter = false;
//DONE: constructor function that makes charactersheet
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

let sheets = [];

//DONE: array to character sheets

//DONE: RNG for 1 D 20 (1 twenty sided dice)
function getRandomNumber() {
  // return Math.floor(Math.random(1 * 20) + 1);\
  return Math.floor(Math.random() * (20 - 1 + 1) + 1);
}
//console.log(());

//DONE: modulo for stats (for every 2 above 10 in a stat + 1 to the roll and reverse for every two below)

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
//Partial: save, load, delete for local storage
function save() {
  localStorage.setObject('sheets', sheets);
  localStorage.setObject('loadCharacter', loadCharacter)
}
function load() {
  sheets = localStorage.getObject('sheets');
}
// function delete() {
//  load();
// }

//TODO: render function for character sheet

//TODO: dice roll button or event listener (weigh pros/cons)

//Partial: housekeeping: adding markdown files, links

Storage.prototype.setObject = function (key, value) {
  this.setItem(key, JSON.stringify(value)); //automating the stringify for the setObject that we save into storage.
};

Storage.prototype.getObject = function (key) {
  let value = this.getItem(key);
  return value && JSON.parse(value); //automating the parse for our getObject to pull out of storage.
};

//List.prototype.addSheet = function (character) {
//this.sheets.push(character);
//};

function handleSubmit(event) {
  // Goal: Take our information and make new Character, then store in List
  event.preventDefault();
  // new Character();
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

function loadList() {
  sheets = localStorage.getObject('sheets') || [];
  loadCharacter = localStorage.getObject('loadCharacter') || false;
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
  if(viewPage){
  while (viewPage.firstChild) {
    viewPage.removeChild(viewPage.firstChild);
  }
  while (deletePage.firstChild) {
    deletePage.removeChild(deletePage.firstChild);
  }
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

function populateForm() {
  if(viewPage){
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
}

if (formDeleteButton) {
  formDeleteButton.addEventListener('submit', handleDelete);
}

//DONE: event listener for submit
if (submitForm) {
  submitForm.addEventListener('submit', handleSubmit);
}
if (viewButton) {
  viewButton.addEventListener('submit', handleView);
}

render();
