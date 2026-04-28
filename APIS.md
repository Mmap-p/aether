# ÆTHER — External APIs Reference

## NASA Open API
Base URL: https://api.nasa.gov
Auth: API key in query param (?api_key=KEY)
Free limit: 1000 requests/hour
Endpoints used:
  APOD:     /planetary/apod (daily image)
  NEO:      /neo/rest/v1/feed (near earth objects)
  DONKI:    /DONKI/CME (solar events)
Wrapped by: /api/apod/route.ts

## JPL Horizons
Base URL: https://ssd.jpl.nasa.gov/api/horizons.api
Auth: None required
Free limit: Generous, no documented limit
Endpoints used:
  Ephemeris: ?format=json&COMMAND=499&... (planetary positions)
Wrapped by: /api/sky-events/route.ts

## Open Notify (ISS)
Base URL: http://api.open-notify.org
Auth: None
Free limit: None documented
Endpoints used:
  ISS Now:  /iss-now.json (live position, poll every 5s)
  People:   /astros.json (people in space)
Wrapped by: /api/iss/route.ts

## NOAA SWPC (Space Weather)
Base URL: https://services.swpc.noaa.gov
Auth: None
Free limit: None documented
Endpoints used:
  Kp Index:    /json/planetary_k_index_1m.json
  Solar Wind:  /json/rtsw/rtsw_wind.json
  Alerts:      /json/alerts.json
Wrapped by: /api/space-weather/route.ts

## ArXiv API
Base URL: https://export.arxiv.org/api
Auth: None
Free limit: 3 seconds between requests recommended
Endpoints used:
  Search: /query?search_query=cat:astro-ph&max_results=20
Categories: astro-ph.EP (exoplanets), astro-ph.GA (galaxies),
  astro-ph.HE (high energy), astro-ph.CO (cosmology),
  astro-ph.SR (solar), astro-ph.IM (instrumentation)
Wrapped by: /api/arxiv/route.ts

## Solar System OpenData
Base URL: https://api.le-systeme-solaire.net/rest
Auth: None
Free limit: None documented
Endpoints used:
  All bodies: /bodies
  Single:     /bodies/{id}
Wrapped by: /api/solar-system/route.ts

## CelesTrak
Base URL: https://celestrak.org
Auth: None
Free limit: None documented
Endpoints used:
  TLE data:   /SOCRATES/query.php (satellite conjunctions)
  ISS TLE:    /satcat/tle.php?CATNR=25544
Wrapped by: /api/iss/route.ts (combined with Open Notify)
