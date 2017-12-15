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
  console.log(characterData);
  populateCharacterList(characterData);
}

const populateCharacterList = function(characterData) {
  const characterInfo = document.getElementById('character-data');
  characterData.forEach(function(character) {
    const name = createName(character);
    const species = createSpecies(character);
    const ancestry = createAncestry(character);
    const image = createImage(character);

    appendElements(characterInfo, name, species, ancestry, image)
  })
}

const createName = function(character) {
  const name = document.createElement('li');
  name.innerText = character.name;
  return name;
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

const createImage = function(character) {
  const li = document.createElement('li')
  const image = document.createElement('img')
  image.src = character.image;
  li.appendChild(image);
  return li;
}

const appendElements = function(characterInfo, name, species, ancestry, image) {
  characterInfo.appendChild(name);
  characterInfo.appendChild(species);
  characterInfo.appendChild(ancestry);
  characterInfo.appendChild(image);
}

document.addEventListener('DOMContentLoaded', app);
