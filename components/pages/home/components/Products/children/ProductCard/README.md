# ProductCard Components

This folder contains the broken-down components of the ProductCard, making the code more maintainable and reusable.

## Component Structure

### Main Component
- **ProductCard.tsx** - Main component that orchestrates all sub-components

### Image Related
- **ProductImage.tsx** - Handles product image display, loading states, and badges
- **StockBadge.tsx** - Displays stock status (In Stock/Out of Stock)
- **RatingBadge.tsx** - Shows product rating with star icon

### Overlay & Actions
- **ProductOverlay.tsx** - Hover overlay effect
- **ProductOverlayActions.tsx** - Action buttons and discount badge
- **DiscountBadge.tsx** - Calculates and displays discount percentage

### Content & Details
- **ProductContent.tsx** - Main content container with overlay actions and details
- **ProductDetails.tsx** - Product information display
- **ProductMeta.tsx** - Brands and SKU information
- **ProductTitle.tsx** - Product name display
- **ProductPrice.tsx** - Price display logic for simple and variable products
- **ViewDetailsButton.tsx** - View details button

## Usage

```tsx
import ProductCard from './ProductCard';

<ProductCard product={productData} index={0} />
```

## Benefits

1. **Maintainability** - Each component has a single responsibility
2. **Reusability** - Components can be reused in other parts of the application
3. **Testability** - Easier to write unit tests for individual components
4. **Readability** - Code is more organized and easier to understand
5. **TypeScript** - Full type safety maintained across all components
