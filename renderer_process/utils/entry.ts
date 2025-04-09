import type { DefineComponent } from 'vue'
import { createApp, defineComponent } from 'vue'
import { ConfigProvider } from 'ant-design-vue'

export function createCommonEntry(root: DefineComponent<{}, {}, any>) {
  const layout = root.layout ? root.layout : 'default'

  const theme = root.theme ? root.theme : 'light'

  const LayoutComponent = defineAsyncComponent(() => import(`@/layouts/${layout}.vue`))

  return createApp(
    defineComponent({
      setup() {
        const themeTokenMap = ref()

        switch (theme) {
          case 'light':
            themeTokenMap.value = defaultTokenMap
            break
          case 'dark':
            themeTokenMap.value = darkTokenMap
            break
          default:
            themeTokenMap.value = tokenMap
        }

        return () =>
          h(
            ConfigProvider,
            { token: themeTokenMap.value },
            {
              default: () =>
                h(
                  LayoutComponent,
                  {},
                  {
                    default: () => h(root),
                  },
                ),
            },
          )
      },
    }),
  )
}
