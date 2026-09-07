# Stickerstore Frontend
 
- React and Tailwind frontend for my Cooliopteryx Sticker Store project.
- Using the API and database from https://github.com/tigejw/stickerstore
## Hosted
 
- **Netlify:** https://cooliopteryx.netlify.app/
## Tech Stack
 
- **Framework:** React (TypeScript)
- **Styling:** Tailwind CSS
- **Payments:** Stripe Checkout (via backend API)
## Local Setup
 
### Prerequisites
 
- Works on Node.js v24.18.0
- Stickerstore backend API (can run locally - see backend README)
### Installation
 
```bash
git clone https://github.com/tigejw/stickerstore-fe.git
cd stickerstore-fe
npm install
```
 
### Update the API URL
 
- Update `API_URL` in `/src/api-url/index.ts` to point to your locally hosted API (if running the backend locally)
### Running Locally
 
```bash
npm run dev
```
 
App should run at `http://localhost:5173`.
 
## Pages
 
- **Home** - featured/new stickers
- **Stickers** - full stickers catalog
- **Bundles** - bundle catalog
- **Product Pages** - individual product/bundle detail
- **Cart** - cart summary + Stripe checkout trigger
- **Success** - following a successful order
## Components
 
- **Footer** - footer with links to my GitHub, LinkedIn, and email
- **NavBar** - logo and links to Stickers, Bundles, and Cart
- **ProductsDisplay** - display grid for products
- **TestModeMessage** - popup message on first load communicating that the site is a portfolio project
- **CartContext** - handles cart logic (add-to-cart buttons, etc.)
 
