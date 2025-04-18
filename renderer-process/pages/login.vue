<script setup lang="ts">
definePageMeta({
  layout: 'empty',
  colorMode: 'light',
})

const loginType = ref('UsernamePassword')
</script>

<template>
  <div class="w-full h-full px-6 box-border">
    <div class="drag absolute top-0 h-14 w-full flex items-center justify-between left-0 box-border px-4">
      <div class="opacity-40">
        <img
          src="/favico.png"
          class="w-6"
          alt=""
        >
      </div>

      <div class="flex items-center">
        <div
          class="opt-icon mr-4"
          @click="setProxyConf"
        >
          <Icon name="ant-design:setting-twotone" />
        </div>

        <div
          class="opt-icon mr-4"
          @click="minWindow"
        >
          <Icon name="ant-design:minus-outlined" />
        </div>

        <div
          class="opt-icon"
          @click="closeWindow"
        >
          <Icon name="ant-design:close-outlined" />
        </div>
      </div>
    </div>

    <div class="w-full h-fit flex flex-col justify-between">
      <div class="mt-15 w-full flex items-center">
        <span class="text-[20px] text-primary">ONLYFUCK STATION</span>
      </div>
    </div>

    <Tabs
      v-model:active="loginType"
      class="mt-2"
      slider-cls="w-6"
    >
      <TabPane
        class="!px-2 text-sm"
        value="UsernamePassword"
      >
        账号登录
      </TabPane>
      <TabPane
        class="!px-2 text-sm"
        value="EmailValidLogin"
      >
        邮箱验证登录
      </TabPane>
    </Tabs>

    <div class="mt-6 px-0 w-full">
      <LoginUsername v-if="loginType === 'UsernamePassword'" />
      <LoginEmailValidLogin v-else />
    </div>

    <LoginAnthorLogin />

    <LoginSwitch
      class="bottom-1 right-0"
      position-absolute
    />
  </div>
</template>

<style scoped>
</style>
