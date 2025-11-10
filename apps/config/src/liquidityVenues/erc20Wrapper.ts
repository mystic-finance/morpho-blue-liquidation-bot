import type { Address } from "viem";
import { base, mainnet } from "viem/chains";

import { plume } from "../config";

export const wrappers: Record<number, Record<Address, Address>> = {
  [mainnet.id]: {},
  [base.id]: {},
  [plume.id]: {},
};
