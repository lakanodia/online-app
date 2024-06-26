export interface IProduct {
    _id: string;
    title: string;
    description: string;
    issueDate: Date;
    thumbnail: string;
    stock: number;
    rating: number;
    brand: string;
    warranty: number;
    price: {
      current: number;
      currency: string;
      beforeDiscount: number;
      discountPercentage: number;
    };
    category: {
      id: string;
      name: string;
      image: string;
    };
    images: string[];
  }


  export interface ICategory {
    id: string;
    name: string;
    image: string;
  }


  export interface CartItem {
    totalPrice: number;
    productId: string;
    title: string;
    price: number;
    quantity: number;
    thumbnail: string;
  }