import{orderArr} from "../db/db.js";

let searchedOrdersArr=[];



document.addEventListener("DOMContentLoaded", function() {
    // Your code here
    $('#order-details-tbl-tbody').empty();
    orderArr.map((order, index) => {
        var row = `<tr>
            <td id="order-id-tbl">${order.orderId}</td>
            <td id="order-cus-id-tbl">${order.customerId}</td>
            <td id="order-date-tbl">${order.orderDate}</td>
            <td id="order-total-amount-tbl">${order.orderTotal}</td>
            <td id="order-cash-amount-tbl">${order.paidAmount}</td>
            <td id="order-discount-amount-tbl">${order.discount}</td>
            <td id="order-balance-amount-tbl">${order.balance}</td>
        </tr>`;
        $('#order-details-tbl-tbody').append(row);
    })
});
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
        Swal.fire({
            title: "OOPS!",
            text: "There is no order found at this index",
            icon: "info"
        });
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
        }else if(selectedSearchingType==="3"){
            $('#order-details-tbl-tbody').empty();
            $('#order-details-items-tbl-tbody').empty();
            $.each(orderArr,function (index, order) {
                if(order.orderDate === searchText){
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
        Swal.fire({
            title: "OOPS!",
            text: "There is no order found at this index",
            icon: "warning"
        });
        console.log(error);
    }
})
$('#order-details-tbl-tbody').on('click', 'tr', function () {
    let index = $(this).index();
    $('#order-details-items-tbl-tbody').empty();
    orderArr[index].itemsArr.forEach(function (item){
        var searchedItem = `<tr>
            <td id="item-code-tbl">${item.itemId}</td>
            <td id="item-name-tbl">${item.itemName}</td>
            <td id="item-description-tbl">${item.itemPrice}</td>
            <td id="item-price-tbl">${item.itemPrice}</td>
            <td id="item-qty-tbl">${item.total}</td>
        </tr>`;
        $('#order-details-items-tbl-tbody').append(searchedItem);
    })
})
$('#btnClearOrderReference').on('click', () => {
    searchedOrdersArr.splice(0, searchedOrdersArr.length);
    loadSearchedOrdersToTable();
    loadSelectedOrderDetailsToTable.empty();
    $('#searchOrderReference').val("");
})

$('#cmbOrderSearchBy').change(function() {
    var selectedOption = $(this).val();
    if (selectedOption == "3") {
        $('#searchOrderReference').attr('type', 'date');
    } else {
        $('#searchOrderReference').attr('type', 'text');
    }
});