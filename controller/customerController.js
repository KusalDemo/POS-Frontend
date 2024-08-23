import {CustomerModel} from "../model/customerModel.js";
import {customerArr, searchedCustomersArr} from "../db/db.js";

var selectedCusIndex;
var selectedEmail;
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const userNameRegex = /^[0-9A-Za-z]{6,16}$/;
const addressRegex = /^[a-zA-Z0-9\s,'-]*$/
var completedFieldCount = 0;

async function loadTableData() {
    $('#customer-tbl-tbody').empty();
    const option = {
        method: "GET"
    }
    try {
        const response = await fetch("http://localhost:8083/customer", option);
        const fetchedData = await response.json();
        let customers = fetchedData.data;

        if (Array.isArray(customers)) {
            customers.forEach((customer, index) => {
                var row = `<tr>
                <td id="cus-name-tbl">${customer.name}</td>
                <td id="cus-email-tbl">${customer.email}</td>
                <td id="cus-address-tbl">${customer.address}</td>
                <td id="cus-branch-tbl">${customer.branch}</td>
            </tr>`;

                $('#customer-tbl-tbody').append(row);
            });
        } else {
            console.error("Retrieved data is not an array");
        }
    } catch (error) {
        console.log(error);
    }
}

async function loadSearchedCustomersToTable(searchedValue) {
    $('#customer-tbl-tbody').empty();
    let option = {
        method: "GET"
    }
    try {
        let response = await fetch("http://localhost:8083/customer/" + searchedValue, option);
        let fetchedValues = await response.json();
        let customers = fetchedValues.data;

        if (Array.isArray(customers)) {
            customers.forEach((customer, index) => {
                var row = `<tr>
                <td id="cus-name-tbl">${customer.name}</td>
                <td id="cus-email-tbl">${customer.email}</td>
                <td id="cus-address-tbl">${customer.address}</td>
                <td id="cus-branch-tbl">${customer.branch}</td>
            </tr>`;
                $('#customer-tbl-tbody').append(row);
            })
        }
    } catch (error) {
        console.error(error);
    }
}

$('#btnSaveCustomer').on('click', () => {
    console.log("Save Customer Clicked");
    let name = $('#saveUserNameField').val();
    let email = $('#saveUserEmailField').val();
    let address = $('#saveUserAddressField').val();
    let branch = $('#saveUserBranchField').val();
    let customerModel = new CustomerModel(name, email, address, branch);

    if (!name || !email || !address || !branch) {
        Swal.fire({
            title: "OOPS..!",
            text: " Please fill in all fields.",
            icon: "warning"
        });
        return;
    } else if (!userNameRegex.test(name)) {
        Swal.fire({
            title: "OOPS..!",
            text: "Invalid Name , Username must be 6-16 & only letters and numbers",
            icon: "warning"
        });
        return;
    } else if (!emailRegex.test(email)) {
        Swal.fire({
            title: "OOPS..!",
            text: "Invalid Email",
            icon: "warning"
        });
        return;
    } else if (!addressRegex.test(address)) {
        Swal.fire({
            title: "OOPS..!",
            text: "Invalid Address",
            icon: "warning"
        });
        return;
    }
    console.log(customerModel);
    const option = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            name: customerModel.name,
            email: customerModel.email,
            address: customerModel.address,
            branch: customerModel.branch
        })
    }
    fetch("http://localhost:8083/customer", option)
        .then(response => {
            return response.json().then(data => ({
                status: response.status,
                message: data.message,
                body: data
            }));
        })
        .then(response => {
            if (response.status === 201) {
                Swal.fire({
                    title: "Done",
                    text: response.message,
                    icon: "success"
                });
                console.log("Message is : ", response.message)
                loadTableData();
            } else if (response.status === 400) {
                Swal.fire({
                    title: "OOPS..!",
                    text: response.message,
                    icon: "error"
                });
                console.log("Message is : ", response.message)
            }
        })
        .catch(error => {
            console.log("Customer Not Saved.. -> ", error);
            console.log(error);
        })
});
$('#btnSearchCustomer').on('click', () => {
    let searchedValue = $('#searchCustomerReference').val();
    loadSearchedCustomersToTable(searchedValue);
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

    console.log(selectedCusId, selectedCusName, selectedCusEmail, selectedCusAddress, selectedCusBranch);
    selectedCusIndex = $(this).index();
    selectedEmail = selectedCusEmail;
})
$('#btnUpdateCustomerModal').on('click', () => {
    let selectedCusId = $('#updateUserIdField').val();
    let selectedCusName = $('#updateUserNameField').val();
    let selectedCusEmail = $('#updateUserEmailField').val();
    let selectedCusAddress = $('#updateUserAddressField').val();
    let selectedCusBranch = $('#updateUserBranchField').val();

    if (!selectedCusName || !selectedCusEmail || !selectedCusAddress) {
        Swal.fire({
            title: "OOPS..!",
            text: " Please fill in all fields.",
            icon: "warning"
        });
        return;
    } else if (!userNameRegex.test(selectedCusName)) {
        Swal.fire({
            title: "OOPS..!",
            text: "Invalid Name , Username must be 6-16 & only letters and numbers",
            icon: "warning"
        });
        return;
    } else if (!emailRegex.test(selectedCusEmail)) {
        Swal.fire({
            title: "OOPS..!",
            text: "Invalid Email",
            icon: "warning"
        });
        return;
    } else if (!addressRegex.test(selectedCusAddress)) {
        Swal.fire({
            title: "OOPS..!",
            text: "Invalid Address",
            icon: "warning"
        });
        return;
    }
    let option = {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            name: selectedCusName,
            email: selectedCusEmail,
            address: selectedCusAddress,
            branch: selectedCusBranch
        })
    }

    fetch(`http://localhost:8083/customer/` + selectedEmail, option)
        .then(response => {
            return response.json().then(data => ({
                status: response.status,
                message: data.message,
                body: data
            }));
        })
        .then(response => {
            if (response.status === 201) {
                loadTableData();
                $('#btnCloseUpdateCustomerModal').click();
                Swal.fire({
                    title: "Customer Updated Successfully",
                    text: " \"" + selectedCusId + "\" Updated...",
                    icon: "success"
                });
            } else if (response.status === 400) {
                Swal.fire({
                    title: "OOPS..!",
                    text: response.message,
                    icon: "warning"
                });
            }
        })

})
$('#btnDeleteCustomerModal').on('click', () => {
    $('#btnDeleteCustomer').click();
    $('#deleteUserIdField').val(selectedEmail);
});
$('#btnConfirmDeleteCustomer').on('click', () => {
    let option = {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
    }
    fetch('http://localhost:8083/customer/' + selectedEmail, option)
        .then(response => {
            return response.json();
        })
        .then(response => {
            if (response.status === 201) {
                loadTableData();
                $('#btnCloseDeleteCustomerModal').click();
                Swal.fire({
                    title: "Customer Deleted Successfully",
                    text: "Selected Customer has been deleted...",
                    icon: "success"
                });
            } else if (response.status === 400) {
                Swal.fire({
                    title: "OOPS..!",
                    text: response.message,
                    icon: "warning"
                });
            }
        })
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

let modalInputProgress = () => {
    if (!$('#updateUserNameField').val()) {
    }
}