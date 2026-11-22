# SwiftCart Ecommerce Application

## Project Name
SwiftCart Ecommerce Web Application

## Project Description
SwiftCart is a modern responsive electronic commerce application developed using React and Redux Toolkit. The web application allows users to browse an extensive catalog of products fetched from an external API, view comprehensive product details, search products by name, filter products by specific category, sort products by price ascending or descending, and manage their shopping cart with complete state management.

## Technologies Used
1. React
2. Redux Toolkit
3. React Redux
4. React Router DOM
5. Tailwind CSS
6. Vite Build Tool
7. Lucide React Icons
8. FakeStore REST API

## Main Features
1. Home Catalog: Displays products fetched from the FakeStore API in a responsive grid layout with product image, name, price, category tag, rating, and add to cart action.
2. Loading and Error Handling: Features clean skeleton cards while fetching data and provides clear error states with retry options.
3. Search by Name: Instant live search filtering products by keyword in their title.
4. Category Filtering: Filter products by categories fetched directly from the API.
5. Price Sorting: Easily sort products from low to high or high to low.
6. Product Details View: View complete product description, high resolution image, customer reviews, category, price, and select custom quantity before adding to cart.
7. Shopping Cart Management: Global cart state powered entirely by Redux Toolkit with actions to add items, increase quantity, decrease quantity, remove specific items, and clear the cart.
8. Realtime Cart Counter: Cart badge in the navigation bar updates instantly across all views.
9. Local Storage Persistence: Cart items and wishlist items automatically persist across browser refreshes.
10. Bonus Checkout Experience: Dedicated checkout page with shipping address form, payment options, detailed order summary calculation, and order confirmation.
11. Bonus Wishlist Support: Save favorite products to a wishlist and quickly add them to the cart later.
12. Bonus Toast Feedback: Responsive notifications when adding items, removing items, or toggling favorites.
13. Confirmation Alerts: Protective prompts before removing products or clearing the cart to prevent accidental data loss.

## Installation Instructions
1. Clone or download the repository to your local computer.
2. Open your terminal and navigate to the project directory.
3. Install project dependencies by running:
```bash
npm install
```

## How to Run the Project
To start the local development server, run the following command:
```bash
npm run dev
```
Open your browser at the local URL shown in your terminal, typically http://localhost:5173

To create a production build of the project, run:
```bash
npm run build
```

To preview the production build locally, run:
```bash
npm run preview
```

## Live Project Link
Live deployment URL:
https://reactecommerceassignment.vercel.app
