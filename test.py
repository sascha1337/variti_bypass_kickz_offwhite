import requests

headers = {
    'pragma': 'no-cache',
    'cache-control': 'no-cache',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36',
    'sec-fetch-user': '?1',
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
    'sec-fetch-site': 'none',
    'sec-fetch-mode': 'navigate',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'en,en-GB;q=0.9,en-US;q=0.8,de;q=0.7',
    # 'cookie': 'bm_sz=4263EF387BEA97E8BC06E4A54D433C68~YAAQbmzTF6+bGLduAQAAtfSF6AabrUl9xYew90yfix04EneYkEGNTW5hTcxnMr1vtrm8juk4VYJMaQkEWXb2iqzsa7AHsUQ1AI+zmAz/9AYAhZQPLiJwd1sQES9qjbf/K+txPk7C4nXR6qV5MWE5QwNykox0uysfqDJApswOTsUDYHFR1bCsIAF/LUZiPP0=; _abck=5D93150DADA2C95B24470411DAB71199~0~YAAQbmzTF/6bGLduAQAAKBaG6AM8zT+CHD6eY4pAgL/ebwOTKYSBhgLCIPDfRCs1JguFHjia82gbi/DMc27xSXog/N9Z5P6BHf6CRDWUdM0qRddeMYPqzPGlDYji1wgTn32YSrVK/VPTMxV/9fsWD2h+9nzRt6qdQZzVoWcCL7YCmYdoAP/5QMoc2lmfY0pcfcuIN5MLvJnvv02T3MRWw9CFDZhiVAau893PQyTHrecEuuhSz5pxkyCQt98PWeVVd3nEvq04JwXU4itH2Ab44ZlgdfKCCofmrkA/Y61EJJ7DEI0+2H8tcV0JBlBEwKTp2Fx2ND1E~-1~||1-GmehOvMKuK-5000-100-3000-2~-1; kickz_visited=true; _Context=de; CS_CONTEXT=de; _basket_visited=true; SHOP_ACTION=checkout-input; _user_last_search_url="https://www.kickz.com/de/fulltext/nike+air+more+uptempo+se/c?ext=true&pcvid=2226221"; USER_LAST_VISITED_PRODUCTS=159625001%3A1%7C159624001%3A1; minibasketContent=14%2F1575865271970%2FA0A81A0EB843B36D119302EB8074F04D.tomcat-9000%2F13354565+13354556; JSESSIONID=35EC5B2C7F214A75626DBB069C3C9348.tomcat-9000; _catalog_entry_url="http://www.kickz.com/de/"; _URLbefore=%2Fde%2F; ak_bmsc=A0CEADC3F04147B40CDF3AEC665A333E76619EDC754C0000D1E3ED5DBC0CBB53~plnbHSytW8wPlMDH5FPPK1TpcYEh+s05BZ7PPb/2jW7cAvpONLv/dy8d1x5sTQ5ApJ9/vlY3u33mnUgEsTPuQgSKhIJHkg2biNkeEnoQf/VKGuqX1WKn19icmX/zHKfhXRScQvrx6uPRDdLrhYp5qDldwmP9/RDXCY82lXQ9u+eUlb1b2OkdpDyl8SpMi4VxOwYRB0LH+6jL0UW1Pyr/I9ILa1SDnBKvWEmzoeZXusz5Y=',
}

response = requests.get('https://www.off---white.com', headers=headers)

print(response.content)