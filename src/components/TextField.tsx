import { defineComponent, h, watch } from 'vue'
import {
  InputDecoration,
  Key,
  Maybe,
  TextEditingController,
  TextInputType,
  TextInputTypes,
  ValueChanged,
} from '..'

interface TextFieldI {
  key?: Maybe<Key>
  controller?: Maybe<TextEditingController>
  keyboardType?: Maybe<TextInputType>
  maxLength?: Maybe<number>
  onChanged?: Maybe<ValueChanged<string>>
  decoration?: Maybe<InputDecoration>
}

export const TextField = ({
  key,
  controller,
  maxLength,
  keyboardType,
  decoration,
  onChanged,
}: TextFieldI) => {
  const effectiveController = controller ?? TextEditingController.default
  const effectiveKeyboardType = keyboardType ?? TextInputType.default
  const effectiveMaxLength = maxLength ?? undefined
  const effectiveDecoration = decoration ?? InputDecoration.default
  const classStyles = [effectiveDecoration.css, 'outline-none', 'w-full'].join(
    ' '
  )
  return defineComponent({
    name: 'TextField',
    setup() {
      if (onChanged) {
        watch(
          effectiveController.text,
          async (newValue, oldValue) => await onChanged(newValue, oldValue)
        )
      }
    },
    render() {
      const inputField = (
        <input
          type={
            controller?.obscureText
              ? 'password'
              : effectiveKeyboardType.textInputType
          }
          readonly={effectiveController.readOnly}
          maxlength={effectiveMaxLength}
          max={effectiveMaxLength}
          class={classStyles}
          inputmode={effectiveKeyboardType.htmlInputMode}
          v-model={effectiveController.text.value}
        />
      )
      const textAreaField = (
        <textarea
          class={classStyles}
          readonly={effectiveController.readOnly}
          maxlength={effectiveMaxLength}
          v-model={effectiveController.text.value}
        />
      )
      const textField: JSX.Element = (() => {
        switch (true) {
          case effectiveKeyboardType.textInputType == TextInputTypes.number:
            return inputField
          case effectiveKeyboardType.textInputType == TextInputTypes.text:
          default:
            return effectiveController.maxLines == 1
              ? inputField
              : textAreaField
        }
      })()
      return h('div', {}, [h(textField)])
    },
  })
}
