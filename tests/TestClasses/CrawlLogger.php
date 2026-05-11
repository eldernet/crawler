<?php

namespace Eldernet\Crawler\Test\TestClasses;

use GuzzleHttp\Exception\RequestException;
use Eldernet\Crawler\CrawlObservers\CrawlObserver;
use Eldernet\Crawler\CrawlProgress;
use Eldernet\Crawler\CrawlResponse;
use Eldernet\Crawler\Enums\FinishReason;
use Eldernet\Crawler\Enums\ResourceType;
use Eldernet\Crawler\TransferStatistics;

class CrawlLogger extends CrawlObserver
{
    protected string $observerId;

    public function __construct(string $observerId = '')
    {
        if ($observerId !== '') {
            $observerId .= ' - ';
        }

        $this->observerId = $observerId;
    }

    public function willCrawl(string $url, ?string $linkText, ?ResourceType $resourceType = null): void
    {
        Log::putContents("{$this->observerId}willCrawl: {$url}");
    }

    public function crawled(
        string $url,
        CrawlResponse $response,
        CrawlProgress $progress,
    ): void {
        $this->logCrawl($url, $response->foundOnUrl(), $response->linkText());
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
        $this->logCrawl($url, $foundOnUrl, $linkText);
    }

    protected function logCrawl(string $url, ?string $foundOnUrl, ?string $linkText = null)
    {
        $logText = "{$this->observerId}hasBeenCrawled: {$url}";

        if ($foundOnUrl) {
            $logText .= " - found on {$foundOnUrl}";
        }

        if ($linkText) {
            $logText .= " - link text {$linkText}";
        }

        Log::putContents($logText);
    }

    public function finishedCrawling(FinishReason $reason, CrawlProgress $progress): void
    {
        Log::putContents("{$this->observerId}finished crawling");
    }
}
