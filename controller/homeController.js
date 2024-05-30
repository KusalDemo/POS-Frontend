import {customerArr, itemArr, orderArr} from "../db/db.js";

function updateTotals() {
    $('#total-customers').text(customerArr.length);
    $('#total-items').text(itemArr.length);
    $('#total-orders').text(orderArr.length);
}

setInterval(updateTotals, 500);


new Chart(document.getElementById("line-chart"), {
    type: 'line',
    data: {
        labels: ["Jan", "Feb", "Mar", "Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
        datasets: [{
            data: [10,20,15,16,21,22],
            label: "Customers (%)",
            borderColor: "#3e95cd",
            fill: false
        }, {
            data: [3, 7, 12, 17, 23,23.5],
            label: "Items range (%)",
            borderColor: "#8e5ea2",
            fill: false
        }, {
            data: [5,10,8,10,14,15] ,
            label: "Sales (%)",
            borderColor: "#3cba9f",
            fill: false
        }]
    },
    options: {
        title: {
            display: true,
            text: 'Progress Tracker (%) by POSware'
        }
    }
});