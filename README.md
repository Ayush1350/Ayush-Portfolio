# Ayush Patel’s portfolio

This React and Vite portfolio includes Ask My AI, a browser-local assistant that answers English questions using the portfolio and résumé. Recruiter mode compares recognized technical terms in a pasted job description against documented skills and points to relevant projects.

## Run locally

```sh
npm ci
npm run dev
```

Open the Vite URL and select **Ask My AI**. Questions and job descriptions are processed in the browser. The last eight suggested questions are saved on the device and their replies are rebuilt from the portfolio on refresh. Typed questions and job descriptions stay in the open tab.

## Build and deploy

```sh
npm run build
npm run preview
```

Publish the generated `dist` directory using the portfolio’s existing static hosting setup.

Set the build environment variable `SITE_URL` to the public HTTPS origin to generate absolute canonical and sharing URLs, a sitemap and its robots.txt entry. All four pages and the social preview use root-relative paths.

Update `src/portfolio.js` to maintain shared profile, project, and experience data. Update `src/assistant/knowledge.js` to refine recognized questions and recruiter vocabulary. Run `npm test` to check assistant answers and search metadata.
