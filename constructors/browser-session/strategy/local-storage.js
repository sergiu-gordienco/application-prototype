/* jshint -W002 */

// setItem(key, value)   promise()
// removeItem(key)       promise()
// getItem(key)          promise()
// filter(?function)     promise({
//   target: {
//     result: {
//       k: key,
//       v: value
//     }
//   }
// })
// initialization ..     promise(event)}
module.exports  = function (storage) {
  var storage = storage || localStorage || ((function () {
    console.warn("localStorage not supported, fallback to polyfill emulation");
    var store = {};
    var methods = {};
    methods.getItem = function (k, v) {
      return store[k + ""];
    };
    methods.setItem = function (k, v) {
      store[k + ""] = v + "";
    };
    methods.removeItem = function (k) {
      if ((k + "") in store) {
        delete store[k + ""];
      }
    };
    methods.items = function () {
      return store;
    };
    return methods;
  })());
  var prefix  = '@$';
  var evtGrp  = function (data, key) {
    return {
      target : {
        result : data,
        source : {
          keyPath : key
        }
      }
    };
  };
  return {
    setItem : function (key, value) {
      return new Application.Promise(function (resolve, reject) {
        var er, data;
        try {
          storage.setItem(prefix + key, JSON.stringify(value));
          data = JSON.parse(storage.getItem(prefix + key));
        } catch (er) {}
        if (er) {
          reject(er);
        } else {
          resolve(evtGrp(key, key));
        }
      });
    },
    removeItem : function (key) {
      return new Application.Promise(function (resolve, reject) {
        var er, data;
        try {
          storage.removeItem(prefix + key, value);
        } catch (er) {}
        if (er) {
          reject(er);
        } else {
          resolve(evtGrp(key, key));
        }
      });
    },
    getItem : function (key) {
      return new Application.Promise(function (resolve, reject) {
        var er, data;
        try {
          data = JSON.parse(storage.getItem(prefix + key));
        } catch (er) {}
        if (er) {
          reject(er);
        } else {
          resolve(
            evtGrp(
              ( typeof(data) !== undefined || data !== null ) ? {
                k : key,
                v : data
              } : data
            ),
            key
          );
        }
      });
    },
    filter : function (filter) {
      var data = [];
      var key, k, v, prefixLength = prefix.length;
      var er;
      var items = storage;
      if (typeof(items.items) === "function") {
        items = items.items();
      }
      for (key in items) {
        if (key.substr(0, prefixLength) === prefix) {
          try {
            k = key.substr(prefixLength);
            v = JSON.parse(items[key]);
            if (filter(k, v)) {
              data.push({
                k : k,
                v : v
              });
            }
          } catch (er) {
            console.warn(er);
          }
        }
      }
      return new Application.Promise.resolve(evtGrp(data));
    },
    initialization : new Application.Promise.resolve({
      target: {
        result: "success"
      }
    })
  };
};
