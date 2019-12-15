// const request = require('request');
const http = require('http');
const cheerio = require('cheerio');
const util = require('util');
const request = util.promisify(require('request'));
const requestBiasa = require('request');
const querystring = require('querystring');

http.globalAgent.keepAlive = true;
var cookieJar = request.jar();

function wait(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}
  
// var proxy = "http://admin:HYy2endw@134.202.29.45:3128";
// proxy = "http://0XrbkMvX!a139:pas3PdIF@snkrs-us-S36.chicooked.io:33128"

var proxy = "http://1QOGEhfR!a16:pas1ZEvp@snkrs-us-S59.chicooked.io:33128";
// proxy = null;

var debug = false;

var defaultHeaders = {
    'authority': 'www.kickz.com',
    'pragma': 'no-cache',
    'cache-control': 'no-cache',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36',
    'sec-fetch-user': '?1',
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
    'sec-fetch-site': 'none',
    'sec-fetch-mode': 'navigate',
    'accept-encoding': 'br',
    'accept-language': 'en,en-GB;q=0.9,en-US;q=0.8,de;q=0.7',
    'Connection': 'keep-alive'
};


viewProductGetToken = async (url) => {
    
    var optionsProductReq = {
        url: url,
        headers: defaultHeaders,
        jar:cookieJar,
        keepAlive: true,
        gzip: true,
        proxy: proxy,
    };
        
    const response = await request(optionsProductReq)
    console.log("hi");
    if (response.statusCode !== 200) return {"error": response.statusCode};
    // console.log((body));
    // console.log(response.statusCode);
    var $ = cheerio.load(response.body);

    var form = $("#addToCardAjaxForm").html();
    console.log(form);
    
    var ttoken = $("#ttoken").val();

    return ttoken;

}

viewCart = async() => {

    var optionsViewCart = {
        url: 'https://www.kickz.com/de/cart',
        headers: defaultHeaders,
        jar:cookieJar,
        keepAlive: true,
        gzip: true,
        proxy: proxy,
    };

    const response3 = await request(optionsViewCart);
    // console.log(response3.body);

    $ = cheerio.load(response3.body);
    var carty = $('.centerView').html();
    
    return carty;
}

putInCart = async (url, ttoken) => {
    // console.log(url,ttoken, cookieJar);
    
    var headersCart = {
        'authority': 'www.kickz.com',
        'pragma': 'no-cache',
        'cache-control': 'no-cache',
        'accept': 'application/json, text/javascript, */*; q=0.01',
        'origin': 'https://www.kickz.com',
        // 'x-requested-with': 'XMLHttpRequest',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/538.36',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        // 'sec-fetch-site': 'same-origin',
        // 'sec-fetch-mode': 'cors',
        'referer': url,
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en,en-GB;q=0.9,en-US;q=0.8,de;q=0.7',
        'Connection': 'keep-alive'
    };

    var dataStringCart = 'productVariantIdAjax=13469053&ttoken=' + ttoken;

    var optionsCartReq = {
        url: 'https://www.kickz.com/de/cart/ajaxAdd',
        method: 'POST',
        jar:cookieJar,
        keepAlive: true,
        gzip: true,
        proxy: proxy,
        headers: headersCart,
        body: dataStringCart
    };

    // console.log(optionsCartReq);
    
    const req = await request(optionsCartReq); 
    // (e,r,b) => {
    // console.log(e);
    console.log("response2.body", req.body, '\n-------------------');
    return JSON.parse(req.body);
    
    // })
    
    // req.on('socket', function (socket) {
    //     console.log("========\nRequest\n========")
    //     console.log(JSON.stringify(socket._pendingData, null, 3));
    //     console.log("========\nResponse\n========");
    //     // socket.on('data', function (data) { console.log(data.toString()); });
    // });
    
}

