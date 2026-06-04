import localFont from 'next/font/local';

// ----------------------------------------------------------------------

export const inconsolata = localFont({
  src: [
    {
      path: '../../public/fonts/inconsolata/Inconsolata-VariableFont_wdth,wght.ttf',
      style: 'normal',
    },
  ],
  variable: '--font-inconsolata',
  preload: false,
});

// ----------------------------------------------------------------------

export const inter = localFont({
  src: [
    {
      path: '../../public/fonts/inter/Inter-VariableFont_slnt,wght.ttf',
      style: 'normal',
    },
  ],
  variable: '--font-inter',
});

// ----------------------------------------------------------------------

export const lora = localFont({
  src: [
    {
      path: '../../public/fonts/lora/Lora-VariableFont_wght.ttf',
      style: 'normal',
    },
    {
      path: '../../public/fonts/lora/Lora-Italic-VariableFont_wght.ttf',
      style: 'italic',
    },
  ],
  variable: '--font-lora',
  preload: false,
});
