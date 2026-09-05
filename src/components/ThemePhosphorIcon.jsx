import React from 'react';
import {HouseIcon,StorefrontIcon,ShoppingBagIcon,ReceiptIcon,UserCircleIcon} from '@phosphor-icons/react';
const MAP={house:HouseIcon,storefront:StorefrontIcon,'shopping-bag':ShoppingBagIcon,receipt:ReceiptIcon,'user-circle':UserCircleIcon};
export function ThemePhosphorIcon({name,size=16,active=false,activeStyle='filled'}){const Component=MAP[name]||HouseIcon;const weight=active?(activeStyle==='duotone'?'duotone':activeStyle==='outline'?'regular':'fill'):'regular';return <Component size={size} weight={weight} aria-hidden="true"/>}
