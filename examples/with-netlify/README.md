# View the demo on https://hardcore-goodall-fd3278.netlify.app/

## Install & Build

### 1) Install netlify-cli

```
npm i -g netlify-cli
```

### 2) (Optional) Create netlify site

```
netlify sites:create
```

### 3) Replace "siteId" in `.netlify/state.json`

You can get `siteId` from two places:

1. The output of the previous step.
2. From the netlify admin app:
    1. Open "Sites" or "Team overview" tab
    2. Open the appropriate site
    3. Open "Site settings"
    4. Copy "Site ID:" from the "Site information" area

### 4) Install deps

```
yarn install
```

### 5) Build and deploy

```
npm run netlify
```
