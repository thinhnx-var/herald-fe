import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import type UniversalProvider from "@walletconnect/universal-provider";
import {
	HederaAdapter,
	HederaProvider,
	hederaNamespace,
} from "@hashgraph/hedera-wallet-connect";
import type { AppKitNetwork } from "@reown/appkit/networks";
import {
	ALL_HEDERA_NETWORKS,
	HEDERA_NATIVE_NETWORKS,
} from "@/constants/hedera";

const projectId = import.meta.env.VITE_REOWN_PROJECT_ID;

if (!projectId) {
	throw new Error(
		"VITE_REOWN_PROJECT_ID is required. Get one at https://cloud.reown.com",
	);
}

const metadata = {
	name: "Herald AI",
	description: "Hedera Leveraged Trading Platform",
	url: window.location.origin,
	icons: [`${window.location.origin}/favicon.png`],
};

export async function initAppKit() {
	// EthersAdapter: handles MetaMask browser extension (injected/EIP-6963) + WalletConnect for EVM
	const ethersAdapter = new EthersAdapter();

	// HederaAdapter: handles HashPack via native hedera namespace (WalletConnect)
	const hederaNativeAdapter = new HederaAdapter({
		projectId,
		networks: HEDERA_NATIVE_NETWORKS,
		namespace: hederaNamespace,
	});

	const universalProvider = (await HederaProvider.init({
		projectId,
		metadata,
	})) as unknown as UniversalProvider;

	createAppKit({
		adapters: [ethersAdapter, hederaNativeAdapter],
		universalProvider: universalProvider as never,
		projectId,
		metadata,
		networks: ALL_HEDERA_NETWORKS as [AppKitNetwork, ...AppKitNetwork[]],
		themeMode: "dark",
		features: {
			analytics: false,
		},
	});
}
