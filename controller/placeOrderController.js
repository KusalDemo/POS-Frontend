/*
import {customerArr} from "../db/db.js";
import {orderArr} from "../db/db.js";
*/


let cartItemsArr=[];
let totalPrice=0;
var customerArr = [
    { cusId: "1", cusName: "Customer 1" , cusEmail: "C2bYk@example.com", cusAddress: "Address 1", cusBranch: "Branch 1"},
    { cusId: "2", cusName: "Customer 2", cusEmail: "C2bYk@example.com", cusAddress: "Address 2", cusBranch: "Branch 2"},
    // Add more customers as needed
];
var itemArr = [
    { itemId: "1", itemName: "Item 1",description: "Description 1", itemPrice: 10,qtyOnHand: 100},
    { itemId: "2", itemName: "Item 2",description: "Description 2", itemPrice: 20,qtyOnHand: 200},
]
$(document).ready(function() {
    function loadCustomers() {
        $('#customerIdSelector').empty();
        $.each(customerArr, function(index, customer) {
            $('#customerIdSelector').append('<option value="' + customer.cusId + '">' + customer.cusName + '</option>');
        });
    }
    function loadItems() {
        $('#itemIdSelector').empty();
        $.each(itemArr, function(index, item) {
            $('#itemIdSelector').append('<option value="' + item.itemId + '">' + item.itemName + '</option>');
        });
    }
    loadCustomers();
    loadItems();
    function updateCustomerInfo() {
        console.log("Update Customer Info Called");
        var selectedCustomerId = $('#customerIdSelector').val();
        var selectedCustomer=null;
        try{
            selectedCustomer = customerArr.find(s => s.cusId === selectedCustomerId);
        }catch (error){
            console.log("fetching User Details Failed..",error)
        }
        if(selectedCustomer) {
            $('#selectedCustomerIdPlaceOrder').val(selectedCustomer.cusId);
            $('#selectedCustomerNamePlaceOrder').val(selectedCustomer.cusName);
            $('#selectedCustomerAddressPlaceOrder').val(selectedCustomer.cusAddress);
            $('#order-tbl-tbody').empty();
            cartItemsArr = [];
            totalPrice = 0;
            $('#totalPrice').text("Total :");
        }
    }
    function updateItemInfo() {
        console.log("Update Item Info Called");
        var selectedItemId = $('#itemIdSelector').val();
        var selectedItem=null;
        try{
            selectedItem = itemArr.find(s => s.itemId === selectedItemId);
        }catch (error){
            console.log("fetching Item Details Failed..",error)
        }
        if(selectedItem) {
            $('#itemCode').val(selectedItem.itemId);
            $('#itemName').val(selectedItem.itemName);
            $('#itemPrice').val(selectedItem.itemPrice);
            $('#itemQty').val(selectedItem.qtyOnHand);
        }
    }

    $('#customerIdSelector').change(updateCustomerInfo);
    $('#itemIdSelector').change(updateItemInfo);
});

function loadCartItems() {
    $('#order-tbl-tbody').empty();
    $.each(cartItemsArr, function(index, item) {
        var row = `<tr>
            <td id="item-code-tbl">${item.itemId}</td>
            <td id="item-name-tbl">${item.itemName}</td>
            <td id="item-price-tbl">${item.itemPrice}</td>
            <td id="order-qty-tbl">${item.orderQty}</td>
            <td id="total-tbl">${item.total}</td>
        </tr>`;
        $('#order-tbl-tbody').append(row);
    });
}
$('#btnAddToCart').on('click',(e)=>{
    if(!$('#orderQty').val()||$('#orderQty').val()===0){
        alert("Order Quantity cannot be 0");
        return;
    }else if(!$('#itemCode').val()){
        alert("Item Code cannot be empty");
        return;
    }else if($('#itemQty').val()<$('#orderQty').val()){
        alert("Order Quantity cannot be greater than Item Quantity");
        return;
    }
    let totalForCurrentItem=($('#itemPrice').val()*$('#orderQty').val());
    try{
        if(cartItemsArr.find(s => s.itemId === $('#itemCode').val())) {
            let indexOfItem = cartItemsArr.findIndex(s => s.itemId === $('#itemCode').val());
            cartItemsArr[indexOfItem].orderQty+=parseInt($('#orderQty').val());
            cartItemsArr[indexOfItem].total+=totalForCurrentItem;
            clearItemFields();
            loadCartItems();
        }else{
            cartItemsArr.push({
                itemId: $('#itemCode').val(),
                itemName: $('#itemName').val(),
                itemPrice: $('#itemPrice').val(),
                orderQty: $('#orderQty').val(),
                total: totalForCurrentItem
            });
        }
        let indexOfItem = itemArr.find(s => s.itemId === $('#itemCode').val());
        console.log("Index of Item : ",indexOfItem)
        indexOfItem.qtyOnHand-=parseInt($('#orderQty').val());
        clearItemFields();
    }catch (error){
        console.log("Adding Item Failed..",error)
    }
    console.log(cartItemsArr);
    totalPrice+=totalForCurrentItem;
    $('#totalPrice').text("Total : Rs."+totalPrice);
    loadCartItems();
});
function clearItemFields(){
    $('#itemCode').val("");
    $('#itemName').val("");
    $('#itemPrice').val("");
    $('#itemQty').val("");
    $('#orderQty').val("");
}

