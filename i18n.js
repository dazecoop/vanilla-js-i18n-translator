// List of available locales
const availableLocales = ['en', 'de'];

// Default locale.
const defaultLanguage = 'en';

// Manually detect users' language, strip languages such as `en-GB` to just `en`.
let language = (window.navigator.userLanguage || window.navigator.language).substr(0, 2);

// If `?lang=` exists in URL params & is valid, then use that instead.
const urlParams = new URLSearchParams(window.location.search);
const langFromUrl = urlParams.get('lang');
if (langFromUrl && availableLocales.includes(langFromUrl)) {
  language = langFromUrl
}

// Set `pageLanguage` only if its available within our locales, otherwise default.
let pageLanguage = defaultLanguage;
if (availableLocales.includes(language)) {
  pageLanguage = language;
}

// Locale translations.
const locales = {

  // EN
  en: {
    "header": {
      "title": "English title",
    },
    "p-1": "This is some dummy text in order to test the translation files. You can mostly ignore what this says, especially anything from this point forward. Ok thanks, bye",
    "p-2": "It also supports custom variable replacements. Examples;",
    "variables": "Current date: {date}<br>Unix timestamp: {time}<br>Or static text: {static}",
  },

  // DE
  de: {
    "header": {
      "title": "Deutscher Titel",
    },
    "p-1": "Dies ist ein Dummy-Text, um die Übersetzungsdateien zu testen. Sie können größtenteils ignorieren, was dies sagt, insbesondere alles von diesem Punkt an. Ok danke, tschüss",
    "p-2": "Es unterstützt auch benutzerdefinierte Variablenersetzungen. Beispiele;",
    "variables": "Aktuelles Datum: {date}<br>Unix-Zeitstempel: {time}<br>Oder statischer Text: {static}",
  },

};

// Get all page elements to be translated.
const elements = document.querySelectorAll('[data-i18n]');

// Get JSON object of translations.
const json = locales[pageLanguage];

// On each element, found the translation from JSON file & update.
elements.forEach((element, index) => {
  const key = element.getAttribute('data-i18n');
  let text = key.split('.').reduce((obj, i) => (obj ? obj[i] : null), json);

  // Does this text have any variables? (eg {something})
  const variables = text.match(/{(.*?)}/g);
  if (variables) {

    // Iterate each variable in the text.
    variables.forEach((variable) => {

      // Filter all `data-*` attributes for this element to find the matching key.
      Object.entries(element.dataset).filter(([key, value]) => {
        if (`{${key}}` === variable) {
          try {
            // Attempt to run actual JavaScript code.
            text = text.replace(`${variable}`, new Function(`return (${value})`)());
          } catch (error) {
            // Probably just static text replacement.
            text = text.replace(`${variable}`, value);
          }
        }
      })
    });
  }

  // Regular text replacement for given locale.
  element.innerHTML = text;
});

// Set <html> tag lang attribute.
const htmlElement = document.querySelector('html');
htmlElement.setAttribute('lang', pageLanguage);
