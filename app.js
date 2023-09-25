const express = require("express");
const res = require("express/lib/response");
const app = express();
const port = 3000;
const petList = require("./ petList");
app.get("/", (req, res) => {
  res.send(`
  <h1>Adopt a Pet!</h1>
  <p>Browse through the links below to find your new furry friend:</p>
  <ul>
    <li><a href="/animals/dogs">Dogs</a></li>
    <li><a href="/animals/cats">Cats</a></li>
    <li><a href="/animals/rabbits">Rabbits</a></li>
  </ul>
  `);
});

app.get("/animals/:pet_type", (req, res) => {
  const petType = req.params.pet_type;
  const petData = petList[petType] || [];

  const petListItems = petData
    .map(
      (pet) => `
    <li>
      <h2><a href="/animals/${petType}/${petList[petType].indexOf(pet)}">${
        pet.name
      }</a></h2>
      
    </li>
  `
    )
    .join("");

  const html = `
    <h1>List of ${petType}</h1>
    <ul>${petListItems}</ul>
  `;

  res.send(html);
});
app.get("/animals/:pet_type/:pet_id", (req, res) => {
  const petType = req.params.pet_type;
  const petId = req.params.pet_id;

  const findPet = petList[petType][petId];

  if (!findPet) {
    res.status(404).send("Pet not found");
    return;
  }

  const html = `
    <h1>${findPet.name}</h1>
    <img src="${findPet.url}" alt="${findPet.name}" />
    <p>${findPet.description}</p>
    <ul>
      <li>Breed: ${findPet.breed}</li>
      <li>Age: ${findPet.age}</li>
    </ul>
  `;

  res.send(html);
});

//
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
