

/**
 * Data Transfer Object for creating a product
 */
export interface ProductDtos {
  /** Name of the product */
    name: string
  /** Price of the product as a string (e.g. "99.99") */
    price: string
  /** File object for the product image */
    image: File | null
}

/**
 * Data Transfer Object for updating a product
 */
export interface UpdateProductDtos {
  /** Name of the product */
    name?: string
  /** Price of the product as a string (e.g. "99.99") */
    price?: string
  /** File object for the product image */
    image?: File | null
}


export interface Product extends CardProps{
  /** ISO date string of when the product was created */
    created_at: string
  /** ISO date string of when the product was last updated */
    updated_at: string
}

export interface CardProps{
  /** Unique identifier for the product */
    id: number
  /** Name of the product */
    name: string
  /** Price of the product as a string (e.g. "99.99") */
    price: string
  /** URL to the product's image */
    image_url: string
  /** deleted function*/
    onDelete: (id: number) => void
}


export interface ConfirmationProps {
    message: string
    onConfirm: () => void
    onCancel: () => void
    loading?: boolean
}

export interface ProductFormProps {
    initialData?: Product; // لما نكون بال editing
    onSubmit: (data: ProductDtos | UpdateProductDtos) => void; 
    loading?: boolean;
}