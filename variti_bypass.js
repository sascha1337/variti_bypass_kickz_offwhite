// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })

const puppeteer = require('puppeteer-extra')
const pluginStealth = require("puppeteer-extra-plugin-stealth")
puppeteer.use(pluginStealth())

const NodeRSA = require('node-rsa');
const fs = require('fs');
const { promisify } = require('util');
const request = require('request');
const cheerio = require('cheerio');

const async = require("async");
const mkDirAsync = promisify(fs.mkdir);
const jsenc = require("./jsencrypt");
const crypto = require("crypto");


var instance;

// Declare a route
fastify.get('/', async (request, reply) => {
  return { hello: 'puppy' }
})

fastify.post('/fingerprint', async (request, reply) => {
    
    var html = request.body.html;

    html = html.replace("var ipp", "var done=false;var cookiez=[];var ipp");
    html = html.replace(/document\.cookie=/gi, "cookiez.push(");
    html = html.replace(/;";/gi, ';");')
    html = html.replace("location.href=", "done=");
    
    var page = await createPage(instance);
    await page.setBypassCSP(true);
    await page.setContent(html);
    
    await page.waitForFunction(() => {
        return done;
    });

    const cookies = await page.evaluate(() => { return cookiez });
    console.log(cookies);
    
    page.close();
    return cookies;
    
})

