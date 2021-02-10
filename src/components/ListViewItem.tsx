import { defineComponent, h } from 'vue'
import { GestureDetector, ItemBuilder } from '..'

export const ListViewItem = defineComponent({
  name: 'ListViewItem',
  props: {
    itemBuilder: {
      type: Function,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  render() {
    const fixedItemBuilder = this.itemBuilder as ItemBuilder
    return h(
      GestureDetector({
        child: fixedItemBuilder({ index: this.index }),
        onTap: () => {
          this.$emit('click')
        },
      })
    )
  },
})
