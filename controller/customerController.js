import {CustomerModel} from "../model/customerModel.js";
import {customerArr, searchedCustomersArr} from "../db/db.js";

var selectedCusIndex;
var emailRegex=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
var userNameRegex=/^[0-9A-Za-z]{6,16}$/;
var completedFieldCount=0;
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
    let cusName = $('#saveUserNameField').val();
    let cusEmail = $('#saveUserEmailField').val();
    let cusAddress = $('#saveUserAddressField').val();
    let cusBranch = $('#saveUserBranchField').val();

    if (!cusName ||!cusEmail ||!cusAddress ||!cusBranch) {
        Swal.fire({
            title: "OOPS..!",
            text: " Please fill in all fields.",
            icon: "warning"
        });
        return;
    }else if(!userNameRegex.test(cusName)){
        Swal.fire({
            title: "OOPS..!",
            text: "Invalid Name , Username must be 6-16 & only letters and numbers",
            icon: "warning"
        });
        return;
    }else if(!emailRegex.test(cusEmail)){
        Swal.fire({
            title: "OOPS..!",
            text: "Invalid Email",
            icon: "warning"
        });
        return;
    }
    let newCustomer = new CustomerModel(String(generateId()), cusName, cusEmail, cusAddress, cusBranch);
    customerArr.push(newCustomer);
    console.log(customerArr)
    console.log("New Customer Added :",newCustomer.cusName);
    loadTableData();
    Swal.fire({
        title: "Done",
        text: "new Customer \""+newCustomer.cusName+"\" has joined the store..",
        icon: "success"
    });
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
        Swal.fire({
            title: "OOPS",
            text: "No Customer Found",
            icon: "error"
        });
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
    Swal.fire({
        title: "Customer Updated Successfully",
        text: " \""+selectedCusId+"\" Updated...",
        icon: "success"
    });
})
$('#btnDeleteCustomerModal').on('click', () => {
    $('#btnDeleteCustomer').click();
    $('#deleteUserIdField').val(customerArr[selectedCusIndex].cusId);
});
$('#btnConfirmDeleteCustomer').on('click', () => {
    customerArr.splice(selectedCusIndex, 1);
    $('#cancelDeleteCustomer').click();
    loadTableData();
    Swal.fire({
        title: "Customer Deleted Successfully",
        text: "Selected Customer has been deleted...",
        icon: "success"
    });
})
$('#btnViewAllCustomers').on('click', () => {
    loadTableData();
})
$('#btnClearCustomerFields').on('click', () => {
    $('#searchCustomerReference').val("");
    $('#btnViewAllCustomers').click();
});
function generateId() {
    var now = new Date();
    var dd = String(now.getDate()).padStart(2, '0');
    var mm = String(now.getMonth() + 1).padStart(2, '0');
    var yy = now.getFullYear();
    var hh = String(now.getHours()).padStart(2, '0');
    var min = String(now.getMinutes()).padStart(2, '0');
    var ss = String(now.getSeconds()).padStart(2, '0');
    var ms = String(now.getMilliseconds()).padStart(3, '0');

    var id = "C" + dd + mm + ms + hh + yy + ss + min;
    return id;
}
let modalInputProgress =()=>{
    if(!$('#updateUserNameField').val()){
    }
}