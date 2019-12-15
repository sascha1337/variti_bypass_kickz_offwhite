// const request = require('request');
const http = require('http');
const cheerio = require('cheerio');
const util = require('util');
const request = util.promisify(require('request'));
const requestBiasa = require('request');
const querystring = require('querystring');
const crypto = require("crypto");
const fs = require("fs");
const tough = require('tough-cookie');

http.globalAgent.keepAlive = true;
var cookieJar = request.jar();

function wait(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}
  
// var proxy = "http://admin:HYy2endw@134.202.29.45:3128";
// proxy = "http://0XrbkMvX!a139:pas3PdIF@snkrs-us-S36.chicooked.io:33128"

// var proxy = "http://1QOGEhfR!a16:pas1ZEvp@snkrs-us-S59.chicooked.io:33128";
var proxy = "http://1QEFRipC!a26:pas0wkOT@snkrs-us-S42.chicooked.io:33128";
// proxy = null;

var debug = false;

var defaultHeaders = {
    // 'authority': 'www.kickz.com',
    'pragma': 'no-cache',
    'User-Agent': 'Ubuntu Chromium/34.0.1847.116 Chrome/34.0.1847.116 Safari/537.36',
    'Cache-Control': 'private',
    'Accept': 'application/xml,application/xhtml+xml,text/html;q=0.9, text/plain;q=0.8,image/png,*/*;q=0.5',
    // 'upgrade-insecure-requests': '1',
    // 'sec-fetch-user': '?1',
    // 'sec-fetch-site': 'none',
    // 'sec-fetch-mode': 'navigate',
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
    if (response.statusCode !== 200) return {"error": response.statusCode};
    console.log((response.body));
    console.log(response.statusCode);
    var $ = cheerio.load(response.body);

    var form = $(".product-cart-form").html();
    console.log(form);
    
    // var ttoken = $("#ttoken").val();

    return form;

}


var cloudscraper = require('request-promise');
// cloudscraper.debug = true;

