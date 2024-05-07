import {CustomerModel} from "../model/customerModel.js";
import {customerArr, searchedCustomersArr} from "../db/db.js";


$(document).ready()
function loadTableData(){
    $('#customer-tbl-tbody').empty();
    customerArr.map((customer, index) => {
        var row = `<tr>
            <td>${customer.cusId}</td>
            <td>${customer.cusName}</td>
            <td>${customer.cusEmail}</td>
            <td>${customer.cusAddress}</td>
            <td>${customer.cusBranch}</td>
        </tr>`;

        $('#customer-tbl-tbody').append(row);
    });
}
function loadSearchedCustomersToTable(){
    $('#customer-tbl-tbody').empty();
    searchedCustomersArr.map((customer, index) => {
        var searchedCustomer = `<tr>
            <td>${customer.cusId}</td>
            <td>${customer.cusName}</td>
            <td>${customer.cusEmail}</td>
            <td>${customer.cusAddress}</td>
            <td>${customer.cusBranch}</td>
        </tr>`;
        $('#customer-tbl-tbody').append(searchedCustomer);
    });
}
$('#btnSaveCustomer').on('click', () => {
    console.log("Save Customer Clicked");

    let cusId = $('#saveUserIdField').val();
    let cusName = $('#saveUserNameField').val();
    let cusEmail = $('#saveUserEmailField').val();
    let cusAddress = $('#saveUserAddressField').val();
    let cusBranch = $('#saveUserBranchField').val();

    if (!cusId ||!cusName ||!cusEmail ||!cusAddress ||!cusBranch) {
        alert('Please fill in all fields.');
        return;
    }

    let newCustomer = new CustomerModel(cusId, cusName, cusEmail, cusAddress, cusBranch);
    customerArr.push(newCustomer);

    console.log("New Customer Added :",newCustomer.cusName);

    loadTableData();

});
$('#btnSearchCustomer').on('click', () => {
    console.log("Search Customer Clicked");

    let selectedSearchingType = $('#cmbSearchByCustomer').val();
    console.log(selectedSearchingType);
    if(selectedSearchingType==="0"){
        alert('Please Select Search Type First');
        return;
    }
    let searchText = $('#searchCustomerReference').val();
    if(selectedSearchingType==="1"){
        let matchedCustomer =customerArr.find(customer => customer.cusId === searchText);
        searchedCustomersArr.push(matchedCustomer);
        console.log(searchedCustomersArr);
    }
    else if(selectedSearchingType==="2"){
        let matchedCustomer =customerArr.find(customer => customer.cusEmail === searchText);
        searchedCustomersArr.push(matchedCustomer);
        console.log(searchedCustomersArr);
    }
    loadSearchedCustomersToTable()
});
$('#btnViewAllCustomers').on('click', () => {
    loadTableData();
})