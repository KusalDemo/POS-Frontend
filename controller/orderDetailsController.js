import {itemArr, orderArr} from "../db/db.js";

let searchedOrdersArr=[];
let indexOfSelectedOrder;

function loadSearchedOrdersToTable(){
    $('#order-details-tbody').empty();
    searchedOrdersArr.map((order, index) => {
        var searchedOrder = `<tr>
            <td id="order-id-tbl">${order.orderId}</td>
            <td id="order-cus-id-tbl">${order.customerId}</td>
            <td id="order-date-tbl">${order.orderDate}</td>
            <td id="order-total-amount-tbl">${order.orderTotal}</td>
            <td id="order-cash-amount-tbl">${order.paidAmount}</td>
            <td id="order-discount-amount-tbl">${order.discount}</td>
            <td id="order-balance-amount-tbl">${order.balance}</td>
        </tr>`;
        $('#order-details-tbody').append(searchedOrder);
    });
}
function loadSelectedOrderDetailsToTable(indexOfSelectedOrder){
    var selectedOrder=[];
    selectedOrder = orderArr[indexOfSelectedOrder];
    if (!selectedOrder) {
        console.error(`Order not found at index: ${indexOfSelectedOrder}`);
        return;
    }
    $('#order-details-items-tbl-tbody').empty();
    selectedOrder.itemsArr.forEach(function (item) {
        console.log("Inside the forEach() : Item Id : "+item.itemId)
        var searchedItem = `<tr>
            <td id="item-code-tbl">${item.itemId}</td>
            <td id="item-name-tbl">${item.itemName}</td>
            <td id="item-description-tbl">${item.itemPrice}</td>
            <td id="item-price-tbl">${item.itemPrice}</td>
            <td id="item-qty-tbl">${item.total}</td>
        </tr>`;
        $('#order-details-items-tbl-tbody').append(searchedItem);
    })
}
$('#btnSearchOrderReference').on('click', () => {
    console.log("Search Order Clicked");
    try {
        let selectedSearchingType = $('#cmbOrderSearchBy').val();
        let searchText = $('#searchOrderReference').val();
        if(selectedSearchingType==="1"){
            let matchedOrder=0;
            orderArr.find(order =>{
                if(order.orderId === searchText){
                    matchedOrder=orderArr.indexOf(order);
                }
            });
            loadSelectedOrderDetailsToTable(matchedOrder)
        }
        else if(selectedSearchingType==="2"){
            $('#order-details-tbl-tbody').empty();
            $('#order-details-items-tbl-tbody').empty();
            $.each(orderArr,function (index, order) {
                if(order.customerId === searchText){
                    var searchedOrder = `<tr>
                        <td id="order-id-tbl">${order.orderId}</td>
                        <td id="order-cus-id-tbl">${order.customerId}</td>
                        <td id="order-date-tbl">${order.orderDate}</td>
                        <td id="order-total-amount-tbl">${order.orderTotal}</td>
                        <td id="order-cash-amount-tbl">${order.paidAmount}</td>
                        <td id="order-discount-amount-tbl">${order.discount}</td>
                        <td id="order-balance-amount-tbl">${order.balance}</td>
                    </tr>`;
                    $('#order-details-tbl-tbody').append(searchedOrder);
                }
            })
        }
        console.log(searchedOrdersArr);

    }catch (error) {
        alert("No Order Found");
        console.log(error);
    }
})
$('#order-details-tbl-tbody').on('click', 'tr', function () {
    let index = $(this).index();
    let selectedOrderId = $(this).find("#order-id-tbl").text();
    loadSelectedOrderDetailsToTable(selectedOrderId);
})
$('#btnClearOrderReference').on('click', () => {
    searchedOrdersArr.splice(0, searchedOrdersArr.length);
    loadSearchedOrdersToTable();
    loadSelectedOrderDetailsToTable.empty();
    $('#searchOrderReference').val("");
})