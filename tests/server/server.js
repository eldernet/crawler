"use strict";

let app = require('express')();

app.get('/', function (request, response) {
    response.end('<a href="/txt-disallow">txt disallowed</a><a href="/meta-follow">meta disallowed</a><a href="/header-disallow">header disallowed</a><a href="/link1">Link1</a><a href="/link2">Link2</a><a href="dir/link4">Link4</a><a href="mailto:test@example.com">Email</a><a href="tel:123">Telephone</a><a href="/nofollow" rel="nofollow">No follow</a><a href="/txt-disallow-custom-user-agent">Disallow Custom User Agent</a>');
});

app.get('/link1', function (request, response) {
    response.end('<html><head><link rel="next" href="/link1-next"><link rel="prev" href="/link1-prev"></head><body><script>var url = \'/javascript\';document.body.innerHTML = document.body.innerHTML + "<a href=\'" + url + "\'>Javascript Link</a>"</script>You are on link1<a href="http://example.com/">External Link</a></body></html>');
});

app.get('/javascript', function (request, response) {
    response.end('This page can only be reached if JavaScript is being executed');
});

app.get('/link1-next', function (request, response) {
    response.end('You are on link1-next. Next page of link1');
});

app.get('/link1-prev', function (request, response) {
    response.end('You are on link1-prev. Previous page of link1');
});

app.get('/link-with-html', function (request, response) {
    response.end('<a href="/link1"><div title="some title"><div>Link text inner</div></div></a>');
});

app.get('/nofollow', function (request, response) {
    response.end('This page should not be crawled');
});

app.get('/link2', function (request, response) {
    response.end('You are on link2<a href="/link3">Link3</a><a href="http://sub.localhost:8080/subdomainpage">Subdomain</a><a href="http://subdomain.sub.localhost:8080/subdomainpage">Subdomain2</a>');
});

app.get('/link3', function (request, response) {
    response.end('You are on link3<a href="/notExists">not exists</a>');
});

app.get('/dir/link4', function (request, response) {
    response.end('You are on /dir/link4<a href="/dir/link5">link 5</a>');
});

app.get('/dir/link5', function (request, response) {
    response.end('You are on /dir/link5<a href="subdir/link6">link 6</a>');
});

app.get('/dir/subdir/link6', function (request, response) {
    response.end('You are on /dir/subdir/link6<a href="/link1">link 1</a>');
});

app.get('/invalid-url', function (request, response) {
    response.end('There is an <a href="https:///AfyaVzw">invalid</a> url');
});

app.get('/txt-disallow', function (request, response) {
    response.end('Not allowed');
});

app.get('/txt-disallow-custom-user-agent', function (request, response) {
    response.end('Not allowed for Custom User Agent');
});

app.get('/meta-follow', function (request, response) {
    response.end('<html><head>\n<meta name="robots" content="noindex, follow">\n</head><body><a href="/meta-nofollow">No follow</a></body></html>');
});

app.get('/meta-nofollow', function (request, response) {
    response.end('<html><head>\n<meta name="robots" content="index, nofollow">\n</head><body><a href="/meta-nofollow-target">no follow it</a></body></html>');
});

app.get('/redirect-home/', function (request, response) {
    response.redirect(301, '/');
});

app.get('/dir1/internal-redirect-entry/', function (request, response) {
    response.end('<a href="../loop-generator/internal-redirect/trapped/">trapped</a> <a href="../../dir1/internal-redirect/trap/">trap-start</a>');
});

app.get('/dir1/internal-redirect/trap/', function (request, response) {
    response.redirect(301, '/dir1/internal-redirect-entry/');
});

app.get('/dir1/loop-generator/internal-redirect/trapped/', function (request, response) {
    response.end('It should be crawled once');
});

app.get('/meta-nofollow-target', function (request, response) {
    response.end('No followable');
});

app.get('/header-disallow', function (request, response) {
    response.set({'X-Robots-Tag': '*: noindex'});

    response.end('disallow by header');
});

app.get('/content-types', function (request, response) {
    response.end('We have <a href="/content-types/normal.html">a normal page</a>, <a href="/content-types/music.mp3">an MP3</a> and <a href="/content-types/video.mkv">a video file</a>.');
});

app.get('/content-types/normal.html', function (request, response) {
    response.set({'Content-Type': 'text/html; charset=utf-8'});

    response.end('a normal HTML file');
});

app.get('/content-types/music.mp3', function (request, response) {
    response.set({'Content-Type': 'audio/mpeg'});

    response.end('music file, with a <a href="/content-types/music.html">a link</a>');
});

app.get('/content-types/music.html', function (request, response) {
    response.end('hidden html in music file');
});

