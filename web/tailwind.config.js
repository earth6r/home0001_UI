module.exports = {
  purge: [
    './src/**/*.tsx',
    './src/**/*.js',
    ],
  important: true,
  theme: {
    inset: {
      "0": "0",
      "1/2": "50%",
    },
    fontSize: {
      sm: [
        ".625rem",
        {
          letterSpacing: ".02em",
          lineHeight: ".875rem",
        },
      ],
      nav: [
        ".9375rem",
        {
          lineHeight: "1.40625rem",
          letterSpacing: ".01em",
          textTransform: "uppercase",
        },
      ],
      flagMb:".625rem",
      flagDt:".8125rem",
      tagDt:"0.75rem",
      tagRnd: [
        "1.1875rem",
        {
          lineHeight: "1.563rem"
        }
      ],

      base: ["1rem", "1.25rem"],
      baseMd: ["1.625rem", "1.875rem"],
      baseLg: ["3.75rem", "4.25rem"],
      baseLgMobile: ["3.75rem", "4.25rem"],
      baseRte: [
        "2rem",
        {
          lineHeight: "2.375rem",
          letterSpacing: "0rem",
        },
      ],
      desktopLarge: [
        "4.1666vw",
        {
          lineHeight: "4.722vw",
          letterSpacing: "-.01em",
        },
      ],
      desktopBody: [
        "1.875rem",
        {
          lineHeight: "2.5rem",
          letterSpacing: "-.005em",
        },
      ],
      desktopNav: [
        "1.125rem",
        {
          lineHeight: "1.125rem",
          letterSpacing: "0rem",
        },
      ],
      desktopInterface: [
        "1.625rem",
        {
          lineHeight: "1.59375rem",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
        },
      ],
      desktopCaption: [
        ".875rem",
        {
          lineHeight: "1rem",
          letterSpacing: "0.01em",
          textTransform: "uppercase",
        },
      ],
      mobileLarge: [
        "1.625rem",
        {
          lineHeight: "1.875rem",
          letterSpacing: "0.01em",
        },
      ],
      mobileBody: [
        "1rem",
        {
          lineHeight: "1.25rem",
          letterSpacing: "0.01em",
        },
      ],
      mobileNav: [
        ".9375rem",
        {
          lineHeight: "1.40625rem",
          letterSpacing: ".01em",
          textTransform: "uppercase",
        },
      ],
      mobileInterface: [
        ".8125rem",
        {
          lineHeight: "1.25rem",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
        },
      ],
      mobileCaption: [
        ".625rem",
        {
          lineHeight: ".875rem",
          letterSpacing: "0.01em",
          textTransform: "uppercase",
        },
      ],
      lg: ["1.75rem", "1.2"],
      "2xl": ["2rem", "2.375rem"],
    },
    borderColor: {
      default: "#edeef0",
      secondary: "#cacaca",
      dark: "#434343",
    },
    textColor: {
      primary: "#000000",
      white: "#ffffff"
    },
    extend: {
      keyframes: {
        in: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        out: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        in: "in .25s linear 1s forwards",
        out: "out .25s linear 0s forwards",
        out1s: "out .25s linear 1s forwards",
        out2s: "out .25s linear 2s forwards",
        out3s: "out .25s linear 3s forwards",
      },
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
        serif: ["GP", "Helvetica", "Arial", "sans-serif"],
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
        "1/4em": ".25em",
        "1/2em": ".5em",
        "3/4em": ".75em",
        "1em": "1em",
        "1-1/4em": "1.25em",
        "1-1/2em": "1.5em",
        "2em": "2em",
        "3em": "3em",
        "4em": "4em",
        "5em": "5em",
        "6em": "6em",
        "7em": "7em",
        "8em": "8em",
        "9em": "9em",
        "10em": "10em",
        "1/10": "10vw",
        "2/10": "20vw",
        "3/10": "30vw",
        "4/10": "40vw",
        "5/10": "50vw",
        "6/10": "60vw",
        "7/10": "70vw",
        "8/10": "80vw",
        "9/10": "90vw",
        "1/20": "5vw",
        "2/20": "10vw",
        "3/20": "15vw",
        "4/20": "20vw",
        "5/20": "25vw",
        "6/20": "30vw",
        "7/20": "35vw",
        "8/20": "40vw",
        "9/20": "45vw",
        "10/20": "50vw",
        "11/20": "55vw",
        "12/20": "60vw",
        "13/20": "65vw",
        "14/20": "70vw",
        "15/20": "75vw",
        "16/20": "80vw",
        "17/20": "85vw",
        "18/20": "90vw",
        "19/20": "95vw",
      },
      inset: {
        "2": "34%",
        "3": "63.24%",
        menu: "100px",
      },
      width: {
        "1/10": "10%",
        "2/10": "20%",
        "3/10": "30%",
        "4/10": "40%",
        "5/10": "50%",
        "6/10": "60%",
        "7/10": "70%",
        "8/10": "80%",
        "9/10": "90%",
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
