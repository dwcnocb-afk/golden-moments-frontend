# Golden Moment — Frontend

Fan prediction app for live football matches, with on-chain proof of predictions
via Solana. Built with React + Vite + Tailwind CSS v4, responsive from mobile to
desktop, with Solana wallet-adapter for wallet connect.

## Quick start

```bash
npm install
cp .env.example .env
npm run dev
```

Runs in **mock mode** by default (`VITE_USE_MOCK_API=true`), so the whole app
is clickable end-to-end with fake match/player/stub data before your backend
exists.

## Switching to your real backend

1. Set `VITE_API_BASE_URL` in `.env` to your Express server's URL.
2. Set `VITE_USE_MOCK_API=false`.
3. Make sure your backend implements the endpoints in `src/lib/api.js`:
   - `GET  /match/:id`
   - `GET  /match/:id/events`
   - `GET  /match/:id/players`
   - `POST /predictions`               body: `{ wallet, matchId, playerId }`
   - `GET  /predictions/:wallet`
   - `GET  /match/:id/latest-goal`

   Response shapes are defined in `src/lib/mockData.js` — match your backend's
   JSON to those shapes and the UI needs no changes.

## Structure

```
src/
  components/       Reusable UI: ScoreBoard, EventCard, PlayerRow, StubCard,
                     Pill, Button, Screen (layout shell), BottomNav, WalletPill
  pages/            LiveMatch, Predict, GoalMoment, Stubs (the 4 screens)
  providers/         SolanaProviders.jsx — wallet-adapter setup (Phantom, Solflare)
  lib/
    api.js          Single place the UI talks to the backend (mock/real toggle)
    mockData.js     Canned data + the contract your backend should match
    config.js       Env-driven config + Solana explorer link helper
  index.css         Tailwind v4 + design tokens (colors, fonts) from Figma
```

## Design tokens

Colors and type come directly from the Figma file ("Golden Moment — Fan
Predictions"): deep pitch green background, floodlight gold for primary
actions, turf-phosphor cyan reserved for on-chain verification states.
Archivo Black for display type, Inter for body, IBM Plex Mono for
scores/timers/wallet addresses/tx hashes.

## Responsiveness

Built mobile-first (`max-w-md`) matching the Figma frames, expanding gracefully
to `sm:`/`lg:` breakpoints for tablet/desktop. No separate desktop design was
needed — the ticket-stub layout just gets a wider centered column.

## Wallet connect

Uses `@solana/wallet-adapter-react` with Phantom and Solflare adapters,
pointed at whichever cluster you set in `VITE_SOLANA_CLUSTER` (defaults to
`devnet`). The "View on Explorer" link on each stub points to
`explorer.solana.com` for that same cluster.

## Notes / next steps for you

- `npm run build` has been verified to succeed.
- The 500kB+ JS chunk warning at build time is from the Solana wallet-adapter
  libraries — fine for a hackathon demo, not worth optimizing under time
  pressure.
- Nothing here calls TxODDS or Solana directly from the browser — all of that
  goes through your backend, per the architecture we discussed.
