import { Purchases } from '@revenuecat/purchases-capacitor';
import { Capacitor } from '@capacitor/core';

const RC_IOS_KEY = import.meta.env.VITE_RC_IOS_KEY as string;
const RC_ANDROID_KEY = import.meta.env.VITE_RC_ANDROID_KEY as string;

export const RC_ENTITLEMENT = 'The Seahorse Club Pro';

let rcInitialized = false;

export async function initPurchases(userId: string) {
  if (!Capacitor.isNativePlatform()) return;
  const apiKey = Capacitor.getPlatform() === 'android' ? RC_ANDROID_KEY : RC_IOS_KEY;
  await Purchases.configure({ apiKey, appUserID: userId });
  rcInitialized = true;
}

export async function loginPurchases(userId: string) {
  if (!Capacitor.isNativePlatform()) return;
  await Purchases.logIn({ appUserID: userId });
}

export async function getOfferings() {
  if (!Capacitor.isNativePlatform()) throw new Error('not-native');
  if (!rcInitialized) throw new Error('rc-not-ready');
  return Purchases.getOfferings();
}

export async function purchasePackage(aPackage: any) {
  if (!Capacitor.isNativePlatform()) throw new Error('not-native');
  return Purchases.purchasePackage({ aPackage });
}

export async function restorePurchases() {
  if (!Capacitor.isNativePlatform()) throw new Error('not-native');
  return Purchases.restorePurchases();
}

export async function getCustomerInfo() {
  if (!Capacitor.isNativePlatform()) return null;
  const { customerInfo } = await Purchases.getCustomerInfo();
  return customerInfo;
}

export function hasActiveEntitlement(customerInfo: any): boolean {
  return !!customerInfo?.entitlements?.active?.[RC_ENTITLEMENT];
}
