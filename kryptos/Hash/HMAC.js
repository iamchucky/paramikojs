if (window.Components) { // Mozilla
  kryptos.hash.HMAC = function(key, msg, digestmod) {
    var hasher = window.Components.classes["@mozilla.org/security/hmac;1"].createInstance(window.Components.interfaces.nsICryptoHMAC);
    var keyObject = window.Components.classes["@mozilla.org/security/keyobjectfactory;1"]
                      .getService(window.Components.interfaces.nsIKeyObjectFactory)
                      .keyFromString(window.Components.interfaces.nsIKeyObject.HMAC, key);
    
    hasher.init(digestmod, keyObject);
    var data = kryptos.toByteArray(msg);
    hasher.update(data, data.length);
    return hasher.finish(false);
  };

  kryptos.hash.HMAC_SHA = window.Components.classes["@mozilla.org/security/hmac;1"].createInstance(window.Components.interfaces.nsICryptoHMAC).SHA1;
  kryptos.hash.HMAC_MD5 = window.Components.classes["@mozilla.org/security/hmac;1"].createInstance(window.Components.interfaces.nsICryptoHMAC).MD5;
} else {  // Chrome
  kryptos.hash.HMAC = function(key, msg, digestmod) {
    var blocksize = 64;
    var ipad = 0x36;
    var opad = 0x5C;

    var hasher = digestmod == 3 ? kryptos.hash.SHA : kryptos.hash.MD5;

    var outer = new hasher();
    var inner = new hasher();

    if (key.length > blocksize) {
      key = new hasher(key).digest();
    }

    key = key + new Array(blocksize - key.length + 1).join('\x00');

    var okey = kryptos.toByteArray(key).slice(0);
    var ikey = kryptos.toByteArray(key).slice(0);

    for (var x = 0; x < blocksize; ++x) {
      okey[x] ^= opad;
      ikey[x] ^= ipad;
    }

    outer.update(okey);
    inner.update(ikey);
    inner.update(msg);
    outer.update(inner.digest());
    return outer.digest();
  };
  kryptos.hash.HMAC_SHA = 3;
  kryptos.hash.HMAC_MD5 = 2;
}
