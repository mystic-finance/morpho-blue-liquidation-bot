import type { Address } from "viem";

import { plume } from "../config";

export const DEFAULT_ALGEBRA_FACTORY_ADDRESS = "0x1eB9822d5176C88B1d4eec353fa956C896D77Df9" as Address;

export const specificAlgrebraFactoryAddresses: Record<number, Address> = {
  [plume.id]: "0x1eB9822d5176C88B1d4eec353fa956C896D77Df9",
};

export const ALGEBRA_FEE_TIERS = [500, 3000, 10000];
