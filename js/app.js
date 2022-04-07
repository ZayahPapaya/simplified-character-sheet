'use strict';
let charismaModifier = modifier(Character.charisma);
let strengthModifier = modifier(Character.strength);
let dexterityModifier = modifier(Character.dexterity);
let constitutionModifier = modifier(Character.constitution);
let intelligenceModifier = modifier(Character.intelligence);
let wisdomModifier = modifier(Character.wisdom);

//TODO: RNG for disagreements
function decision() {
  return Math.floor(Math.random() * (3 - 1 + 1) + 1);
}
console.log(decision());

let submitForm = document.getElementById('form');

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

const sheets = [];

//DONE: array to character sheets

//DONE: RNG for 1 D 20 (1 twenty sided dice)
function getRandomNumber() {
  // return Math.floor(Math.random(1 * 20) + 1);\
  return Math.floor(Math.random() * (20 - 1 + 1) + 1);
}
console.log(());

//DONE: modulo for stats (for every 2 above 10 in a stat + 1 to the roll and reverse for every two below)

 function modifier(stat){
   let result = math.floor(stat - 10 / 2);
 }
//TODO: save, load, delete for local storage

//TODO: render function for character sheet

//TODO: dice roll button or event listener (weigh pros/cons)
//TODO: event listener for load
//TODO: event listener for delete
//TODO: event listener for submit

//TODO: housekeeping: adding markdown files, links

Storage.prototype.setObject = function (key, value) {
  this.setItem(key, JSON.stringify(value)); //automating the stringify for the setObject that we save into storage.
};

Storage.prototype.getObject = function (key) {
  let value = this.getItem(key);
  return value && JSON.parse(value); //automating the parse for our getObject to pull out of storage.
};

List.prototype.addSheet = function (character) {
  this.sheets.push(character);
};

function handleSubmit(event) {
  // Goal: Take our information and make new Character, then store in List
  event.preventDefault();
  // new Character();
}

function addToCharacter(event) {
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
}

function loadList() {
  const placeholder = localStorage.getObject('sheets') || [];
  list = new List(placeholder);
}

function render() {
  loadList();
  clearList(); // TODO: delete the page?
  showList(); // TODO: DOM manipulation stuff
}

submitForm.addEventListener('submit', handleSubmit);
