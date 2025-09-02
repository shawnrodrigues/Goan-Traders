// Schema Validation Script for Goan Traders
// Run this to validate structured data before deploying

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function validateSchema() {
  console.log('🔍 Validating Schema.org structured data...\n');
  
  // Read the Layout.astro file
  const layoutPath = path.join(__dirname, 'src', 'layouts', 'Layout.astro');
  const layoutContent = fs.readFileSync(layoutPath, 'utf8');
  
  // Check for required schema elements
  const checks = {
    'LocalBusiness schema': /"@type": "LocalBusiness"/,
    'Organization schema': /"@type": "Organization"/,
    'Product offers': /"offers":/,
    'Aggregate ratings': /"aggregateRating":/,
    'Price specifications': /"priceSpecification":/,
    'Brand information': /"@type": "Brand"/,
    'Contact points': /"contactPoint":/,
    'Availability status': /"availability": "https:\/\/schema\.org\/InStock"/
  };
  
  let allPassed = true;
  
  Object.entries(checks).forEach(([name, regex]) => {
    const passed = regex.test(layoutContent);
    console.log(`${passed ? '✅' : '❌'} ${name}`);
    if (!passed) allPassed = false;
  });
  
  console.log('\n📄 Checking products page...');
  
  // Check products page
  const productsPath = path.join(__dirname, 'src', 'pages', 'products.astro');
  const productsContent = fs.readFileSync(productsPath, 'utf8');
  
  const productChecks = {
    'ItemList schema': /"@type": "ItemList"/,
    'Product positioning': /"position":/,
    'Product descriptions': /"description":/,
    'Product images': /"image":/
  };
  
  Object.entries(productChecks).forEach(([name, regex]) => {
    const passed = regex.test(productsContent);
    console.log(`${passed ? '✅' : '❌'} ${name}`);
    if (!passed) allPassed = false;
  });
  
  console.log('\n🎯 Validation Summary:');
  console.log(`${allPassed ? '🟢 All checks passed!' : '🔴 Some checks failed.'}`);
  
  if (allPassed) {
    console.log(`
📋 Next steps:
1. Deploy your site
2. Test with Google's Rich Results Test: https://search.google.com/test/rich-results
3. Submit to Google Search Console
4. Monitor for schema errors

🎉 Your Product schema should now be compliant with Google's requirements!
    `);
  } else {
    console.log(`
⚠️  Please fix the failed checks before deploying.
    `);
  }
}

// Run validation
validateSchema();
