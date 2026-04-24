# Estimate flow — Roofs-N-More (iframe host)

The real estimator is a third-party AI tool at **https://quote.roofsnmore.com/s/59b06a**. This UI kit is the **brand-chromed host page** that iframes it in — so the estimator renders inside a trusted Roofs-N-More header, trust strip, and help column.

Open `index.html` to see the composition. The iframe URL is defined in one place in `index.html` and can be swapped per share-code (`/s/<code>`).

> **Note on iframe rendering inside a design-system preview:** the real quote.roofsnmore.com tool may set `X-Frame-Options: DENY` or `frame-ancestors` headers that block cross-origin embedding during local preview. In production (deployed on the same parent domain, or with quote subdomain allowlisted) it will render normally. The host here includes a fallback card with a direct "Open estimator" link when the iframe can't load.
