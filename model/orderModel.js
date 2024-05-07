export class OrderModel{

    constructor(orderId, customerId, orderDate, orderTotal,discount,paidAmount,balance,itemsArr) {
        this._orderId = orderId;
        this._customerId = customerId;
        this._orderDate = orderDate;
        this._orderTotal = orderTotal;
        this._discount = discount;
        this._paidAmount = paidAmount;
        this._balance = balance;
        this._itemsArr = itemsArr;
    }

    get orderId() {
        return this._orderId;
    }

    set orderId(value) {
        this._orderId = value;
    }

    get customerId() {
        return this._customerId;
    }

    set customerId(value) {
        this._customerId = value;
    }

    get orderDate() {
        return this._orderDate;
    }

    set orderDate(value) {
        this._orderDate = value;
    }

    get orderTotal() {
        return this._orderTotal;
    }

    set orderTotal(value) {
        this._orderTotal = value;
    }

    get discount() {
        return this._discount;
    }

    set discount(value) {
        this._discount = value;
    }

    get paidAmount() {
        return this._paidAmount;
    }

    set paidAmount(value) {
        this._paidAmount = value;
    }

    get balance() {
        return this._balance;
    }

    set balance(value) {
        this._balance = value;
    }

    get itemsArr() {
        return this._itemsArr;
    }

    set itemsArr(value) {
        this._itemsArr = value;
    }
}