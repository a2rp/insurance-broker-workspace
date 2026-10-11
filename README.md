![Aster insurance broker workspace overview](./screenshot.png)

# Aster Insurance Broker Workspace

Aster is a frontend-only workspace for independent insurance brokers to manage client accounts, policies, upcoming renewals, and service requests in one place. The renewal-focused overview makes upcoming work and account needs easy to scan.

## Pages and features

- **Overview:** account and policy totals, annual premium, open service work, renewal progress, and the current service queue. The date and totals are derived from the demo records.
- **Accounts:** search clients and contacts, sort and filter the book, open account details, create or edit accounts, remove an account with a confirmation dialog, and export the current results to CSV.
- **Policies:** find and filter policies, review coverage and premium details, create, edit, and delete policies, update policy status, and export filtered results to CSV.
- **Renewals:** review upcoming expirations, open a renewal's details, update its placement stage and checklist, and create or edit renewal records. Binding is enabled only after the required checklist is complete.
- **Service desk:** find and filter client requests, view request details, log or edit a request, change its priority and status, and confirm before deleting it.
- **Notifications:** review renewal reminders from the header.
- **Not found:** a branded fallback page for unknown routes.

Changes are shared across routes while the app is open. This demo does not use browser storage or a backend, so refreshing the page restores the seeded sample records. CSV export downloads the currently filtered records. Service requests and policy changes update only the local demo state; no insurer, email, calendar, or external service is contacted.

## Screenshots

These screenshots were captured from the local production preview using representative demo data.

### Pages

| Screen | Preview |
| --- | --- |
| Overview | ![Aster overview with broker metrics, renewals, and service queue](./screenshots/pages/overview.png) |
| Client accounts | ![Searchable insurance client account book](./screenshots/pages/accounts.png) |
| Policy register | ![Insurance policy register](./screenshots/pages/policies.png) |
| Renewal schedule | ![Renewal schedule and placement progress](./screenshots/pages/renewals.png) |
| Service desk | ![Client service request desk](./screenshots/pages/service.png) |
| Not found | ![Aster not-found route](./screenshots/pages/not-found.png) |
| Client accounts on mobile | ![Responsive mobile client account page](./screenshots/pages/mobile-accounts.png) |

### Dialogs and confirmations

| Dialog | Preview |
| --- | --- |
| Create account | ![Create client account form](./screenshots/modals/account-create.png) |
| Account details | ![Client account detail dialog](./screenshots/modals/account-detail.png) |
| Edit account | ![Edit client account form](./screenshots/modals/account-edit.png) |
| Confirm account deletion | ![Account deletion confirmation](./screenshots/modals/account-delete-confirm.png) |
| Create policy | ![Create insurance policy form](./screenshots/modals/policy-create.png) |
| Policy details | ![Insurance policy detail dialog](./screenshots/modals/policy-detail.png) |
| Edit policy | ![Edit insurance policy form](./screenshots/modals/policy-edit.png) |
| Confirm policy deletion | ![Policy deletion confirmation](./screenshots/modals/policy-delete-confirm.png) |
| Create renewal | ![Create renewal form](./screenshots/modals/renewal-create.png) |
| Renewal details | ![Renewal detail dialog and checklist](./screenshots/modals/renewal-detail.png) |
| Edit renewal | ![Edit renewal form](./screenshots/modals/renewal-edit.png) |
| Create service request | ![Create service request form](./screenshots/modals/request-create.png) |
| Service request details | ![Service request detail dialog](./screenshots/modals/request-detail.png) |
| Edit service request | ![Edit service request form](./screenshots/modals/request-edit.png) |
| Confirm request deletion | ![Service request deletion confirmation](./screenshots/modals/request-delete-confirm.png) |
| Renewal reminders | ![Renewal reminders dialog](./screenshots/modals/renewal-reminders.png) |

## Run locally

Requires Node.js and npm.

```bash
npm install
npm run dev
```

Vite prints the local URL. To check the project:

```bash
npm run lint
npm run build
npm run preview
```

## Deployment

The app is configured for GitHub Pages at [https://a2rp.github.io/insurance-broker-workspace/](https://a2rp.github.io/insurance-broker-workspace/). Deploy the current build from the project folder with:

```bash
npm run deploy
```

The script builds the app, copies the entry page to `404.html` for direct route fallback, and publishes the `dist` folder to the `gh-pages` branch.

## Image credit

The locally saved insurance policy photograph is by [Vlad Deep on Unsplash](https://unsplash.com/photos/a-magnifying-glass-sitting-on-top-of-a-piece-of-paper), used under the [Unsplash License](https://unsplash.com/license).

## Future improvements

These are future extensions and are not part of this frontend demo:

- Connect accounts, policy, renewal, and service records to a backend so authorized broker teams can share updates across devices.
- Add sign-in, team roles, and permission controls for client and policy data.
- Integrate with carrier and agency management systems for live policy details, quotes, and renewal updates.
- Add secure hosted document storage for policy documents and client attachments.
- Keep a server-side audit trail for account, coverage, and renewal changes.

## Links

- Portfolio: [https://www.ashishranjan.net](https://www.ashishranjan.net)
- GitHub: [https://github.com/a2rp](https://github.com/a2rp)
- CodePen: [https://codepen.io/ash1198](https://codepen.io/ash1198)
- LinkedIn: [https://www.linkedin.com/in/aashishranjan](https://www.linkedin.com/in/aashishranjan)
- Facebook: [https://www.facebook.com/theash.ashish/](https://www.facebook.com/theash.ashish/)
- YouTube: [https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1](https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1)
- Email: [mailto:ash.ranjan09@gmail.com](mailto:ash.ranjan09@gmail.com)

## Support

- Support: [https://a2rp-donation-page.netlify.app/](https://a2rp-donation-page.netlify.app/)
- Buy Me a Coffee: [https://buymeacoffee.com/ashishranjan](https://buymeacoffee.com/ashishranjan)
- Patreon: [https://www.patreon.com/ashishranjan](https://www.patreon.com/ashishranjan)
