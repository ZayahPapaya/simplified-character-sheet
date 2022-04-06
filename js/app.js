'use strict';

//TODO: RNG for disagreements


//TODO: constructor function that makes charactersheet
const Character = function (charName, charClass, race, strength, dexterity, constitution, intelligence, wisdom, charisma) {
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

const List = function (sheets) {
  this.sheets = sheets;
};

//TODO: array to character sheets

//TODO: RNG for 1 D 20 (1 twenty sided dice)
//TODO: modulo for stats (for every 2 above 10 in a stat + 1 to the roll and reverse for every two below)

//TODO: save, load, delete for local storage
//TODO: render function for character sheet

//TODO: dice roll button or event listener (weigh pros/cons)
//TODO: event listener for load
//TODO: event listener for delete
//TODO: event listener for submit

//TODO: housekeeping: adding markdown files, links

Storage.prototype.setObject = function (key, value) {
  this.setItem(key, JSON.stringify(value));//automating the stringify for the setObject that we save into storage.
};

Storage.prototype.getObject = function (key) {
  let value = this.getItem(key);
  return value && JSON.parse(value);//automating the parse for our getObject to pull out of storage.
};

List.prototype.addSheet = function (character) {
  this.sheets.push(character);
};

