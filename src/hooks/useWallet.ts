import {
	useAppKit,
	useAppKitAccount,
	useAppKitNetwork,
	useDisconnect,
} from "@reown/appkit/react";
import { useCallback } from "react";
import { formatAddress } from "@/utils/format";

export function useWallet() {
	const { open } = useAppKit();
	const { address, isConnected, caipAddress } = useAppKitAccount();
	const { caipNetwork, chainId } = useAppKitNetwork();
	const { disconnect } = useDisconnect();

	const connect = useCallback(() => {
		open({ view: "Connect" });
	}, [open]);

	const openAccount = useCallback(() => {
		open({ view: "Account" });
	}, [open]);

	const displayAddress = address ? formatAddress(address) : "";

	return {
		isConnected,
		address,
		caipAddress,
		chainId,
		networkName: caipNetwork?.name,
		displayAddress,
		connect,
		disconnect,
		openAccount,
	};
}
