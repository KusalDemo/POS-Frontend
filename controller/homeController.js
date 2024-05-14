import {customerArr, itemArr, orderArr} from "../db/db.js";

function updateTotals() {
    $('#total-customers').text(customerArr.length);
    $('#total-items').text(itemArr.length);
    $('#total-orders').text(orderArr.length);
}

setInterval(updateTotals, 500);