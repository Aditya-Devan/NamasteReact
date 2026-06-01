Code Splitting / Chunking / Lazy Loading
What is the problem first?
Parcel (or any bundler) by default bundles everything into one single JS file. So even if user is on the Home page, they download code for About, Dashboard, Settings — everything upfront.
❌ Without code splitting:
User visits Home → downloads 2MB bundle (entire app)
                   including code they may never use

What is Code Splitting?
Instead of one giant bundle, split your app into smaller chunks — each chunk loaded only when needed.
✅ With code splitting:
User visits Home     → downloads only Home chunk (200kb)
User visits About    → downloads About chunk (100kb) on demand
User visits Settings → downloads Settings chunk (150kb) on demand

How React does it — lazy + Suspense
lazy — tells React to load this component only when it's needed
Suspense — shows a fallback UI while that chunk is being downloaded

Interview Points to talk on:
1. What is lazy loading?

Loading a component only when it is actually needed by the user, instead of loading everything upfront.

2. What is Suspense and why is it needed?

When a lazy component is being downloaded, React needs to show something to the user in the meantime. Suspense provides that fallback UI. Without Suspense, React will throw an error if a lazy component hasn't loaded yet.

3. What is a chunk?

When you lazy import a component, the bundler (Parcel/Webpack) creates a separate JS file for that component. That file is called a chunk. It gets downloaded on demand.

4. Other names for this concept?

Code Splitting, Chunking, Lazy Loading, Dynamic Importing, On-demand Loading — all refer to the same optimization technique.

5. What is the fallback prop in Suspense?

It accepts any JSX — a spinner, a skeleton UI, or just text — shown while the lazy chunk is loading. In production apps you'd use a proper Skeleton loader instead of plain text.

6. Where should Suspense be placed?

Suspense should wrap the part of the tree that contains lazy components. You can have multiple Suspense boundaries at different levels for more granular loading states.