reserveBasket = async() => {
    var reserved = false;
    while(!reserved){

        var headersReserveBasket = {
            'authority': 'www.kickz.com',
            'pragma': 'no-cache',
            'cache-control': 'no-cache',
            'accept': 'application/json, text/javascript, */*; q=0.01',
            'x-requested-with': 'XMLHttpRequest',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-mode': 'cors',
            'referer': 'https://www.kickz.com/de/cart',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en,en-GB;q=0.9,en-US;q=0.8,de;q=0.7',
            'Connection': 'keep-alive'
        };
        
        var optionsReserveBasket = {
            url: 'https://www.kickz.com/de/checkout/reserveBasketItemsAjax/timestamp/' + Number(new Date()),
            headers: headersReserveBasket,
            jar:cookieJar,
            keepAlive: true,
            gzip: true,
            proxy: proxy,
        };
        
        // request(options, callback);
    
        const response4 = await request(optionsReserveBasket);
        // console.log("response4.body", response4.body, "-########################")
        var obj = JSON.parse(response4.body);

        if(obj.state == 'RESERVED') {
            reserved = true;
            return obj;
        }else{
            console.log("...reserver");
            reserved = false;
        }
    }

}

putAddress = async(profile) => {

    var headersAddressCheckout = {
        'authority': 'www.kickz.com',
        'pragma': 'no-cache',
        'cache-control': 'no-cache',
        'accept': 'application/json, text/plain, */*',
        'origin': 'https://www.kickz.com',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36',
        'content-type': 'application/x-www-form-urlencoded',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-mode': 'cors',
        'referer': 'https://www.kickz.com/de/checkout/login_offer',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en,en-GB;q=0.9,en-US;q=0.8,de;q=0.7',
        'Connection': 'keep-alive',
    };

    var checkoutObj = {
        "addressSupport.hintDeliveryAddressSelected": "true",
        "addressSupport.hintInvoiceAddressSelected": "true",
        "wizard.invoiceAddress.additionalAddressInfo": "",
        "wizard.invoiceAddress.city": "Bonn",
        "wizard.invoiceAddress.companyName": "",
        "wizard.invoiceAddress.countryIsoCode": "de",
        "wizard.invoiceAddress.county": "",
        "wizard.invoiceAddress.doorCode": "",
        "wizard.invoiceAddress.email": "dasdasd@asdasd.com",
        "wizard.invoiceAddress.firstName": "Jens",
        "wizard.invoiceAddress.houseNumber": "17",
        "wizard.invoiceAddress.lastName": "Bauer",
        "wizard.invoiceAddress.phone": "",
        "wizard.invoiceAddress.salutationId": "MR",
        "wizard.invoiceAddress.state": "",
        "wizard.invoiceAddress.street": "Rabenweg",
        "wizard.invoiceAddress.zip": "53119",
        "wizardOrder.differentDeliveryAddress": "false"
    }

    const checkoutStr = querystring.stringify(checkoutObj)
    
    // var dataString = 'addressSupport.hintDeliveryAddressSelected=true&addressSupport.hintInvoiceAddressSelected=true&wizard.invoiceAddress.additionalAddressInfo=&wizard.invoiceAddress.city=Sankt%20Augustin&wizard.invoiceAddress.companyName=&wizard.invoiceAddress.countryIsoCode=de&wizard.invoiceAddress.county=&wizard.invoiceAddress.doorCode=&wizard.invoiceAddress.email=dasdasd%40asdasd.com&wizard.invoiceAddress.firstName=Jens&wizard.invoiceAddress.houseNumber=17&wizard.invoiceAddress.lastName=Bauer&wizard.invoiceAddress.phone=&wizard.invoiceAddress.salutationId=MR&wizard.invoiceAddress.state=&wizard.invoiceAddress.street=Rebenstrasse&wizard.invoiceAddress.zip=53757&wizardOrder.differentDeliveryAddress=false';

    var optionsAddress = {
        url: 'https://www.kickz.com/de/checkout/addresses/method/addressHint',
        method: 'POST',
        headers: headersAddressCheckout,
        body: checkoutStr,
        jar:cookieJar,
        keepAlive: true,
        gzip: true,
        proxy: proxy,
    };

    // const response6 = await request(optionsAddress);

    const response6 = await request(optionsAddress);
    console.log("response6", response6.body.substr(0,70), '\n-------------------');

    return response6.body;
    
}

