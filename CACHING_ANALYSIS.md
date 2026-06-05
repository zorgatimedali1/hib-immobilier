# Caching System Analysis - API Call Reduction

## Current Caching Layers

### 1. Frontend Cache (React Query)
```
useProperties: 1 min fresh + 5 min memory
useProperty: 3 min fresh + 10 min memory
useSimilarProperties: 3 min fresh + 10 min memory
```

### 2. Backend Cache (Node-Cache)
```
/api/public routes: 5 min (300 sec) per unique URL
```

## How It Reduces API Calls

### Scenario 1: Same user browses listings twice in 1 minute
```
First request:  App → Browser Cache (MISS) → Backend Cache (MISS) → Supabase ✓
Second request: App → Browser Cache (HIT) ✓ [No network call at all]
RESULT: 1 API call instead of 2
```

### Scenario 2: User visits property details, navigates away, returns in 2 minutes
```
First visit:     Browser Cache (MISS) → Backend Cache (MISS) → Supabase ✓
Navigate away:   Cache kept in memory (gcTime: 10 min)
Return (2 min):  Browser Cache (STALE, need refresh) → Backend Cache (HIT) ✓ [No Supabase]
RESULT: 1 Supabase query instead of 2
```

### Scenario 3: Multiple users request same property within 5 minutes
```
User 1: Supabase ✓ → Stored in Backend Cache
User 2: Backend Cache (HIT) ✓ [No Supabase]
User 3: Backend Cache (HIT) ✓ [No Supabase]
RESULT: 1 Supabase query instead of 3
```

## Performance Metrics

### Without Caching
- 10 users viewing listings = 10 Supabase queries
- Each query: ~200-500ms
- Total: 2-5 seconds per wave of users

### With Current Caching
- 10 users within 1 min = 1 Supabase query
- Remaining 9: ~10-50ms from cache
- Total: ~300-600ms for all 10 users

### Reduction: 90-95% fewer database queries

## Request Timeline

```
TIME    ACTION                          CACHE STATUS
0:00    User opens listings
        → React Query (MISS)
        → Backend Cache (MISS)
        → Supabase query ✓              Browser: FRESH 1min
                                         Backend: FRESH 5min

0:30    User refreshes page
        → React Query (HIT)
        → No network call!              Browser: FRESH
                                        Backend: FRESH

1:05    User returns after 1 min
        → React Query (STALE)
        → Backend Cache (HIT)           Browser: STALE
        → No Supabase query!            Backend: FRESH (still 3:55 left)

5:30    User refreshes again
        → React Query (MISS)
        → Backend Cache (EXPIRED)
        → Supabase query ✓              Caches refreshed
```

## API Call Count Example

### Without Caching (5 min window)
- User 1 loads page: 1 call
- User 2 loads page: 1 call  
- User 1 refreshes: 1 call
- User 3 loads page: 1 call
- User 1 clicks property: 1 call
- Similar properties load: 1 call
**TOTAL: 6 API calls**

### With Caching (5 min window)
- User 1 loads page: 1 call ✓
- User 2 loads page: CACHED ✓
- User 1 refreshes after 30s: CACHED ✓
- User 3 loads page after 1:30: CACHED ✓
- User 1 clicks property after 2 min: Backend Cache (stale refresh) ✓
- Similar properties: CACHED ✓
**TOTAL: 2 API calls (66% reduction)**

## Further Optimization Recommendations

1. **Add refetchOnWindowFocus** - Re-validate when user returns to browser
2. **Add refetchOnMount** - Fresh data when component mounts
3. **Increase featured properties cache** - They change rarely (1 hour TTL)
4. **Add stale-while-revalidate header** - Serve old data while fetching new
5. **Implement selective invalidation** - Only clear affected cache keys on updates
6. **Add request deduplication** - Merge concurrent requests for same data
