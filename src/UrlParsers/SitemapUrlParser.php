<?php

namespace Eldernet\Crawler\UrlParsers;

use Eldernet\Crawler\Enums\ResourceType;
use Eldernet\Crawler\ExtractedUrl;
use Symfony\Component\DomCrawler\Crawler as DomCrawler;

class SitemapUrlParser implements UrlParser
{
    /** @return array<int, ExtractedUrl> */
    public function extractUrls(string $html, string $baseUrl): array
    {
        $domCrawler = new DomCrawler($html, $baseUrl);

        $urls = [];
        $seen = [];

        $domCrawler->filterXPath('//loc')->each(function (DomCrawler $node) use (&$urls, &$seen) {
            $url = trim($node->text());

            if (! $url) {
                return;
            }

            $parsed = parse_url($url);

            if (! isset($parsed['scheme']) || ! in_array($parsed['scheme'], ['http', 'https'])) {
                return;
            }

            if (isset($seen[$url])) {
                return;
            }

            $seen[$url] = true;
            $urls[] = new ExtractedUrl(url: $url, resourceType: ResourceType::Link);
        });

        return $urls;
    }
}
