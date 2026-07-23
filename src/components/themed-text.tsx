import { Platform, Text, type TextProps } from 'react-native';

import { ThemeColor } from '@/constants/theme';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'small' | 'smallBold' | 'subtitle' | 'link' | 'linkPrimary' | 'code';
  themeColor?: ThemeColor;
};

const colorClasses: Record<ThemeColor, string> = {
  text: 'text-foreground',
  background: 'text-background',
  backgroundElement: 'text-element',
  backgroundSelected: 'text-selected',
  textSecondary: 'text-secondary',
};

const typeClasses = {
  default: 'text-[16px] leading-[24px] font-medium',
  title: 'text-[48px] leading-[52px] font-semibold',
  small: 'text-[14px] leading-[20px] font-medium',
  smallBold: 'text-[14px] leading-[20px] font-bold',
  subtitle: 'text-[32px] leading-[44px] font-semibold',
  link: 'text-[14px] leading-[30px]',
  linkPrimary: 'text-[14px] leading-[30px] text-[#3c87f7]',
  code: `font-mono text-[12px] ${Platform.select({ android: 'font-bold' }) ?? 'font-medium'}`,
} as const satisfies Record<NonNullable<ThemedTextProps['type']>, string>;

export function ThemedText({ className, type = 'default', themeColor, ...rest }: ThemedTextProps) {
  return (
    <Text
      className={[colorClasses[themeColor ?? 'text'], typeClasses[type], className]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    />
  );
}
