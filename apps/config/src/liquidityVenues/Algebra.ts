import type { Address } from "viem";

import { plume } from "../config";

export const MIN_SQRT_RATIO = 4295128739n;
export const MAX_SQRT_RATIO = 1461446703485210103287273052203988822378723970342n;

export const DEFAULT_FACTORY_ADDRESS = "0x1eB9822d5176C88B1d4eec353fa956C896D77Df9" as Address;

export const specificFactoryAddresses: Record<number, Address> = {
  [plume.id]: "0x1eB9822d5176C88B1d4eec353fa956C896D77Df9",
};

export const FEE_TIERS = [500, 3000, 10000];
