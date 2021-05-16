
class CoffeeProduct{
    constructor({id, ownerId, devicePushToken, title, image, description, price}){
        this.id = id;
        this.ownerId= ownerId;
        this.pushToken= devicePushToken;
        this.title = title;
        this.image = image;
        this.description = description;
        this.price = price;
    }
}

export default CoffeeProduct;