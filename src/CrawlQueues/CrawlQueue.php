<?php

namespace Eldernet\Crawler\CrawlQueues;

use Eldernet\Crawler\CrawlUrl;

interface CrawlQueue
{
    public function add(CrawlUrl $url): self;

    public function has(string $url): bool;

    public function hasPendingUrls(): bool;

    public function getUrlById(mixed $id): CrawlUrl;

    public function getPendingUrl(): ?CrawlUrl;

    public function hasAlreadyBeenProcessed(CrawlUrl $url): bool;

    public function markAsProcessed(CrawlUrl $crawlUrl): void;

    public function getProcessedUrlCount(): int;

    public function getUrlCount(): int;

    public function getPendingUrlCount(): int;
}
