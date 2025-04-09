export const TABS_KEY = Symbol() as InjectionKey<Ref<string>>
export const TABS_ITEM_FN = Symbol() as InjectionKey<(value: string, x: number) => void>
export const TABS_ITEM_SELECT = Symbol() as InjectionKey<(value: string) => void>
