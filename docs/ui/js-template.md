# js-template -- Reactive Template Rendering

A two-way data binding engine with `{{ }}` expressions, attribute bindings, event handlers, and structural directives.

## Overview

`js-template` parses HTML elements for template syntax and creates reactive bindings between JavaScript data and the DOM. When your data changes, the DOM updates automatically. It supports text interpolation, attribute binding, event handling, two-way form binding, and structural directives like `*if` and `*for`.

## Advantages

- **Familiar syntax** -- `{{ }}` expressions like Angular/Vue/Mustache
- **No compilation needed** -- templates live directly in your HTML
- **Two-way data binding** -- `[(model)]` for form elements
- **Structural directives** -- `*if`, `*for`, `*class` for conditional/repeated content
- **Event binding** -- `(click)="handler()"` or `ev-click="handler()"`
- **FPS-controlled rendering** -- configurable frame rate (default 15fps) prevents layout thrashing
- **Node recycling** -- `*for` reuses DOM nodes for performance
- **Change detection** -- only updates nodes whose values actually changed
- **Promise support** -- expressions can return Promises that resolve asynchronously
- **Script blocks** -- `<script type="text/js-template">` for computed content blocks

## Getting Started

```js
App.require('js-template').then(function (jsTemplate) {
    var data = {
        name: 'World',
        items: ['Apple', 'Banana', 'Cherry']
    };

    jsTemplate.parseContent(
        document.getElementById('app'),
        function (err, config) {
            if (err) console.error(err);
        },
        { context: data, args: data }
    );
});
```

## Template Syntax Reference

### Text Interpolation

```html
<p>Hello, {{ name }}!</p>
<p>Total: {{ price * quantity }}</p>
<p>{{ items.length }} items in cart</p>
<p>{{ isLoggedIn ? 'Welcome back' : 'Please sign in' }}</p>
```

Expressions inside `{{ }}` are evaluated as JavaScript with access to the `args` and `context` provided in the config.

---

### Attribute Binding: `[attribute]`

Bind a JavaScript expression to an HTML attribute:

```html
<!-- Dynamic class -->
<div [class]="isActive ? 'active' : 'inactive'">Content</div>

<!-- Dynamic source -->
<img [src]="user.avatarUrl">

<!-- Dynamic href -->
<a [href]="'/users/' + user.id">Profile</a>

<!-- Dynamic disabled -->
<button [disabled]="!formValid">Submit</button>
```

---

### Inline Attribute Binding: `js-*`

An alternative syntax using `js-` prefix:

```html
<input js-value="user.name">
<div js-style="'color:' + themeColor">Styled</div>
```

---

### Inline Template in Attributes

Use `{{ }}` inside regular attribute values:

```html
<a href="/users/{{ user.id }}">{{ user.name }}</a>
<img src="{{ baseUrl }}/images/{{ filename }}">
```

---

### Event Binding: `(event)` or `ev-event`

```html
<!-- Parenthesis syntax (Angular-like) -->
<button (click)="handleClick()">Click Me</button>
<input (input)="searchQuery = event.target.value">
<form (submit)="event.preventDefault(); saveForm()">

<!-- ev- prefix syntax -->
<button ev-click="handleClick()">Click Me</button>
<div ev-mouseover="showTooltip = true" ev-mouseout="showTooltip = false">
    Hover me
</div>
```

The `event` object is available inside event expressions. If the handler returns `false`, the template does not redraw.

---

### Two-Way Binding: `[(model)]`

Bind form element values to data properties:

```html
<!-- Text input -->
<input [(model)]="username">

<!-- Textarea -->
<textarea [(model)]="message"></textarea>

<!-- Checkbox (binds to boolean) -->
<input type="checkbox" [(model)]="isAgreed">

<!-- Select -->
<select [(model)]="selectedCountry">
    <option value="us">United States</option>
    <option value="uk">United Kingdom</option>
</select>

<!-- File input (binds to FileList) -->
<input type="file" [(model)]="uploadedFiles">
```

---

### Structural Directives

#### `*if` -- Conditional Rendering

```html
<div *if="isLoggedIn">Welcome, {{ username }}!</div>
<div *if="!isLoggedIn">Please sign in</div>
<div *if="items.length === 0">No items found</div>
```

