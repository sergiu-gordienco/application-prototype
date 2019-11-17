# Browser-Session

Links: [Index](../../README.md)

an alternative for localStorage implemented on IndexDB API with a memory limit approximately **200Mb**.

all values that are saved in **browserSession** **_Object_** are automatically serialized with `JSON.stringify(...)` and unserialized with `JSON.parse(...)`

### installation in Document as a third-party library ( [download module](../../constructors/browser-session.js) )

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Document - browserSession Demo</title>
  <script
    src="./application-prototype/constructors/bowser-session.js"
    type="text/javascript">
  </script>
</head>
<body>

  <script type="text/javascript">
    // use browserSession Object
    console.log(window.browserSession);
    // ...
  </script>

</body>
</html>


```

### installation inside of an application
```js
Application.require("browser-session").then(function (browserSessionBuilder) {
  // work with browserSessionBuilder
  // ...
  // initialization of browserSession in a reference
  var sessionReq = browserSessionBuilder();

  sessionReq.then(function (session) {
    // make session accessible in a application's method
    Application.bind("session", function () {
      return session;
    });
  }, function (err) {
  	console.error(err);
  });

  //... work with App.session() that returns the browserSession Object
}).catch (function (err) {
  console.error(err);
});
```


### installation inside of an application and store session in localStorage
```js
Application.require("browser-session").then(function (browserSessionBuilder) {
  // work with browserSessionBuilder
  // ...
  // initialization of browserSession in a reference
  var sessionReq = browserSessionBuilder('local-storage');

  sessionReq.then(function (session) {
    // make session accessible in a application's method
    Application.bind("session", function () {
      return session;
    });
  }, function (err) {
  	console.error(err);
  });

  //... work with App.session() that returns the browserSession Object
}).catch (function (err) {
  console.error(err);
});
```

---
## browserSession Object
---

### Methods

methods available in **browserSession** **_Object_**

all methods are based on `Promises`,

if the browser will not support `Promises` the Application automatically will implement them.

the methods will work as `Promises` even these are unsupported

---

#### getItem

retrieve an item from **browserSession** **_Object_**

Example:
```js
session.getItem('foo').then(function (value) {
  console.log(value); // item's value
}).catch(function (err) {
  console.error(err);
});
```

#### setItem

set item's value in **browserSession** **_Object_**

Example:
```js
session.setItem('foo', 'bar').then(function (value) {
  console.log("Success, the new value is: ", value);
}).catch(function (err) {
  console.error(err);
});
```

#### getItems

retrieve multiple items from **browserSession** **_Object_**

Example:
```js
session.setItem(['item1', 'item2', 'item3']).then(function (result) {
  console.log("Success, the new value is: ", result);
  // result: {
  //  item1: 'a..',
  //  item2: '...',
  //  item3: ...
  // }
}).catch(function (err) {
  console.error(err);
});
```

#### setItems
set/update multiple items to **browserSession** **_Object_**

Example:
```js
session.setItems({
  'item1': 'val1',
  'item2': 'val2',
  'item3': 'val3'
}).then(function (result) {
  console.log("Success, items were successfully inserted/updated", result);
  // result: {
  //  item1: 'a..',
  //  item2: '...',
  //  item3: ...
  // }
}).catch(function (err) {
  console.error(err);
});
```



#### removeItem

remove an item from **browserSession** **_Object_**

Example:
```js
session.removeItem('foo').then(function (value) {
  console.log("Success, the item was successfully remove");
}).catch(function (err) {
  console.error(err);
});
```

#### removeItems

remove multiple items from **browserSession** **_Object_**

Example:
```js
session.removeItems(['foo', 'ogoo', 'doo']).then(function (value) {
  console.log("Success, the items were successfully removed");
}).catch(function (err) {
  console.error(err);
});
```


#### findItems

find items in store by filtering them

Example:
```js
session.findItems(function (itemKey, itemValue) {
  if (key.match(/foo/)) {
    return true;
  } else {
    return false;
  }
}).then(function (result) {
  console.log("Success, items were successfully retrieved", result);
  // result: {
  //  item1: 'a..',
  //  item2: '...',
  //  item3: ...
  // }
}).catch(function (err) {
  console.error(err);
});
```


Example (finding all items from **browserSession** **_Object_**):
```js
session.findItems().then(function (result) {
  console.log("Success, items were successfully retrieved", result);
  // result: {
  //  item1: 'a..',
  //  item2: '...',
  //  item3: ...
  // ...
  // }
}).catch(function (err) {
  console.error(err);
});
```

_other methods inherited from ApplicationPrototype_

#### clear

remove all items from store

Example:
```js
session.clear().then(function (result) {
  console.log("Success, items were successfully removed", result);
  // result: {
  //  item1: 'a..',
  //  item2: '...',
  //  item3: ...
  // }
}).catch(function (err) {
  console.error(err);
});
```


### Events

#### setItem::{item-name}

```js
session.on('setItem::foo', function (itemKey, itemValue) {
  // listener content
});
```

#### removeItem::{item-name}

```js
session.on('removeItem::foo', function (itemKey) {
  // listener content
});
```
