export interface networkConfigItem {
  ethUsdPriceFeed?: string;
  blockConfirmations?: number;
}

export interface networkConfigInfo {
  [key: string]: networkConfigItem;
}

export const networkConfig: networkConfigInfo = {
  localhost: {},
  hardhat: {},
  // Price Feed Address, values can be obtained at https://docs.chain.link/docs/reference-contracts
  // Default one is ETH/USD contract on Kovan
  kovan: {
    ethUsdPriceFeed: "0x9326BFA02ADD2366b30bacB125260Af641031331",
    blockConfirmations: 6,
  },
  goerli: {
    ethUsdPriceFeed: "0xa50b17C2fc373c247C3b603f83df6A7800cB0DC9",
    blockConfirmations: 6,
  },
};

export const DECIMALS = "8";
export const INITIAL_PRICE = "2000000000000000000000";
export const developmentChains = ["hardhat", "localhost"];
