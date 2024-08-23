export class CustomerModel {

    constructor(name, email, address, branch) {
        this._name = name;
        this._email = email;
        this._address = address;
        this._branch = branch;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get address() {
        return this._address;
    }

    set address(value) {
        this._address = value;
    }

    get branch() {
        return this._branch;
    }

    set branch(value) {
        this._branch = value;
    }
}