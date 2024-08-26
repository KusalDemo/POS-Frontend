import {orderArr, customerArr, itemArr} from "../db/db.js";
import {OrderModel} from "../model/orderModel.js";

let cartItemsArr = [];
let totalPrice = 0;
let subTotalPrice = 0;
var discountPercentage = 0;
let balance = 0;

function initialize() {
    loadCustomers();
    loadItems();
}

$('#customerIdSelector').on('focus', function () {
    loadCustomers();
})
$('#itemIdSelector').on('focus', function () {
    loadItems();
})

async function loadCustomers() {
    $('#customerIdSelector').empty();
    let option = {
        method: "GET"
    }
    let response = await fetch("http://localhost:8083/customer", option);
    let fetchedData = await response.json();
    let data = fetchedData.data;
    if (Array.isArray(data)) {
        data.forEach((customer, index) => {
            $('#customerIdSelector').append('<option value="' + customer.email + '">' + customer.name + '</option>');
        })
    }
}

async function loadItems() {
    $('#itemIdSelector').empty();
    let option = {
        method: "GET"
    }
    let response = await fetch("http://localhost:8083/items", option);
    let fetchedData = await response.json();
    let data = fetchedData.data;
    if (Array.isArray(data)) {
        data.forEach((item, index) => {
            $('#itemIdSelector').append('<option value="' + item.name + '">' + item.name + '</option>')
        });
    }
}

async function updateCustomerInfo() {
    var selectedCustomerId = $('#customerIdSelector').val();
    let option = {
        method: "GET"
    }
    let response = await fetch("http://localhost:8083/customer/" + selectedCustomerId, option);
    let fetchedData = await response.json();
    let data = fetchedData.data;
    if (Array.isArray(data)) {
        data.forEach((customer, index) => {
            $('#selectedCustomerIdPlaceOrder').val(customer.email);
            $('#selectedCustomerNamePlaceOrder').val(customer.name);
            $('#selectedCustomerAddressPlaceOrder').val(customer.address);
            totalPrice = 0;
            cartItemsArr = [];
            $('#order-tbl-tbody').empty();
            $('#totalPrice').text("Total :");
        });
    }
}

async function updateItemInfo() {
    var selectedItemId = $('#itemIdSelector').val();
    console.log(selectedItemId)
    let option = {
        method: "GET"
    }
    let response = await fetch("http://localhost:8083/items/" + selectedItemId, option);
    let fetchedData = await response.json();
    let data = fetchedData.data;
    if (Array.isArray(data)) {
        data.forEach((item, index) => {
            $('#itemCode').val(item.propertyId);
            $('#itemName').val(item.name);
            $('#itemPrice').val(item.price);
            $('#itemQty').val(item.qty);
        });
    }
}

$('#customerIdSelector').change(updateCustomerInfo);
$('#itemIdSelector').change(updateItemInfo);

function loadCartItems() {
    $('#order-tbl-tbody').empty();
    $.each(cartItemsArr, function (index, item) {
        var row = `<tr>
            <td id="item-code-tbl">${item.itemId}</td>
            <td id="item-name-tbl">${item.itemName}</td>
            <td id="item-price-tbl">${item.itemPrice}</td>
            <td id="order-qty-tbl">${item.orderQty}</td>
            <td id="total-tbl">${item.total}</td>
            <td>
                <button class="btn btn-danger cart-remove" data-id="${item.itemId}">Remove</button>
               <!-- <button class="btn btn-secondary reduce-amount" data-bs-toggle="modal"  data-bs-target="#order-items-modal">Reduce Qty</button>-->
            </td>
        </tr>`;
        $('#order-tbl-tbody').append(row);
    });
}

$('tbody').on('click', '.cart-remove', function () {
    var itemId = $(this).data('id');
    let removingRequestedItem = cartItemsArr.find(s => s.itemId === itemId);
    if (removingRequestedItem) {
        /*let currentItemQty = parseInt(itemArr.find(s=>s.itemId===itemId).qtyOnHand);
        let updatedItemQty = currentItemQty+parseInt(removingRequestedItem.orderQty);
        itemArr.find(s=>s.itemId===itemId).qtyOnHand=updatedItemQty;*/
        totalPrice -= removingRequestedItem.total;
        $('#totalPrice').text("Total : Rs." + totalPrice);
    }
    cartItemsArr.find(s => s.itemId === itemId).total = 0;
    cartItemsArr = cartItemsArr.filter(s => s.itemId !== itemId);
    loadCartItems();
    clearItemFields();
})
$('#btnAddToCart').on('click', (e) => {
    if (!$('#orderQty').val() || $('#orderQty').val() === 0) {
        Swal.fire({
            title: "OOPS!",
            text: "Order Quantity cannot be 0",
            icon: "warning"
        });
        return;
    } else if (!$('#itemCode').val()) {
        Swal.fire({
            title: "OOPS!",
            text: "Item Code cannot be empty",
            icon: "warning"
        });
        return;
    } else if ($('#itemQty').val() < $('#orderQty').val()) {
        Swal.fire({
            title: "OOPS!",
            text: "Order Quantity cannot be greater than Item Quantity",
            icon: "warning"
        });
        return;
    }
    let totalForCurrentItem = ($('#itemPrice').val() * $('#orderQty').val());
    try {
        if (cartItemsArr.find(s => s.itemId === $('#itemCode').val())) {
            let indexOfItem = cartItemsArr.findIndex(s => s.itemId === $('#itemCode').val());
            cartItemsArr[indexOfItem].orderQty = parseInt($('#orderQty').val()) + parseInt(cartItemsArr[indexOfItem].orderQty);
            cartItemsArr[indexOfItem].total += totalForCurrentItem;
            loadCartItems();
        } else {
            cartItemsArr.push({
                itemId: $('#itemCode').val(),
                itemName: $('#itemName').val(),
                itemPrice: $('#itemPrice').val(),
                orderQty: $('#orderQty').val(),
                total: totalForCurrentItem
            });
        }
        /*let indexOfItem = itemArr.find(s => s.itemId === $('#itemCode').val());
        console.log("Index of Item : ",indexOfItem)
        indexOfItem.qtyOnHand-=parseInt($('#orderQty').val());*/

        clearItemFields();
    } catch (error) {
        Swal.fire({
            title: "Something went wrong",
            text: "Adding Item Failed..",
            icon: "error"
        });
        console.log("Adding Item Failed..", error)
    }
    console.log(cartItemsArr);
    totalPrice += totalForCurrentItem;
    $('#totalPrice').text("Total : Rs." + totalPrice);
    loadCartItems();
});

