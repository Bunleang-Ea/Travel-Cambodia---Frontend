# Travel Cambodia Frontend

## API Ready Setup

This project is prepared for real fetch API integration even before backend is available.

### Environment

Copy `.env.example` to `.env` and adjust values when backend is ready:

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_USE_MOCK_API=true
VITE_API_TIMEOUT_MS=10000
```

### Mock vs Real API

- `VITE_USE_MOCK_API=true`: Uses local mock services with async delays.
- `VITE_USE_MOCK_API=false`: Uses `fetch` via the shared HTTP client.

### Service Structure

- `src/services/core`: API config and shared HTTP client.
- `src/services/mock`: Mock implementations.
- `src/services/modules`: Feature APIs (`itineraryApi`, `travelApi`).

### Current Wiring

- `YourJourneysPage` reads and deletes journeys via `itineraryApi`.
- `CreateTripPage` creates journeys via `itineraryApi`.
- `travelApi` is ready for Home/Locations/Destinations/Details/Categories migration.
- `authApi` is prepared for login/register/OTP/forgot/reset password endpoints.
- `adminApi` is prepared for admin users/roles/summary endpoints.
