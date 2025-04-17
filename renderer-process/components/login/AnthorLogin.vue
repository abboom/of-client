<script setup lang="ts"></script>

<template>
  <div
    w-full
    h-fit
  >
    <div flex>
      <AButton
        shape="circle"
        disabled
      >
        <template #icon>
          <Icon name="uiw:weixin" />
        </template>
      </AButton>

      <AButton
        shape="circle"
        mx-3
        disabled
      >
        <template #icon>
          <Icon name="cus:github" />
        </template>
      </AButton>

      <AButton
        shape="circle"
        disabled
      >
        <template #icon>
          <Icon name="cus:google" />
        </template>
      </AButton>
    </div>

    <span
      py-3
      block
      text-xs
      text-secondary
    >其他登录方式</span>
  </div>
</template>
