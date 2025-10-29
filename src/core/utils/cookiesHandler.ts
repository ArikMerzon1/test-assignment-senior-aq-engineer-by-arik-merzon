import { Page } from '@playwright/test';

export async function rejectAllCookies(page: Page): Promise<boolean> {
    // Common “reject” button labels in multiple locales
    const rejectName = /reject(?:\s+all)?|decline|deny|only (?:necessary|essential)|alle ablehnen|nur notwendige|tout refuser|solo necessari/i;

    // Top-level banner
    const topLevelReject = page.getByRole('button', { name: rejectName });

    // Many CMPs render inside iframes (Sourcepoint, TrustArc, etc.)
    const consentFrames = page.frameLocator([
        'iframe[title*="consent" i]',
        'iframe[title*="privacy" i]',
        'iframe[id*="sp_message_iframe" i]',
        'iframe[src*="sp_message" i]',
        'iframe[src*="consent" i]',
        'iframe[aria-label*="consent" i]'
    ].join(', '));

    const iframeReject = consentFrames.getByRole('button', { name: rejectName });

    // Try iframe first, then top-level
    for (const loc of [iframeReject.first(), topLevelReject.first()]) {
        if (await loc.isVisible().catch(() => false)) {
            await loc.click().catch(() => {});
            return true;
        }
    }
    return false; // nothing found to click right now
}
