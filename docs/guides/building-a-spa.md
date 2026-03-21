# Guide: Building a Single-Page Application

Build a complete single-page application using ApplicationBuilder, js-template, request, browser-session, and custom-elements.

## What We'll Build

A **Task Manager** SPA with:
- User authentication (simulated)
- Task list with add/remove/complete
- Data persistence in browser storage
- API communication
- Reactive UI updates

## Step 1: Application Bootstrap

```html
<!DOCTYPE html>
<html>
<head>
    <title>Task Manager</title>
    <script src="ApplicationPrototype.js"></script>
    <script src="ApplicationBuilder.js"></script>
    <style>
        .done { text-decoration: line-through; color: #999; }
        .task { padding: 8px; border-bottom: 1px solid #eee; }
        .stats { color: #666; font-size: 14px; }
    </style>
</head>
<body>
    <div id="app">
        <!-- Content will be rendered by js-template -->
        <div *if="!user">
            <h1>Sign In</h1>
            <input [(model)]="loginName" js-placeholder="'Your name'">
            <button (click)="login(loginName)">Sign In</button>
        </div>

        <div *if="user">
            <h1>Tasks for {{ user.name }}</h1>
            <p class="stats">
                {{ tasks.filter(function(t){return !t.done}).length }} remaining /
                {{ tasks.length }} total
            </p>

            <div>
                <input [(model)]="newTask" js-placeholder="'Add a task...'"
                    (keydown)="if(event.keyCode===13 && newTask) { addTask(newTask); newTask=''; }">
                <button (click)="if(newTask) { addTask(newTask); newTask=''; }">Add</button>
            </div>

            <div *for="tasks" *ref="task" *key="i">
                <div class="task">
                    <input type="checkbox" [(model)]="task.done"
                        (change)="saveTasks()">
                    <span *class="{ done: task.done }">{{ task.text }}</span>
                    <button (click)="removeTask(i)">x</button>
                </div>
            </div>

            <div *if="tasks.length === 0">
                <p>No tasks yet!</p>
            </div>

            <button (click)="logout()">Sign Out</button>
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
                    'session :: browser-session'
                ]).then(function (libs) {
                    var jsTemplate = libs.tpl;

                    libs.session().then(function (session) {
                        // Application state
                        var state = {
                            user: null,
                            loginName: '',
                            newTask: '',
                            tasks: [],

                            login: function (name) {
                                state.user = { name: name };
                                session.setItem('user', state.user);
                                state.loadTasks();
                            },

                            logout: function () {
                                state.user = null;
                                state.tasks = [];
                                session.removeItem('user');
                            },

                            addTask: function (text) {
                                state.tasks.push({ text: text, done: false });
                                state.saveTasks();
                            },

                            removeTask: function (index) {
                                state.tasks.splice(index, 1);
                                state.saveTasks();
                            },

                            saveTasks: function () {
                                session.setItem('tasks', state.tasks);
                            },

                            loadTasks: function () {
                                session.getItem('tasks').then(function (tasks) {
                                    if (tasks) state.tasks = tasks;
                                    renderer.redraw();
                                });
                            }
                        };

                        // Render UI
                        var renderer = jsTemplate.parseContent(
                            document.getElementById('app'), null,
                            { context: state, args: state }
                        );

                        // Restore session
                        session.getItem('user').then(function (user) {
                            if (user) {
                                state.user = user;
                                state.loadTasks();
                            }
                            renderer.redraw();
                        });
                    });
                });
            });
        }
    });
    </script>
</body>
</html>
```

## Key Patterns Used

| Pattern | Module | Purpose |
|---------|--------|---------|
| Reactive rendering | js-template | `{{ }}`, `*if`, `*for`, `[(model)]` |
| Session persistence | browser-session | Store user and tasks in IndexedDB |
| Event binding | js-template | `(click)`, `(keydown)`, `(change)` |
| Module loading | ApplicationBuilder | `require()` with aliases |
| State management | Plain object | Simple state object with methods |

## Next Steps

- Add `request` module to sync tasks with a REST API
- Add `custom-elements` for reusable task-item components
- Add `async` for batch API operations
