
function setLastActiveSection(sectionId) {
    localStorage.setItem('lastActiveSection', sectionId);
}
function getLastActiveSection() {
    return localStorage.getItem('lastActiveSection');
}
$('#login-section').css({
    display:'none'
})
$('#signup-section').css({
    display:'none'
})
$("#main-section").css({
    display:'none'
})
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
$(document).ready(function() {
    const lastActiveSection = getLastActiveSection();
    if (lastActiveSection) {
        $(`#${lastActiveSection}`).css({
            display:'block'
    })
}});

$('#nav-home').on('click', ()=>{
    $('#main-section,#navbar').css({
        display:'block'
    })
    $('#item-section ,#customer-section , #place-order-section, #order-details-section,#login-section,#signup-section').css({
        display:'none'
    })
    console.log('Main-Page')
    setLastActiveSection('main-section');
});
$('#nav-customer').on('click', ()=>{
    $('#customer-section').css({
        display:'block'
    })
    $('#item-section ,#main-section , #place-order-section, #order-details-section,#login-section,#signup-section').css({
        display:'none'
    })
    console.log('Customer-Page')
    setLastActiveSection('customer-section');
});
$('#nav-item').on('click', ()=>{
    $('#item-section').css({
        display:'block'
    })
    $('#customer-section ,#main-section, #place-order-section, #order-details-section,#login-section,#signup-section').css({
        display:'none'
    })
    console.log('Item-Page')
    setLastActiveSection('item-section');
});
$('#nav-order').on('click', ()=> {
    $('#place-order-section').css({
        display: 'block'
    })
    $('#item-section ,#customer-section , #main-section, #order-details-section,#login-section,#signup-section').css({
        display: 'none'
    })
    console.log('Order-Page')
    setLastActiveSection('place-order-section');
});
$('#nav-order-details').on('click', ()=>{
    $('#order-details-section').css({
        display:'block'
    })
    $('#item-section ,#customer-section , #main-section , #place-order-section,#login-section,#signup-section').css({
        display:'none'
    })
    console.log('Order-Details-Page')
    setLastActiveSection('order-details-section');
})
$('#btnConfirmLogout').on('click', ()=>{
    $('#login-section').css({
        display:'block'
    })
    $('#item-section ,#customer-section , #main-section , #place-order-section,#order-details-section,#navbar').css({
        display:'none'
    })
})



