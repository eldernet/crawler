<?php

namespace Spatie\Crawler;

use Symfony\Component\DomCrawler\Link;

interface LinkRejector
{
    public function reject(Link $link): bool;
}