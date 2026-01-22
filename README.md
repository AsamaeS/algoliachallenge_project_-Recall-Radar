# Recall Radar ⚠️

**Stay Informed. Stay Safe.**

Recall Radar is a professional, non-conversational product safety checker focused on recalled consumer products, specifically children's goods. Built with speed and trust in mind, it allows parents and consumers to instantly identify dangerous products using official safety databases.

## 🚀 Key Features

- **Search-First Safety**: Instant lookup by brand, model, product name, or batch number.
- **State-Based Feedback**:
    - 🔴 **Red**: Confirmed Recall found.
    - 🟠 **Orange**: Possible match found (fuzzy match).
    - 🟢 **Green**: No official recall records found.
- **Government-Style UI**: A clean, serious, and high-trust interface designed for high-stress situations.
- **Algolia-Powered**: Leverages Algolia's lightning-fast search and typo-tolerance for maximum reliability.

## 🛠️ Tech Stack

- **Frontend**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Search**: Algolia InstantSearch
- **Icons**: Lucide React

## 📦 Getting Started

### Prerequisites

- Node.js 18+
- Algolia Application ID and Search API Key

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in `.env.local`:
   ```env
   NEXT_PUBLIC_ALGOLIA_APP_ID=your_app_id
   NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY=your_search_key
   NEXT_PUBLIC_ALGOLIA_INDEX_NAME=product_recalls
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## 🎯 Demo Scenarios


Demonstration
Case A: Match Found (Red Status)
When an exact match for a recalled product is found, a high-alert red badge is displayed.

ToyWorld Teddy Search Result
Review
ToyWorld Teddy Search Result

NOTE
<img width="886" height="402" alt="image" src="https://github.com/user-attachments/assets/34b58cfe-0bc1-4dbc-9082-8b3b60991e0a" />

Note: While the screenshot shows an orange badge, the logic has since been updated to trigger Red for exact matches as verified in subsequent tests.
<img width="879" height="407" alt="image" src="https://github.com/user-attachments/assets/21322f75-b814-4615-8f96-703567a4ae46" />

Case B: No Match (Green Status)
When no recall is found, a reassuring green badge appears with an official disclaimer.

RandomBrandXYZ Search Result
Review
RandomBrandXYZ Search Result

Case C: Partial / Fuzzy Match (Orange Status)
When a search query is similar but not an exact match (e.g., a typo), the system alerts the user to verify details.

Preview unavailable

| Query | Status | Description |
| :--- | :--- | :--- |
| **ToyWorld Teddy** | 🔴 RED | Confirmed recall for serious risk |
| **SafeSeat** | 🔴 RED | Confirmed childcare product recall |
| **TohyWorld** | 🟠 ORANGE | Typo detected, potential match alert |
| **UnknownBrand** | 🟢 GREEN | No recall record found |

---

*Data sources: RAPEX (EU), DGCCRF (FR). This tool is for informational purposes only.*
