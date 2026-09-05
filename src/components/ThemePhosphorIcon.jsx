import React from 'react';
import {
  BasketIcon,BellIcon,ClipboardTextIcon,CompassIcon,GiftIcon,HandbagIcon,HeartIcon,HouseIcon,ListChecksIcon,
  MagnifyingGlassIcon,MapPinIcon,PackageIcon,ReceiptIcon,ShoppingBagIcon,SquaresFourIcon,StarIcon,StorefrontIcon,
  TagIcon,UserCircleIcon,UserIcon,
} from '@phosphor-icons/react';

export const PLATFORM_PHOSPHOR_ICONS=Object.freeze({
  house:HouseIcon,storefront:StorefrontIcon,'squares-four':SquaresFourIcon,'shopping-bag':ShoppingBagIcon,basket:BasketIcon,
  handbag:HandbagIcon,receipt:ReceiptIcon,'clipboard-text':ClipboardTextIcon,package:PackageIcon,'list-checks':ListChecksIcon,
  'user-circle':UserCircleIcon,user:UserIcon,heart:HeartIcon,star:StarIcon,compass:CompassIcon,
  'magnifying-glass':MagnifyingGlassIcon,tag:TagIcon,gift:GiftIcon,bell:BellIcon,'map-pin':MapPinIcon,
});

export function ThemePhosphorIcon({name,size=16,active=false,activeStyle='filled',color}){
  const Component=PLATFORM_PHOSPHOR_ICONS[name]||HouseIcon;
  const weight=active?(activeStyle==='duotone'?'duotone':activeStyle==='outline'?'regular':'fill'):'regular';
  return <Component size={size} weight={weight} color={color} aria-hidden="true"/>;
}
