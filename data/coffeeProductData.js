import CoffeeProduct from '../models/CoffeeProduct';

const COFFEE_PRODUCTS = [
	new CoffeeProduct({
		id: 'GRAMHKPODS-1',
		title: 'Cappuccino',
		price: 20.0,
		image: require('../assets/images/Cappuccino.png'),
		description:
			'An intense sweetness coupled with rich flavours of roasted hazelnut and vanilla spice make the Brazil Yellow Bourbon a truly unmissable blend.',
	}),
	new CoffeeProduct({
		id: 'GRAMHKPODS-2',
		title: 'Irish Tea',
		price: 10.0,
		image: require('../assets/images/Irish Tea.png'),
		description:
			'This coffee from the name, looks like an Italian coffee, with a very nice taste. Seems all coffees are not the same.',
	}),
	new CoffeeProduct({
		id: 'GRAMHKPODS-3',
		title: 'Jamaican blu',
		price: 50.0,
		image: require('../assets/images/Jamaican blu.png'),
		description:
			'This coffee from the name, looks like an Italian coffee, with a very nice taste. Seems all coffees are not the same.',
	}),
	new CoffeeProduct({
		id: 'GRAMHKPODS-4',
		title: 'C. Macchiatto',
		price: 20.0,
		image: require('../assets/images/C. Macchiatto.png'),
		description:
			'From the volcanic Kona region with unique weather conditions, Hawaii Kona coffee has a delicate sweet taste, with hints of berry-like chocolatey aromas.',
	}),
	new CoffeeProduct({
		id: 'GRAMHKPODS-5',
		title: 'Kofi',
		price: 15.0,
		image: require('../assets/images/Kofi.png'),
		description:
			'This coffee from the name, looks like an Italian coffee, with a very nice taste. Seems all coffees are not the same.',
	}),
	new CoffeeProduct({
		id: 'GRAMHKPODS-6',
		title: 'Expresso',
		price: 25.0,
		image: require('../assets/images/Expresso.png'),
		description:
			'This coffee from the name, looks like an Italian coffee, with a very nice taste. Seems all coffees are not the same.',
	}),
	new CoffeeProduct({
		id: 'GRAMHKPODS-7',
		title: 'Black Tea',
		price: 20.0,
		image: require('../assets/images/Black Tea.png'),
		description:
			'This coffee from the name, looks like an Italian coffee, with a very nice taste. Seems all coffees are not the same.',
	}),
	new CoffeeProduct({
		id: 'GRAMHKPODS-8',
		title: 'Corretto',
		price: 25.0,
		image: require('../assets/images/Corretto.png'),
		description:
			'Colombia Caturra coffee is famous for its dark fruit aromas and flavour of blackberry and cherry. It also features notes of toasted almond and toasted sourdough.',
	}),
	new CoffeeProduct({
		id: 'GRAMHKPODS-9',
		title: 'HAWAII KONA',
		price: 35.0,
		image: require('../assets/images/HAWAII KONA.png'),
		description:
			'This coffee from the name, looks like an Italian coffee, with a very nice taste. Seems all coffees are not the same.',
	}),
];

export default COFFEE_PRODUCTS;
