# Request

## Documentation not ready

Sorry, but you may help.

## Contribution
if you find code interesting you may participate by updating documentation using pull request or mail messages to [sergiu.gordienco@gmail.com](mailto:sergiu.gordienco@gmail.com)


## Methods

### query.config( <config:Object> )

returns configuration object

```javascript

// TODO

```

// Client has been created. open() not called yet.
query.READY_STATE_UNSENT = 0;

// open() has been called.
query.READY_STATE_OPENED = 1;

// send() has been called, and headers and status are available.
query.READY_STATE_HEADERS_RECEIVED = 2;

// Downloading; responseText holds partial data.
query.READY_STATE_LOADING = 3;

// Downloading is done
query.READY_STATE_DONE = 4;


query.readyState()

query.status()

query.statusText()

query.timeout(int_seconds)

query.withCredentials(status_boolean)

### query.configurator( <template:string|function> )

TODO

return requestObject

### query.request()

returns **httpRequest** `XMLAjaxRequest` Object


### query.response( responseType:String, params:Object )

If **responseType** is specified then the function returns a Promise, otherwise it returns the XMLAjaxRequest.response Object

List of **responseType**:

* `blob` - provide the response as a Blob in the returned promise
	* **params** is optional and it includes:
		* `type`: String ( default: "application/octet-stream" )
* `json` - provide the response as a Object obtained from  in the returned promise
* `document` - TODO
* `text` - TODO
* `arraybuffer` - TODO


## Events

```javascript
query.on('EVENT_NAME', function () {
	// callbackbody
});
```

onReadyState [ int:readyState, int:status ]

progress [ event:Object{ total:Number, loaded:Number } [ percentComplete:Float ]]

load [ event ]

error [ event ]

abort [ event ]

upload-progress [ event:Object{ total:Number, loaded:Number } [ percentComplete:Float ]]

upload-load [ event ]

upload-error [ event ]

upload-abort [ event ]

loadend [ event ]

## Listeners


## Configuration Sets

### ignore-status-code

### check-status-code

### POST » prepare-post

### binary » retrieve-binary-string

### blob » retrieve-blob

### multipart » prepare-multipart
