<script setup lang="ts">
import { message } from 'ant-design-vue'

type AccountCache = {
  account?: string
  password?: string
  lastLoginDate: number
  token?: string
}

const account = ref('')
const password = ref('')

const loading = ref(false)

const autoLogin = useLocalStorage<boolean>('__account_auto_login', false)
const rememberMe = useLocalStorage<boolean>('__remember_me', false)
const userAccountCache = useLocalStorage<Record<string, AccountCache>>('__logged_account_cache', {})

watch(
  () => autoLogin.value,
  (v) => {
    if (v) {
      rememberMe.value = true
    }
  },
)

watch(
  () => rememberMe.value,
  (v) => {
    if (!v) autoLogin.value = false
  },
)

const loggedUser = computed(() => {
  return Object.entries(userAccountCache.value)
    .map(([_key, value]) => value)
    .sort((a, b) => a.lastLoginDate - b.lastLoginDate)
    .map((i) => ({ value: i.account }))
})

// const { validateWithShowDialog } = useValidator({
//   account: { type: 'string', required: true, message: '用户名不能为空' },
//   password: { type: 'string', required: true, message: '密码不能为空' },
// })

async function login() {
  // const res = await validateWithShowDialog({
  //   account: account.value,
  //   password: password.value,
  // })

  // if (res) {
  //   loading.value = true

  //   try {
  //     const { data } = await $http.post<{ userId: string }>('/auth/login', {
  //       account: account.value,
  //       password: encrypt(password.value),
  //     })

  //     userAccountCache.value[account.value] = {
  //       account: account.value,
  //       lastLoginDate: new Date().getTime(),
  //     }

  //     if (rememberMe.value) {
  //       userAccountCache.value[account.value].password = password.value
  //     }

  //     window.electronAPI.send('login', data.userId)
  //   }
  //   catch (e: any) {
  //     message.error(e.response.data.message)
  //   }
  //   finally {
  //     loading.value = false
  //   }
  // }
}

function selectAccount(value: any) {
  if (value) {
    account.value = userAccountCache.value[value].account || ''
    password.value = userAccountCache.value[value].password || ''

    return userAccountCache.value[value].token
  }
}

onMounted(() => {
  selectAccount(loggedUser.value[0]?.value)

  if (autoLogin.value && account.value && password.value) {
    login()
  }
})
</script>

<template>
  <AForm
    layout="vertical"
    size="large"
  >
    <AFormItem>
      <AAutoComplete
        id="accountFiled"
        v-model:value="account"
        :options="loggedUser"
        placeholder="请输入手机号/邮箱/账号"
        @select="selectAccount"
      />
    </AFormItem>

    <AFormItem class="mt-[-4px]">
      <a-input-password
        v-model:value="password"
        placeholder="请输入密码"
      />
    </AFormItem>

    <div
      w-full
      flex
      pos-relative
      bottom-4
    >
      <a-checkbox v-model:checked="autoLogin">
        <span text-xs>下次自动登录</span>
      </a-checkbox>

      <a-checkbox v-model:checked="rememberMe">
        <span text-xs>记住密码</span>
      </a-checkbox>
    </div>

    <AFormItem mt-3>
      <AButton
        w-full
        type="primary"
        :loading="loading"
        @click="login"
      >
        登录
      </AButton>
    </AFormItem>
  </AForm>
</template>
