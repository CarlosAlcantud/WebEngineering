'use client';

import { CartItemsContext } from "@/providers/CartItemsProvider";
import PlusIcon from "@heroicons/react/24/outline/PlusIcon";
import MinusIcon from "@heroicons/react/24/outline/MinusIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import { useSession } from "next-auth/react";
import { useContext, useState } from "react";

interface CartItemCounterProps {
    productId: string;
}

export default function CartItemCounter({ productId }: CartItemCounterProps) {
    const { data: session } = useSession({ required: true });
    const { cartItems, updateCartItems } = useContext(CartItemsContext);
    const [isUpdating, setIsUpdating] = useState(false);

    const cartItem = cartItems.find(
        (cartItem) => cartItem.product._id === productId
    );
    const qty = cartItem ? cartItem.qty : 0;

    const onPlusBtnClick = async function (event: React.MouseEvent) {
        setIsUpdating(true);

        try {
            const res = await fetch(
                 `/api/users/${session!.user._id}/cart/${productId}`,
                {
                    method: "PUT",
                    body: JSON.stringify({
                        qty: qty + 1,
                    }),
                }
            );

            if (res.ok) {
                const body = await res.json();
                updateCartItems(body.cartItems);
            }
        } finally {
            setIsUpdating(false);
        }
    };

    const onMinusBtnClick = async function (event: React.MouseEvent) {
        setIsUpdating(true);

        try {
            const res = await fetch(
              `/api/users/${session!.user._id}/cart/${productId}`,
                {
                    method: "PUT",
                    body: JSON.stringify({
                        qty: qty - 1,
                    }),
                }
            );

            if (res.ok) {
                const body = await res.json();
                updateCartItems(body.cartItems);
            }
        } finally {
            setIsUpdating(false);
        }
    };

    const onDeleteAllBtnClick = async function (event: React.MouseEvent) {
        setIsUpdating(true);

        try {
            const res = await fetch(
              `/api/users/${session!.user._id}/cart/${productId}`,
                {
                    method: "DELETE",
                }
            );

            if (res.ok) {
                const body = await res.json();
                updateCartItems(body.cartItems);
            }
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <>
            <div className="flex grow mt-3">
                <button
                    onClick={onMinusBtnClick}
                    className="relative inline-flex items-center rounded-l-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:bg-gray-100 disabled:text-gray-400"
                    disabled={!session || isUpdating || qty <= 0}
                >
                    <span className="sr-only">Subtract one</span>
                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                </button>

                <div className="relative inline-flex grow items-center justify-center bg-white px-3 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300">
                    {qty}
                </div>

                <button
                    onClick={onPlusBtnClick}
                    className="relative inline-flex items-center rounded-r-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:bg-gray-100 disabled:text-gray-400"
                    disabled={!session || isUpdating}
                >
                    <span className="sr-only">Add one</span>
                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                </button>

                <div className='pl-3'>
                    <button
                        onClick={onDeleteAllBtnClick}
                        className="relative inline-flex items-center rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:bg-gray-100 disabled:text-gray-400"
                        disabled={!session || isUpdating}
                        style={{
                            backgroundColor: 'rgba(255, 192, 203, 0.5)',
                        }}
                    >
                        <span className="sr-only">Delete all</span>
                        <TrashIcon className="h-5 w-5 hover:text-red-500" aria-hidden="true" />
                    </button>
                </div>
            </div>
        </>
    );
}