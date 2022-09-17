import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary:"#ff4d4f", // #E53935 ff0000 原先：ff4d4f
            secondary: "#FFCDD2", // #FFCDD2
            accent: "#ffe58f", // #3F51B5
          },
        },
      },
});
