export class ItemModel{

    constructor(itemId, itemName,description, itemPrice,qtyOnHand) {
        this._itemId = itemId;
        this._itemName = itemName;
        this._description = description;
        this._itemPrice = itemPrice;
        this._qtyOnHand = qtyOnHand;
    }

    get itemId() {
        return this._itemId;
    }

    set itemId(value) {
        this._itemId = value;
    }

    get itemName() {
        return this._itemName;
    }

    set itemName(value) {
        this._itemName = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get itemPrice() {
        return this._itemPrice;
    }

    set itemPrice(value) {
        this._itemPrice = value;
    }

    get qtyOnHand() {
        return this._qtyOnHand;
    }

    set qtyOnHand(value) {
        this._qtyOnHand = value;
    }
}