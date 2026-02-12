export interface WalletState {
	isConnected: boolean;
	address: string | undefined;
	chainId: string | number | undefined;
}
