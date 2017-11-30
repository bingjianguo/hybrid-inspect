/**
 * Created by bingjian on 2017/3/22.
 */
import { networkInterfaces } from 'os';
import { getIPAddress as getIPAddressAlias } from '../extensions/common';

export function getIPAddress() {
  const ip = getIPAddressAlias();
  console.log(`ip=${ip}`);
  return ip;
}
