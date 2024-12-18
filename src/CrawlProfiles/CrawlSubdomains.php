<?php

namespace Eldernet\Crawler\CrawlProfiles;

use GuzzleHttp\Psr7\Uri;
use Psr\Http\Message\UriInterface;

class CrawlSubdomains extends CrawlProfile
{
    protected mixed $baseUrl;

    public function __construct($baseUrl)
    {
        if (! $baseUrl instanceof UriInterface) {
            $baseUrl = new Uri($baseUrl);
        }

        $this->baseUrl = $baseUrl;
    }

    public function shouldCrawl(UriInterface $url): bool
    {
        return $this->isSubdomainOfHost($url);
    }

    public function isSubdomainOfHost(UriInterface $url): bool
    {
        return str_ends_with($url->getHost(), $this->baseUrl->getHost());
    }
}
