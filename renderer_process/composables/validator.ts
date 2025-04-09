import type { Rules, ValidateOption, Value } from 'async-validator'
import Schema from 'async-validator'

import { message } from 'ant-design-vue'

export function useValidator(descriptor: Rules, validatorOptions: ValidateOption = {}) {
  const schema = new Schema(descriptor)

  const defaultOptions: ValidateOption = {
    first: true,
  }

  function validate(source: Value) {
    return new Promise<boolean>((resolve, reject) => {
      schema
        .validate(source, Object.assign(defaultOptions, validatorOptions))
        .then(() => resolve(true))
        .catch(({ errors }) => {
          reject(new Error(errors[0].message))
        })
    })
  }

  async function validateWithShowDialog(source: Value) {
    let result = false
    try {
      result = await validate(source)
    } catch (e: any) {
      message.warn(e.message)
    }

    return result
  }

  return {
    validate,
    validateWithShowDialog,
  }
}

export function useFormData(data: Ref<Record<string, unknown>> | Record<string, unknown>) {
  const raw = unref(data)

  const form = new FormData()

  Object.entries(raw).forEach(([key, value]) => {
    form.set(key, value as string)
  })

  return form
}
