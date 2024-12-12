import { createUseStyles } from 'react-jss';
import { withFontFamily, GilroyFonts } from '@picsart/ds-foundation/fonts';
import { convertThemeToCSS, ThemeLightValues, ThemeDarkValues } from '@picsart/ds-foundation/colors';
import { EasingValues, convertEasingToCSS } from '@picsart/ds-foundation/easing';
import { RadiusValues, convertRadiusToCSS } from '@picsart/ds-foundation/radius';
import { SpacingsValues, convertSpacingsToCSS } from '@picsart/ds-foundation/spacings';
import { TimingValues, convertTimingsToCSS } from '@picsart/ds-foundation/timings';
import { TypographyValues, convertTypographyToCSS } from '@picsart/ds-foundation/typography';
import { resetters, tabFocusStyles } from '@picsart/ds-foundation/styleHelpers';

const useStyles = createUseStyles(
  {
    // @ts-ignore
    '@global': {
      ...withFontFamily(GilroyFonts),
      ...resetters,
      ':root': {
        ...tabFocusStyles,
        ...convertSpacingsToCSS(SpacingsValues),
        ...convertTimingsToCSS(TimingValues),
        ...convertRadiusToCSS(RadiusValues),
        ...convertEasingToCSS(EasingValues),
        ...convertTypographyToCSS(TypographyValues),

        '&.light': {
          ...convertThemeToCSS(ThemeLightValues),
        },
        '&.dark': {
          ...convertThemeToCSS(ThemeDarkValues),
        },
      },
    },
  },
  {
    name: 'gen-ai',
  },
);

export default useStyles;
