// ABSTRACT WIDGET! DO NOT USE IT

import { Component, defineComponent, h } from 'vue'
import { ConstrainedBox, InkWell, Material, Opacity, Padding } from '.'
import {
  BoxConstraints,
  ButtonStyle,
  GestureTapCallback,
  Key,
  Maybe,
  OpacityDecoration,
  OpacityDecorationSteps,
  SystemMouseCursors,
} from '..'

export interface ButtonStyleButtonI {
  child: Component
  key?: Maybe<Key>
  style?: Maybe<ButtonStyle>
  onTap?: Maybe<GestureTapCallback>
  expand?: boolean
}
export const ButtonStyleButton = ({
  child,
  key,
  onTap,
  style,
  expand,
}: ButtonStyleButtonI) => {
  const isDisabled = onTap == null
  const constraints = new BoxConstraints({})
  const finalStyle = style ?? ButtonStyle.default
  const {
    padding,
    backgroundColor,
    elevation,
    mouseCursor,
    borderRadius,
    boxBorder,
    focusColor,
    highlightColor,
    hoverColor,
    textStyle,
  } = finalStyle

  const materialWidget = Material({
    borderRadius,
    color: backgroundColor,
    elevation: elevation,
    textStyle,
    boxBorder,
    child: InkWell({
      focusColor,
      highlightColor,
      hoverColor,
      mouseCursor: isDisabled ? SystemMouseCursors.basic : mouseCursor.cursor,
      onTap,
      child: Padding({
        padding,
        child: child,
      }),
    }),
  })

  const result = ConstrainedBox({
    constraints,
    child: isDisabled
      ? Opacity({
          child: materialWidget,
          opacity: OpacityDecoration.use({
            opacity: OpacityDecorationSteps.s50,
          }),
        })
      : materialWidget,
  })
  return defineComponent({
    name: 'ButtonStyleButton',
    render() {
      return h(
        'div',
        { class: ['relative select-none', expand ? 'w-full' : ''].join(' ') },
        [h(result)]
      )
    },
  })
}