// Run the server!
const start = async () => {
  try {
    instance = await bootup(null, false);
    var page = await createPage(instance);
    
    await page.setRequestInterception(true);

    page.on('request', interceptedRequest => {
        // console.log(interceptedRequest.postData());

        if (interceptedRequest.url().includes('.png') || interceptedRequest.url().includes('.jpg') || interceptedRequest.url().includes('.css') || interceptedRequest.url().includes('.mp4')  || interceptedRequest.url().includes('.woff') || interceptedRequest.url().includes('net2b') || interceptedRequest.url().includes('font') || interceptedRequest.url().includes('analytics') || interceptedRequest.resourceType() === 'image')
            interceptedRequest.abort();
        else{
            // console.log("NOT INTERCEPTED -> ", interceptedRequest.resourceType());
            
            interceptedRequest.continue();

        }
    });
    
    await page.goto("https://www.off---white.com/");

    page.evaluate(() => {
        var JSEncrypt = function(){
            console.log("yolo");
        };
        md5 = function(){
            return "1337";
        }
    });
    
    // await page.exposeFunction('JSEncrypt', text => {
    //     console.log("*'`**'''*' MASUKKKKKKK *'*'*");
    //     return crypto.createHash('md5').update(text).digest('hex')
    // });
    await page.waitFor("#footer");

    
    console.log("im here ya !");

    const cartresult = await page.evaluate(async () => {
        // const delay = ms => new Promise(res => setTimeout(res, ms));
        var resp1 = await fetch("https://www.off---white.com/en/US/orders/populate.json", {"credentials":"include","headers":{"accept":"application/json, text/javascript, */*; q=0.01","accept-language":"en-GB,en-US;q=0.9,en;q=0.8","cache-control":"no-cache","content-type":"application/json; charset=UTF-8","pragma":"no-cache","sec-fetch-mode":"cors","sec-fetch-site":"same-origin","x-requested-with":"XMLHttpRequest"},"referrer":"https://www.off---white.com/en/US/men/products/omia085r20c210501010","referrerPolicy":"no-referrer-when-downgrade","body":"{\"variant_id\":117062, \"quantity\":1, \"options\":null}","method":"POST","mode":"cors"});

        return await resp1.json();

    });

    console.log(cartresult);

    await page.waitFor(500);

    const reg = await page.evaluate(async(email) => {
        
        var resp2 = await fetch("https://www.off---white.com/en/US/checkout/registration", {"credentials":"include","headers":{"accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9","accept-language":"en-GB,en-US;q=0.9,en;q=0.8","cache-control":"no-cache","content-type":"application/x-www-form-urlencoded","pragma":"no-cache","sec-fetch-mode":"navigate","sec-fetch-site":"same-origin","sec-fetch-user":"?1","upgrade-insecure-requests":"1"},"referrer":"https://www.off---white.com/en/US/checkout/registration","referrerPolicy":"no-referrer-when-downgrade","body":"utf8=%E2%9C%93&_method=put&authenticity_token=&order%5Bemail%5D=" + email + "&commit=Continue","method":"POST","mode":"cors"});
        
        return await resp2.text();
        
    }, "NONI%401337.com")

    console.log("reg", reg.length);

    await page.waitFor(500);
    
    const shipping_page = await page.evaluate(async() => {
        
        var resp3 = await fetch("https://www.off---white.com/en/US/checkout/update/address", {"credentials":"include","headers":{"accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9","accept-language":"en-GB,en-US;q=0.9,en;q=0.8","cache-control":"no-cache","content-type":"application/x-www-form-urlencoded","pragma":"no-cache","sec-fetch-mode":"navigate","sec-fetch-site":"same-origin","sec-fetch-user":"?1","upgrade-insecure-requests":"1"},"referrer":"https://www.off---white.com/en/US/checkout/address","referrerPolicy":"no-referrer-when-downgrade","body":"utf8=%E2%9C%93&_method=patch&authenticity_token=&order%5Bemail%5D=NONI%401337.com&order%5Bstate_lock_version%5D=0&order%5Bbill_address_attributes%5D%5Bfirstname%5D=Hans&order%5Bbill_address_attributes%5D%5Blastname%5D=Peter&order%5Bbill_address_attributes%5D%5Baddress1%5D=Brotweg+12&order%5Bbill_address_attributes%5D%5Baddress2%5D=&order%5Bbill_address_attributes%5D%5Bcity%5D=Alabama&order%5Bbill_address_attributes%5D%5Bcountry_id%5D=49&order%5Bbill_address_attributes%5D%5Bstate_id%5D=78&order%5Bbill_address_attributes%5D%5Bzipcode%5D=51234&order%5Bbill_address_attributes%5D%5Bphone%5D=158823848234&order%5Bbill_address_attributes%5D%5Bhs_fiscal_code%5D=&order%5Buse_billing%5D=1&order%5Bship_address_attributes%5D%5Bstate_id%5D=&commit=Save+and+Continue","method":"POST","mode":"cors"});

        return await resp3.text();
    })

    var $ = cheerio.load(shipping_page);
    
    var selected_shipping_rate_id = $("#methods > div > ul > li > div > input").val();
    var shipment_id = $("#methods > input[type=hidden]").val();

    console.log("selected_shipping_rate_id", selected_shipping_rate_id, "shipment_id", shipment_id);
    
    await page.waitFor(500);

    const delivery = await page.evaluate(async(data) => {

        var deliveryFetch = await fetch("https://www.off---white.com/en/US/checkout/update/delivery", {"credentials":"include","headers":{"accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9","accept-language":"en-GB,en-US;q=0.9,en;q=0.8","cache-control":"max-age=0","content-type":"application/x-www-form-urlencoded","sec-fetch-mode":"navigate","sec-fetch-site":"same-origin","sec-fetch-user":"?1","upgrade-insecure-requests":"1"},"referrer":"https://www.off---white.com/en/US/checkout/delivery","referrerPolicy":"no-referrer-when-downgrade","body":"utf8=%E2%9C%93&_method=patch&authenticity_token=&order%5Bstate_lock_version%5D=1&order%5Bshipments_attributes%5D%5B0%5D%5Bselected_shipping_rate_id%5D=" + data.selected_shipping_rate_id + "&order%5Bshipments_attributes%5D%5B0%5D%5Bid%5D=" + data.shipment_id + "&commit=Proceed","method":"POST","mode":"cors"});

        var deliveryResult = await deliveryFetch.text();

        if(deliveryFetch.url.includes("checkout/payment")){
            
            console.log("IM AT PAYMENT; NOT BROKEN!!!!!");
            console.log("IM AT PAYMENT; NOT BROKEN!!!!!");
            console.log("IM AT PAYMENT; NOT BROKEN!!!!!");
            console.log("IM AT PAYMENT; NOT BROKEN!!!!!");

        }

        console.log("deliveryFetch", deliveryFetch);

        return await fetch("https://www.off---white.com/en/US/checkout/payment/get_token.json", {"credentials":"include","headers":{"accept":"application/json, text/javascript, */*; q=0.01","accept-language":"en-GB,en-US;q=0.9,en;q=0.8","content-type":"application/x-www-form-urlencoded; charset=UTF-8","sec-fetch-mode":"cors","sec-fetch-site":"same-origin","x-requested-with":"XMLHttpRequest"},"referrer":"https://www.off---white.com/en/US/checkout/payment","referrerPolicy":"no-referrer-when-downgrade","body":"transaction=R1514442045&amount=188.0&beacon_session_id=ff329bf5-0f063d34-be5f809c-3c99db1b-13467b23-f94453ad","method":"POST","mode":"cors"});
        
    }, { selected_shipping_rate_id,shipment_id });

    

    // var carty = await fetch("https://www.off---white.com/en/US/orders/populate.json", {"credentials":"include","headers":{"accept":"application/json, text/javascript, */*; q=0.01","accept-language":"en-GB,en-US;q=0.9,en;q=0.8","cache-control":"no-cache","content-type":"application/json; charset=UTF-8","pragma":"no-cache","sec-fetch-mode":"cors","sec-fetch-site":"same-origin","x-requested-with":"XMLHttpRequest"},"referrer":"https://www.off---white.com/en/US/men/products/omia085r20c210501010","referrerPolicy":"no-referrer-when-downgrade","body":"{\"variant_id\":117062, \"quantity\":1, \"options\":null}","method":"POST","mode":"cors"});

    // var addr = await fetch("https://www.off---white.com/en/US/cart", {"credentials":"include","headers":{"accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9","accept-language":"en-GB,en-US;q=0.9,en;q=0.8","cache-control":"no-cache","content-type":"application/x-www-form-urlencoded","pragma":"no-cache","sec-fetch-mode":"navigate","sec-fetch-site":"same-origin","sec-fetch-user":"?1","upgrade-insecure-requests":"1"},"referrer":"https://www.off---white.com/en/US/cart","referrerPolicy":"no-referrer-when-downgrade","body":"utf8=%E2%9C%93&_method=patch&authenticity_token=&order%5Bline_items_attributes%5D%5B0%5D%5Bquantity%5D=1&order%5Bline_items_attributes%5D%5B0%5D%5Bid%5D=3753102&order%5Bcoupon_code%5D=&privacy_policy=on&checkout=","method":"POST","mode":"cors"});

    // var pump = await fetch("https://www.off---white.com/en/US/checkout/registration", {"credentials":"include","headers":{"accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9","accept-language":"en-GB,en-US;q=0.9,en;q=0.8","cache-control":"no-cache","content-type":"application/x-www-form-urlencoded","pragma":"no-cache","sec-fetch-mode":"navigate","sec-fetch-site":"same-origin","sec-fetch-user":"?1","upgrade-insecure-requests":"1"},"referrer":"https://www.off---white.com/en/US/checkout/registration","referrerPolicy":"no-referrer-when-downgrade","body":"utf8=%E2%9C%93&_method=put&authenticity_token=&order%5Bemail%5D=NONI%401337.com&commit=Continue","method":"POST","mode":"cors"});

    // var dodo = await fetch("https://www.off---white.com/en/US/checkout/update/address", {"credentials":"include","headers":{"accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9","accept-language":"en-GB,en-US;q=0.9,en;q=0.8","cache-control":"no-cache","content-type":"application/x-www-form-urlencoded","pragma":"no-cache","sec-fetch-mode":"navigate","sec-fetch-site":"same-origin","sec-fetch-user":"?1","upgrade-insecure-requests":"1"},"referrer":"https://www.off---white.com/en/US/checkout/address","referrerPolicy":"no-referrer-when-downgrade","body":"utf8=%E2%9C%93&_method=patch&authenticity_token=&order%5Bemail%5D=NONI%401337.com&order%5Bstate_lock_version%5D=0&order%5Bbill_address_attributes%5D%5Bfirstname%5D=Hans&order%5Bbill_address_attributes%5D%5Blastname%5D=Peter&order%5Bbill_address_attributes%5D%5Baddress1%5D=Brotweg+12&order%5Bbill_address_attributes%5D%5Baddress2%5D=&order%5Bbill_address_attributes%5D%5Bcity%5D=Alabama&order%5Bbill_address_attributes%5D%5Bcountry_id%5D=49&order%5Bbill_address_attributes%5D%5Bstate_id%5D=78&order%5Bbill_address_attributes%5D%5Bzipcode%5D=51234&order%5Bbill_address_attributes%5D%5Bphone%5D=158823848234&order%5Bbill_address_attributes%5D%5Bhs_fiscal_code%5D=&order%5Buse_billing%5D=1&order%5Bship_address_attributes%5D%5Bstate_id%5D=&commit=Save+and+Continue","method":"POST","mode":"cors"});

    // https://www.off---white.com/en/US/checkout
    
    // await fastify.listen(1337)
    // fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    console.log(err.toString());
    // fastify.log.error(err)
    // process.exit(1)
  }

  
}      

