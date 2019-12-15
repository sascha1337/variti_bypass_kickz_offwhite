// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })

const puppeteer = require('puppeteer-extra')
const pluginStealth = require("puppeteer-extra-plugin-stealth")
puppeteer.use(pluginStealth())

const fs = require('fs');
const { promisify } = require('util');
const request = require('request');
const cheerio = require('cheerio');
const async = require("async");
const mkDirAsync = promisify(fs.mkdir);

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
    // page.navigate("https://www.off---white.com/")
})

// Run the server!
const start = async () => {
  try {
    instance = await bootup(null, true);
    await fastify.listen(1337)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}      

start()

function bootup(profilename, headless){
  return new Promise(async (resolve, reject) => {
      
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
          // '--user-agent="WHAT"'
      ];

    //   const ext = __dirname + '/uBlock0.chromium';
  
    const options = {
        args,
        headless: headless,
        defaultViewport: null,
        ignoreHTTPSErrors: true,
        //   args: [`--disable-extensions-except=${ext}`, 
        //     `--load-extension=${ext}`, 
        //     // `--proxy-server=http://127.0.0.1:1337`
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
        //   const preloadFile = fs.readFileSync(__dirname + '/preload.js', 'utf8');
        //   await page.evaluateOnNewDocument(preloadFile);
        resolve(page);
    });
}

module.exports.bootup = bootup;
module.exports.createPage = createPage;