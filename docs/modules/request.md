# Request

## Methods

### query.config( <config:Object> )

returns configuration object

```javascript

// TODO

```


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

### POST » prepare-post

### binary » retrieve-binary-string

### blob » retrieve-blob

### multipart » prepare-multipart


