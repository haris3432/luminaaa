export type CategoryId = 
  | 'all'
  | 'luxury-pret'
  | 'rings'
  | 'necklaces'
  | 'earrings'
  | 'bracelets'
  | 'pearl-sets'
  | 'silver-rings'
  | 'hair-accessories'
  | 'gift-boxes';

export interface Category {
  id: CategoryId;
  name: string;
  iconName: string;
  count: number;
}

export interface Product {
  id: string;
  name: string;
  category: CategoryId;
  price: number;
  originalPrice?: number;
  image: string;
  material: string;
  finish: string;
  description: string;
  dimensions: string;
  inStock: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
  rating: number;
  reviewsCount: number;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

export interface DeliveryDetails {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  deliveryNotes?: string;
}

export type PaymentMethod = 'bank_transfer' | 'jazzcash' | 'easypaisa' | 'cod';

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  deliveryDetails: DeliveryDetails;
  paymentMethod: PaymentMethod;
  transactionId?: string;
  paymentProofUrl?: string;
  paymentProofName?: string;
  status: 'pending_verification' | 'confirmed' | 'dispatched';
  estimatedDelivery: string;
}

export interface Review {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  productName: string;
}
