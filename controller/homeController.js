
/*setInterval(loadDetails, 500);*/
loadDetails();

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

async function loadDetails() {
    let option = {
        method: "GET"
    }
    let response = await fetch("http://localhost:8083/customer", option);
    let fetchedData = await response.json();
    let data = fetchedData.data;
    if (Array.isArray(data)) {
        let lengthOfCustomers = data.length;
        $('#total-customers').text(lengthOfCustomers+" +");
    }

    response = await fetch("http://localhost:8083/items", option);
    fetchedData = await response.json();
    data = fetchedData.data;
    if (Array.isArray(data)) {
        let lengthOfItems = data.length;
        $('#total-items').text(lengthOfItems+" +");
    }

    response = await fetch("http://localhost:8083/orders", option);
    fetchedData = await response.json();
    data = fetchedData.data;
    if (Array.isArray(data)) {
        let lengthOfOrders = data.length;
        $('#total-orders').text(lengthOfOrders+" +");
    }
}