Pull the deps:
```
$ npm i
```

run ```npm start```. 

Generates products.db

To make a more reasonable product or maker name, create an array of makers/prodcuts, and choose instead a random index from the array 
to use as a name.

Example:
```
const makerNames = ["MakerOne", "MakerTwo", "MakerThree"];
```
 
Yuu could then substitute  ```faker.company.companyName()``` with ```makerNames[getRandomInt(makerNames.length)]```
