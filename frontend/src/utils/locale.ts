import { setDefaultOptions } from 'date-fns';
import { cs } from 'date-fns/locale';

export const setGlobalLocale = () => {
  setDefaultOptions({ locale: cs });
};
