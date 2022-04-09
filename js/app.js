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
let charismaModifier = modifier(Character.charisma);
let strengthModifier = modifier(Character.strength);
let dexterityModifier = modifier(Character.dexterity);
let constitutionModifier = modifier(Character.constitution);
let intelligenceModifier = modifier(Character.intelligence);
let wisdomModifier = modifier(Character.wisdom);

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
  let result = Math.floor(stat - 10 / 2);
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
let loadCharacter = false;
function handleDropdown(event) {
  let holdObject = localStorage.getObject('sheets');
  for (let i = 0; i < holdObject.length; i++) {
    if ((event.value = holdObject.name)) {
      loadCharacter = new Character(holdObject[i]);
      window.location.replace('sheet.html');
      display(loadCharacter);
    }
  }
}

function addToCharacter() {
  let nameInput = document.getElementById('nameInput').value;
  let classInput = document.getElementById('nameInput').value;
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
}

function render() {
  loadList();
  clear();
  populateForm();
  if (loadCharacter) {
    display(loadCharacter);
  }
}
function clear(){
  while(viewPage.firstChild){
    viewPage.removeChild(viewPage.firstChild);
  }
  while(deletePage.firstChild){
    deletePage.removeChild(deletePage.firstChild);
  }
}
function populateForm(){
for(let i = 0; i < sheets.length; i++){
  let formTarget = document.createElement('option');
  formTarget.textContent = sheets[i].charName;
  console.log(formTarget);
  console.log(viewPage);
  viewPage.appendChild(formTarget);
  
}
for(let i = 0; i < sheets.length; i++){
  let formTarget = document.createElement('option');
  formTarget.textContent = sheets[i].charName;
  console.log(formTarget);
  console.log(viewPage);
  deletePage.appendChild(formTarget);
  
}
}
function display(character) {
  let formTarget;
  for (let i = 0; i < modList.length; i++) {
    formTarget = document.querySelector(`#statValueList li: nth-child(${i})`);
    formTarget.textContent = character[i + 3];
  }
}

//TODO: event listener for load

//TODO: event listener for delete

//DONE: event listener for submit
if(submitForm){
  submitForm.addEventListener('submit', handleSubmit);
}
if(viewPage){
  viewPage.addEventListener('click', handleDropdown);
}

render();
