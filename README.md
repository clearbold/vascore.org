vascore
=======

2024-01-13: I ran `jekyll build`. The `_public/_site` directory reflects the latest version of the site and can be deployed anywhere as static HTML.

---

It's just Jekyll-driven static HTML.

Website templates and content files live in `/public`.

Jekyll is used to compile those into `/public/_site`.

The live website runs on Netflify, which builds the `/public` files into the `/_site` directory and deploys that.

Alternatively, `jekyll build` can be run locally, and `_site` files uploaded to a web server.
