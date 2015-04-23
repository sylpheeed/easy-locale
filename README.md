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

## Options

### singleLocale

Sometimes you may need only one locale. 

For example if you build on server side dynamicly your translation based on his current locale zone and then send it to client.

```javascript
var translations = {
     first: 'First string',
     second: 'Second string',
    };
var options = {
 singleLocale: true
}
// We still need set first parameter for determining pluralization logic
locale.init('en', translations, options);    


console.log(locale.t('first'));
// => First string
```

## Helpers

### getCurrent
Shows object with current translation

```javascript
var translations = {
     en: {
      first: 'First string',
      second: 'Second string',
     },
     ru: {
      first: 'Первая строка',
      second: 'Вторая строка',
     }
    };
    
locale.init('en', translations);    

console.log(locale.getCurrent());
// => 
// {
//  first: 'First string',
//  second: 'Second string'
// }
```
