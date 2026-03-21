# Parsers

Lightweight data format conversion -- CSV parsing/encoding and Markdown to HTML.

## Overview

Pure JavaScript parsers for common data formats. No dependencies, works in both browser and Node.js.

## Modules

| Module | Purpose | Key Feature |
|--------|---------|-------------|
| CSV | Parse and encode CSV data | Handles quoted fields, escaped quotes |
| Markdown | Convert Markdown to HTML | String prototype method |

---

## CSV

### Advantages

- **Pure JavaScript** -- no dependencies
- **Quoted field support** -- handles commas, quotes, and newlines inside fields
- **Round-trip** -- parse CSV to arrays, encode arrays back to CSV
- **Custom encoder** -- provide your own value encoding function

### Quick Example

```js
// Parse CSV string
var data = csvParse('Name,Age,City\nAlice,30,"New York"\nBob,25,London');
// [['Name','Age','City'], ['Alice','30','New York'], ['Bob','25','London']]

// Encode back to CSV
var csv = csvEncode(data);
// 'Name,Age,City\nAlice,30,"New York"\nBob,25,London'
```

### Parse API: `csvParse(csvString)`

Returns a 2D array (rows x columns).

### Encode API: `csvEncode(arrayMatrix, [encodeValue])`

| Parameter | Type | Description |
|-----------|------|-------------|
| `arrayMatrix` | Array&lt;Array&gt; | 2D array of values |
| `encodeValue` | Function | Optional custom encoder per value |

### Example: CSV to HTML Table

```js
App.require('js-template').then(function (jsTemplate) {
    var csvData = 'Name,Score,Grade\nAlice,95,A\nBob,82,B\nCharlie,78,C';
    var rows = csvParse(csvData);
    var headers = rows[0];
    var data = rows.slice(1);

    var state = { headers: headers, data: data };
    jsTemplate.parseContent(document.getElementById('table'), null, {
        context: state, args: state
    });
});
```

```html
<table id="table">
    <thead>
        <tr><th *for="headers" *ref="h">{{ h }}</th></tr>
    </thead>
    <tbody>
        <tr *for="data" *ref="row">
            <td *for="row" *ref="cell">{{ cell }}</td>
        </tr>
    </tbody>
</table>
```

### Example: Generate CSV for Download

```js
var data = [
    ['Product', 'Price', 'Quantity'],
    ['Widget', 9.99, 100],
    ['Gadget', 24.99, 50],
    ['Thing', 4.99, 200]
];

var csv = csvEncode(data);
var blob = new Blob([csv], { type: 'text/csv' });
var url = URL.createObjectURL(blob);
var a = document.createElement('a');
a.href = url;
a.download = 'products.csv';
a.click();
```

---

## Markdown

### Advantages

- **Lightweight** -- small alternative to marked/showdown
- **String method** -- call `.markdown()` on any string (via prototype extension)
- **Custom URL wrapper** -- control how links are rendered

### Quick Example

```js
var md = '# Hello\n\nThis is **bold** and *italic*.\n\n- Item 1\n- Item 2';
var html = md.markdown();
document.getElementById('content').innerHTML = html;
```

## Related Modules

- [js-template](../ui/js-template.md) -- render parsed data in templates
- [Request](../networking/request.md) -- fetch CSV/Markdown from APIs
- [Extensions/Prototype](../extensions/index.md) -- provides the `.markdown()` string method
