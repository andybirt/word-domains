# Word domains

One trending-word domain, one folder, one static landing page.

The site for a domain lives in a folder named after the word, with no TLD. Each folder is a standalone site. `index.html` sits at the root of that folder. Pages are plain HTML and CSS, plus a little vanilla JavaScript when it does something on the page. Images, icons, and scripts live in the folder. Google Fonts is the only outside request. There is no build step and nothing to install.

| Folder | Domain |
| --- | --- |
| [`roadsidebanker/`](roadsidebanker/) | [roadsidebanker.com](https://roadsidebanker.com/) |

```
word-domains/
├── README.md
└── roadsidebanker/
    ├── index.html
    ├── styles.css
    ├── site.js
    ├── favicon.svg
    ├── favicon-32.png
    ├── apple-touch-icon.png
    └── og.png
```

To add another domain, create a new folder named after the word, put its `index.html` at the root of that folder, add a row to the table above, and deploy the folder as its own project.

## Deploy a folder on Vercel

Each domain is its own Vercel project. The projects share this repo and point at different root directories.

1. In Vercel, choose **Add New… → Project** and import this Git repository.
2. Before the first deploy, set **Root Directory** to the domain folder, for example `roadsidebanker`.
3. Set **Framework Preset** to **Other**.
4. Leave **Build Command** and **Install Command** empty. The folder is already the site.
5. If Vercel asks for an **Output Directory**, leave it empty. If it will not accept an empty value, set it to `.`
6. Deploy.

Repeat those steps for the next word: a new project, a new root directory, the same framework preset.

## Point a GoDaddy domain at that project

The domain stays registered at GoDaddy. Vercel hosts the site. GoDaddy’s job is the DNS records Vercel asks for.

1. Open the Vercel project, then **Settings → Domains**.
2. Add the apex domain, for example `roadsidebanker.com`. Add `www.roadsidebanker.com` too if you want both. Vercel can redirect one host to the other; choose the host you want in the address bar.
3. Vercel shows the DNS records to create. Use those values. They belong to that project, and they can differ from the examples below.

   | Type | Host in GoDaddy | Value |
   | --- | --- | --- |
   | A | `@` | The IPv4 address on the Vercel domain card. For many projects this is `76.76.21.21`. Newer projects sometimes show a different anycast address, including addresses beginning `216.198.79`. |
   | CNAME | `www` | The CNAME target on the Vercel domain card. Often `cname.vercel-dns.com`, or a project host such as `d1d4fc829fe7bc7c.vercel-dns-017.com`. |

4. In GoDaddy, open the domain, then **DNS** (sometimes labeled **Manage DNS**), then **DNS Records**.
5. Add the A record and the CNAME with the values from the Vercel domain card. If a record for that same host already points at GoDaddy parking or an old host, replace it or delete it. Two A records on `@` will fight each other.
6. Leave the nameservers at GoDaddy. This setup keeps DNS there and only adds the records Vercel displayed. Pointing the nameservers at Vercel is a different setup: mail and every other record would move too.
7. Return to the Vercel domain card and wait until the domain shows as valid. Vercel then issues HTTPS. DNS often settles in a few minutes. Some registrars take up to 48 hours.

If the records on the Vercel domain card differ from the table, copy the card. The card is the one that has to match.
