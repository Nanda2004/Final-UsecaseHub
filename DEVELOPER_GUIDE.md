# Developer Guide: Adding More Use Cases

This guide provides step-by-step instructions for future developers to add more use cases (e.g., 601 additional use cases from PDF sources) to the Kodryx Usecase Hub application.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Data Structure](#data-structure)
3. [Files to Modify](#files-to-modify)
4. [Step-by-Step Process](#step-by-step-process)
5. [Testing Checklist](#testing-checklist)
6. [Common Issues & Solutions](#common-issues--solutions)

---

## 🎯 Overview

Currently, the application displays **101 use cases** from `src/data/usecases_101.json`. To add more use cases (e.g., 601 additional ones), you'll need to:

1. Extract data from PDF sources
2. Convert to the correct JSON format
3. Update the data file
4. Update references in the code
5. Test the application

**Estimated Time**: 2-4 hours (depending on data extraction complexity)

---

## 📊 Data Structure

Each use case in the JSON file must follow this exact structure:

```json
{
  "usecase_id": 1,
  "title": "Your Use Case Title",
  "summary": "Brief summary",
  "sections": {
    "business_challenge": {
      "heading": "Business challenge",
      "content": "Description of the business challenge..."
    },
    "tech_stack": {
      "heading": "Tech stack",
      "items": [
        "Technology 1",
        "Technology 2",
        "Technology 3"
      ]
    },
    "blueprint": {
      "heading": "Blueprint",
      "content": "Step-by-step implementation blueprint..."
    }
  },
  "category": "Category Name",
  "industry": "Industry Name",
  "source_pdf": "Source Document Name"
}
```

### Required Fields:
- ✅ `usecase_id` (number) - Unique identifier
- ✅ `title` (string) - Use case title
- ✅ `summary` (string) - Brief summary
- ✅ `sections.business_challenge.content` (string) - Business challenge description
- ✅ `sections.tech_stack.items` (array) - List of technologies
- ✅ `sections.blueprint.content` (string) - Implementation steps
- ✅ `category` (string) - Category (e.g., "Retail", "Healthcare")
- ✅ `industry` (string) - Industry (e.g., "Retail", "Finance")
- ✅ `source_pdf` (string) - Source document name

---

## 📁 Files to Modify

### 🔴 CRITICAL - Must Update

#### 1. **`src/data/usecases_101.json`** → **`src/data/usecases_702.json`**

**Location**: `src/data/usecases_101.json`

**What to do**:
- Rename file to reflect new count (e.g., `usecases_702.json`)
- Add 601 new use cases to the existing array
- Ensure all `usecase_id` values are unique (1-702)
- Validate JSON syntax

**Example**:
```json
[
  {
    "usecase_id": 1,
    "title": "Existing use case 1",
    ...
  },
  ...
  {
    "usecase_id": 101,
    "title": "Existing use case 101",
    ...
  },
  {
    "usecase_id": 102,
    "title": "New use case 1",
    ...
  },
  ...
  {
    "usecase_id": 702,
    "title": "New use case 601",
    ...
  }
]
```

#### 2. **`src/hooks/useUsecases.js`**

**Location**: `src/hooks/useUsecases.js`

**What to do**:
- Update the import statement to point to the new JSON file

**Change**:
```javascript
// OLD
import usecasesData from '../data/usecases_101.json';

// NEW
import usecasesData from '../data/usecases_702.json';
```

**Line number**: Line 2

---

### 🟡 OPTIONAL - Update for Accuracy

#### 3. **`src/pages/SignInPage.jsx`**

**Location**: `src/pages/SignInPage.jsx`

**What to do**:
- Update the stats to reflect the new count

**Change**:
```jsx
// OLD
<div className={styles.statNumber}>101</div>
<div className={styles.statLabel}>Use Cases</div>

// NEW
<div className={styles.statNumber}>702</div>
<div className={styles.statLabel}>Use Cases</div>
```

**Line numbers**: Lines 24-25

**Also update**:
```jsx
// OLD
<p className={styles.brandDescription}>
  Discover 101 real-world Gen AI use cases from the world's leading organizations
</p>

// NEW
<p className={styles.brandDescription}>
  Discover 702 real-world Gen AI use cases from the world's leading organizations
</p>
```

**Line numbers**: Lines 19-21

#### 4. **`README.md`**

**Location**: `README.md`

**What to do**:
- Update the description to reflect the new count

**Change**:
```markdown
# OLD
A modern, responsive React application showcasing 101 real-world Gen AI use cases

# NEW
A modern, responsive React application showcasing 702 real-world Gen AI use cases
```

**Line number**: Line 3

#### 5. **`index.html`**

**Location**: `index.html`

**What to do**:
- Update the meta description

**Change**:
```html
<!-- OLD -->
<meta name="description" content="Discover 101 real-world Gen AI use cases from the world's leading organizations" />

<!-- NEW -->
<meta name="description" content="Discover 702 real-world Gen AI use cases from the world's leading organizations" />
```

**Line number**: Line 6

---

## 🔧 Step-by-Step Process

### Phase 1: Data Extraction & Preparation

#### Step 1: Extract Data from PDF

**Tools you can use**:
- Python with `PyPDF2` or `pdfplumber`
- Adobe Acrobat (Export to Excel/CSV)
- Online PDF to JSON converters

**Example Python Script**:
```python
import json
import pdfplumber

def extract_usecases_from_pdf(pdf_path):
    usecases = []
    
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text = page.extract_text()
            # Parse text and extract use case data
            # This will vary based on PDF structure
            
    return usecases

# Usage
usecases = extract_usecases_from_pdf('new_usecases.pdf')
```

#### Step 2: Convert to JSON Format

Create a script to convert extracted data to the required format:

```python
def format_usecase(raw_data, usecase_id):
    return {
        "usecase_id": usecase_id,
        "title": raw_data['title'],
        "summary": raw_data['summary'],
        "sections": {
            "business_challenge": {
                "heading": "Business challenge",
                "content": raw_data['challenge']
            },
            "tech_stack": {
                "heading": "Tech stack",
                "items": raw_data['technologies']
            },
            "blueprint": {
                "heading": "Blueprint",
                "content": raw_data['implementation']
            }
        },
        "category": raw_data['category'],
        "industry": raw_data['industry'],
        "source_pdf": "New Use Cases Document"
    }
```

#### Step 3: Validate JSON

Use an online JSON validator or command:

```bash
# Validate JSON syntax
python -m json.tool src/data/usecases_702.json > /dev/null
```

---

### Phase 2: Update Application Files

#### Step 4: Rename and Update Data File

```bash
# Navigate to data directory
cd src/data/

# Rename file
mv usecases_101.json usecases_702.json

# Edit the file to add new use cases
# Use your preferred text editor (VS Code, Sublime, etc.)
```

#### Step 5: Update Import Statement

Open `src/hooks/useUsecases.js` and update line 2:

```javascript
import usecasesData from '../data/usecases_702.json';
```

#### Step 6: Update UI Text (Optional but Recommended)

Update the following files with the new count:
- `src/pages/SignInPage.jsx` (lines 19-21, 24-25)
- `README.md` (line 3)
- `index.html` (line 6)

---

### Phase 3: Testing

#### Step 7: Test Locally

```bash
# Install dependencies (if needed)
npm install

# Start development server
npm run dev
```

#### Step 8: Verify in Browser

Open `http://localhost:5173` and check:

1. ✅ Sign-in page shows correct count (702)
2. ✅ Browse page loads all use cases
3. ✅ Search functionality works
4. ✅ Filters work correctly
5. ✅ Modal displays use case details properly
6. ✅ No console errors

#### Step 9: Build for Production

```bash
# Create production build
npm run build

# Test production build
npm run preview
```

---

## ✅ Testing Checklist

Use this checklist to ensure everything works:

- [ ] JSON file is valid (no syntax errors)
- [ ] All `usecase_id` values are unique
- [ ] All required fields are present in each use case
- [ ] Import statement updated in `useUsecases.js`
- [ ] Sign-in page displays correct count
- [ ] Browse page loads without errors
- [ ] All 702 use cases are visible
- [ ] Search works across all use cases
- [ ] Category filter shows all categories
- [ ] Industry filter shows all industries
- [ ] Tech stack filter shows all technologies
- [ ] Modal opens and displays data correctly
- [ ] Responsive design works on mobile
- [ ] Production build completes successfully
- [ ] No console errors in browser

---

## 🐛 Common Issues & Solutions

### Issue 1: "Cannot find module '../data/usecases_702.json'"

**Solution**: Make sure you updated the import in `src/hooks/useUsecases.js`

```javascript
// Correct import
import usecasesData from '../data/usecases_702.json';
```

### Issue 2: "Unexpected token in JSON"

**Solution**: Validate your JSON file. Common issues:
- Missing commas between objects
- Trailing commas after last item
- Unescaped quotes in strings

Use a JSON validator: https://jsonlint.com/

### Issue 3: Use cases not displaying

**Solution**: Check browser console for errors. Common causes:
- Missing required fields in JSON
- Incorrect data structure
- File path issues

### Issue 4: Filters not working correctly

**Solution**: Ensure all use cases have:
- `category` field
- `industry` field
- `sections.tech_stack.items` array

### Issue 5: Modal shows "undefined"

**Solution**: Verify the data structure matches exactly:
```javascript
sections: {
  business_challenge: { content: "..." },
  tech_stack: { items: [...] },
  blueprint: { content: "..." }
}
```

---

## 📝 Quick Reference

### File Modification Summary

| File | Action | Line(s) | Priority |
|------|--------|---------|----------|
| `src/data/usecases_101.json` | Rename to `usecases_702.json`, add 601 use cases | All | 🔴 Critical |
| `src/hooks/useUsecases.js` | Update import statement | 2 | 🔴 Critical |
| `src/pages/SignInPage.jsx` | Update count (101 → 702) | 19-21, 24-25 | 🟡 Optional |
| `README.md` | Update description | 3 | 🟡 Optional |
| `index.html` | Update meta description | 6 | 🟡 Optional |

---

## 🚀 Deployment After Update

After adding new use cases:

```bash
# 1. Test locally
npm run dev

# 2. Build for production
npm run build

# 3. Commit changes
git add .
git commit -m "Add 601 new use cases (total: 702)"
git push origin main

# 4. Deploy to Vercel/Netlify
vercel --prod
# OR
netlify deploy --prod
```

---

## 💡 Best Practices

1. **Backup First**: Always backup `usecases_101.json` before making changes
2. **Incremental Testing**: Add a few use cases first, test, then add the rest
3. **Unique IDs**: Ensure all `usecase_id` values are unique
4. **Consistent Format**: Keep the same data structure for all use cases
5. **Version Control**: Commit changes frequently with clear messages
6. **Documentation**: Update this guide if you discover new issues or solutions

---

## 📞 Need Help?

If you encounter issues not covered in this guide:

1. Check the browser console for error messages
2. Validate your JSON file structure
3. Review the existing use cases for reference
4. Test with a small subset of new use cases first

---

**Last Updated**: January 4, 2026  
**Current Use Cases**: 101  
**Target Use Cases**: 702 (101 existing + 601 new)
