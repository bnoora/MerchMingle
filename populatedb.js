// This script populates the db.

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Item = require('./models/item');
const Category = require('./models/category');

const items = [];
const categories = [];

const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
	console.log("Debug: About to connect");
	await mongoose.connect(mongoDB);
	console.log("Debug: Should be connected?");
	await createCategories();
	await createItems();
	console.log("Debug: Closing mongoose");
	mongoose.connection.close();
}

async function categoryCreate(index, name, description) {
	const category = new Category({
		name: name,
		description: description,
	});
	await category.save();
	categories[index] = category;
}

async function itemCreate(index, name, description, price, stock, category) {
	const item = new Item({
		name: name,
		description: description,
		price: price,
		stock: stock,
	});
	if (category != false) item.category = category;
	await item.save();
	items[index] = item;
}

async function createCategories() {
	await Promise.all([
		categoryCreate(0, 'Fruit', 'Fruit description'),
		categoryCreate(1, 'Vegetable', 'Vegetable description'),
		categoryCreate(2, 'Dairy', 'Dairy description'),
		categoryCreate(3, 'Meat', 'Meat description'),
		categoryCreate(4, 'Bread', 'Bread description'),
		categoryCreate(5, 'Beverage', 'Beverage description'),
		categoryCreate(6, 'Snack', 'Snack description'),
		categoryCreate(7, 'Canned', 'Canned description'),
		categoryCreate(8, 'Frozen', 'Frozen description'),
		categoryCreate(9, 'Other', 'Other description'),
	]);
}

async function createItems() {
	await Promise.all([
		itemCreate(0, 'Apple', 'Apple description', 1.99, 100, categories[0]),
		itemCreate(1, 'Banana', 'Banana description', 0.99, 100, categories[0]),
		itemCreate(2, 'Orange', 'Orange description', 1.99, 100, categories[0]),
		itemCreate(3, 'Lettuce', 'Lettuce description', 1.99, 100, categories[1]),
		itemCreate(4, 'Carrot', 'Carrot description', 1.99, 100, categories[1]),
		itemCreate(5, 'Tomato', 'Tomato description', 1.99, 100, categories[1]),
		itemCreate(6, 'Milk', 'Milk description', 1.99, 100, categories[2]),
		itemCreate(7, 'Cheese', 'Cheese description', 1.99, 100, categories[2]),
		itemCreate(8, 'Eggs', 'Eggs description', 1.99, 100, categories[2]),
		itemCreate(9, 'Chicken', 'Chicken description', 1.99, 100, categories[3]),
		itemCreate(10, 'Beef', 'Beef description', 1.99, 100, categories[3]),
		itemCreate(11, 'Pork', 'Pork description', 1.99, 100, categories[3]),
		itemCreate(12, 'White Bread', 'White Bread description', 1.99, 100, categories[4]),
		itemCreate(13, 'Wheat Bread', 'Wheat Bread description', 1.99, 100, categories[4]),
		itemCreate(14, 'Rye Bread', 'Rye Bread description', 1.99, 100, categories[4]),
		itemCreate(15, 'Water', 'Water description', 1.99, 100, categories[5]),
		itemCreate(16, 'Soda', 'Soda description', 1.99, 100, categories[5]),
		itemCreate(17, 'Juice', 'Juice description', 1.99, 100, categories[5]),
		itemCreate(18, 'Chips', 'Chips description', 1.99, 100, categories[6]),
		itemCreate(19, 'Cookies', 'Cookies description', 1.99, 100, categories[6]),
		itemCreate(20, 'Crackers', 'Crackers description', 1.99, 100, categories[6]),
		itemCreate(21, 'Soup', 'Soup description', 1.99, 100, categories[7]),
		itemCreate(22, 'Tuna', 'Tuna description', 1.99, 100, categories[7]),
		itemCreate(23, 'Corn', 'Corn description', 1.99, 100, categories[7]),
		itemCreate(24, 'Ice Cream', 'Ice Cream description', 1.99, 100, categories[8]),
		itemCreate(25, 'Pizza', 'Pizza description', 1.99, 100, categories[8]),
		itemCreate(26, 'Frozen Meal', 'Frozen Meal description', 1.99, 100, categories[8]),
		itemCreate(27, 'Other', 'Other description', 1.99, 100, categories[9]),
	]);	
}







	