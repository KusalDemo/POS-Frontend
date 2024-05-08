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
    let newItemCode = $('#saveItemCodeField').val();
    let newItemName = $('#saveItemNameField').val();
    let newItemDescription = $('#saveItemDescriptionField').val();
    let newItemPrice = $('#saveItemPriceField').val();
    let newItemQty = $('#saveItemQtyField').val();

    if(!newItemCode || !newItemName || !newItemDescription || !newItemPrice || !newItemQty){
        alert('Please fill in all fields.');
        return;
    }
     let newItemToSave = new ItemModel(newItemCode, newItemName, newItemDescription, newItemPrice, newItemQty);
    itemArr.push(newItemToSave);
    console.log("New Item Added :",newItemToSave.itemName);
    console.log(itemArr)
    $('#save-item-modal').modal('hide');
    loadTableData();
    setTimeout(() => {alert("Item Added Successfully")},800);
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
        alert('Please fill in all fields.');
        return;
    }
    itemArr[selectedItemIndex] = new ItemModel(updatedItemCode, updatedItemName, updatedItemDescription, updatedItemPrice, updatedItemQty);

    $('#update-item-modal').modal('hide');
    loadTableData();
    setTimeout(() => {alert("Item Updated Successfully")},800);
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
    setTimeout(() => {alert("Item Deleted Successfully")},800);
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
