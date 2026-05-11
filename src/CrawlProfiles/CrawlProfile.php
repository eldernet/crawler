<?php

namespace Eldernet\Crawler\CrawlProfiles;

interface CrawlProfile
{
    public function shouldCrawl(string $url): bool;
}