When the condition is `false`, the element is replaced by an empty text node (removed from DOM).

#### `*for` -- List Rendering

```html
<!-- Array iteration (item = value, key = index) -->
<ul>
    <li *for="items" *ref="item" *key="index">
        {{ index + 1 }}. {{ item.name }}
    </li>
</ul>

<!-- Object iteration (item = value, key = property name) -->
<div *for="userMap" *ref="user" *key="userId">
    {{ userId }}: {{ user.name }}
</div>
```

| Directive | Default | Description |
|-----------|---------|-------------|
| `*for` | | The array or object expression to iterate |
| `*ref` | `item` | Variable name for each value |
| `*key` | `key` | Variable name for each index/key |

#### `*class` -- Dynamic CSS Classes

```html
<!-- Object syntax: key = class name, value = condition -->
<div *class="{ active: isActive, disabled: isDisabled, 'text-bold': isBold }">
    Styled content
</div>

<!-- String syntax -->
<div *class="isError ? 'alert alert-danger' : 'alert alert-info'">
    Message
</div>
```

---

### Script Template Blocks

Use `<script type="text/js-template">` for computed content:

```html
<!-- Simple expression -->
<script type="text/js-template">
    3 + 9
</script>
<!-- Renders: 12 -->

<!-- Return DOM elements -->
<script type="text/js-template">
    (function () {
        var btn = document.createElement('button');
        btn.textContent = 'Dynamic Button';
        return btn;
    })()
</script>
<!-- Renders: <button>Dynamic Button</button> -->

<!-- Return arrays of nodes -->
<script type="text/js-template">
    items.map(function (item) {
        var li = document.createElement('li');
        li.textContent = item;
        return li;
    })
</script>
```

## API Reference

### `parseContent(element, callback, config)`

Parse and render template content inside an element.

| Parameter | Type | Description |
|-----------|------|-------------|
| `element` | HTMLElement | The DOM element containing templates |
| `callback` | Function | `function(err, config)` called after parsing |
| `config.context` | Object | `this` context for expressions |
| `config.args` | Object | Variables accessible in templates |
| `config.RENDER_FPS` | Number | Max renders per second (default: 15) |
| `config.REMOVE_EMPTY_NODES` | Boolean | Clean up empty nodes (default: true) |

Returns: a render controller with `redraw(cb, context, args)` method.

---

### `parseAttributes(element, callback, config)`

Same function as `parseContent` -- both are exported and identical. Use `parseContent` for content rendering and `parseAttributes` when working with attribute-level binding (they share the same implementation internally).

---

### `element.renderJs(context, args, callback)`

Shorthand method added to all HTML elements. Internally calls `parseContent` with `{ context: context, args: args }`:

```js
document.getElementById('app').renderJs(
    { saveData: function () { /* ... */ } },  // context (this for expressions)
    { user: { name: 'Alice' } },              // args (variables for templates)
    function (err) { console.log('Rendered'); }
);
```

Subsequent calls trigger a redraw with new data.

---

### Configuration

```js
jsTemplate.config.RENDER_FPS = 30;           // increase for smoother updates
jsTemplate.config.REMOVE_EMPTY_NODES = true;  // clean up empty text nodes
```

## Code Examples

### Example 1: User Profile Card

```html
<div id="profile">
    <div *if="user">
        <img [src]="user.avatar" js-alt="user.name">
        <h2>{{ user.name }}</h2>
        <p>{{ user.email }}</p>
        <span *class="{ online: user.isOnline, offline: !user.isOnline }">
            {{ user.isOnline ? 'Online' : 'Offline' }}
        </span>
        <button (click)="user.isOnline = !user.isOnline">Toggle Status</button>
    </div>
    <div *if="!user">
        <p>Loading user...</p>
    </div>
</div>

<script>
App.require('js-template').then(function (jsTemplate) {
    var state = {
        user: {
            name: 'Alice',
            email: 'alice@example.com',
            avatar: '/avatars/alice.png',
            isOnline: true
        }
    };
    jsTemplate.parseContent(
        document.getElementById('profile'), null,
        { context: state, args: state }
    );
});
</script>
```

### Example 2: Todo List with Add/Remove

