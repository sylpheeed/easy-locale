var locale = (function () {
  var locale = null,
    cache = {},
    translations = null;

  function pluralization(locale, count) {
    var pluralizationRules = {
      ru: function (count) {
        var mod10, mod100;
        mod10 = count % 10;
        mod100 = count % 100;
        if (count === 0) {
          return 'zero';
        } else if (mod10 === 1 && mod100 !== 11) {
          return 'one';
        } else if ([2, 3, 4].indexOf(mod10) !== -1 && [12, 13, 14].indexOf(mod100) === -1) {
          return 'few';
        } else if (mod10 === 0 || [5, 6, 7, 8, 9].indexOf(mod10) !== -1 || [11, 12, 13, 14].indexOf(mod100) === -1) {
          return 'many';
        } else {
          return 'other';
        }
      },
      en: function (count) {
        if (count === 0) {
          return 'zero';
        } else if (count === 1) {
          return 'one';
        } else {
          return 'other';
        }
      }
    };

    if (pluralizationRules[locale]) {
      return pluralizationRules[locale](count);
    } else {
      throw new Error('No pluralization rules for ' + locale + ' locale');
    }
  }

  function replaceInterpolated(string, valuesObj) {
    var key, value;
    for (key in valuesObj) {
      value = valuesObj[key];
      var find = "%{" + key + "}";
      var pattern = new RegExp(find, 'g');
      string = string.replace(pattern, value);
    }
    return string;
  }

  function isObject(obj) {
    return obj !== null && typeof obj === 'object';
  }


  function checkOptions(options) {
    return {
      isSingleLocale: function () {
        return options && options.singleLocale ? options.singleLocale : false;
      }
    }
  }


  function randomInteger(max) {
    return Math.floor(Math.random() * max);
  }

  return {
    init: function (userLocale, data, options) {
      locale = userLocale;
      translations = checkOptions(options).isSingleLocale() ? data : data[locale];
    },

    getCurrent: function () {
      return translations;
    },

    t: function (key, data) {
      if (!data) data = {};
      try {
        var e, hash, i, keys, rand, result;

        keys = key.split('.');
        i = 0;
        hash = translations;
        while (i < keys.length) {
          hash = hash[keys[i]];
          i++;
        }
        if (typeof hash === 'string') {
          result = replaceInterpolated(hash, data);
        } else if (Array.isArray(hash)) {
          if (typeof cache[key] !== 'undefined') {
            result = cache[key];
          } else {
            rand = randomInteger(hash.length);
            result = replaceInterpolated(hash[rand], data);
            cache[key] = result;
          }
        } else if (isObject(hash)) {
          if (data.count === void 0) {
            throw new Error("doesn't have 'count' parameter");
          } else {
            hash = hash[pluralization(locale, data.count)];
            result = replaceInterpolated(hash, data);
          }
        } else {
          throw new Error('no translation');
        }
      } catch (_error) {
        e = _error;
        if (locale) {
          console.warn("ERROR: cant get translation for: key: '" + key + "' with message '" + e.message + "'");
        }
      }
      return result;
    }
  };
})();
