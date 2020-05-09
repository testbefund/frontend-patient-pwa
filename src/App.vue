<template>
  <router-view/>
</template>

<style lang="scss">
  @import "~vue-material/dist/theme/engine";
  @import "variables";

  @include md-register-theme("default", (
    primary: $primary, // The primary color of your application
    accent: $accent, // The accent or secondary color
    theme: "light"
  ));

  @import "~vue-material/dist/theme/all"; // Apply the theme

  // Custom component styling
  // Unfortunately, vue-material does not allow us to set the full material color palette (including bg colors) on a component level, so we have
  // to do this...
  .md-list-item {
    background-color: $primary;
    border-radius: 50px;
    margin-left: 8px;
    margin-right: 8px;
    margin-bottom: 16px;
  }

  .md-app-toolbar {
    background-color: white !important;
  }

  .testbefund-list-item {
    color: $textColor
  }

  .md-list-item-text {
    color: $textColor !important;
  }

  .md-list.md-theme-default.md-double-line .md-list-item-text :nth-child(2) {
    color: $textColor !important;
  }

  .md-icon.md-theme-default.md-icon-font {
    color: $textColor;
  }

</style>
