import { plume } from "../config";
import type { Address } from "viem";
import { base } from "viem/chains";

export const MIN_SQRT_RATIO = 4295128739n;
export const MAX_SQRT_RATIO = 1461446703485210103287273052203988822378723970342n;

export const DEFAULT_FACTORY_ADDRESS = "0x1F98431c8aD98523631AE4a59f267346ea31F984" as Address;

export const specificFactoryAddresses: Record<number, Address> = {
  [base.id]: "0x33128a8fC17869897dcE68Ed026d694621f6FDfD",
  [plume.id]: "0x1eB9822d5176C88B1d4eec353fa956C896D77Df9"
};

export const FEE_TIERS = [500, 3000, 10000];
