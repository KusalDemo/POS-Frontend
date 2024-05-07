export class CustomerModel {

    constructor(cusId, cusName, cusEmail, cusAddress, cusBranch) {
        this._cusId = cusId;
        this._cusName = cusName;
        this._cusEmail = cusEmail;
        this._cusAddress = cusAddress;
        this._cusBranch = cusBranch;
    }

    get cusId() {
        return this._cusId;
    }

    set cusId(value) {
        this._cusId = value;
    }

    get cusName() {
        return this._cusName;
    }

    set cusName(value) {
        this._cusName = value;
    }

    get cusEmail() {
        return this._cusEmail;
    }

    set cusEmail(value) {
        this._cusEmail = value;
    }

    get cusAddress() {
        return this._cusAddress;
    }

    set cusAddress(value) {
        this._cusAddress = value;
    }

    get cusBranch() {
        return this._cusBranch;
    }

    set cusBranch(value) {
        this._cusBranch = value;
    }
}