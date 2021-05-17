
class CoffeeProduct {
	constructor({ id, ownerId, devicePushToken, title, image, description, price, topSelling }) {
		this.id = id;
		this.ownerId = ownerId;
		this.pushToken = devicePushToken;
		this.title = title;
		this.image = image;
		this.description = description;
		this.price = price;
		this.isTopSelling = topSelling;
	}
}

export default CoffeeProduct;