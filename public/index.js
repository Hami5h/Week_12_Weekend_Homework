var app = function(){
  const url = 'http://hp-api.herokuapp.com/api/characters';
  makeRequest(url, requestComplete);
}

const makeRequest = function(url, callback) {
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.send();
  request.addEventListener('load', callback);
}

const requestComplete = function() {
  if(this.status !== 200) return;
  const jsonString = this.responseText;
  const characterData = JSON.parse(jsonString);
  const select = document.querySelector('select');
  select.addEventListener('change', function() {
      let selectedCharacter = characterData[this.value];
      //
      // for(let character of characterData) {
      //   if(character.name === this.value) {
      //     selectedCharacter = character;
      //     break;
      //   }
      // }

      populateCharacterList(selectedCharacter);

  });
  populateDropDown(characterData);
}

const populateCharacterList = function(character) {
  const characterInfo = document.getElementById('character-data');
  while(characterInfo.firstChild) {
    characterInfo.removeChild(characterInfo.firstChild);
  }
  // characterData.forEach(function(character) {
    const name = createName(character);
    const image = createImage(character);
    const species = createSpecies(character);
    const ancestry = createAncestry(character);
    const house = createHouse(character);
    const wand = createWand(character);
    appendElements(characterInfo, name, image, species, ancestry, house, wand)
  // })
}

const createName = function(character) {
  const name = document.createElement('li');
  name.innerText = character.name;
  return name;
}

const createImage = function(character) {
  const li = document.createElement('li')
  const image = document.createElement('img')
  image.src = character.image;
  li.appendChild(image);
  return li;
}

const createSpecies = function(character) {
  const species = document.createElement('li');
  species.innerText = character.species;
  return species;
}

const createAncestry = function(character) {
  const ancestry = document.createElement('li');
  ancestry.innerText = character.ancestry;
  return ancestry;
}

const createHouse = function(character) {
  const house = document.createElement('li');
  house.innerText = character.house;
  return house;
}

const createWand = function(character) {
  const ul = document.createElement('ul');
  const wandWood = document.createElement('li');
  const wandCore = document.createElement('li');
  const wandLength = document.createElement('li');
  wandWood.innerText = character.wand.wood;
  wandCore.innerText = character.wand.core;
  wandLength.innerText = character.wand.length;
  ul.appendChild(wandWood);
  ul.appendChild(wandCore);
  ul.appendChild(wandLength);
  return ul;

}


const appendElements = function(characterInfo, name, image, species, ancestry, house, wand) {
  characterInfo.appendChild(name);
  characterInfo.appendChild(image);
  characterInfo.appendChild(species);
  characterInfo.appendChild(ancestry);
  characterInfo.appendChild(house);
  characterInfo.appendChild(wand);
}

const populateDropDown = function(character) {
  const dropDown = document.querySelector('select');
  character.forEach(function(character, index) {
    const option = document.createElement('option');
    option.value = index;
    option.innerText = character.name;
    dropDown.appendChild(option);
  })
}

document.addEventListener('DOMContentLoaded', app);
