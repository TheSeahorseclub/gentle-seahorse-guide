import { Purchases } from '@revenuecat/purchases-capacitor';
import { Capacitor } from '@capacitor/core';

const RC_IOS_KEY = import.meta.env.VITE_RC_IOS_KEY as string;
const RC_ANDROID_KEY = import.meta.env.VITE_RC_ANDROID_KEY as string;

export const RC_ENTITLEMENT = 'The Seahorse Club Pro';

let initPromise: Promise<void> | null = null;

function getRevenueCatApiKey(): string {
  const platform = Capacitor.getPlatform();
  const apiKey = platform === 'android' ? RC_ANDROID_KEY : RC_IOS_KEY;
  if (!apiKey || apiKey.includes('REPLACE_WITH')) {
    throw new Error(`RevenueCat API key missing for ${platform}. Set the correct VITE_RC_${platform.toUpperCase()}_KEY in environment variables.`);
  }
  return apiKey;
}

export function initPurchases(userId: string): Promise<void> {
  if (!Capacitor.isNativePlatform()) return Promise.resolve();
  if (!initPromise) {
    const apiKey = getRevenueCatApiKey();
    initPromise = Purchases.configure({ apiKey, appUserID: userId }).then(() => undefined);
  }
  return initPromise;
}

export async function loginPurchases(userId: string) {
  if (!Capacitor.isNativePlatform()) return;
  await Purchases.logIn({ appUserID: userId });
}

export async function getOfferings() {
  if (!Capacitor.isNativePlatform()) throw new Error('not-native');
  if (initPromise) await initPromise;
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
