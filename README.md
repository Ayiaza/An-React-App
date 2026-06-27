# 🎮 GameVault

GameVault is a React-based game discovery platform with a sleek, fully interactive UI.
Built in a single JSX file with zero external dependencies, it covers everything from filtering to wishlists.

---

## 🛠️ Technologies

- React 18 (functional components, hooks)
- JavaScript (JSX)
- CSS Grid & Flexbox
- Inline JavaScript style objects (no CSS files)
- No external UI libraries or state managers

---

## ✨ Features

- Sticky navigation bar with active link highlighting and user avatar
- Collapsible sidebar with category filters, sort options, and live wishlist panel
- Responsive game grid with auto-fill columns (supports grid and list view)
- Game cards with hover effects, emoji hero, rating stars, price badge, and play button
- Real-time search bar filtering by game name or category
- Category chips and sort controls (Rating, Players, Price, Name)
- Per-card wishlist toggle synced with navbar badge and sidebar
- Full dark / light mode toggle with instant theme swap across all components

---

## ⚙️ Process

1. Defined theme token objects for both dark and light mode upfront
2. Built the navbar and sidebar as independent components with shared state lifted to `App`
3. Designed the `GameCard` component to support both grid and list layouts from a single prop
4. Wired up search, category filter, and sort as derived state — no extra state variables
5. Connected the wishlist array across the navbar badge, sidebar panel, and individual cards
6. Tested responsiveness using `auto-fill minmax` grid columns for various screen widths

---

## 📚 What I Learned

- How to build a full theme system using plain JavaScript objects and conditional spreading
- Lifting shared state to manage wishlist, filters, and view mode across multiple panels
- Writing a single component (`GameCard`) that renders two completely different layouts
- Keeping a multi-component app readable and maintainable inside one JSX file
- Using derived state (filter + sort logic) to avoid redundant state variables

---

## ✅ Conclusion

GameVault demonstrates that a production-quality, feature-rich UI is achievable with React alone — no libraries, no stylesheets, no complexity.
It was a rewarding project that sharpened both component design and state management skills in a practical, real-world context.

## Run the Project
