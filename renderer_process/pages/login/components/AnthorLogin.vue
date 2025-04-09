<script setup lang="ts"></script>

<template>
  <div w-full h-fit py-3>
    <div flex>
      <AButton shape="circle" disabled>
        <template #icon>
          <div class="i-uiw:weixin text-lg"></div>
        </template>
      </AButton>

      <AButton shape="circle" mx-3 disabled>
        <template #icon>
          <div class="text-lg i-cus:github"></div>
        </template>
      </AButton>

      <AButton shape="circle" disabled>
        <template #icon>
          <div class="i-cus:google"></div>
        </template>
      </AButton>
    </div>

    <span py-3 block text-xs text-secondary>其他登录方式</span>
  </div>
</template>
