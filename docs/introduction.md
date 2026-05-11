---
title: Introduction
weight: 1
---

This package provides a powerful, easy to use class to crawl links on a website. Under the hood, Guzzle promises are used to [crawl multiple URLs concurrently](http://docs.guzzlephp.org/en/latest/quickstart.html?highlight=pool#concurrent-requests).

Because the crawler can execute JavaScript, it can crawl JavaScript rendered sites. Under the hood, [Chrome and Puppeteer](https://github.com/spatie/browsershot) are used to power this feature.

Here's a quick example:

```php
use Eldernet\Crawler\Crawler;
use Eldernet\Crawler\CrawlResponse;

Crawler::create('https://example.com')
    ->onCrawled(function (string $url, CrawlResponse $response) {
        echo "{$url}: {$response->status()}\n";
    })
    ->start();
```

Or collect all URLs on a site:

```php
$urls = Crawler::create('https://example.com')
    ->internalOnly()
    ->depth(3)
    ->foundUrls();
```

## We got badges

[![Latest Version on Packagist](https://img.shields.io/packagist/v/eldernet/crawler.svg?style=flat-square)](https://packagist.org/packages/eldernet/crawler)
[![MIT Licensed](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
![Tests](https://github.com/eldernet/crawler/workflows/Tests/badge.svg)
[![Total Downloads](https://img.shields.io/packagist/dt/eldernet/crawler.svg?style=flat-square)](https://packagist.org/packages/eldernet/crawler)
