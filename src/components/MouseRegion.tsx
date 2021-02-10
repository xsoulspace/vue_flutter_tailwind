import { Component, defineComponent, h } from 'vue'
import { Key, Maybe, SystemMouseCursor, SystemMouseCursors } from '..'

interface MouseRegionI {
  child: Component
  key?: Maybe<Key>
  cursor: SystemMouseCursors
}

// Defines cursor image
export const MouseRegion = ({ child, key, cursor }: MouseRegionI) => {
  const resolvedCursor = SystemMouseCursor.use({ cursor })
  return defineComponent({
    name: 'InkWell',
    render() {
      return h('div', { class: resolvedCursor.css }, [h(child)])
    },
  })
}
