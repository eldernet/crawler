<?php

namespace Eldernet\Crawler\UrlParsers;

use Eldernet\Crawler\ExtractedUrl;

interface UrlParser
{
    /** @return array<int, ExtractedUrl> */
    public function extractUrls(string $html, string $baseUrl): array;
}
