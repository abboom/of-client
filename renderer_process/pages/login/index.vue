<script setup lang="ts">
import Tabs from '@/components/tabs/Tabs.vue'
import LoginAccountLogin from './components/LoginAccountLogin.vue'
import EmailValidLogin from './components/EmailValidLogin.vue'
import Switch from './components/Switch.vue'
import AuthorLogin from './components/AnthorLogin.vue'

defineOptions({
  layout: 'empty',
  theme: 'light',
  name: 'LoginPage',
})

const loginType = ref('UsernamePassword')

function setProxyConf() {}
</script>

<template>
  <div class="w-full h-full px-6 box-border">
    <div
      class="drag absolute top-0 h-14 w-full flex items-center justify-between left-0 box-border px-4"
    >
      <div class="opacity-40">
        <img src="/favico.png" class="w-6" alt="" />
      </div>
      <div class="flex items-center">
        <div class="opt-icon mr-4" @click="setProxyConf">
          <div class="i-ant-design:setting-twotone text-xl"></div>
        </div>

        <div class="opt-icon mr-4" @click="minWindow">
          <div class="i-ant-design:minus-outlined text-xl"></div>
        </div>

        <div class="opt-icon" @click="closeWindow">
          <div class="i-ant-design:close-outlined text-xl"></div>
        </div>
      </div>
    </div>

    <div class="w-full h-fit flex flex-col justify-between">
      <div class="mt-15 w-full flex items-center">
        <span class="text-[20px] text-primary">ONLYFUCK STATION</span>
      </div>
    </div>

    <Tabs class="mt-2" slider-cls="w-6" v-model:active="loginType">
      <TabsTabPane class="!px-2 text-sm" value="UsernamePassword"> 账号登录 </TabsTabPane>
      <TabsTabPane class="!px-2 text-sm" value="EmailValidLogin"> 邮箱验证登录 </TabsTabPane>
    </Tabs>

    <div class="mt-6 px-0 w-full">
      <LoginAccountLogin v-if="loginType === 'UsernamePassword'"></LoginAccountLogin>
      <EmailValidLogin v-else></EmailValidLogin>
    </div>

    <AuthorLogin></AuthorLogin>

    <Switch class="bottom-1 right-0" position-absolute></Switch>
  </div>
</template>

<style scoped></style>
