export class BranchModel{

    constructor(branchId, branchName, branchAddress,branchEmail) {
        this._branchId = branchId;
        this._branchName = branchName;
        this._branchAddress = branchAddress;
        this._branchEmail = branchEmail;
    }

    get branchId() {
        return this._branchId;
    }

    set branchId(value) {
        this._branchId = value;
    }

    get branchName() {
        return this._branchName;
    }

    set branchName(value) {
        this._branchName = value;
    }

    get branchAddress() {
        return this._branchAddress;
    }

    set branchAddress(value) {
        this._branchAddress = value;
    }

    get branchEmail() {
        return this._branchEmail;
    }

    set branchEmail(value) {
        this._branchEmail = value;
    }
}