/*
import {customerArr} from "../db/db.js";
import {orderArr} from "../db/db.js";
*/


import {orderArr} from "../db/db.js";
import {OrderModel} from "../model/orderModel.js";

let cartItemsArr=[];
let totalPrice=0;
let subTotalPrice=0;
var discountPercentage=0;
let balance=0;
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
$('#discount').on('click',()=>{
    try{
        var payingAmount = Number($('#customerPayingAmount').val());
        discountPercentage = $('#discount').val();

        if (payingAmount < totalPrice || isNaN(payingAmount)) {
            alert("Invalid Amount, Check and Try Again");
            return;
        }
        subTotalPrice=totalPrice/100*(100-discountPercentage);
        balance = payingAmount-subTotalPrice;
        $('#subTotalPrice').text("Sub Total : Rs."+subTotalPrice);
        $('#balancePrice').text("Balance : Rs."+balance);
    }catch (error){
        console.log("Discounting Failed..",error)
    }
});
$('#btnPlaceOrder').on('click',()=>{
    if(cartItemsArr.length===0){
        alert("Cart is Empty");
        return;
    }else if(!$('#customerPayingAmount').val()){
        alert("Paying Amount cannot be empty");
        return;
    }

    $('#place-order-modal').modal('show');
    $('#orderCustomerNameSpan').text($('#selectedCustomerNamePlaceOrder').val());
    $('#orderItemCountSpan').text(cartItemsArr.length);
    $('#totalAmountSpan').text("Rs."+totalPrice);
    $('#cashAmountSpan').text("Rs."+$('#customerPayingAmount').val());
    var discountPercentage = $('#discount').val();
    $('#discountPercentageSpan').text(discountPercentage+"%");
    $('#balanceAmountSpan').text("Rs."+balance);
    $('#subTotalAmountSpan').text("Rs."+subTotalPrice);
});
$('#btnConfirmPlaceOrder').on('click',()=>{
    $('#place-order-modal').modal('hide');
    try{
        let newPlaceOrder = new OrderModel(generateId(),$('#selectedCustomerIdPlaceOrder').val(),getTodayDate(),totalPrice,discountPercentage,balance,subTotalPrice,cartItemsArr);
        orderArr.push(newPlaceOrder)
        console.log(orderArr)
        if(newPlaceOrder){
            setTimeout(() => {alert("Place Order Successfully..")},800);
        }
    }catch (error){
        console.log("Placing Order Failed..",error)
    }
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

    var id = "O" + dd + mm + ms + hh + yy + ss + min;
    return id;
}
function getTodayDate() {
    var now = new Date();
    var dd = String(now.getDate()).padStart(2, '0');
    var mm = String(now.getMonth() + 1).padStart(2, '0');
    var yy = now.getFullYear();
    return yy + '-' + mm + '-' + dd;
}



