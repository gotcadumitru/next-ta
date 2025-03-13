import {defineRouting} from 'next-intl/routing';
import { defaultLocale, locales } from './consts';
import { pathnames } from './pathnames';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales,
 
  // Used when no locale matches
  defaultLocale,
  localePrefix: 'as-needed',
  pathnames,
});