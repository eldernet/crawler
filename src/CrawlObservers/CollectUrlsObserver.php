<?php

namespace Eldernet\Crawler\CrawlObservers;

use GuzzleHttp\Exception\RequestException;
use Eldernet\Crawler\CrawledUrl;
use Eldernet\Crawler\CrawlProgress;
use Eldernet\Crawler\CrawlResponse;
use Eldernet\Crawler\Enums\ResourceType;
use Eldernet\Crawler\TransferStatistics;

class CollectUrlsObserver extends CrawlObserver
{
    /** @var array<CrawledUrl> */
    protected array $crawledUrls = [];

    public function crawled(
        string $url,
        CrawlResponse $response,
        CrawlProgress $progress,
    ): void {
        $this->crawledUrls[] = new CrawledUrl(
            url: $url,
            status: $response->status(),
            foundOnUrl: $response->foundOnUrl(),
            depth: $response->depth(),
            resourceType: $response->resourceType(),
        );
    }

    public function crawlFailed(
        string $url,
        RequestException $requestException,
        CrawlProgress $progress,
        ?string $foundOnUrl = null,
        ?string $linkText = null,
        ?ResourceType $resourceType = null,
        ?TransferStatistics $transferStats = null,
    ): void {
        $response = $requestException->getResponse();

        $this->crawledUrls[] = new CrawledUrl(
            url: $url,
            status: $response ? $response->getStatusCode() : 0,
            foundOnUrl: $foundOnUrl,
            resourceType: $resourceType ?? ResourceType::Link,
        );
    }

    /** @return array<CrawledUrl> */
    public function getUrls(): array
    {
        return $this->crawledUrls;
    }
}
