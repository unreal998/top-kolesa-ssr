import { getDictionary } from '../../get-dictionary';
import { Locale } from '../../i18n-config';
import Counter from './components/counter';
import LocaleSwitcher from './components/locale-switcher';
import Home from './components/redux-components';

import React, { useEffect } from 'react';
import { Card, CardContent, Typography, Link, Button } from '@mui/material';

import { useSelector, useDispatch } from '../../redux/store';
import { getCardData } from '../../redux/slices/cardSlice';

export default async function IndexPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <div>
      <LocaleSwitcher />
      <p>Current locale: {lang}</p>
      <p>
        This text is rendered on the server:{' '}
        {dictionary['server-component'].welcome}
      </p>
      <Counter dictionary={dictionary.counter} />
      <Home />
    </div>
  );
}
