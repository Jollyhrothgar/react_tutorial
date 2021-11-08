# Introduction

Following tutorial: https://reactjs.org/tutorial/tutorial.html

Other useful docs:

- Hello World Docs: https://reactjs.org/docs/hello-world.html
  - Defines: JSX, Rendering Elements, Components and Props, State and Lifecycle,
  Handling Events, COnditional Rendering, Lists and Keys, Forms, Lifting State
  Up, Composition vs Inheritance, and Thinking in React

React is for building user interfaces. It is "declarative".

React behaves somewhat like a template, where you add snippets of html as react
componants.


## React Component Class / Type**

Parameters
- `props`: properties

Returns a hierarchy of views with `render`. Render returns a _react element_.

Example of a `React.Componant`

```javascript
// This is an example of JSX
class ShoppingList extends React.Component {
  render() {
    return (
      <div className="shopping-list">
        <h1>Shopping List for {this.props.name}</h1>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
          <li>Oculus</li>
        </ul>
      </div>
    );
  }
}

// Example usage: <ShoppingList name="Mark" />
```

The render method is a short-hand description of the HTML/XML you want to
render, and for example is written like this:

Example of `React.createElement`

```javascript
// This is an example of what is created at "build time" from JSX - it is
// functionally equivalent to the JSX.
return React.createElement('div', {classname: 'shopping-list'}),
  React.createElement('h1', /* ... h1 children ... */),
  React.createElement('ul', /* ... ul children ... */)
);
```

Most developers just use JSX, because any javascript expression can go within
the curly braces of JSX.

It's a little confusing in React to observe how and when object properties get
defined. It seems to be sort of in this ad-hoc manner, that defines them and
then uses them later, but without a lot of useful annotation. Where's the class
definition? 

## [JSX](https://reactjs.org/docs/introducing-jsx.html)

JSX is compiled by Babel - the following two statements are identical:

```javascript
// JSX:
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);

// Babel Compiled:
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, World'
);

// Which creates a javascript object like this (simplified)
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
```

Succinctly, react creates react elements, which represent what we want to see on the screen.

```javascript
// Note that we don't need quotes around html flavored elements.
const name = 'Josh Perez';
// Any valid javascript goes into {}. Note that when there are line breaks //
// indentation changes, javascript will automatically insert semicolons. If you
// don't want to understand the exact semantic cases where ASI (automatic
// semicolon insertion) happens, simple wrap multiline JSX in parens.
const element = <h1>Hello, {name}</h1>;

ReactDOM.render(
  element,
  document.getElementById('root')
);

// After compilation, JSX expressions turn into regular javascript function
// calls and classes.

// Use CamelCase instead of snake_case 
```

Note, in JSX, empty elements are closed with 'one element' notation, e.g.

```javascript
// Do this
const element <img src={user.avatarUrl} />;

// Not this
const element <img src={user.avatarUrl}></img>;
```

## [React DOM](https://reactjs.org/docs/rendering-elements.html)

A react element describes what we want to see on the screen. React elements are
plain objects. A react componant is _composed_ of react elements.

Consider an HTML document with a div:

```html
<div id="root"></div>
```

This is a 'root' DOM node because everything inside of it will be managed by
ReactDOM. React applications usually have one `root` DOM node. Integrating React
into an existing app usually entails multiple `root` nodes.

Rendering react element:

```javascript
const element = <h1>Hello, world!</h1>;
ReactDOM.render(element, document.getElementById('root'));
```

React elements are immutable - they represent an app at a particular time point.

React updates what is necessary - and while `render` usually called once, a
react app can re-render the whole app with a new react object representing the
state of the page.  Under the hood, react only updates what is necessary.

Think about what the UI needs to look like at a particular point in time, rather
than how it changes over time (stateful!).

Examine this:

```javascript
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
}

ReactDOM.render(element, document.getElementById('root'));
setInterval(tick, 1000);
```

## [Components and Props](https://reactjs.org/docs/components-and-props.html)

Componants exist to split the UI into independent and reusable pieces and manage
each piece in isolation.

- Components accept `props` and return React Elements which describe what should
appear on the screen.

Two ways to define components (function, ES6 class)

```javascript
// Use a function
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// Use a class
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>
  }
}
```

While React elements can represent DOM tags, they can also represent user-defined components.

```javascript
// DOM tag
const element = <div />;

// User defined component
const element = <Welcome name="Sara" />;
```
When react sees a user-defined component, it passes JSX attributes and children
to this compoent as a single object called `props`.

Example of a user-defined component:

```javascript
// This defines an element called 'Welcome' which takes props, and expects props
// to have an attribute called name. Welcome elements are now defined to be an h1
// heading 
function Welcome(props) { // This is a component
  /* A component */
  return <h1>Hello, {props.name}</h1>;
}

// This defines the props name = 'Sara' for an element named Welcome
// - A user-defined element mapping to component type 'Welcome'.
const element = <Welcome name="Sara" />;


// This takes the element we just created above and appends it to the root node.
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

Note that in this case, the order of operations is not strictly the logical
order that we see written above. It seems that the action starts at the
`ReactDOM.render`, and then references are recursively looked up.

1. ReactDOM.render() is called with the `<Welcome name="Sarah" />` element.
2. React calls `Welcome` component with the `{name: 'Sara'}` as the props
3. The `Welcome` component returns a `<h1>Hello, Sara</h1>` element as the result.
4. React DOM updates the DOM to match `<h1>Hello, Sara</h1>`.

NOTE: always start compoennt names with capital letter.

Of course, components can be subdivided, composed of other components, etc.
Props are read-only.

A note on javascript functions - some javascript components can take inputs, and
return an output without modifying inputs. Other functions may modify their
inputs.

React components may _not_ modify their props.

However, apps are dynamic, and state changes. So, it is possible for React
components to change their _output_ over time. 

For more information on composing components of other components:

* https://reactjs.org/docs/components-and-props.html#extracting-components

## [State and Lifecycle](https://reactjs.org/docs/state-and-lifecycle.html)

TODO: add different routes to show each demo code.