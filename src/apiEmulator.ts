import type { ItemData } from './types/item-data'
import type { Material } from './types/materials'

const items: ItemData[] = [
  {
    id: '1',
    name: 'Ручка дверная',
    code: 'L422WH',
    price: {
      old_price: 400,
      current_price: 355
    },
    image: {
      url: 'door_knob.png'
    },
    material: 1
  },
  {
    id: '8',
    name: 'Петля со стопором',
    code: null,
    price: {
      old_price: 1200,
      current_price: 900
    },
    image: {
      url: 'hinges_lock.png'
    },
    material: 2
  },
  {
    id: '2',
    name: 'Ручка, нержавеющ сталь',
    code: 'L423WH',
    price: {
      old_price: 400.9,
      current_price: 355.555
    },
    image: {
      url: 'stainless_door_knob.png'
    },
    material: 2
  },
  {
    id: '3',
    name: 'Стандартные петли',
    code: 'P424WN',
    price: {
      old_price: null,
      current_price: 75
    },
    image: {
      url: 'hinges_standart.png'
    },
    material: 2
  },
  {
    id: '4',
    name: 'Петля со стопором',
    code: 'PW5AC',
    price: {
      old_price: 270,
      current_price: 200
    },
    image: {
      url: 'hinges_lock.png'
    },
    material: 2
  },
  {
    id: '5',
    name: 'Ручка дверная',
    code: 'LM352',
    price: {
      old_price: null,
      current_price: 720
    },
    image: {
      url: 'door_knob.png'
    },
    material: 1
  },
  {
    id: '6',
    name: 'Ручка, нержавеющ сталь',
    code: null,
    price: {
      old_price: null,
      current_price: 355.555
    },
    image: {
      url: 'stainless_door_knob.png'
    },
    material: 2
  },
  {
    id: '7',
    name: 'Стандартные петли',
    code: 'WD14LK',
    price: {
      old_price: null,
      current_price: 75
    },
    image: {
      url: 'hinges_standart.png'
    },
    material: 2
  },
  {
    id: '8',
    name: 'Петля со стопором',
    code: null,
    price: {
      old_price: 1200,
      current_price: 900
    },
    image: {
      url: 'hinges_lock.png'
    },
    material: 2
  }
]

const materials: Material[] = [
  {
    id: 1,
    name: 'Дерево',
    value: 'wood'
  },
  {
    id: 2,
    name: 'Металл',
    value: 'metal'
  }
]

export class ApiEmulator {
  async getItems(): Promise<ItemData[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(items)
      }, 500)
    })
  }

  async orderItems(): Promise<ItemData[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(items)
      }, 500)
    })
  }

  async filterItems(filterBy: String): Promise<ItemData[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (filterBy === 'all') {
          const filteredItems = items
          resolve(filteredItems)
        } else {
          const material = materials.find((item) => item.value === filterBy)
          const filteredItems = items.filter((item) => item.material === material?.id)
          resolve(filteredItems)
        }
      }, 500)
    })
  }
}