```html
<div id="todoApp">
    <h1>Todo List ({{ todos.length }} items)</h1>

    <input [(model)]="newTodo" js-placeholder="'Add a task...'">
    <button (click)="if (newTodo) { todos.push({ text: newTodo, done: false }); newTodo = ''; }">
        Add
    </button>

    <ul>
        <li *for="todos" *ref="todo" *key="i">
            <input type="checkbox" [(model)]="todo.done">
            <span [style]="todo.done ? 'text-decoration: line-through' : ''">
                {{ todo.text }}
            </span>
            <button (click)="todos.splice(i, 1)">Remove</button>
        </li>
    </ul>

    <p *if="todos.length === 0">No todos yet. Add one above!</p>
</div>

<script>
App.require('js-template').then(function (jsTemplate) {
    var state = {
        newTodo: '',
        todos: [
            { text: 'Learn js-template', done: false },
            { text: 'Build something cool', done: false }
        ]
    };
    jsTemplate.parseContent(
        document.getElementById('todoApp'), null,
        { context: state, args: state }
    );
});
</script>
```

### Example 3: Dynamic Data Table

```html
<div id="dataTable">
    <input [(model)]="search" js-placeholder="'Filter...'">

    <table>
        <thead>
            <tr>
                <th (click)="sortBy = 'name'">Name</th>
                <th (click)="sortBy = 'age'">Age</th>
                <th (click)="sortBy = 'city'">City</th>
            </tr>
        </thead>
        <tbody>
            <tr *for="getFilteredUsers()" *ref="user" *key="i">
                <td>{{ user.name }}</td>
                <td>{{ user.age }}</td>
                <td>{{ user.city }}</td>
            </tr>
        </tbody>
    </table>

    <p *if="getFilteredUsers().length === 0">No results for "{{ search }}"</p>
</div>

<script>
App.require('js-template').then(function (jsTemplate) {
    var state = {
        search: '',
        sortBy: 'name',
        users: [
            { name: 'Alice', age: 30, city: 'New York' },
            { name: 'Bob', age: 25, city: 'London' },
            { name: 'Charlie', age: 35, city: 'Paris' },
            { name: 'Diana', age: 28, city: 'Tokyo' }
        ],
        getFilteredUsers: function () {
            var s = state.search.toLowerCase();
            return state.users
                .filter(function (u) {
                    return !s || u.name.toLowerCase().indexOf(s) !== -1
                        || u.city.toLowerCase().indexOf(s) !== -1;
                })
                .sort(function (a, b) {
                    return (a[state.sortBy] + '').localeCompare(b[state.sortBy] + '');
                });
        }
    };
    jsTemplate.parseContent(
        document.getElementById('dataTable'), null,
        { context: state, args: state }
    );
});
</script>
```

### Example 4: Async Data Loading

```html
<div id="asyncDemo">
    <div *if="loading">Loading...</div>
    <div *if="error">Error: {{ error }}</div>
    <div *if="!loading && !error">
        <div *for="posts" *ref="post">
            <h3>{{ post.title }}</h3>
            <p>{{ post.body }}</p>
        </div>
    </div>
</div>

<script>
App.require('js-template').then(function (jsTemplate) {
    var state = { loading: true, error: null, posts: [] };
    var renderer = jsTemplate.parseContent(
        document.getElementById('asyncDemo'), null,
        { context: state, args: state }
    );

    fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
        .then(function (r) { return r.json(); })
        .then(function (posts) {
            state.posts = posts;
            state.loading = false;
            renderer.redraw(); // trigger re-render with new data
        })
        .catch(function (err) {
            state.error = err.message;
            state.loading = false;
            renderer.redraw();
        });
});
</script>
```

## Performance Tuning

| Setting | Default | Recommendation |
|---------|---------|----------------|
| `RENDER_FPS` | 15 | Increase to 30-60 for animations; lower for data-heavy pages |
| `REMOVE_EMPTY_NODES` | true | Keep true unless empty nodes are intentional |

## Related Modules

- [js-template-component](js-template-component.md) -- build reusable components
- [custom-elements](../modules/custom-elements.md) -- observe DOM lifecycle
- [UI Overview](index.md) -- how the three UI modules work together
