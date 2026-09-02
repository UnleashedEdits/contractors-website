# Fieldline licensed-trade website system

Status: public GitHub Pages concept template. It is not a live business website and has no owner-approved credentials, projects, hours, service territory or submission backend.

- Repository: https://github.com/UnleashedEdits/contractors-website
- Public preview: https://unleashededits.github.io/contractors-website/

## Included

- Mobile-first Home, Services, Residential, Commercial, Projects, Credentials, Service Areas, FAQ, Contact, Privacy and 404 pages.
- Warm black-and-white visual foundation with one muted accent token.
- Problem-led service cards, scheduled and urgent paths, four-step customer process and fixed mobile call action.
- Credential strip and dedicated verification page with official regional-resource links.
- Quote forms with property type, location, service, urgency, preferred contact method and photos.
- Local SEO metadata, canonical placeholders, noindex preview controls, a sitemap template and optional trade-specific schema generation.
- Accessible labels, native controls, focus states, 44px+ touch targets, reduced-motion handling and local-only form validation.

## Adapt the template

1. Edit `business-config.js`. Replace the fictional-safe demo number, placeholder email, business name, confirmed hours, service territory, licence number, insurance status, authority and canonical origin.
2. Change `schemaType` to the most specific supported Schema.org type for the selected trade. Keep `schemaEnabled: false` until all minimum facts are verified; the script refuses to emit schema while obvious placeholder values remain.
3. Set the accent with `accent` in `business-config.js`; the default is a muted safety-lime (`#d7e4a5`).
4. Replace project slots only with verified captions and owner-approved images. Keep an internal source and permission record.
5. Choose one regional mode on `service-areas.html`. Remove the unused Canada, New Mexico or other-U.S. modules.
6. Replace credential links with the exact applicable provincial, territorial, state or municipal authority.
7. Update every title, description, canonical URL, sitemap URL, Open Graph asset and visible service-area reference together.

## Form boundary

The static form does not send, upload or store customer data. A production connection needs server-side validation, upload limits and isolation, abuse protection, restricted access, retention/deletion rules, delivery monitoring and a privacy review. Do not put secrets in client-side JavaScript.

## Checks

Run:

```sh
npm run check
```

The check covers required pages, local references, metadata, JavaScript parsing and the homepage quote fields. Visual QA should still be repeated after real copy and images are added.

## Launch blockers

- Owner-approved business identity, phone, email, call hours and confirmed service area.
- Verifiable licence or registration and accurate public authority link.
- Owner-confirmed insurance wording.
- Approved project images, captions, location privacy level and any participant permissions.
- Written service scope, urgent-service policy, warranty terms if any, and any pricing language.
- Production form provider, privacy/retention decisions and staff workflow.
- Owner-controlled domain, final canonical URLs, social sharing image and removal of noindex controls.

No certification number, code-compliance promise, permit outcome, emergency response time, warranty, testimonial or price is invented in this concept.
