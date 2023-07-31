module.exports = {
  mode: "jit",
  content: ["./src/**/*.tsx", "./src/**/*.js"],
  important: true,
  theme: {
    borderColor: {
      default: "#edeef0",
      secondary: "#cacaca",
      dark: "#434343"
    },
    fontSize: {
      sm: [
        ".625rem",
        {
          letterSpacing: ".02em",
          lineHeight: ".875rem"
        }
      ],
      nav: [
        ".9375rem",
        {
          lineHeight: "1.40625rem",
          letterSpacing: ".01em",
          textTransform: "uppercase"
        }
      ],
      flagMb: ".625rem",
      flagDt: "0.8125rem",
      tagDt: "0.75rem",
      tagRnd: [
        "1.1875rem",
        {
          lineHeight: "1.563rem"
        }
      ],

      base: ["1rem", "1.25rem"],
      baseMd: ["1.8vw"],
      baseLg: ["3.75rem", "4.25rem"],
      baseLgMobile: ["3.75rem", "4.25rem"],
      baseRte: [
        "2rem",
        {
          lineHeight: "2.375rem",
          letterSpacing: "0rem"
        }
      ],
      desktopLarge: [
        "4.1666vw",
        {
          lineHeight: "4.722vw",
          letterSpacing: "-.01em"
        }
      ],
      desktopBody: [
        "1.8vw",
        {
          lineHeight: "115%",
          letterSpacing: "-.005em"
        }
      ],
      desktopNav: [
        ".85rem",
        {
          letterSpacing: "0rem",
          fontFamily: {
            serif: ["NeueHaasGrotesk", "Helvetica", "Arial", "sans-serif"]
          }
        }
      ],
      desktopInterface: [
        "1.625rem",
        {
          lineHeight: "1.59375rem",
          letterSpacing: "0.05em",
          textTransform: "uppercase"
        }
      ],
      desktopCaption: [
        ".875rem",
        {
          lineHeight: "1rem",
          letterSpacing: "0.01em",
          textTransform: "uppercase"
        }
      ],
      mobileLarge: [
        "4.1666vw",
        {
          lineHeight: "4.722vw",
          letterSpacing: "0.01em"
        }
      ],
      smallBody: [
        "1.1rem",
        {
          lineHeight: "115%",
          letterSpacing: "-0.33px"
        }
      ],
      mobileBody: [
        "1.28rem",
        {
          lineHeight: "115%",
          letterSpacing: "-0.33px"
        }
      ],
      mobileNav: [
        ".75rem",
        {
          lineHeight: "120%",
          letterSpacing: ".03em",
          textTransform: "uppercase",
          fontFamily: {
            serif: ["NeueHaasGrotesk", "Helvetica", "Arial", "sans-serif"]
          }
        }
      ],
      mobileInterface: [
        ".8125rem",
        {
          lineHeight: "1.25rem",
          letterSpacing: "0.05em",
          textTransform: "uppercase"
        }
      ],
      mobileCaption: [
        ".625rem",
        {
          lineHeight: ".875rem",
          letterSpacing: "0.01em",
          textTransform: "uppercase"
        }
      ],
      lg: ["2.6vw", "1.2"],
      articleTitle: ["2.19vw", "1.2"],
      "2xl": ["2rem", "2.375rem"]
    },
    screens: {
      "sub-i-6": "360px",
      tiny: "460px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      "max-font": "1083px",
      xl: "1280px",
      "2xl": "1536px"
    },
    textColor: {
      primary: "#000000",
      white: "#ffffff"
    },
    zIndex: {
      "0": 0,
      "10": 10,
      "20": 20,
      "30": 30,
      "40": 40,
      "45": 45,
      "50": 50,
      "60": 60,
      "70": 70,
      "80": 80,
      "90": 90,
      "100": 100,
      auto: "auto"
    },
    extend: {
      fontSize: {
        "desktop-body": [
          "0.813rem",
          {
            lineHeight: "135%"
          }
        ],
        "mobile-body": [
          "0.875rem",
          {
            lineHeight: "130%"
          }
        ]
      },
      letterSpacing: {
        body: "0.005em",
        caps: "0.024em"
      },
      maxWidth: {
        menu: "calc(100% - 49.23px)"
      },
      animation: {
        in: "in .25s linear forwards",
        out: "out .25s linear 0s forwards",
        out1s: "out .25s linear 1s forwards",
        out2s: "out .25s linear 2s forwards",
        out3s: "out .25s linear 3s forwards"
      },
      backgroundColor: {
        primary: "#fff",
        aside: "#f7f7f7",
        asideActive: "#edeef0",
        lightGray: "#f2f2f2",
        whitesmoke: "#F3F3F3",
        darkGray: "#1f1f1f"
      },
      borderWidth: {
        "1/2": ".5px"
      },
      fontFamily: {
        serif: ["Arial", "FolioBT", "Helvetica", "sans-serif"]
      },
      inset: {
        "0": "0",
        "1/2": "50%",
        "2": "34%",
        "3": "63.24%",
        otherArrow1: "2rem",
        otherArrow2: "2.5rem",
        otherArrow3: "3rem",
        menu: "100px"
      },
      keyframes: {
        in: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        out: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" }
        }
      },
      padding: {
        p1: ".1vw",
        p2: ".2vw",
        p3: ".3vw",
        p4: ".4vw",
        p5: ".5vw",
        p6: ".6vw",
        p7: ".7vw",
        p8: ".8vw",
        p9: ".9vw",
        p10: "1.0vw",
        p11: "1.1vw",
        p12: "1.2vw",
        p13: "1.3vw",
        p14: "1.4vw",
        p15: "1.5vw",
        p16: "1.6vw",
        p17: "1.7vw",
        p18: "1.8vw",
        p19: "1.9vw",
        p20: "2.0vw",
        p21: "2.1vw",
        p22: "2.2vw",
        p23: "2.3vw",
        p24: "2.4vw",
        p25: "2.5vw",
        p26: "2.6vw",
        p27: "2.7vw",
        p28: "2.8vw",
        p29: "2.9vw",
        p30: "3.0vw",
        "4.5": "1.125rem",
        "7": "1.75rem"
      },
      spacing: {
        mobile: "1rem",
        desktop: "2.5rem",
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
        "desktop-menu": "5.625rem",
        "mobile-menu": "3.625rem"
      },
      textColor: {
        primary: "#F7F6F0",
        red: "#e30613",
        gray: "#797979",
        darkGray: "#333333",
        aside: "#4c4c4e",
        rte: "#393939",
        subtitle: "#b9b9b9"
      },
      width: {
        "372": "372px",
        "1/10": "10%",
        "2/10": "20%",
        "3/10": "30%",
        "4/10": "40%",
        "5/10": "50%",
        "6/10": "60%",
        "7/10": "70%",
        "8/10": "80%",
        "9/10": "90%"
      }
    }
  },
  corePlugins: {
    container: false
  },
  future: {
    removeDeprecatedGapUtilities: true
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
            paddingBottom: theme("spacing.desktop")
          }
        }
      });
    }
  ]
};
