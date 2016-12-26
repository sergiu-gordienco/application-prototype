# ApplicationPrototype

returns an object

# ApplicationBuilder

## Application.Promise
## Application.cacheEnabled
## Application.debugEnabled
## Application.modulePath
## Application.moduleRegister
## Application.moduleResolve


@TODO

## Application.require

- Use with callback

```js
Application.require("module-name", function (err, requiredModule) {
	// work with it
})
```

- Use as Promise

```js
Application.require("module-name").then(function (requiredModule) {
	// work with it
}).catch(function (err) {
	console.log(error);
})
```

## Link modules to global module list

@TODO

### module.cache

### module.resourceUrl

### module.meta

- module.meta.store	- a Store used for keeping links to dependencies
- module.meta.$requestQuery - String Query used for module request
- module.meta.module_path - Path where is store module's JavaScript File
- module.meta.path	- same as module.meta.module_path
- module.meta.name	- module_name
- module.meta.url	- Ex: `path + '/' + module_name + '.js'`
- module.meta.\_\_dirname	- where module is stored full path

### module.$request

### module.atime

### module.Application

### module.require

Same as `Application.require` except that it will import modules from neighbour folder named with module-name;

- Example for a module named "module-a"

```js
module.require('render', function (err, function (err, render) {
	// `render` required from file "./module-a/render.js"
}))

```
