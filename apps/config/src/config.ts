import { base, mainnet } from "viem/chains";
import type { Config } from "./types";
import { defineChain } from "viem";

const sourceId = 1 // ethereum

export const plume = /*#__PURE__*/ defineChain({
  id: 98_866,
  name: 'Plume Mainnet',
  nativeCurrency: {
    name: 'Plume',
    symbol: 'Plume',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.plume.org'],
      webSocket: ['wss://rpc.plume.org'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Blockscout',
      url: 'https://explorer.plume.org',
      apiUrl: 'https://explorer.plume.org/api',
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 48_577,
    },
  },
  sourceId,
})

export const chainConfigs: Record<number, Config> = {
  // [mainnet.id]: {
  //   chain: mainnet,
  //   morpho: {
  //     address: "0xBBBBBbbBBb9cC5e90e3b3Af64bdAF62C37EEFFCb",
  //     startBlock: 18883124,
  //   },
  //   adaptiveCurveIrm: {
  //     address: "0x870aC11D48B15DB9a138Cf899d20F13F79Ba00BC",
  //     startBlock: 18883124,
  //   },
  //   metaMorphoFactories: {
  //     addresses: [
  //       "0x1897A8997241C1cD4bD0698647e4EB7213535c24",
  //       "0xA9c3D3a366466Fa809d1Ae982Fb2c46E5fC41101",
  //     ],
  //     startBlock: 18925584,
  //   },
  // },
  // [base.id]: {
  //   chain: base,
  //   morpho: {
  //     address: "0xBBBBBbbBBb9cC5e90e3b3Af64bdAF62C37EEFFCb",
  //     startBlock: 13977148,
  //   },
  //   adaptiveCurveIrm: {
  //     address: "0x46415998764C29aB2a25CbeA6254146D50D22687",
  //     startBlock: 13977152,
  //   },
  //   metaMorphoFactories: {
  //     addresses: [
  //       "0xFf62A7c278C62eD665133147129245053Bbf5918",
  //       "0xA9c3D3a366466Fa809d1Ae982Fb2c46E5fC41101",
  //     ],
  //     startBlock: 13978134,
  //   },
  // },
  [plume.id]: {
    chain: plume,
    morpho: {
      address: "0x42b18785CE0Aed7BF7Ca43a39471ED4C0A3e0bB5",
      startBlock: 765994,
    },
    adaptiveCurveIrm: {
      address: "0x7420302Ddd469031Cd2282cd64225cCd46F581eA",
      startBlock: 765994,
    },
    metaMorphoFactories: {
      addresses: [
        "0x2525D453D9BA13921D5aB5D8c12F9202b0e19456",
      ],
      startBlock: 765994,
    },
  }
};
