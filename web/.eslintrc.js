module.exports = {
  plugins: ["prettier"],
  extends: [
    "standard",
    "standard-react",
    "plugin:prettier/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
  ],
  rules: {
    "react/prop-types": 0,
    "object-curly-spacing": ["error", "never"],
  },
  settings: {
    react: {
      pragma: "React",
      version: "16.8.4",
    },
  },
};
