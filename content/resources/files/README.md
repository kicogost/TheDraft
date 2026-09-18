# Resource deliverables

`*.source.html` is what each PDF is rendered from. Edit the HTML and re-render
rather than editing the PDF.

The built PDFs are copied to `public/downloads/`, which is publicly served.

## Why they are public

An email link has to work forever. A signed, expiring URL cannot go in an
automation email that someone opens a week later, so the delivered file needs
a permanent address.

The gate is therefore the same one every lead magnet uses: you have to know
the URL, and the only place the URL is published is behind the form. The
thank-you page still checks a signed token before showing the link, so the
path is not discoverable by browsing the site.

If these ever need to be genuinely private, move them to Vercel Blob with
signed URLs and have the automation email link to a redirect route instead.
