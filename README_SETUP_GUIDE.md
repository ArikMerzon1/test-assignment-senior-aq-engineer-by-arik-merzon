# ATaaS (Automation Testing as a Service)

## Prerequisites

Ensure you have the following installed:

- npm
- macOS/Linux terminal (bash/zsh)
- Homebrew (for macOS users)
- cURL
- Playwright


---


## Node.js Setup

**Follow the next steps to install [Node.js](https://nodejs.org/en/download)**


1. **Install NVM (Node Version Manager)**

   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

   \. "$HOME/.nvm/nvm.sh" # In lieu of restarting the shell
   ```

2. **Install Node.js latest version**

   ```bash
   nvm install latest
   ```

3. **Verify Installations**

   ```bash
   node -v
   nvm current
   npm -v
   ```

---
## Playwright Setup

1. **Install Playwright**
     
   ```bash
    npm init playwright@latest
    npx playwright install  
   ```

---
## Run

1. **Download dependencies**

    ```bash
   npm install
   ```

2. **Run Tests by Name**

   ```bash
   npx playwright test -g <test name>
   ```
   
3. **Run Tests by Tag**
   ```bash
   npx playwright test -g <@tag>
   ```
   
4. **Show Report**

   ```bash
   npx playwright show-report
   ```
---

## Example for a .env file

```

#general
    TEST_EXECUTE:   localExecutor    # localExecutor, remoteExecutor, ciExecutor
    ENVIRONMENT:    int              # dev, int, prd

#web
     BROWSER:                chromium
     HEADLESS:               false
     BASE_URL:               https://www.jetbrains.com/store/
     EMAIL:                  macie@inwagit.com
     PASSWORD:               123456789
     COUNTRY:                Afghanistan
```

