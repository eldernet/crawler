<?php

namespace Eldernet\Crawler\CrawlObservers;

use Eldernet\Crawler\CrawlProgress;
use Eldernet\Crawler\CrawlResponse;
use Eldernet\Crawler\Enums\FinishReason;
use Eldernet\Crawler\Enums\ResourceType;
use Eldernet\Crawler\TransferStatistics;
use GuzzleHttp\Exception\RequestException;

abstract class CrawlObserver
{
    public function willCrawl(string $url, ?string $linkText, ?ResourceType $resourceType = null): void {}

    public function crawled(
        string $url,
        CrawlResponse $response,
        CrawlProgress $progress,
    ): void {}

    public function crawlFailed(
        string $url,
        RequestException $requestException,
        CrawlProgress $progress,
        ?string $foundOnUrl = null,
        ?string $linkText = null,
        ?ResourceType $resourceType = null,
        ?TransferStatistics $transferStats = null,
    ): void {}

    public function finishedCrawling(FinishReason $reason, CrawlProgress $progress): void {}
}
