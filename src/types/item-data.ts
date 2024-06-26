export interface ItemData {
  id: string
  name: string
  code: string | null
  price: {
    old_price: number | null
    current_price: number
  }
  image: {
    url: string
  }
  material: number
  labelData?: {
    labelText: string
    type: string
  }
}
