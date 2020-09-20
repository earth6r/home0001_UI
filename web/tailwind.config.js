module.exports = {
  purge: [],
  important: true,
  theme: {
    inset: {
      "0": "0",
      "1/2": "50%",
    },
    fontSize: {
      sm: ["9px", "9px"],
      nav: [".9375rem", "1.40625rem"],
      base: ["1rem", "1.25rem"],
      baseDesktop: ["5vw", "5.10417vw"],
      lg: ["1.75rem", "1.2"],
      "2xl": ["2rem", "2.375rem"],
    },
    borderColor: {
      default: "#edeef0",
      secondary: "#cacaca",
      dark: "#434343",
    },
    extend: {
      backgroundColor: {
        primary: "#fff",
        aside: "#f7f7f7",
        asideActive: "#edeef0",
        lightGray: "#f2f2f2",
        darkGray: "#1f1f1f",
      },
      textColor: {
        primary: "#F7F6F0",
        red: "#e30613",
        gray: "#797979",
        darkGray: "#333333",
        aside: "#4c4c4e",
        rte: "#393939",
        subtitle: "#b9b9b9",
      },
      borderWidth: {
        "1/2": ".5px",
      },
      fontFamily: {
        serif: ["Helvetica", "Arial", "sans-serif"],
      },
      spacing: {
        mobile: ".625rem",
        desktop: "27px",
        footerOffset: "200px",
        contentOffsetDesktop: "245px",
        contentOffsetMobile: "238px",
        gridLaptopM: "10%",
        gridDesktopM: "15%",
        gridDesktopL: "25%",
        "1/2em": ".5em",
        "1em": "1em",
        "2em": "2em",
        "3em": "3em",
        "4em": "4em",
        "5em": "5em",
        "6em": "6em",
        "7em": "7em",
        "8em": "8em",
        "9em": "9em",
        "10em": "10em",
      },
    },
  },
  corePlugins: {
    container: false,
  },
  future: {
    removeDeprecatedGapUtilities: true,
  },
  variants: {},
  plugins: [
    ({ addComponents, theme }) => {
      addComponents({
        ".container": {
          paddingLeft: theme("spacing.mobile"),
          paddingRight: theme("spacing.mobile"),
          paddingBottom: theme("spacing.mobile"),
          width: "100%",
          maxWidth: "100%",
          "@screen md": {
            paddingLeft: theme("spacing.desktop"),
            paddingRight: theme("spacing.desktop"),
            paddingBottom: theme("spacing.desktop"),
          },
        },
      });
    },
  ],
};
