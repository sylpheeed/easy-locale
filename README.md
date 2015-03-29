# easy-locale

A simple and easy to use lib to localize your application. 
Size 1.1 kb. Writen on pure JavaScript.

[Demo](http://sylpheeed.github.io/easy-locale/examples/)

# Usage

### Including file:
```html
 <script src="easy-locale.min.js"></script>
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
      string_with_value: 'string with value1: %{value1} and value2: %{value2}'
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
console.log(t('section.substring'));
```

### Interpolate
```javascript
console.log(t('string_with_value', {value1: 'first value', value2: 'second value'}));
```

### Pluralization
```javascript
console.log(t('string_with_count', {count: 0}));
console.log(t('string_with_count', {count: 1}));
```
