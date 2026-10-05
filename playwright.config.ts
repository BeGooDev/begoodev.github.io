import { defineConfig, devices } from '@playwright/test';

const PORT = 4300;

/**
 * Tests run against the static build (`pnpm build`), served the way GitHub Pages
 * serves it: clean URLs and 404.html for unknown paths.
 */
export default defineConfig({
    testDir: './e2e',
    fullyParallel: true,
    forbidOnly: !!process.env['CI'],
    retries: process.env['CI'] ? 1 : 0,
    reporter: process.env['CI'] ? [['github'], ['html', { open: 'never' }]] : 'list',
    use: {
        baseURL: `http://localhost:${PORT}`,
        trace: 'retain-on-failure',
    },
    projects: [
        { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
        { name: 'mobile', use: { ...devices['Pixel 7'] } },
    ],
    webServer: {
        command: `serve dist/begoodev/browser --listen ${PORT} --no-port-switching`,
        url: `http://localhost:${PORT}`,
        reuseExistingServer: !process.env['CI'],
    },
});
