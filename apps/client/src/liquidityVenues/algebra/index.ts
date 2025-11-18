import {
    DEFAULT_FACTORY_ADDRESS,
    MAX_SQRT_RATIO,
    MIN_SQRT_RATIO,
    specificFactoryAddresses,
  } from "@morpho-blue-liquidation-bot/config";
  import { executorAbi, type ExecutorEncoder } from "executooor-viem";
  import {
    type Address,
    encodeAbiParameters,
    encodeFunctionData,
    erc20Abi,
    fromHex,
    zeroAddress,
  } from "viem";
  import { readContract } from "viem/actions";
  
  import { algebraFactoryAbi, algebraPoolAbi } from "../../abis/Algebra";
  import type { ToConvert } from "../../utils/types";
  import type { LiquidityVenue } from "../liquidityVenue";
  
  export class AlgebraVenue implements LiquidityVenue {
    private pools: Record<Address, Record<Address, Address>> = {};
  
    async supportsRoute(encoder: ExecutorEncoder, src: Address, dst: Address) {
      if (src === dst) return false;
  
      const pool = this.getCachedPool(src, dst) ?? (await this.fetchPool(encoder, src, dst));
  
      return pool !== undefined;
    }
  
    async convert(encoder: ExecutorEncoder, toConvert: ToConvert) {
      const { src, dst, srcAmount } = toConvert;
  
      const pool = this.getCachedPool(src, dst);
  
      if (!pool) {
        return toConvert;
      }
  
      try {
        const liquidity = await readContract(encoder.client, {
          address: pool,
          abi: algebraPoolAbi,
          functionName: "liquidity",
        });
  
        if (liquidity === 0n) {
          throw new Error("(Algebra) Pool has zero liquidity");
        }
  
        const zeroToOne = fromHex(src, "bigint") < fromHex(dst, "bigint");
  
        const encodedContext =
          `0x${0n.toString(16).padStart(24, "0") + zeroAddress.substring(2)}` as const;
        const callbacks = [
          encodeFunctionData({
            abi: executorAbi,
            functionName: "call_g0oyU7o",
            args: [
              src,
              0n,
              encodedContext,
              encodeFunctionData({
                abi: erc20Abi,
                functionName: "transfer",
                args: [pool, srcAmount],
              }),
            ],
          }),
        ];
  
        encoder.pushCall(
          pool,
          0n,
          encodeFunctionData({
            abi: algebraPoolAbi,
            functionName: "swap",
            args: [
              encoder.address,
              zeroToOne,
              srcAmount,
              zeroToOne ? MIN_SQRT_RATIO + 1n : MAX_SQRT_RATIO - 1n,
              encodeAbiParameters([{ type: "bytes[]" }, { type: "bytes" }], [callbacks, "0x"]),
            ],
          }),
          {
            sender: pool,
            dataIndex: 2n, // algebraSwapCallback(int256,int256,bytes)
          },
        );
  
        return {
          src: dst,
          dst,
          srcAmount: 0n,
        };
      } catch (error) {
        throw new Error(
          `(Algebra) Error swapping: ${error instanceof Error ? error.message : String(error)}`,
        );
      }
    }
  
    private getCachedPool(src: Address, dst: Address) {
      return this.pools[src]?.[dst] ?? this.pools[dst]?.[src];
    }
  
    private setCachedPool(src: Address, dst: Address, pool: Address) {
      this.pools[src] = { ...this.pools[src], [dst]: pool };
      this.pools[dst] = { ...this.pools[dst], [src]: pool };
    }
  
    private async fetchPool(encoder: ExecutorEncoder, src: Address, dst: Address) {
      const factoryAddress =
        specificFactoryAddresses[encoder.client.chain.id] ?? DEFAULT_FACTORY_ADDRESS;
      const [token0, token1] = fromHex(src, "bigint") < fromHex(dst, "bigint") ? [src, dst] : [dst, src];
  
      try {
        const pool = await readContract(encoder.client, {
          address: factoryAddress,
          abi: algebraFactoryAbi,
          functionName: "poolByPair",
          args: [token0, token1],
        });
  
        if (pool !== zeroAddress) {
          this.setCachedPool(token0, token1, pool);
          return pool;
        }
  
        return undefined;
      } catch (error) {
        throw new Error(
          `(Algebra) Error fetching pool: ${error instanceof Error ? error.message : String(error)}`,
        );
      }
    }
  }