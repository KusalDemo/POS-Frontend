$(document).ready(function () {
    loadTableData();
})
async function loadTableData(){
    $('#order-details-tbody').empty();
    let option={
        method:"GET"
    }
    try{
        let response = await fetch("http://localhost:8083/orders",option);
        let fetchedData = await response.json();
        let orders = fetchedData.data;

        if (Array.isArray(orders)) {
            orders.forEach((order, index) => {
                var row = `<tr>
                <td id="order-id-tbl">${order.orderId}</td>
                <td id="order-cus-id-tbl">${order.customerId}</td>
                <td id="order-date-tbl">${order.orderDate}</td>
                <td id="order-total-amount-tbl">${order.paid}</td>
                <td id="order-cash-amount-tbl">${order.paid}</td>
                <td id="order-discount-amount-tbl">${order.discount}</td>
                <td id="order-balance-amount-tbl">${order.balance}</td>
            </tr>`;
                $('#order-details-tbl-tbody').append(row);
            });
            $('#order-tbl').DataTable({
                "paging": true,
                "pageLength": 10,
                "destroy": true
            });
        } else {
            console.error("Retrieved data is not an array");
        }
    }catch (error) {
        console.log(error);
    }

}
async function loadSelectedOrderDetails(id){
    let option={
        method:"GET"
    }
    console.log("Id : "+id)
    let response = await fetch("http://localhost:8083/orders/"+id,option);
    let fetchedData = await response.json();
    let orders = fetchedData.data;

    if(Array.isArray(orders)){
        orders.forEach((order,index)=>{
            var searchedItem = `<tr>
            <td id="item-code-tbl">${order.itemId}</td>
            <td id="item-description-tbl">${order.unitPrice}</td>
            <td id="item-price-tbl">${order.itemCount}</td>
            <td id="item-qty-tbl">${order.total}</td>
        </tr>`;
            $('#order-details-items-tbl-tbody').append(searchedItem);
        })
    }
}
$('#order-details-tbl-tbody').on('click','tr',function (){
    let selectedOrderId = $(this).find("#order-id-tbl").text();
    $('#order-details-items-tbl-tbody').empty();
    loadSelectedOrderDetails(selectedOrderId);

});
