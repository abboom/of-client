<script setup lang="ts">
interface Option {
  value: string
}

const filterOption = (input: string, option: Option) => {
  return option.value.toUpperCase().indexOf(input.toUpperCase()) >= 0
}
const value = ref('')
const autoLogin = ref(false)

const options = ref<Option[]>([
  { value: 'Burns Bay Road' },
  { value: 'Downing Street' },
  { value: 'Wall Street' },
])
</script>

<template>
  <AForm
    layout="vertical"
    size="large"
  >
    <AFormItem>
      <AInput placeholder="请输入邮箱" />
    </AFormItem>

    <AFormItem class="mt-[-4px]">
      <AInput placeholder="请输入验证码">
        <template #suffix>
          <AButton
            size="small"
            type="text"
            class="!h-[22px]"
          >
            获取验证码
          </AButton>
        </template>
      </AInput>
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
    </div>

    <AFormItem mt-3>
      <AButton
        w-full
        type="primary"
      >
        登录
      </AButton>
    </AFormItem>
  </AForm>
</template>
