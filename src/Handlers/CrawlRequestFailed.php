<?php

namespace Eldernet\Crawler\Handlers;

use Eldernet\Crawler\Crawler;
use Eldernet\Crawler\TransferStatistics;
use Exception;
use GuzzleHttp\Exception\ConnectException;
use GuzzleHttp\Exception\RequestException;
use GuzzleHttp\Psr7\Request;

class CrawlRequestFailed
{
    public function __construct(protected Crawler $crawler) {}

    public function __invoke(Exception $exception, mixed $index): void
    {
        if ($this->crawler->hasReachedLimits()) {
            return;
        }

        $crawlUrl = $this->crawler->getCrawlQueue()->getUrlById($index);

        if (! $exception instanceof RequestException) {
            $request = $exception instanceof ConnectException
                ? $exception->getRequest()
                : new Request('GET', $crawlUrl->url);

            $exception = new RequestException($exception->getMessage(), $request, previous: $exception);
        }

        $transferStats = $this->crawler->getTransferStats($crawlUrl->url);
        $transferStatistics = $transferStats !== null
            ? TransferStatistics::fromTransferStats($transferStats)
            : null;

        $this->crawler->recordFailed();
        $this->crawler->getCrawlObservers()->crawlFailed($crawlUrl, $exception, $this->crawler->getCrawlProgress(), $transferStatistics);

        $this->crawler->applyDelay();
    }
}
