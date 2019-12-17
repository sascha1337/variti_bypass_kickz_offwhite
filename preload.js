origDescriptor = Object.getOwnPropertyDescriptor(HTMLDocument.prototype, 'cookie');
Object.defineProperty(document, 'cookie', {
  get() {
    return origDescriptor.get.call(this);
  },
  set(value) {
    debugger;
    return origDescriptor.set.call(this, value);
  },
  enumerable: true,
  configurable: true
});

// var JSEncrypt = function(asd){
//     console.log("***##########");
// } 

// var md5 = function(){
//     return "WAT";
// }