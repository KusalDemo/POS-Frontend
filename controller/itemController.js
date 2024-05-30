import {ItemModel} from "../model/itemModel.js";
import {itemArr, searchedItemsArr} from "../db/db.js";

var selectedItemIndex;
function loadTableData(){
    $('#item-tbl-tbody').empty();
    itemArr.map((item, index) => {
        var row = `<tr>
            <td id="item-code-tbl">${item.itemId}</td>
            <td id="item-name-tbl">${item.itemName}</td>
            <td id="item-description-tbl">${item.description}</td>
            <td id="item-price-tbl">${item.itemPrice}</td>
            <td id="item-qty-tbl">${item.qtyOnHand}</td>
        </tr>`;
        $('#item-tbl-tbody').append(row);
    });
}
function loadSearchedItemsToTable(){
    $('#item-tbl-tbody').empty();
    searchedItemsArr.map((item, index) => {
        var searchedItem = `<tr>
            <td id="item-code-tbl">${item.itemId}</td>
            <td id="item-name-tbl">${item.itemName}</td>
            <td id="item-description-tbl">${item.description}</td>
            <td id="item-price-tbl">${item.itemPrice}</td>
            <td id="item-qty-tbl">${item.qtyOnHand}</td>
        </tr>`;
        $('#item-tbl-tbody').append(searchedItem);
    });
}
$('#btnSaveItemModal').on('click', ()=> {
    let newItemCode = generateId()
    let newItemName = $('#saveItemNameField').val();
    let newItemDescription = $('#saveItemDescriptionField').val();
    let newItemPrice = $('#saveItemPriceField').val();
    let newItemQty = $('#saveItemQtyField').val();

    if(!newItemCode || !newItemName || !newItemDescription || !newItemPrice || !newItemQty){
        Swal.fire({
            title: "OOPS..!",
            text: "Please fill in all fields.",
            icon: "warning"
        });
        return;
    }else if(isNaN(newItemPrice) || isNaN(newItemQty) || newItemPrice <= 0 || newItemQty <= 0){
        Swal.fire({
            title: "OOPS..!",
            text: "Invalid Price or Quantity",
            icon: "warning"
        });
        return;
    }
     let newItemToSave = new ItemModel(newItemCode, newItemName, newItemDescription, newItemPrice, newItemQty);
    itemArr.push(newItemToSave);
    console.log("New Item Added :",newItemToSave.itemName);
    console.log(itemArr)
    $('#save-item-modal').modal('hide');
    loadTableData();
    Swal.fire({
        title: "Successfully Saved!",
        text: "new Item \""+newItemCode+"\" added to the stock..",
        icon: "success"
    });
});
$('#item-tbl-tbody').on('click', 'tr', function () {
    let index = $(this).index();
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

    selectedItemIndex = index;
})
$('#btnUpdateItemModal').on('click', ()=> {
    let updatedItemCode = $('#updateItemCodeField').val();
    let updatedItemName = $('#updateItemNameField').val();
    let updatedItemDescription = $('#updateItemDescriptionField').val();
    let updatedItemPrice = $('#updateItemPriceField').val();
    let updatedItemQty = $('#updateItemQtyField').val();

    if(!updatedItemCode || !updatedItemName || !updatedItemDescription || !updatedItemPrice || !updatedItemQty){
        Swal.fire({
            title: "OOPS..!",
            text: "Please fill in all fields.",
            icon: "warning"
        });
        return;
    }
    itemArr[selectedItemIndex] = new ItemModel(updatedItemCode, updatedItemName, updatedItemDescription, updatedItemPrice, updatedItemQty);

    $('#update-item-modal').modal('hide');
    loadTableData();
    Swal.fire({
        title: "Successfully Updated!",
        text: " \""+updatedItemCode+"\" Updated...",
        icon: "success"
    });
});
$('#btnDeleteItemModal').on('click', ()=> {
    $('#update-item-modal').modal('hide');
    $('#delete-item-modal').modal('show');
    $('#deleteItemIdField').val(itemArr[selectedItemIndex].itemId);
});
$('#btnConfirmDeleteItem').on('click', ()=> {
    itemArr.splice(selectedItemIndex, 1);
    $('#delete-item-modal').modal('hide');
    loadTableData();
    Swal.fire({
        title: "Successfully Deleted!",
        text: "Selected item has been deleted...",
        icon: "success"
    });
});
$('#btnSearchItem').on('click', () => {
    console.log("Search Item Clicked");
    try {
        let selectedSearchingType = $('#cmbSearchByItem').val();
        console.log(selectedSearchingType);
        searchedItemsArr.splice(0, searchedItemsArr.length);
        let searchText = $('#searchItemReference').val();
        if(selectedSearchingType==="1"){
            let matchedItem =itemArr.find(item => item.itemName === searchText);
            searchedItemsArr.push(matchedItem);
        }
        else if(selectedSearchingType==="2") {
            let matchedItem = itemArr.find(item => item.itemId === searchText);
            searchedItemsArr.push(matchedItem);
        }
        console.log(searchedItemsArr);
        loadSearchedItemsToTable()
    }catch (error) {
        setTimeout(() => {alert("No any Item Found")},500);
    }
});
$('#btnViewAllItems').on('click', () => {
    loadTableData();
})
function generateId() {
    var now = new Date();
    var dd = String(now.getDate()).padStart(2, '0');
    var mm = String(now.getMonth() + 1).padStart(2, '0');
    var yy = now.getFullYear();
    var ss = String(now.getSeconds()).padStart(2, '0');
    var ms = String(now.getMilliseconds()).padStart(3, '0');

    var id = "I" + dd + mm + ms + yy + ss ;
    return id;
}
