# svg-injector

[![npm version](https://img.shields.io/npm/v/@tanem/svg-injector.svg?style=flat-square)](https://www.npmjs.com/package/@tanem/svg-injector)
[![build status](https://img.shields.io/travis/tanem/svg-injector/master.svg?style=flat-square)](https://travis-ci.org/tanem/svg-injector)
[![coverage status](https://img.shields.io/codecov/c/github/tanem/svg-injector.svg?style=flat-square)](https://codecov.io/gh/tanem/svg-injector)
[![npm downloads](https://img.shields.io/npm/dm/@tanem/svg-injector.svg?style=flat-square)](https://www.npmjs.com/package/@tanem/svg-injector)
[![gzip size](https://img.badgesize.io/https://unpkg.com/@tanem/svg-injector/umd/svg-injector.production.min.js?compression=gzip&label=gzip%20size&style=flat-square)](https://unpkg.com/@tanem/svg-injector/umd/)

> A fast, caching, dynamic inline SVG DOM injection library.

## Background

There are a number of ways to use SVG on a page (`object`, `embed`, `iframe`, `img`, CSS `background-image`) but to unlock the full potential of SVG, including full element-level CSS styling and evaluation of embedded JavaScript, the full SVG markup must be included directly in the DOM.

Wrangling and maintaining a bunch of inline SVG on your pages isn't anyone's idea of good time, so `SVGInjector` lets you work with simple tag elements and does the heavy lifting of swapping in the SVG markup inline for you.

## Basic Usage

```html
<div id="inject-me" data-src="icon.svg"></div>
```

```js
import SVGInjector from '@tanem/svg-injector'

SVGInjector(document.getElementById('inject-me'))
```

## Live Examples

- Basic Usage: [Source](https://github.com/tanem/svg-injector/tree/master/examples/basic-usage) | [Sandbox](https://codesandbox.io/s/github/tanem/svg-injector/tree/master/examples/basic-usage)
- API Usage: [Source](https://github.com/tanem/svg-injector/tree/master/examples/api-usage) | [Sandbox](https://codesandbox.io/s/github/tanem/svg-injector/tree/master/examples/api-usage)
- UMD Build (Development): [Source](https://github.com/tanem/svg-injector/tree/master/examples/umd-dev) | [Sandbox](https://codesandbox.io/s/github/tanem/svg-injector/tree/master/examples/umd-dev)
- UMD Build (Production): [Source](https://github.com/tanem/svg-injector/tree/master/examples/umd-prod) | [Sandbox](https://codesandbox.io/s/github/tanem/svg-injector/tree/master/examples/umd-prod)

## API

**Arguments**

- `elements` - A single DOM element or array of elements, with `src` or `data-src` attributes defined, to inject.
- `options` - _Optional_ An object containing the optional arguments defined below. Defaults to `{}`.
  - `done(elementsLoaded)` - _Optional_ A callback which is called when all elements have been processed. `elementsLoaded` is the total number of elements loaded. Defaults to `undefined`.
  - `each(err, svg)` - _Optional_ A callback which is called when each element is processed. `svg` is the newly injected SVG DOM element. Defaults to `() => undefined`.
  - `evalScripts` - _Optional_ Run any script blocks found in the SVG. One of `'always'`, `'once'`, or `'never'`. Defaults to `'never'`.
  - `renumerateIRIElements` - _Optional_ Boolean indicating if SVG IRI addressable elements should be renumerated. Defaults to `true`.

**Example**

```html
<div class="inject-me" data-src="icon-one.svg"></div>
<div class="inject-me" data-src="icon-two.svg"></div>
```

```js
import SVGInjector from '@tanem/svg-injector'

SVGInjector(document.getElementsByClassName('inject-me'), {
  done(elementsLoaded) {
    console.log(`injected ${elementsLoaded} elements`)
  },
  each(err, svg) {
    if (err) {
      throw err
    }
    console.log(`injected ${svg.outerHTML}`)
  },
  evalScripts: 'once',
  renumerateIRIElements: 'false'
})
```

## Installation

```
$ npm install @tanem/svg-injector
```

There are also UMD builds available via [unpkg](https://unpkg.com/):

- https://unpkg.com/@tanem/svg-injector/umd/svg-injector.development.js
- https://unpkg.com/@tanem/svg-injector/umd/svg-injector.production.min.js

## Credits

This is a fork of a [library](https://github.com/iconic/SVGInjector) originally developed by [Waybury](http://waybury.com/) for use in [iconic.js](https://useiconic.com/tools/iconic-js/), part of the [Iconic](https://useiconic.com/) icon system.

## License

MIT
