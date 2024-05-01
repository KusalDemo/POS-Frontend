$('#item-section').css({
    display:'none'
})
$('#customer-section').css({
    display:'none'
})
$('#place-order-section').css({
    display:'none'
})
$('#order-details-section').css({
    display:'none'
})
$('#nav-home').on('click', ()=>{
    $('#main-section').css({
        display:'block'
    })
    $('#item-section ,#customer-section , #place-order-section, #order-details-section').css({
        display:'none'
    })
    console.log('Main-Page')
});
$('#nav-customer').on('click', ()=>{
    $('#customer-section').css({
        display:'block'
    })
    $('#item-section ,#main-section , #place-order-section, #order-details-section').css({
        display:'none'
    })
    console.log('Customer-Page')
});
$('#nav-item').on('click', ()=>{
    $('#item-section').css({
        display:'block'
    })
    $('#customer-section ,#main-section, #place-order-section, #order-details-section').css({
        display:'none'
    })
    console.log('Item-Page')
});
$('#nav-order').on('click', ()=> {
    $('#place-order-section').css({
        display: 'block'
    })
    $('#item-section ,#customer-section , #main-section, #order-details-section').css({
        display: 'none'
    })
    console.log('Order-Page')
});
$('#nav-order-details').on('click', ()=>{
    $('#order-details-section').css({
        display:'block'
    })
    $('#item-section ,#customer-section , #main-section , #place-order-section').css({
        display:'none'
    })
    console.log('Order-Details-Page')
})