app.get('/content-types/video.mkv', function (request, response) {
    response.set({'Content-Type': 'video/webm'});

    response.end('video file, with a <a href="/content-types/video.html">a link</a>');
});

app.get('/content-types/video.html', function (request, response) {
    response.end('hidden html in video file');
});

app.get('/incomplete-href', function (request, response) {
    response.end('Valid href: <a href="/link1-next">valid link</a>, Empty href: <a href="/link1-prev"></a>, Incomplete href: <a href="/invalid-link');
});

app.get('/has-disabled-links', function (request, response) {
    response.end('<a href="/link1">Link1</a><a disabled href="/link2">Link2</a><a href="dir/link4" disabled="disabled">Link4</a>');
});

app.get('/robots.txt', function (req, res) {
    var html = 'User-agent: *\n' +
        'Disallow: /txt-disallow\n' +
        'User-agent: my-agent\n' +
        'Disallow: /txt-disallow\n' +
        'Disallow: /txt-disallow-custom-user-agent';

    res.end(html);
});

app.get('/sitemap_index.xml', function (req, res) {
    var sitemapIndex = '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
        '   <sitemap>\n' +
        '       <loc>http://localhost:8080/sitemap1.xml</loc>\n' +
        '       <lastmod>2024-01-01</lastmod>\n' +
        '   </sitemap>\n' +
        '   <sitemap>\n' +
        '       <loc>http://localhost:8080/sitemap2.xml</loc>\n' +
        '       <lastmod>2024-01-01</lastmod>\n' +
        '   </sitemap>\n' +
        '</sitemapindex>';

    res.contentType('text/xml; charset=utf-8');
    res.end(sitemapIndex);
});

app.get('/sitemap1.xml', function (req, res) {
    var sitemap1 = '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
        '   <url>\n' +
        '       <loc>http://localhost:8080/</loc>\n' +
        '       <lastmod>2016-01-01</lastmod>\n' +
        '       <changefreq>monthly</changefreq>\n' +
        '       <priority>0.8</priority>\n' +
        '   </url>\n' +
        '   <url>\n' +
        '       <loc>http://localhost:8080/link1</loc>\n' +
        '       <lastmod>2016-01-01</lastmod>\n' +
        '       <changefreq>monthly</changefreq>\n' +
        '       <priority>0.8</priority>\n' +
        '   </url>\n' +
        '</urlset>';

    res.contentType('text/xml; charset=utf-8');
    res.end(sitemap1);
});

app.get('/sitemap2.xml', function (req, res) {
    var sitemap2 = '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
        '   <url>\n' +
        '       <loc>http://localhost:8080/link1-next</loc>\n' +
        '       <lastmod>2016-01-01</lastmod>\n' +
        '       <changefreq>monthly</changefreq>\n' +
        '       <priority>0.8</priority>\n' +
        '   </url>\n' +
        '   <url>\n' +
        '       <loc>http://localhost:8080/link1-prev</loc>\n' +
        '       <lastmod>2016-01-01</lastmod>\n' +
        '       <changefreq>monthly</changefreq>\n' +
        '       <priority>0.8</priority>\n' +
        '   </url>\n' +
        '   <url>\n' +
        '       <loc>http://localhost:8080/link2</loc>\n' +
        '       <lastmod>2016-01-01</lastmod>\n' +
        '       <changefreq>monthly</changefreq>\n' +
        '       <priority>0.8</priority>\n' +
        '   </url>\n' +
        '   <url lang="fr">\n' +
        '       <loc>http://localhost:8080/link3</loc>\n' +
        '       <lastmod>2016-01-01</lastmod>\n' +
        '       <changefreq>monthly</changefreq>\n' +
        '       <priority>0.8</priority>\n' +
        '   </url>\n' +
        '</urlset>';

    res.contentType('text/xml; charset=utf-8');
    res.end(sitemap2);
});

// Route that initiates but never completes the response
app.get('/never-complete', (req, res) => {
  req.socket.setTimeout(0); // Disable automatic socket timeout
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('Starting but never completing...\n');
  // Intentionally do not call res.end() or send more data, leaving the response hanging
});

app.get('/simulate-activity', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Simulated Network Activity</title>
      </head>
      <body>
        <h1>This page simulates a never-ending network request</h1>
        <script>
          function keepBusy() {
            fetch('/never-complete')
          }

          keepBusy();
          setInterval(keepBusy, 1000); 
        </script>
      </body>
    </html>
  `);
});


let server = app.listen(8080, function () {
    const host = 'localhost';
    const port = server.address().port;

    console.log('Testing server listening at http://%s:%s', host, port);
});
