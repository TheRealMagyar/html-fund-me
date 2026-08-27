# html-fund-me

Vanilla **HTML / JavaScript** frontend leftover from the FreeCodeCamp Fund Me course. Intended to be rebuilt later with Next.js / React.

## What it does

Simple MetaMask UI against a deployed FundMe-style contract:

- **Connect** — request accounts via `window.ethereum`
- **Fund** — send ETH with `contract.fund()`
- **getBalance** — read contract balance
- **Withdraw** — call `contract.withdraw()`

Uses bundled ethers v5 (`ethers-5.6.esm.min.js`) and ABI/address from `constans.js`.

## Run

Serve the static files (any local static server) and open `index.html` with MetaMask installed. Point `contractAddress` in `constans.js` at a FundMe deployment on your chosen network.
