module.exports = () => ({
  plugins: [
    require("tailwindcss"),
    require("postcss-import"),
    require("postcss-preset-env")({
      stage: 3,
      features: {
        "color-function": { unresolved: "warn" },
        "nesting-rules": true,
        "custom-media-queries": {
          preserve: false
        },
        "custom-properties": {
          preserve: false
        }
      }
    })
  ]
});
