export type ColorTokens = {
  background: string;
  surface: string;
  surfaceSecondary: string;
  primary: string;
  primaryText: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  warning: string;
  info: string;
  danger: string;
  overlay: string;
};

export const darkColors: ColorTokens = {
  background: '#0A0F0C',
  surface: '#131C17',
  surfaceSecondary: '#1B2621',
  primary: '#B6FF3C',
  primaryText: '#0A1406',
  text: '#F3F7F2',
  textSecondary: '#8FA097',
  border: '#243430',
  success: '#4ADE80',
  warning: '#FBBF24',
  info: '#60A5FA',
  danger: '#F87171',
  overlay: 'rgba(5, 10, 8, 0.72)',
};

export const lightColors: ColorTokens = {
  background: '#F4F7F3',
  surface: '#FFFFFF',
  surfaceSecondary: '#EBF1E8',
  primary: '#8FE01B',
  primaryText: '#0A1406',
  text: '#12190F',
  textSecondary: '#5B6A5F',
  border: '#DCE6D9',
  success: '#2E9E5B',
  warning: '#B4790C',
  info: '#3B7BD6',
  danger: '#D64545',
  overlay: 'rgba(10, 20, 15, 0.55)',
};
