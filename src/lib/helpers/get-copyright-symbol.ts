export default function getCopyrightSymbol(type: string): string {
  switch (type) {
    case 'C':
      return '©';
    case 'R':
      return '®';
    case 'P':
      return '℗';
    default:
      return '';
  }
}
