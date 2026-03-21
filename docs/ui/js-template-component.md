# js-template-component -- Custom Element Builder

Create reactive custom HTML elements with templates, lifecycle hooks, state management, and scoped CSS.

## Overview

`js-template-component` combines `custom-elements`, `js-template`, and `uri-load` to let you define custom HTML tags with reactive templates, shared methods, lifecycle hooks, and external stylesheets. Each instance gets its own context with `setState()` for triggering re-renders.

## Advantages

- **Declarative components** -- define tag name, template, and behavior in one call
- **Reactive rendering** -- `setState()` triggers automatic re-render
- **Lifecycle hooks** -- `init`, `attrChange`, `contentChange`, `remove`
- **Scoped CSS** -- load external stylesheets per component
- **Template URL** -- load templates from external files or define inline
- **Shared references** -- share data across all instances of a component
- **Shared methods** -- define prototype methods available on all instances
- **Event binding** -- `(click)="this.method()"` syntax in templates

## Getting Started

```js
App.require('js-template-component').then(function (Component) {
    new Component('click-counter', {
        context: function () {
            return { count: 0 };
        },
        templateCode: '<div>Clicks: {{ this.count }} <button (click)="this.increment()">+1</button></div>',
        sharedPrototypeMethods: {
            increment: function () {
                this.setState({ count: this.count + 1 });
            }
        }
    }, function (err) {
        if (err) console.error(err);
    });
});
```

Then use in HTML:

```html
<click-counter></click-counter>
```

## API Reference

### Constructor

```js
new JSTemplateComponent(tagName, options, callback)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `tagName` | string | Custom element tag name (must contain a hyphen) |
| `options` | object | Component configuration (see below) |
| `callback` | function | `callback(err)` called when registration completes |

### Options

| Option | Type | Description |
|--------|------|-------------|
| `context` | function | Factory returning the initial context object for each instance |
| `templateCode` | string | Inline HTML template with `{{ }}` expressions |
| `templateUrl` | string | URL to load template from (alternative to `templateCode`) |
| `cssStyles` | string[] | URLs of stylesheets to load (optional, defaults to `[]`) |
| `sharedPrototypeMethods` | object | Methods available on every component instance |
| `sharedReferences` | object | Shared data accessible to all instances |
| `__lifeCycle` | object | Lifecycle hook functions |
| `__flag_RejectOnStylesError` | boolean | If true, reject when CSS fails to load (default: false) |

### Context Instance

Each component instance's context has these built-in properties:

| Property/Method | Description |
|----------------|-------------|
| `state` | Object holding the component's current state. Updated via `setState()` |
| `setState(state, [callback])` | Merge state and trigger re-render |
| `__instance.node` | The DOM element for this instance |
| `__instance.redraw()` | Re-render the template (skips if no state change) |
| `__instance.redrawForce()` | Force re-render even if no state change |
| `__instance.references` | The resolved references object |

### Lifecycle Hooks

Define in `options.__lifeCycle`:

| Hook | Arguments | When |
|------|-----------|------|
| `init` | `context, references, methods` | After element is inserted and template rendered |
| `attrChange` | `context, references, methods` | When an attribute changes on the element |
| `contentChange` | `context, references, methods` | When inner content changes |
| `getReferences` | `context, sharedReferences, methods` | Return additional references (called once) |
| `remove` | `context, references, methods` | When element is removed from DOM |

## Code Examples

### Example 1: Todo List Component

```js
App.require('js-template-component').then(function (Component) {
    new Component('todo-list', {
        context: function () {
            return {
                items: [],
                newItem: ''
            };
        },
        templateCode: [
            '<div class="todo">',
            '  <input type="text" value="{{ this.newItem }}" (input)="this.updateInput(event)" />',
            '  <button (click)="this.addItem()">Add</button>',
            '  <ul>',
            '    {{ this.items.map(function(item, i) {',
            '      return \'<li>\' + item + \' <button onclick="this.removeItem(\' + i + \')">x</button></li>\';',
            '    }).join("") }}',
            '  </ul>',
            '</div>'
        ].join('\n'),
        sharedPrototypeMethods: {
            updateInput: function (event) {
                this.newItem = event.target.value;
            },
            addItem: function () {
                if (this.newItem.trim()) {
                    this.items.push(this.newItem.trim());
                    this.setState({ newItem: '' });
                }
            },
            removeItem: function (index) {
                this.items.splice(index, 1);
                this.setState({});
            }
        }
    }, function (err) {
        if (err) console.error(err);
    });
});
```

### Example 2: Component with Lifecycle Hooks

```js
new Component('user-card', {
    context: function () {
        return { user: null, loading: true };
    },
    templateCode: '<div class="card">{{ this.loading ? "Loading..." : this.user.name }}</div>',
    cssStyles: ['/css/user-card.css'],
    __lifeCycle: {
        init: function (context, references) {
            // Fetch user data when component mounts
            fetch('/api/user/' + context.__instance.node.getAttribute('user-id'))
                .then(function (r) { return r.json(); })
                .then(function (user) {
                    context.setState({ user: user, loading: false });
                });
        },
        attrChange: function (context) {
            // Re-fetch when attributes change
            context.setState({ loading: true });
            context.__lifeCycle.init(context);
        },
        remove: function (context) {
            console.log('User card removed from DOM');
        }
    }
}, function (err) {
    if (err) console.error(err);
});
```

### Example 3: Component with External Template and Shared References

```js
new Component('data-table', {
    context: function (defaults, sharedRefs) {
        return {
            rows: [],
            sortColumn: null,
            sortAsc: true
        };
    },
    templateUrl: '/templates/data-table.html',
    cssStyles: [
        '/css/data-table.css',
        '/css/table-theme.css'
    ],
    sharedReferences: {
        apiBase: '/api/v2',
        pageSize: 25
    },
    sharedPrototypeMethods: {
        sort: function (column) {
            if (this.sortColumn === column) {
                this.setState({ sortAsc: !this.sortAsc });
            } else {
                this.setState({ sortColumn: column, sortAsc: true });
            }
        },
        refresh: function () {
            var ctx = this;
            fetch(ctx.__instance.references.apiBase + '/data')
                .then(function (r) { return r.json(); })
                .then(function (data) {
                    ctx.setState({ rows: data });
                });
        }
    },
    __lifeCycle: {
        getReferences: function (context, sharedRefs) {
            return {
                formatter: new Intl.NumberFormat('en-US')
            };
        },
        init: function (context) {
            context.refresh();
        }
    }
}, function (err) {
    if (err) console.error(err);
});
```

## Related Modules

- [js-template](js-template.md) -- the template engine used for rendering
- [custom-elements](../modules/custom-elements.md) -- the custom element registration system
- [uri-load](../resource-loading/uri-load.md) -- used internally for CSS loading
