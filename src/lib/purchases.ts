import { CapacitorPurchases as Purchases } from '@capgo/capacitor-purchases';
import { Capacitor } from '@capacitor/core';

const RC_IOS_KEY = import.meta.env.VITE_RC_IOS_KEY as string;
const RC_ANDROID_KEY = import.meta.env.VITE_RC_ANDROID_KEY as string;

export const RC_ENTITLEMENT = 'The Seahorse Club Pro';

export async function initPurchases(userId: string) {
  const apiKey = Capacitor.getPlatform() === 'android' ? RC_ANDROID_KEY : RC_IOS_KEY;
  await Purchases.setup({ apiKey, appUserID: userId });
}

export async function loginPurchases(userId: string) {
  await Purchases.logIn({ appUserID: userId });
}

export async function getOfferings() {
  const { offerings } = await Purchases.getOfferings();
  return offerings;
}

export async function purchasePackage(aPackage: any) {
  return Purchases.purchasePackage({
    identifier: aPackage.identifier,
    offeringIdentifier: aPackage.offeringIdentifier,
  });
}

export async function restorePurchases() {
  return Purchases.restorePurchases();
}

export async function getCustomerInfo() {
  const { customerInfo } = await Purchases.getCustomerInfo();
  return customerInfo;
}

export function hasActiveEntitlement(customerInfo: any): boolean {
  return !!customerInfo?.entitlements?.active?.[RC_ENTITLEMENT];
}
