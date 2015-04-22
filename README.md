# easy-locale

A simple and easy to use lib for localizing your application. 
Size 1.1 kb. Writen on pure JavaScript.

[Demo](http://sylpheeed.github.io/easy-locale/examples/)

# Usage

### Including file:
```html
 <script src="easy-locale.min.js"></script>
```

### Install via npm:
```
npm install easy-locale
```

### Initialization
```javascript
(function(){
  var translations = {
    en:{
      string: 'test string',
      section:{
        substring: 'test substring'
      }
      string_with_values: 'string with value1: %{value1} and value2: %{value2}'
      string_with_count: {
        elements: {
          zero: '%{count} elements',
          one: '%{count} element',
          other: '%{count} elements'
        }
      },
    },
    ...
  }
  locale.init('en', translations);
  window.t = locale.t;
})();
```
### Basic usage
```javascript
console.log(t('string'));
// => test string
console.log(t('section.substring'));
// => test substring
```

### Interpolate
```javascript
console.log(t('string_with_values', {value1: 'first value', value2: 'second value'}));
// => string with value1: first value and value2: second value
```

### Pluralization
```javascript
console.log(t('string_with_count.elements', {count: 0}));
// => 0 elements
console.log(t('string_with_count.elements', {count: 1}));
// => 1 element
```
