import { TextStyle } from 'react-native';

type TypeScale =
  | 'screenTitle'
  | 'largeAmount'
  | 'sectionTitle'
  | 'milestoneTitle'
  | 'body'
  | 'bodyStrong'
  | 'caption'
  | 'metadata'
  | 'button';

export const typography: Record<TypeScale, TextStyle> = {
  screenTitle: { fontSize: 22, fontWeight: '700', lineHeight: 28 },
  largeAmount: { fontSize: 34, fontWeight: '800', lineHeight: 40, letterSpacing: -0.5 },
  sectionTitle: { fontSize: 17, fontWeight: '700', lineHeight: 22 },
  milestoneTitle: { fontSize: 15, fontWeight: '600', lineHeight: 20 },
  body: { fontSize: 14, fontWeight: '400', lineHeight: 20 },
  bodyStrong: { fontSize: 14, fontWeight: '600', lineHeight: 20 },
  caption: { fontSize: 12, fontWeight: '500', lineHeight: 16 },
  metadata: { fontSize: 11, fontWeight: '500', lineHeight: 14 },
  button: { fontSize: 15, fontWeight: '700', lineHeight: 20 },
};
