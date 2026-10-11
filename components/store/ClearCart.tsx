'use client';

import { useEffect } from 'react';
import { useCart } from './useCart';

/** After a completed checkout the cart is emptied. */
export default function ClearCart() {
  const { clear } = useCart();
  useEffect(() => { clear(); }, [clear]);
  return null;
}
