import {CustomerModel} from "../model/customerModel.js";
import {customerArr, searchedCustomersArr} from "../db/db.js";


$(document).ready()

var selectedCusIndex;
function loadTableData(){
    $('#customer-tbl-tbody').empty();
    customerArr.map((customer, index) => {
        var row = `<tr>
            <td id="cus-id-tbl">${customer.cusId}</td>
            <td id="cus-name-tbl">${customer.cusName}</td>
            <td id="cus-email-tbl">${customer.cusEmail}</td>
            <td id="cus-address-tbl">${customer.cusAddress}</td>
            <td id="cus-branch-tbl">${customer.cusBranch}</td>
        </tr>`;

        $('#customer-tbl-tbody').append(row);
    });
}
function loadSearchedCustomersToTable(){
    $('#customer-tbl-tbody').empty();
    searchedCustomersArr.map((customer, index) => {
        var searchedCustomer = `<tr>
            <td id="cus-id-tbl">${customer.cusId}</td>
            <td id="cus-name-tbl">${customer.cusName}</td>
            <td id="cus-email-tbl">${customer.cusEmail}</td>
            <td id="cus-address-tbl">${customer.cusAddress}</td>
            <td id="cus-branch-tbl">${customer.cusBranch}</td>
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
    try {
        let selectedSearchingType = $('#cmbSearchByCustomer').val();
        console.log(selectedSearchingType);
        searchedCustomersArr.splice(0, searchedCustomersArr.length);
        let searchText = $('#searchCustomerReference').val();
        if(selectedSearchingType==="1"){
            let matchedCustomer =customerArr.find(customer => customer.cusId === searchText);
            searchedCustomersArr.push(matchedCustomer);
        }
        else if(selectedSearchingType==="2"){
            let matchedCustomer =customerArr.find(customer => customer.cusEmail === searchText);
            searchedCustomersArr.push(matchedCustomer);
        }else if(selectedSearchingType==="3"){
            let matchedCustomer =customerArr.find(customer => customer.cusName === searchText);
            searchedCustomersArr.push(matchedCustomer);
        }
        console.log(searchedCustomersArr);
        loadSearchedCustomersToTable()
    }catch (error) {
        alert("No Customer Found");
    }
});
$('#customer-tbl-tbody').on('click', 'tr', function () {
    let selectedCusId = $(this).find("#cus-id-tbl").text();
    let selectedCusName = $(this).find("#cus-name-tbl").text();
    let selectedCusEmail = $(this).find("#cus-email-tbl").text();
    let selectedCusAddress = $(this).find("#cus-address-tbl").text();
    let selectedCusBranch = $(this).find("#cus-branch-tbl").text();

    $('#btnUpdateCustomer').click();
    $('#updateUserIdField').val(selectedCusId);
    $('#updateUserNameField').val(selectedCusName);
    $('#updateUserEmailField').val(selectedCusEmail);
    $('#updateUserAddressField').val(selectedCusAddress);
    $('#updateUserBranchField').val(selectedCusBranch);

    console.log(selectedCusId,selectedCusName,selectedCusEmail,selectedCusAddress,selectedCusBranch);
    selectedCusIndex = $(this).index();
})
$('#btnUpdateCustomerModal').on('click', () => {
    let selectedCusId = $('#updateUserIdField').val();
    let selectedCusName = $('#updateUserNameField').val();
    let selectedCusEmail = $('#updateUserEmailField').val();
    let selectedCusAddress = $('#updateUserAddressField').val();
    let selectedCusBranch = $('#updateUserBranchField').val();

    customerArr[selectedCusIndex].cus=selectedCusId;
    customerArr[selectedCusIndex].cusName=selectedCusName;
    customerArr[selectedCusIndex].cusEmail=selectedCusEmail;
    customerArr[selectedCusIndex].cusAddress=selectedCusAddress;
    customerArr[selectedCusIndex].cusBranch=selectedCusBranch;

    loadTableData();
    $('#btnCloseUpdateCustomerModal').click();
    setTimeout(() => {alert("Customer Updated Successfully")},800);
})
$('#btnDeleteCustomerModal').on('click', () => {
    $('#btnDeleteCustomer').click();
    $('#deleteUserIdField').val(customerArr[selectedCusIndex].cusId);
});
$('#btnConfirmDeleteCustomer').on('click', () => {
    customerArr.splice(selectedCusIndex, 1);
    $('#cancelDeleteCustomer').click();
    loadTableData();
    setTimeout(() => {alert("Customer Deleted Successfully")},800);
})
$('#btnViewAllCustomers').on('click', () => {
    loadTableData();
})
$('#btnClearCustomerFields').on('click', () => {
    $('#searchCustomerReference').val("");
    $('#btnViewAllCustomers').click();
});