function caseless (headers) {
    const result = {};
  
    Object.keys(headers).forEach(key => {
      result[key.toLowerCase()] = headers[key];
    });
  
    return result;
}

  
runner = async () => {
    
    const productUrl = "https://www.off---white.com/en/US/section/new-arrivals";
//     const cookieText = 'rerf=AAAAAF3jJbFecmAkAw+PAg==; ipp_uid2=fvKmj8Ta7susMebE/Y9Ww15D8UIBd4tuCWW2nGA==; ipp_uid1=1575167416205; ipp_uid=1575167416205/fvKmj8Ta7susMebE/Y9Ww15D8UIBd4tuCWW2nGA==; __cfduid=db8b2e1d1bf7842b1b0cfff7a2f7fa6671575167432; __ssds=2; __ssuzjsr2=a9be0cd8e; __uzmaj2=f7fd4b1f-a289-403f-9a53-44ca140cf5c4; __uzmbj2=1575167442; dtCookie=-8$PCB4V9LOJ152AQOKRDPV3EA3NQVQHBTD; rxVisitor=1575167444631ICJLI1UBMVGMFEUKQQDOUFOLOPR4N68K; __uzma=5422594073179740236; __uzmb=1575167458; guest_token=Ims4a3B3aGFFZHczNkQyY2lTX3F1elEi--2d9fb81e172fd7712fe825916aa801c4e35af6cc; dismiss_cookie_law=true; _ga=GA1.2.826948325.1575167541; _fbp=fb.1.1575167545999.598616805; __riskifiedBeaconSessionId=cb2604f9-d0649571-ae97bb6b-e4b20134-ff54f56a-ec53f9ef; rskxRunCookie=0; rCookie=i77xo2m4lzd0xps61nsd0fnk3me3bdn; ipp_sign=61c915a3d5d50dd4f5530f3609c9b5c8_750330284_97642a4276ac2789d2d5890e97b7f1a6; __uzmcj2=123573178556; __uzmdj2=1575167962; dtLatC=19; _pk_id.5.88b1=1b521cfd6ecf4eed.1575167548.1.1575167964.1575167548.; lastRskxRun=1575167966638; dtPC=-8$167963571_297h-vTONBZPTTWFDBMSSUZNYTHJNFVWZWXPXK; dtSa=true%7CKD%7C-1%7CContinue%20shopping%7C-%7C1575167998428%7C167963571_297%7Chttps%3A%2F%2Fwww.off---white.com%2Fen%2FUS%2Fcart%7CBag%20-%20OffWhite%7C1575167972140%7C%7C; rxvt=1575169799353|1575167444640; ipp_key=v1576289733806/v3394bdf9d1cdd8559e305e163aeca6afa04ab3/ES2zz4Hh7BLDDxfP4Atr1g==; __uzmc=8608518474211; __uzmd=1576289932'
    
//     var Cookie = tough.Cookie;
//     var cookie = Cookie.parse(cookieText);
//     console.log(cookie);
// )
//     var ipp_key ="ipp_key=" + "fvKmj8Ta7susMebE/Y9Ww15D8UIBd4tuCWW2nGA==" + "; path=/;";
//     var ipp_uid ="ipp_uid=1576239716652/JLRKTP62aRFNtUg9/8ywPZPkAPDqdTThWGNjR9w==; expires=Tue, 31 Dec 2030 23:59:59 GMT; path=/;";
//     var ipp_uid1="ipp_uid1=1576239716652; expires=Tue, 31 Dec 2030 23:59:59 GMT; path=/;";
//     var ipp_uid2="ipp_uid2=JLRKTP62aRFNtUg9/8ywPZPkAPDqdTThWGNjR9w==; expires=Tue, 31 Dec 2030 23:59:59 GMT; path=/;";
//     var ipp_sign="";
    
//     // const cookie = request.cookie(cookieText);
//     // console.log(cookie);
    
//     cookieJar.setCookie(Cookie.parse(ipp_key), "off---white.com");
//     cookieJar.setCookie(Cookie.parse(ipp_uid), "off---white.com");
//     cookieJar.setCookie(Cookie.parse(ipp_uid1), "off---white.com");
//     cookieJar.setCookie(Cookie.parse(ipp_uid2), "off---white.com");
    
    console.log(cookieJar);
    
    const resp = await cloudscraper.get({
        url: productUrl,  
        resolveWithFullResponse: true, 
        simple:false,
        jar:cookieJar,
        proxy: proxy
    })
    
    if(resp.body.includes("new Fingerprint2")){
        var rndm = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        fs.writeFile( rndm + '.html', resp.body, (err) => {
            // throws an error, you could also catch it here
            if (err) throw err;
            // success case, the file was saved
            console.log('Code saved!');
        });

        const respFlex = await cloudscraper.post({url: "http://127.0.0.1:1337/fingerprint", json: true, body: {html:resp.body}});
        console.log("respFlex",respFlex);
        
        console.log("flagged..");

    }
    else if(resp.body.includes("Internal server error (500C"))
        console.log("server err");
    else console.log(resp.body);

    var $ = cheerio.load(resp.body);
    var form = $(".product-cart-form").html();

    console.log(form);


    // console.log("await viewProductGetToken");
    // const ttoken = await viewProductGetToken(productUrl);
    // console.log(ttoken);

    // await wait(5000);
    // console.log("await viewCart()");
    // const cartHtml = await viewCart();
    // setTimeout(async () => {
    //     console.log("await putInCart");
    //     const cartResponse = await putInCart(productUrl, ttoken);
    //     console.log("await reserveBasket()");
    //     const reserveBasketResult = await reserveBasket();
    //     // console.log("basketResult", reserveBasketResult);
    //     console.log("await putAddress({});");
    //     const putAddrResponse = await putAddress({});
    //     const ccUrl = await getCreditCardUrl();
        
    // },11000)

}

runner()




// cloudscraper.get({
//     url: productUrl,    
//     // headers: caseless({
//     //     Connection: 'keep-alive',
//     //     'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36',
//     //     'Upgrade-Insecure-Requests': '1',
//     //     Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
//     //     'Accept-Language': 'en-US,en;q=0.9',
//     //     'Accept-Encoding': 'gzip, deflate, br'
//     // }),
//     // agentOptions: {
//     //     ciphers: 'TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA384:DHE-RSA-AES256-SHA384:ECDHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA256:HIGH:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!SRP:!CAMELLIA:!ECDHE+SHA:!AES128-SHA'
//     // },    
//     // followAllRedirects: true,
//     // gzip: true,
//     // method: 'GET',
//     // realEncoding: 'utf8',
// //     headers: defaultHeaders,
//     jar:cookieJar,
//     proxy
// //     keepAlive: true,
// //     agentOptions: {
// //     // Removes a few problematic TLSv1.0 ciphers to avoid CAPTCHA
// //     ciphers: crypto.constants.defaultCipherList + ':!ECDHE+SHA:!AES128-SHA'
// //   }