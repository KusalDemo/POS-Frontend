var selectedItemPropertyId;
const itemNameRegex = /^[0-9A-Za-z]{3,15}$/;

$(document).ready(function () {
    loadTableData();
})
async function loadTableData() {
    $('#item-tbl-tbody').empty();
    let option = {
        method: "GET"
    }
    try {
        const response = await fetch("http://localhost:8083/items", option);
        let fetchedData = await response.json();
        let items = fetchedData.data;

        if (Array.isArray(items)) {
            items.forEach((item, index) => {
                var row = `<tr>
                    <td id="item-code-tbl">${item.propertyId}</td>
                    <td id="item-name-tbl">${item.name}</td>
                    <td id="item-description-tbl">${item.description}</td>
                    <td id="item-price-tbl">${item.price}</td>
                    <td id="item-qty-tbl">${item.qty}</td>
                </tr>`;
                $('#item-tbl-tbody').append(row);
            });
            $('#item-tbl').DataTable({
                "paging": true,
                "pageLength": 10,
                "destroy": true
            });
        } else {
            console.error("Retrieved data is not an array");
        }
    } catch (error) {
        console.error(error);
    }
}

async function loadSearchedItemsToTable(searchText) {
    $('#item-tbl-tbody').empty();
    let option={
        method:"GET",
    }
    try{
        const response=await fetch("http://localhost:8083/items/"+searchText,option);
        let fetchedData = await response.json();
        let items =fetchedData.data;

        if(Array.isArray(items)){
            items.forEach((item,index)=>{
                var row = `<tr>
                    <td id="item-code-tbl">${item.propertyId}</td>
                    <td id="item-name-tbl">${item.name}</td>
                    <td id="item-description-tbl">${item.description}</td>
                    <td id="item-price-tbl">${item.price}</td>
                    <td id="item-qty-tbl">${item.qty}</td>
                </tr>`;
                $('#item-tbl-tbody').append(row);
            })
        }else {
            console.error("Retrieved data is not an array");
        }
    }catch (error){
        console.error(error)
    }
}

$('#btnSaveItemModal').on('click', () => {
    let newItemName = $('#saveItemNameField').val();
    let newItemDescription = $('#saveItemDescriptionField').val();
    let newItemPrice = $('#saveItemPriceField').val();
    let newItemQty = $('#saveItemQtyField').val();

    if (!newItemName || !newItemDescription || !newItemPrice || !newItemQty) {
        Swal.fire({
            title: "OOPS..!",
            text: "Please fill in all fields.",
            icon: "warning"
        });
        return;
    } else if (!itemNameRegex.test(newItemName)) {
        Swal.fire({
            title: "OOPS..!",
            text: "Invalid Name , Item Name must be 3-15 & only letters and numbers",
            icon: "warning"
        });
        return;
    } else if (isNaN(newItemPrice) || isNaN(newItemQty) || newItemPrice <= 0 || newItemQty <= 0) {
        Swal.fire({
            title: "OOPS..!",
            text: "Invalid Price or Quantity",
            icon: "warning"
        });
        return;
    }
    let option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {
                propertyId: null,
                name: newItemName,
                description: newItemDescription,
                price: newItemPrice,
                qty: newItemQty
            }
        )
    }
    fetch("http://localhost:8083/items", option)
        .then(response => {
            return response.json().then(data => ({
                status: response.status,
                message: data.message,
                body: data
            }));
        })
        .then(response => {
            if (response.status === 200) {
                loadTableData();
                Swal.fire({
                    title: "Done",
                    text: "Items saved successfully",
                    icon: "success"
                })
            } else if (response.status === 400) {
                Swal.fire({
                    title: "OOPS..!",
                    text: response.message,
                    icon: "error"
                })
            } else if (response.status === 403) {
                Swal.fire({
                    title: "OOPS..!",
                    text: response.message,
                    icon: "error"
                })
            }
        })
        .catch(error => {
            console.error(error);
        })
});

