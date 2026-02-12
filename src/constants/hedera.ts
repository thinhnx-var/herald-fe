import {
	HederaChainDefinition,
	hederaNamespace,
} from "@hashgraph/hedera-wallet-connect";

export const HEDERA_MAINNET_CHAIN_ID = 295;
export const HEDERA_TESTNET_CHAIN_ID = 296;

export const HEDERA_EVM_NETWORKS = [
	HederaChainDefinition.EVM.Mainnet,
	HederaChainDefinition.EVM.Testnet,
];

export const HEDERA_NATIVE_NETWORKS = [
	HederaChainDefinition.Native.Mainnet,
	HederaChainDefinition.Native.Testnet,
];

export const ALL_HEDERA_NETWORKS = [
	...HEDERA_EVM_NETWORKS,
	...HEDERA_NATIVE_NETWORKS,
];

export { hederaNamespace };
