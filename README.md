# How to Connect Your usecases.ts Data

## Current Status
- ✅ Application is loading **102 use cases** from `usecases_101.json`
- ⏳ Waiting for `usecases.ts` data to be saved

## Steps to Add Your Data

### Option 1: Using usecases.ts (Recommended)

1. **Save your usecases.ts file** (Ctrl+S) - IMPORTANT!

2. **Convert it to JavaScript** by running ONE of these commands:

   **Using PowerShell:**
   ```powershell
   Get-Content "usecases.ts" -Raw | ForEach-Object { $_ -replace 'export const additionalUsecases.*?=', 'window.additionalUsecases =' -replace 'export interface.*?{[^}]*}', '' } | Out-File -Encoding UTF8 "usecases.js"
   ```

   **OR manually:**
   - Open `usecases.ts`
   - Copy everything from the `additionalUsecases` array (the `[...]` part)
   - Open `usecases.js`
   - Replace the empty array with your data:
     ```javascript
     window.additionalUsecases = [ /* paste your data here */ ];
     ```

3. **Refresh your browser** - The data will load automatically!

### Option 2: Direct Copy-Paste

1. Open `usecases.js`
2. Paste your use case data into the `window.additionalUsecases` array
3. Make sure each use case has this structure:
   ```javascript
   {
     usecase_id: 103,
     title: "Your title",
     summary: "Your summary",
     sections: {
       business_challenge: { heading: "Business challenge", content: "..." },
       tech_stack: { heading: "Tech stack", items: ["Tech1", "Tech2"] },
       blueprint: { heading: "Blueprint", content: "..." }
     },
     category: "Customer",
     industry: "Retail"
   }
   ```
4. Save and refresh browser

## How It Works

The application loads data in this order:
1. **First**: Loads `usecases_101.json` (102 use cases)
2. **Then**: Loads `usecases.js` (your additional use cases)
3. **Combines**: Both datasets and displays the total

## Troubleshooting

**If you see 0 use cases:**
- Check browser console (F12) for errors
- Make sure `usecases_101.json` exists
- Verify the server is running on port 8000

**If you see only 102 use cases:**
- Your `usecases.js` file might be empty or have errors
- Check browser console for JavaScript errors
- Make sure `usecases.js` is in the same folder as `index.html`

## Quick Test

Open browser console (F12) and type:
```javascript
console.log(window.additionalUsecases);
```

This should show your additional use cases if they're loaded correctly.