$('#item-tbl-tbody').on('click', 'tr', function () {
    let selectedItemCode = $(this).find("#item-code-tbl").text();
    let selectedItemName = $(this).find("#item-name-tbl").text();
    let selectedItemDescription = $(this).find("#item-description-tbl").text();
    let selectedItemPrice = $(this).find("#item-price-tbl").text();
    let selectedItemQty = $(this).find("#item-qty-tbl").text();

    $('#update-item-modal').modal('show');
    $('#updateItemCodeField').val(selectedItemCode);
    $('#updateItemNameField').val(selectedItemName);
    $('#updateItemDescriptionField').val(selectedItemDescription);
    $('#updateItemPriceField').val(selectedItemPrice);
    $('#updateItemQtyField').val(selectedItemQty);

    selectedItemPropertyId = selectedItemCode;
})
$('#btnUpdateItemModal').on('click', () => {
    let updatedItemCode = $('#updateItemCodeField').val();
    let updatedItemName = $('#updateItemNameField').val();
    let updatedItemDescription = $('#updateItemDescriptionField').val();
    let updatedItemPrice = $('#updateItemPriceField').val();
    let updatedItemQty = $('#updateItemQtyField').val();

    if (!updatedItemCode || !updatedItemName || !updatedItemDescription || !updatedItemPrice || !updatedItemQty) {
        Swal.fire({
            title: "OOPS..!",
            text: "Please fill in all fields.",
            icon: "warning"
        });
        return;
    } else if (!itemNameRegex.test(updatedItemName)) {
        Swal.fire({
            title: "OOPS..!",
            text: "Invalid Name , Item Name must be 3-15 & only letters and numbers",
            icon: "warning"
        });
        return;
    } else if (isNaN(updatedItemPrice) || isNaN(updatedItemQty) || updatedItemPrice <= 0 || updatedItemQty <= 0) {
        Swal.fire({
            title: "OOPS..!",
            text: "Invalid Price or Quantity",
            icon: "warning"
        });
        return;
    }
    let option = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {
                propertyId: null,
                name: updatedItemName,
                description: updatedItemDescription,
                price: updatedItemPrice,
                qty: updatedItemQty
            }
        )
    }
    fetch("http://localhost:8083/items/" + updatedItemCode, option)
        .then(response => {
            return response.json().then(data => ({
                    status: response.status,
                    message: data.message,
                    body: data
                })
            )
        })
        .then(response => {
            if (response.status === 200) {
                loadTableData();
                $('#update-item-modal').modal('hide');
                Swal.fire({
                    title: "Done",
                    text: "Item updated successfully",
                    icon: "success"
                })
            } else if (response.status === 404) {
                Swal.fire({
                    title: "OOPS..!",
                    text: response.message,
                    icon: "error"
                })
            } else if(response.status === 403){
                Swal.fire({
                    title: "OOPS..!",
                    text: response.message,
                    icon: "error"
                })
            }
        })
});
$('#btnDeleteItemModal').on('click', () => {
    $('#update-item-modal').modal('hide');
    $('#delete-item-modal').modal('show');
    $('#deleteItemIdField').val(selectedItemPropertyId);
});
$('#btnConfirmDeleteItem').on('click', () => {
    let option={
        method:"DELETE"
    }
    fetch('http://localhost:8083/items/'+selectedItemPropertyId,option)
        .then(response=>{
            return response.json().then(data=>({
                status:response.status,
                message:data.message,
                body:data
            }))
        })
        .then(response=>{
            if(response.status===201){
                $('#delete-item-modal').modal('hide');
                loadTableData();
                Swal.fire({
                    title: "Successfully Deleted!",
                    text: response.message,
                    icon: "success"
                });
            }else if(response.status===400){
                Swal.fire({
                    title: "OOPS..!",
                    text: response.message,
                    icon: "warning"
                });
            }
        })
});
$('#btnSearchItem').on('click', () => {
    console.log("Search Item Clicked");
    let searchText = $('#txtSearchedValue').val();
    loadSearchedItemsToTable(searchText)
});
$('#btnViewAllItems').on('click', () => {
    loadTableData();
})