getCreditCardUrl = async() => {
    var headersCreditCardUrl = {
        'authority': 'www.kickz.com',
        'pragma': 'no-cache',
        'cache-control': 'no-cache',
        'accept': 'application/json, text/plain, */*',
        'origin': 'https://www.kickz.com',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36',
        'content-type': 'application/x-www-form-urlencoded',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-mode': 'cors',
        'referer': 'https://www.kickz.com/de/checkout/paymentSummary',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en,en-GB;q=0.9,en-US;q=0.8,de;q=0.7',
        'Connection': 'keep-alive',
    };

    var computeCreditCardRegistrationUrl = {
        url: 'https://www.kickz.com/de/checkout/computeCreditCardRegistrationUrl/timestamp/' + Number(new Date()),
        method: 'POST',
        headers: headersCreditCardUrl,
        body: 'payWithAlias=false',
        jar:cookieJar,
        keepAlive: true,
        gzip: true,
        proxy: proxy,
    };
    
    const response8 = await request(computeCreditCardRegistrationUrl);
    console.log("computeCreditCardRegistrationUrl", response8.body);
    return JSON.parse(response8.body).redirectUrl;
}

viewCheckout = async() => {

    var headersCheckout = {
        'authority': 'www.kickz.com',
        'pragma': 'no-cache',
        'cache-control': 'no-cache',
        'origin': 'https://www.kickz.com',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-mode': 'cors',
        'referer': 'https://www.kickz.com/de/cart',
        'accept-encoding': 'br',
        'accept-language': 'en,en-GB;q=0.9,en-US;q=0.8,de;q=0.7',
        'Connection': 'keep-alive'
    };
    
    var optionsCheckoutReq = {
        url: 'https://www.kickz.com/de/checkout/login_offer',
        headers: headersCheckout,
        jar:cookieJar,
        keepAlive: true,
        gzip: true,
        proxy: proxy,
        // proxy: "http://admin:HYy2endw@134.202.29.45:3128",
        // proxy: "http://0XrbkMvX!a139:pas3PdIF@snkrs-us-S36.chicooked.io:33128",
    };

    const response5 = await request(optionsCheckoutReq);
    console.log("response5.body",response5.body.substr(0,70), '\n-------------------');
    return response5.body;
}

paymentSummary = async() => {
    var optionsSummary = {
        url: 'https://www.kickz.com/de/checkout/paymentSummary',
        headers: defaultHeaders,
        jar:cookieJar,
        keepAlive: true,
        gzip: true,
        proxy: proxy,
        // proxy: "http://admin:HYy2endw@134.202.29.45:3128",
        // proxy: "http://0XrbkMvX!a139:pas3PdIF@snkrs-us-S36.chicooked.io:33128",
    };

    const response7 = await request(optionsSummary);
    console.log("optionsSummary", response7.body.substr(0,70), '\n-------------------');
    return response7.body;
}

runner = async () => {
    
    const productUrl = "https://www.kickz.com/de/timberland-boots-6-inch-premium-boot-orange-101053649";
    
    console.log("await viewProductGetToken");
    const ttoken = await viewProductGetToken(productUrl);
    console.log(ttoken);

    await wait(5000);
    
    console.log("await viewCart()");
    const cartHtml = await viewCart();

    setTimeout(async () => {
        console.log("await putInCart");
        const cartResponse = await putInCart(productUrl, ttoken);
        console.log("await reserveBasket()");
        const reserveBasketResult = await reserveBasket();
        // console.log("basketResult", reserveBasketResult);
        console.log("await putAddress({});");
        const putAddrResponse = await putAddress({});
        const ccUrl = await getCreditCardUrl();
        
    },11000)


    // if(debug){
    //     req.on('socket', function (socket) {
    //         console.log("========\nRequest\n========")
    //         console.log(JSON.stringify(socket._pendingData, null, 3));
    //         console.log("========\nResponse\n========");
    //         // socket.on('data', function (data) { console.log(data.toString()); });
    //     });
    // }    
    
};


runner();