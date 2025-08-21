import { redirect } from 'next/navigation';

export default function OrdersIndexPage() {
  redirect('/account/orders');
}

