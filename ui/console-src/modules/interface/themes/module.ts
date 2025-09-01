import { IconPalette, IconCode, IconEye, IconSettings } from "@halo-dev/components";
import { definePlugin } from "@halo-dev/console-shared";
import { markRaw } from "vue";
import ThemeDetail from "./ThemeDetail.vue";
import ThemeSetting from "./ThemeSetting.vue";
import ThemeLayout from "./layouts/ThemeLayout.vue";
import ThemeBuilder from "./components/development/ThemeBuilder.vue";
import ThemeEditor from "./components/development/ThemeEditor.vue";
import ThemePreview from "./components/development/ThemePreview.vue";

export default definePlugin({
  components: {},
  routes: [
    {
      path: "/theme",
      name: "ThemeRoot",
      component: ThemeLayout,
      meta: {
        title: "core.theme.title",
        searchable: true,
        permissions: ["system:themes:view"],
        menu: {
          name: "core.sidebar.menu.items.themes",
          group: "interface",
          icon: markRaw(IconPalette),
          priority: 0,
        },
      },
      children: [
        {
          path: "",
          name: "ThemeDetail",
          component: ThemeDetail,
        },
        {
          path: "settings/:group",
          name: "ThemeSetting",
          component: ThemeSetting,
          meta: {
            title: "core.theme.settings.title",
            permissions: ["system:themes:view"],
          },
        },
        {
          path: "development",
          name: "ThemeDevelopment",
          component: ThemeBuilder,
          meta: {
            title: "core.theme.development.title",
            permissions: ["system:themes:manage"],
            menu: {
              name: "core.theme.development.menu",
              parent: "core.sidebar.menu.items.themes",
              icon: markRaw(IconCode),
              priority: 1,
            },
          },
        },
        {
          path: "development/editor",
          name: "ThemeEditor",
          component: ThemeEditor,
          meta: {
            title: "core.theme.development.editor.title",
            permissions: ["system:themes:manage"],
            menu: {
              name: "core.theme.development.editor.menu",
              parent: "core.theme.development.menu",
              icon: markRaw(IconCode),
              priority: 1,
            },
          },
        },
        {
          path: "development/preview",
          name: "ThemePreview",
          component: ThemePreview,
          meta: {
            title: "core.theme.development.preview.title",
            permissions: ["system:themes:manage"],
            menu: {
              name: "core.theme.development.preview.menu",
              parent: "core.theme.development.menu",
              icon: markRaw(IconEye),
              priority: 2,
            },
          },
        },
      ],
    },
  ],
});
