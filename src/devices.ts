const deviceWidth = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px",
};

export const device = {
  mobile: `(max-width: ${deviceWidth.mobileL})`,
  tablet: `(max-width: ${deviceWidth.tablet})`,
  laptop: `(max-width: ${deviceWidth.laptop})`,
  desktop: `(max-width: ${deviceWidth.desktop})`,
};