function clearItemFields() {
    $('#itemCode').val("");
    $('#itemName').val("");
    $('#itemPrice').val("");
    $('#itemQty').val("");
    $('#orderQty').val("");
}

function clearAllFields() {
    $('#customerIdSelector').val("")
    $('#selectedCustomerIdPlaceOrder').val("")
    $('#selectedCustomerNamePlaceOrder').val("")
    $('#selectedCustomerAddressPlaceOrder').val("")
    $('#itemIdSelector').val("");
    $('#itemCode').val("");
    $('#itemName').val("");
    $('#itemPrice').val("");
    $('#itemQty').val("");
    $('#customerPayingAmount').val("");
    $('#discount').val("");
}

$('#discount').on('click', () => {
    try {
        var payingAmount = Number($('#customerPayingAmount').val());
        discountPercentage = $('#discount').val();

        if (payingAmount < totalPrice || isNaN(payingAmount)) {
            Swal.fire({
                title: "OOPS.!",
                text: "Invalid Amount, Check and Try Again",
                icon: "warning"
            });
            /*alert("Invalid Amount, Check and Try Again");*/
            return;
        }
        subTotalPrice = totalPrice / 100 * (100 - discountPercentage);
        balance = payingAmount - subTotalPrice;
        $('#subTotalPrice').text("Sub Total : Rs." + subTotalPrice);
        $('#balancePrice').text("Balance : Rs." + balance);
    } catch (error) {
        Swal.fire({
            title: "Something went wrong",
            text: "Discounting Failed..",
            icon: "error"
        });
        console.log("Discounting Failed..", error)
    }
});
$('#btnPlaceOrder').on('click', () => {
    if (cartItemsArr.length === 0) {
        Swal.fire({
            title: "OOPS.!",
            text: "Cart is Empty,Couldn't Place Order",
            icon: "warning"
        });
        return;
    } else if (!$('#customerPayingAmount').val()) {
        Swal.fire({
            title: "OOPS.!",
            text: "Paying Amount cannot be empty",
            icon: "warning"
        });
        return;
    }

    $('#place-order-modal').modal('show');
    $('#orderCustomerNameSpan').text($('#selectedCustomerNamePlaceOrder').val());
    $('#orderItemCountSpan').text(cartItemsArr.length);
    $('#totalAmountSpan').text("Rs." + totalPrice);
    $('#cashAmountSpan').text("Rs." + $('#customerPayingAmount').val());
    var discountPercentage = Math.min(100, Math.max(0, parseInt($('#discount').val())))
    $('#discountPercentageSpan').text(discountPercentage + "%");
    $('#balanceAmountSpan').text("Rs." + balance);
    $('#subTotalAmountSpan').text("Rs." + subTotalPrice);
});
$('#btnConfirmPlaceOrder').on('click', () => {
    $('#place-order-modal').modal('hide');

    const orderItems = []
    cartItemsArr.forEach(orderItem => {
        orderItems.push({
            orderId: null,
            itemId: orderItem.itemId,
            itemCount: orderItem.orderQty,
            unitPrice: orderItem.itemPrice,
            total: orderItem.total
        })
    })

    const option={
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            customerId: $('#selectedCustomerIdPlaceOrder').val(),
            orderDate: getTodayDate(),
            totalAmount: totalPrice,
            paid: subTotalPrice,
            discount: discountPercentage,
            balance: balance,
            orderItems: orderItems
        })
    }
    fetch("http://localhost:8083/orders",option)
        .then(response=>{
            return response.json().then(data=>({
                status:response.status,
                message:data.message,
                body:data
            }))
        })
        .then(response=> {
            if (response.status === 200) {
                Swal.fire({
                    title: "Done",
                    text: "Order Placed Successfully",
                    icon: "success"
                })
                clearAllFields();
                initialize();
            } else if (response.status === 404) {
                Swal.fire({
                    title: "OOPS.!",
                    text: response.message,
                    icon: "error"
                })
            }
        })
});

function getTodayDate() {
    var now = new Date();
    var dd = String(now.getDate()).padStart(2, '0');
    var mm = String(now.getMonth() + 1).padStart(2, '0');
    var yy = now.getFullYear();
    return yy + '-' + mm + '-' + dd;
}


