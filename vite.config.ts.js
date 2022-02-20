// vite.config.ts
import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import WindiCSS from "vite-plugin-windicss";
import VueI18n from "@intlify/vite-plugin-vue-i18n";
import ViteComponents from "vite-plugin-components";
import PurgeIcons from "vite-plugin-purge-icons";
import ViteFonts from "vite-plugin-fonts";
import svgLoader from "vite-svg-loader";
var vite_config_default = defineConfig({
  server: {
    port: 4e3
  },
  resolve: {
    alias: {
      "/@": path.resolve("D:\\Workspaces\\node\\code-crates", "./src")
    }
  },
  plugins: [
    vue(),
    svgLoader(),
    ViteComponents({
      extensions: ["vue"]
    }),
    ViteFonts({
      google: {
        families: ["Open Sans", "Montserrat", "Fira Sans"]
      }
    }),
    WindiCSS({
      safelist: "prose prose-sm m-auto text-left"
    }),
    PurgeIcons({}),
    VueI18n({
      include: [path.resolve("D:\\Workspaces\\node\\code-crates", "./locales/**")]
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSc7XG5pbXBvcnQgV2luZGlDU1MgZnJvbSAndml0ZS1wbHVnaW4td2luZGljc3MnO1xuaW1wb3J0IFZ1ZUkxOG4gZnJvbSAnQGludGxpZnkvdml0ZS1wbHVnaW4tdnVlLWkxOG4nO1xuaW1wb3J0IFZpdGVDb21wb25lbnRzIGZyb20gJ3ZpdGUtcGx1Z2luLWNvbXBvbmVudHMnO1xuaW1wb3J0IFB1cmdlSWNvbnMgZnJvbSAndml0ZS1wbHVnaW4tcHVyZ2UtaWNvbnMnO1xuaW1wb3J0IFZpdGVGb250cyBmcm9tICd2aXRlLXBsdWdpbi1mb250cyc7XG5pbXBvcnQgc3ZnTG9hZGVyIGZyb20gJ3ZpdGUtc3ZnLWxvYWRlcic7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBzZXJ2ZXI6IHtcbiAgICBwb3J0OiA0MDAwLFxuICB9LFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICcvQCc6IHBhdGgucmVzb2x2ZShcIkQ6XFxcXFdvcmtzcGFjZXNcXFxcbm9kZVxcXFxjb2RlLWNyYXRlc1wiLCAnLi9zcmMnKSxcbiAgICB9LFxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgdnVlKCksXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2pwa2xlZW1hbnMvdml0ZS1zdmctbG9hZGVyXG4gICAgc3ZnTG9hZGVyKCksXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FudGZ1L3ZpdGUtcGx1Z2luLWNvbXBvbmVudHNcbiAgICBWaXRlQ29tcG9uZW50cyh7XG4gICAgICBleHRlbnNpb25zOiBbJ3Z1ZSddLFxuICAgIH0pLFxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9zdGFmeW5pYWtzYWNoYS92aXRlLXBsdWdpbi1mb250cyNyZWFkbWVcbiAgICBWaXRlRm9udHMoe1xuICAgICAgZ29vZ2xlOiB7XG4gICAgICAgIGZhbWlsaWVzOiBbJ09wZW4gU2FucycsICdNb250c2VycmF0JywgJ0ZpcmEgU2FucyddLFxuICAgICAgfSxcbiAgICB9KSxcblxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbnRmdS92aXRlLXBsdWdpbi13aW5kaWNzc1xuICAgIFdpbmRpQ1NTKHtcbiAgICAgIHNhZmVsaXN0OiAncHJvc2UgcHJvc2Utc20gbS1hdXRvIHRleHQtbGVmdCcsXG4gICAgfSksXG5cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW50ZnUvcHVyZ2UtaWNvbnMvdHJlZS9tYWluL3BhY2thZ2VzL3ZpdGUtcGx1Z2luLXB1cmdlLWljb25zXG4gICAgUHVyZ2VJY29ucyh7XG4gICAgICAvKiBQdXJnZUljb25zIE9wdGlvbnMgKi9cbiAgICB9KSxcblxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9pbnRsaWZ5L3ZpdGUtcGx1Z2luLXZ1ZS1pMThuXG4gICAgVnVlSTE4bih7XG4gICAgICBpbmNsdWRlOiBbcGF0aC5yZXNvbHZlKFwiRDpcXFxcV29ya3NwYWNlc1xcXFxub2RlXFxcXGNvZGUtY3JhdGVzXCIsICcuL2xvY2FsZXMvKionKV0sXG4gICAgfSksXG4gIF0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUE7QUFBQSxFQUVSLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLE1BQU0sS0FBSyxRQUFRLHFDQUFxQztBQUFBO0FBQUE7QUFBQSxFQUc1RCxTQUFTO0FBQUEsSUFDUDtBQUFBLElBRUE7QUFBQSxJQUVBLGVBQWU7QUFBQSxNQUNiLFlBQVksQ0FBQztBQUFBO0FBQUEsSUFHZixVQUFVO0FBQUEsTUFDUixRQUFRO0FBQUEsUUFDTixVQUFVLENBQUMsYUFBYSxjQUFjO0FBQUE7QUFBQTtBQUFBLElBSzFDLFNBQVM7QUFBQSxNQUNQLFVBQVU7QUFBQTtBQUFBLElBSVosV0FBVztBQUFBLElBS1gsUUFBUTtBQUFBLE1BQ04sU0FBUyxDQUFDLEtBQUssUUFBUSxxQ0FBcUM7QUFBQTtBQUFBO0FBQUE7IiwKICAibmFtZXMiOiBbXQp9Cg==