start()

function bootup(profilename, headless){
  return new Promise(async (resolve, reject) => {
    
    const proxyChain = require('proxy-chain');

    // proxy = "http://0XrbkMvX!a139:pas3PdIF@snkrs-us-S36.chicooked.io:33128"
    // var proxy = "http://1QOGEhfR!a16:pas1ZEvp@snkrs-us-S59.chicooked.io:33128";

    const oldProxyUrl = 'http://1QOGEhfR!a16:pas1ZEvp@snkrs-us-S59.chicooked.io:33128';
    const newProxyUrl = await proxyChain.anonymizeProxy(oldProxyUrl);

    const ext = __dirname + '/uBlock0.chromium';
    
    const args = [
        // '--cryptauth-http-host ""',
        '--disable-accelerated-2d-canvas',
        '--disable-background-networking',
        '--disable-background-timer-throttling',
        '--disable-browser-side-navigation',
        '--disable-client-side-phishing-detection',
        '--disable-default-apps',
        '--disable-dev-shm-usage',
        '--disable-device-discovery-notifications',
        '--disable-extensions',
        '--disable-features=site-per-process',
        '--disable-hang-monitor',
        '--disable-java',
        '--disable-popup-blocking',
        '--disable-prompt-on-repost',
        '--disable-setuid-sandbox',
        '--disable-sync',
        '--disable-translate',
        '--disable-web-security',
        '--disable-webgl',
        '--metrics-recording-only',
        '--no-first-run',
        '--safebrowsing-disable-auto-update',
        '--no-sandbox',
        '--enable-automation',
        '--password-store=basic',
        '--use-mock-keychain',
        '--disable-infobars',
        '--window-position=0,0',
        '--ignore-certifcate-errors',
        '--ignore-certifcate-errors-spki-list',
        '--auto-open-devtools-for-tabs',
        `--proxy-server=${newProxyUrl}`,
        `--disable-extensions-except=${ext}`, 
        `--load-extension=${ext}`, 
        // '--user-agent="WHAT"'
    ];

  
    const options = {
        args,
        headless: headless,
        defaultViewport: null,
        ignoreHTTPSErrors: true,
        //   args: [
        //     // 
        //   ],
        // slowMo: 10,
        // userDataDir: __dirname + '/profiles/' + profilename
    };
    
    if(profilename){
        options.userDataDir = __dirname + '/profiles/' + profilename;
    }
    
    const browser = await puppeteer.launch(options);
    resolve(browser);
    
  });
}

function createPage(browser) {
    return new Promise(async(resolve, reject) => {
        const page = await browser.newPage();
        // TO OVERWRITE FINGERPRINT ;-)
        
        const preloadFile = fs.readFileSync(__dirname + '/preload.js', 'utf8');
        await page.evaluateOnNewDocument(preloadFile);
        resolve(page);
    });
}

module.exports.bootup = bootup;
module.exports.createPage = createPage;