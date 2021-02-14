# Vue3 styled like Flutter with Tailwind CSS

[![Gitter chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/xsoulspace/vft)

**Please notice: this project is a work in progress and completely experimental!**

The reason & motivation why this project have been started is a question: Flutter & Dart awesome! Vue3 & Typescript & Tailwind awesome too!

But...

Flutter is not working inside Excel:( and its kind of complicated to work with web libraries.

So, what if we will write Vue3 TS in style of Flutter, because it's just simplier and faster?

Please notice:

- It is **not** a Flutter **at all** and even close, but hopefully will be use its style of components & methods writing.
- It is **not** properly written **at all** and cannot be used in production until release 1.
- It is not aligned to any standard yet and do not have any styling at all and it looks bad:) as primary focus now is to write basic widgets.
- All is **subject to change** until release 1.
- If you like this project - contributing &|| star is very welcome and appreciated and will keep development running Open Source and free:)

### Awesome tools used

- Typescript
- Vue3
- Tailwind
- [vue3-virtual-scroller](https://www.npmjs.com/package/vue3-virtual-scroller)
- [vue-grid-layout](https://www.npmjs.com/package/vue-grid-layout/v/3.0.0-beta1)

### Installation

Add this package to your package.json file:

```json
"dependencies": {
  "@xsoulspace/vue_flutter_tailwind": "next"
}
```

add styling to your main.ts

```typescript
import '@xsoulspace/vue_flutter_tailwind/dist/vft.css'
```

### Usage

```typescript
export const wrapperApp = () => {
  const text = ref('Hello world!')
  const text2 = ref(2)
  const padding = EdgeInsets.all(EdgeInsetsStep.s3)

  const textCard = Padding({
    child: Text({
      text,
    }),
    padding,
  })

  const btn = ElevatedButton({
    child: Text({ text: ref('Hello Button') }),
    onPressed: () => {
      text2.value++
      text.value = `Hello Wolrd! Counter: ${text2.value}`
    },
  })

  return Scaffold({
    body: Align({
      toOverlay: true,
      alignment: Alignment.bottom,
      child: Container({
        padding,
        decoration: new BoxDecoration({
          boxShadow: BoxShadow.xl,
          borderRadius: BorderRadius.vertical({ bottom: BorderRadiusStep.xxl }),
        }),
        child: Row({
          crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            MouseRegion({
              child: btn,
              cursor: SystemMouseCursor.use({
                cursor: SystemMouseCursors.click,
              }),
            }),
            textCard,
          ],
        }),
      }),
    }),
  })
}
```

# Roadmap

## Ready to test and possible to use

- [] Provider

### Usage:

Let's suppose we have a model:

```typescript
export class Hero {
  constructor(public name: string) {}
}
export class HeroesModel {
  heroes = reactive<Maybe<Hero>[]>([])
  add(hero: Hero) {
    this.heroes.push(hero)
  }
  get count() {
    return this.heroes.length
  }
}
```

Create Provider on top of tree

```typescript
MultiProvider.create({
  models: [HeroesModel],
  child: wrapperApp(),
})
```

And somewhere in tree just call

```typescript
const heroModel = MultiProvider.get<HeroesModel>(HeroesModel)
```

- [x] Text Widget, FontWeight, TextDecoration, TextStyle, TextAlign, TextOverflow
- [x] Alignment, Align, Center
- [x] Padding
- [x] Margin
- [x] ButtonStyleButton
- [x] Flex
- [x] Row (Flex -> row)
- [x] Column (Flex -> column)
- [x] DividerDecoration (only for Row, Column)
- [x] MouseRegion
- [x] TextButton
- [x] Elevated Button
- [x] ListView.builder made with [vue3-virtual-scroller](https://www.npmjs.com/package/vue3-virtual-scroller) - must be placed inside SizedBox to have defined size
- [x] ConstrainedBox
- [x] SizedBox
- [x] Opacity
      [x] widget
      [x] Text
- [x] ColoredBox
- [x] CheckboxListTile
- [x] ListTile
- [x] Grid, GridTile with awesome [vue-grid-layout](https://www.npmjs.com/package/vue-grid-layout/v/3.0.0-beta1)
- [x] Wrap (Flex - flex-wrap)
- [x] Dialog

### Usage

First - get NavigationController in setup

Be sure that you have Navigation widget on top of tree

```typescript
const navigationController = MultiProvider.get<NavigationController>(
  NavigationController
)
```

Second call a function from for example Button.onTap:

```typescript
ElevatedButton({
  child: Text({
    text: ref('Show dialog'),
  }),
  onTap: () => {
    showDialog({
      builder: Dialog({
        child: Text({ text: ref('Hello World') }),
      }),
      navigationController,
    })
  },
}),
```

To close, just use `navigationController.pop()`

- [x] Navigation & NavigationController
  - [x] Popup (with background) functionality
  - [x] Fullscreen functionality

### Usage:

Add controller into MultiPorvider and Navigation widget below:

```typescript
MultiProvider.create({
  models: [NavigationController, ...],
  child: Navigation({
    child: ...,
  }),
})
```

## WIP

- [] DropdownButton, DropdownButtonItem
  [x] functionality
  [] decoration

- [] Visibility
  [x] functionality
  [] animation

- [] TextField
  [x] Basic properties
  [x] TextEditingController
  [] InputDecoration (partially)
  [] TextStyle

- [x] Checkbox
      [x] Basic
      [] Style

- [] GestureDetecture
  [x] click
  [] tap
  [] swipes
  [] hover

- [] Container
  [x] Border
  [x] BorderRadius
  [x] Color
  [x] Shadow
  [] Margin
  [x] Padding
  [] Color Opacity ? Border Color Opacity
  [] Shape
  [] Gradient
  [] Alignment
  [] Image
  [x] Height
  [x] Width

- [] Material
- [] InkWell
- [] Colors
  [x] White, black
  [] Color palette

- [] Scaffold

## Next

- [] Flexible
- [] OutlinedButton
- [] Ripple
- [] Drawer
- [] Progress
- [] Card
- [] AppBar
- [] Icon
- [] IconButton
- [] Bar
- [] ButtonBar
- [] ListView, ListView.separeted
- [] Object Fit - FitBox?, FittedBox?

# Current Problems:

- [] Tailwind included as package, but needs to be included to main.ts(js) when this package added. Maybe it's a wrong way..
- [] Sizes cannot be set as numbers.

# Changelog

Changelog can be found in [Releases](https://github.com/xsoulspace/vue_flutter_tailwind/releases)
