<?php

namespace Eldernet\Crawler\JavaScriptRenderers;

interface JavaScriptRenderer
{
    public function getRenderedHtml(string $url): string;
}
