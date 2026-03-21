# Guide: Building a Data Dashboard

Build a data dashboard that fetches API data, displays it with reactive templates, and caches results.

## What We'll Build

A **Dashboard** with:
- Fetch data from a REST API
- Display in a sortable, filterable table
- Cache responses in browser session
- Loading states and error handling

## Complete Example

```html
<!DOCTYPE html>
<html>
<head>
    <title>Data Dashboard</title>
    <script src="ApplicationPrototype.js"></script>
    <script src="ApplicationBuilder.js"></script>
    <style>
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 8px 12px; border: 1px solid #ddd; text-align: left; }
        th { background: #f5f5f5; cursor: pointer; }
        th:hover { background: #e0e0e0; }
        .loading { color: #666; padding: 20px; }
        .error { color: red; padding: 20px; }
        .filter { padding: 10px 0; }
        .filter input { padding: 8px; width: 300px; }
        .stats { color: #888; font-size: 13px; padding: 5px 0; }
    </style>
</head>
<body>
    <div id="dashboard">
        <h1>User Dashboard</h1>

        <div *if="loading" class="loading">Loading data...</div>
        <div *if="error" class="error">Error: {{ error }}</div>

        <div *if="!loading && !error">
            <div class="filter">
                <input [(model)]="search" js-placeholder="'Search by name, email, or city...'">
            </div>

            <p class="stats">
                Showing {{ getFiltered().length }} of {{ users.length }} users
                (sorted by {{ sortField }})
                {{ cached ? ' [cached]' : '' }}
            </p>

            <table>
                <thead>
                    <tr>
                        <th (click)="sort('name')">
                            Name {{ sortField === 'name' ? (sortAsc ? ' ^' : ' v') : '' }}
                        </th>
                        <th (click)="sort('email')">
                            Email {{ sortField === 'email' ? (sortAsc ? ' ^' : ' v') : '' }}
                        </th>
                        <th (click)="sort('city')">
                            City {{ sortField === 'city' ? (sortAsc ? ' ^' : ' v') : '' }}
                        </th>
                        <th (click)="sort('company')">
                            Company {{ sortField === 'company' ? (sortAsc ? ' ^' : ' v') : '' }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr *for="getFiltered()" *ref="user" *key="i">
                        <td>{{ user.name }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.city }}</td>
                        <td>{{ user.company }}</td>
                    </tr>
                </tbody>
            </table>

            <div *if="getFiltered().length === 0">
                <p>No results match "{{ search }}"</p>
            </div>

            <button (click)="refresh()">Refresh Data</button>
        </div>
    </div>

    <script>
    var App = new ApplicationBuilder({
        onready: function () {
            var App = this;
            App.modulePath('./constructors');
            App.require(['extensions/prototype', 'lib'], function (libs) {
                libs.lib();

                App.require([
                    'tpl :: js-template',
                    'req :: request',
                    'session :: browser-session'
                ]).then(function (libs) {
                    var jsTemplate = libs.tpl;
                    var Request = libs.req;

                    libs.session().then(function (session) {
                        var state = {
                            loading: true,
                            error: null,
                            cached: false,
                            users: [],
                            search: '',
                            sortField: 'name',
                            sortAsc: true,

                            sort: function (field) {
                                if (state.sortField === field) {
                                    state.sortAsc = !state.sortAsc;
                                } else {
                                    state.sortField = field;
                                    state.sortAsc = true;
                                }
                            },

                            getFiltered: function () {
                                var s = state.search.toLowerCase();
                                var dir = state.sortAsc ? 1 : -1;
                                var field = state.sortField;

                                return state.users
                                    .filter(function (u) {
                                        if (!s) return true;
                                        return u.name.toLowerCase().indexOf(s) !== -1
                                            || u.email.toLowerCase().indexOf(s) !== -1
                                            || u.city.toLowerCase().indexOf(s) !== -1
                                            || u.company.toLowerCase().indexOf(s) !== -1;
                                    })
                                    .sort(function (a, b) {
                                        return dir * (a[field] || '').localeCompare(b[field] || '');
                                    });
                            },

                            refresh: function () {
                                session.removeItem('dashboard_cache');
                                state.cached = false;
                                fetchData();
                            }
                        };

                        function fetchData() {
                            state.loading = true;
                            state.error = null;
                            renderer.redraw();

                            // Try cache first
                            session.getItem('dashboard_cache').then(function (cached) {
                                if (cached && (Date.now() - cached.time < 300000)) {
                                    state.users = cached.data;
                                    state.cached = true;
                                    state.loading = false;
                                    renderer.redraw();
                                    return;
                                }

                                // Fetch from API
                                var req = new Request();
                                req.url('https://jsonplaceholder.typicode.com/users')
                                    .response('json')
                                    .then(function (users) {
                                        state.users = users.map(function (u) {
                                            return {
                                                name: u.name,
                                                email: u.email,
                                                city: u.address.city,
                                                company: u.company.name
                                            };
                                        });
                                        state.loading = false;
                                        state.cached = false;

                                        // Cache the result
                                        session.setItem('dashboard_cache', {
                                            data: state.users,
                                            time: Date.now()
                                        });

                                        renderer.redraw();
                                    }, function (err) {
                                        state.error = 'Failed to load data';
                                        state.loading = false;
                                        renderer.redraw();
                                    });
                            });
                        }

                        var renderer = jsTemplate.parseContent(
                            document.getElementById('dashboard'), null,
                            { context: state, args: state }
                        );

                        fetchData();
                    });
                });
            });
        }
    });
    </script>
</body>
</html>
```

## Modules Used

| Module | Purpose |
|--------|---------|
| `js-template` | Reactive table rendering with `*for`, `*if`, `[(model)]` |
| `request` | HTTP client for API calls |
| `browser-session` | Response caching in IndexedDB |
| `extensions/prototype` | Utility methods |

## Patterns Demonstrated

- **Cache-first strategy** -- check IndexedDB before hitting the API
- **Loading/error states** -- `*if` directives for state-driven UI
- **Client-side sort** -- click handlers toggle sort field and direction
- **Client-side filter** -- `[(model)]` on search input with computed filtered list
- **Data transformation** -- map API response to simplified objects
