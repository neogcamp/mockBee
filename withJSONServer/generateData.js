var faker = require('faker');
var database = { products: [] };
for (var i=1; i<=100; i++) {
  database.products.push({
    id: i,
    name: faker.random.words(),
    cost: Math.random()*100,
    quantity: Math.random()*1000
  });
}

console.log(JSON.stringify(database));

