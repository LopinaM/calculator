export const calculateFontSize = (text: string): string => {
  if (text.length > 11) {
    return "24px";
  } else if (text.length > 7) {
    return "32px";
  } else {
    return "46px";
  }
};
