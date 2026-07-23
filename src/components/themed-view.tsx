import { View, type ViewProps } from 'react-native';

import { ThemeColor } from '@/constants/theme';

const typeClasses: Record<ThemeColor, string> = {
  background: 'bg-background',
  backgroundElement: 'bg-element',
  backgroundSelected: 'bg-selected',
  text: 'bg-foreground',
  textSecondary: 'bg-secondary',
};

export type ThemedViewProps = ViewProps & {
  className?: string;
  type?: ThemeColor;
};

export function ThemedView({ className, type, ...otherProps }: ThemedViewProps) {
  return (
    <View
      className={[typeClasses[type ?? 'background'], className].filter(Boolean).join(' ')}
      {...otherProps}
    />
  );
}
