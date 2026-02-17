# CORE_MEDIA_PARITY_MATRIX_V1

## Scope

This matrix tracks parity between Core **Media** tab fields and current React canonical presentation (mock/Core-mirror phase).

Core Media fields from screenshot:
1. Primary image
2. Gallery images
3. Upload video
4. 3D Tour Link
5. Content URLs (site + content URL rows)

## Entity Coverage

- Vacation Property
- Real Estate Property
- Hotel
- Hotel Room

## Parity Matrix

| Core Field | Vacation Property | Real Estate | Hotel | Hotel Room | Notes |
|---|---|---|---|---|---|
| Primary image | Mapped + Rendered | Mapped + Rendered | Mapped + Rendered | Mapped + Rendered | Used as hero image in canonical details page |
| Gallery images | Mapped + Rendered | Mapped + Rendered | Mapped + Rendered | Mapped + Rendered | Rendered as gallery strip under hero |
| Upload video | Mapped + Rendered | Mapped + Rendered | Mapped + Rendered | Mapped + Rendered | Rendered in "Media presentation" section (iframe embed) |
| 3D Tour Link | Mapped + Rendered | Mapped + Rendered | Mapped + Rendered | Mapped + Rendered | Rendered as external link in "Additional media links" |
| Content URLs | Mapped + Rendered | Mapped + Rendered | Mapped + Rendered | Mapped + Rendered | Rendered in additional links block for all entity types |

## Current Implementation Details

### View model
- `CanonicalDetailsViewModel.media` introduced with:
  - `videoUrl?: string`
  - `tour3dUrl?: string`
  - `contentUrls?: Array<{ site: string; url: string }>`

### UI rendering
- `src/components/CanonicalEntityDetailsSections.tsx` renders:
  - Video iframe card
  - 3D tour link
  - Content URL links list

### Adapter mapping
- Vacation adapter maps:
  - `videoUrl`, `tour3dUrl`
- Real-estate / hotel / hotel-room adapters map:
  - `videoUrl`, `tour3dUrl`, `contentUrls`

## Pending for Full Core-Mirror DB Contract

1. Replace temporary mock URLs with DB-driven media URLs from Core contract.
2. Add safe embed handling policy for non-YouTube video providers (Vimeo/mp4 fallback).
3. Add validation rules:
   - allowed protocols (`https`)
   - embed/link sanitization
   - dead-link fallback UI.

## Acceptance Checklist (Media)

- [x] Video section visible when `videoUrl` exists
- [x] 3D tour link visible when `tour3dUrl` exists
- [x] Content URL rows visible when `contentUrls[]` exists
- [x] Section hidden when no media extras exist
- [ ] Core DB payload mapping finalized for all 4 entity types
- [x] Vacation `contentUrls[]` wired in mirror type and adapter
