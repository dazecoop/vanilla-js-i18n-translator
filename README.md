# Vanilla JS i18n translate

> Super-fast, super-minimal, super-easy. Super 🚀

## 🤝 Features
- Loads near-instantly; No "flashes" of default content to user
- Detects users' language automatically, and applies translation if supported
- Able to set a default/fallback language if users' language is unsupported
- Able to force a locale via `?lang=en` if you need to
- Able to run JavaScript code as variables replacements from HTML file

## 🛠 How to use
1. Include your `i18n.js` file in your HTML file, at the bottom, after your closing `</body>` tag;
```
<script src="i18n.js"></script>
```
2. For each piece of text you need translations for, use `data-i18n` HTML attribute to specify a unique key, which will reference a key/value pair in the `i18n.js` file. You can use dot-notion if you wish. Eg;
```
<h1 data-i18n="header.title"></h1>
```
3. Within your `i18n.js` file, setup the `availableLocales` and `defaultLanguage` variables with your desired locales.
4. Also in `i18n.js` file, within `locales` variable, you can start building-out each of your locale translations as an object. Eg;
```
const locales = {
  en: {
    "header": {
      "title": "English title",
    },
  },
  de: ...
};
```

## ✨ Variable replacements
If desired, you can inject variables from your HTML file into the translation strings. This can be setup by using variables in your locales string such as `{example}`, then specifying a `data-` attribute to match in your HTML file, such as `data-example="Hello World"`.

This [somewhat] supports JavaScript code injection as well (without evil `eval`❗️) See `index.html` for examples.