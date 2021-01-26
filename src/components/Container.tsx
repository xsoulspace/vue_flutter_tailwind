import { Alignment, SizedBoxHeight, SizedBoxWidth } from "@/abstract";
import { BoxConstraints } from "@/abstract/BoxConstraints";
import { BoxDecoration } from "@/abstract/BoxDecoration";
import { Color } from "@/abstract/Color";
import { EdgeInsets, EdgeInsetsStep } from "@/abstract/EdgeInsets";
import { Component, defineComponent, h } from "vue";
interface ContainerI {
  child: Component;
  padding?: Maybe<EdgeInsets>;
  margin?: Maybe<EdgeInsets>;
  color?: Maybe<Color>;
  width?: Maybe<EdgeInsetsStep>;
  height?: Maybe<EdgeInsetsStep>;
  decoration?: Maybe<BoxDecoration>;
  // TODO: add ConstrainedBox
  constraints?: Maybe<BoxConstraints>;
  // TODO: add Align
  alignment?: Maybe<Alignment>;
}
export const Container = ({
  child,
  padding,
  margin,
  color,
  height,
  width,
  decoration,
  constraints,
  alignment,
}: ContainerI) => {
  const finalConstraints = constraints ?? new BoxConstraints({});
  const finalAlignment = alignment ?? Alignment.left;
  const sizedBoxHeight = new SizedBoxHeight({ height: height ?? undefined });
  const sizedBoxWidth = new SizedBoxWidth({ width: width ?? undefined });

  const component = defineComponent({
    name: "Container",
    render() {
      const decorationColor = decoration?.color;
      if (decorationColor && color)
        throw Error(
          "You cannot choose simultaniously both colors in decorator and in component! Prefer to use only one"
        );
      const containerClass = [
        "relative",
        "container",
        "flex",
        margin?.marginCss,
        padding?.paddingCss,
        finalConstraints.css,
        finalAlignment.css,
        decorationColor?.backgroundCss ?? color?.backgroundCss ?? "",
        decoration?.css ?? "",
        sizedBoxHeight.css,
        sizedBoxWidth.css,
      ].join(" ");
      const params = { class: containerClass };
      return h("div", params, [h(child)]);
    },
  });
  return component;
};
