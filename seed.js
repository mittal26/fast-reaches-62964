const { Category } = require("./models/category");
const { Item } = require("./models/item");
const mongoose = require("mongoose");
const config = require("config");

const data = [
  {
    name: "Dairy",
    items: [
      {
        "title": "Milk",
        "price": 61,
        "quantity": 1,
        "quantitycount": 0,
        "liked": false
      },
      {
        "title": "Cheese",
        "price": 64,
        "quantity": 1,
        "quantitycount": 0,
        "liked": false
      },
      {
        "title": "Butter",
        "price": 64,
        "quantity": 1,
        "quantitycount": 0,
        "liked": false
      }
    ]
  },
  {
    name: "Vegetables",
    items: [
      {
        "title": "pumpkin",
        "price": 40,
        "quantity": 1,
        "quantitycount": 0,
        "liked": false
      },
      {
        "title": "Aubergine",
        "price": 61,
        "quantity": 1,
        "quantitycount": 0,
        "liked": false
      },
      {
        "title": "Baby corn",
        "price": 75,
        "quantity": 1,
        "quantitycount": 0,
        "liked": true
      }
    ]
  },
  {
    name: "Fruits",
    items: [
      {
        "title": "Apple",
        "price": 62,
        "quantity": 1,
        "quantitycount": 0,
        "liked": false
      },
      {
        "title": "Apricot",
        "price": 42,
        "quantity": 1,
        "quantitycount": 0,
        "liked": true
      },
      {
        "title": "Banana",
        "price": 30,
        "quantity": 1,
        "quantitycount": 0,
        "liked": false
      }
    ]
  }
];

async function seed() {
  await mongoose.connect(config.get("db"));

  await Item.deleteMany({});
  await Category.deleteMany({});

  for (let category of data) {
    const { _id: categoryId } = await new Category({ name: category.name }).save();
    const items = category.items.map(item => ({
      ...item,
      category: { _id: categoryId, name: category.name }
    }));
    await Item.insertMany(items);
  }

  mongoose.disconnect();

  console.info("Done!");
}

seed();
