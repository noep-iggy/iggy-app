import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';
import en from './en.json';
import fr from './fr.json';

const i18n = new I18n({
  en: en,
  fr: fr,
});

i18n.locale = getLocales()[0].languageCode;
i18n.enableFallback = true;
i18n.defaultLocale = 'fr';

export default i18n;
