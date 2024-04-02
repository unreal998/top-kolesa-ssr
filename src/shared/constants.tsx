import { Montserrat } from 'next/font/google';

export const montserrat = Montserrat({
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

export const BASE_COLORS = {
  DEFAULT_BLUE: 'rgba(28,57,123)',
  BACKGROUND_WHITE: '#f8f8f8',
  BORDER_WHITE: '#f0f0f0',
  DEFAULT_GREY: '#808080',
};

export const FONTS = {
  BOLD_TEXT_FAMILY: 'Montserrat, sans-serif',
  MAIN_TEXT_FAMILY: 'PT Sans, sans-serif',
};

export const FILTER_COLORS = {
  DEFAULT_BLUE_INACTIVE: 'rgba(28,57,123, 0.15)',
  TEXT_SHORT_MENU: '#878787',
  BACKGROUND_GREY: '#f2f2f2',
  BORDER: '#cccccc',
  TEXT_MAIN: '#000',
  BUTTON_RESET_FILTER: '#FF0000',
  BUTTON_RESET_FILTER_INACTIVE: '#9ca3af',
  SHORT_MENU_RESET_BUTTON_BACKGROUND: '#d6d3d1',
};

export const TOOLTIP_TIMEOUT = 4000;

export const contactPhones = [
  {
    phone: '(063) 253-77-44',
    link: 'tel:+380632537744',
    operator: 'Life',
  },
  {
    phone: '(097) 273-77-44',
    link: 'tel:+380972737744',
    operator: 'Kyivstar',
  },
  {
    phone: '(099) 273-77-44',
    link: 'tel:+380992737744',
    operator: 'Vodafone',
  },
];
