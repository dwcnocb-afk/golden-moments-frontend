import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useFanWallet } from "../hooks/useFanWallet";

function truncate(address) {
  if (!address) return "";
  return `${address.slice(0, 4)}…${address.slice(-4)}`;
}

// Default state: the fan has a Fan ID automatically, no extension needed.
// "Connect a real wallet" is offered as an option, not a requirement -
// most mainstream fans will never need to tap it.
export default function WalletPill() {
  const { connected, disconnect } = useWallet();
  const { setVisible } = useWalletModal();
  const { publicKeyString, isRealWallet } = useFanWallet();

  if (isRealWallet) {
    return (
      <button
        type="button"
        onClick={disconnect}
        className="flex w-full items-center justify-between rounded-sm bg-card px-3 py-2.5"
      >
        <span className="font-mono text-[9px] tracking-wide text-cyan">WALLET CONNECTED</span>
        <span className="font-mono text-[11px] text-chalk">{truncate(publicKeyString)}</span>
      </button>
    );
  }

  return (
    <div className="flex w-full items-center justify-between rounded-sm bg-card px-3 py-2.5">
      <span className="flex flex-col">
        <span className="font-mono text-[9px] tracking-wide text-cyan">YOUR FAN ID</span>
        <span className="font-mono text-[11px] text-chalk">{truncate(publicKeyString)}</span>
      </span>
      {connected ? null : (
        <button
          type="button"
          onClick={() => setVisible(true)}
          className="text-[10px] font-medium text-muted underline-offset-2 hover:text-gold hover:underline"
        >
          Have a wallet?
        </button>
      )}
    </div>
  );
}
