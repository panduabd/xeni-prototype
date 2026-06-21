const fs = require('fs');
const content = fs.readFileSync('src/pages/integrations.astro', 'utf8');

// extract the content of <script is:inline>
const scriptContent = content.split('<script is:inline>')[1].split('</script>')[0];

const { JSDOM } = require('jsdom');
const dom = new JSDOM(content);
const window = dom.window;
const document = window.document;

// Execute the script in the context of the JSDOM window
try {
  window.eval(scriptContent);
  // simulate the button click
  console.log("Calling window.openSettingsModal('fb-3')");
  window.openSettingsModal('fb-3');
  console.log("Success!");
} catch (e) {
  console.error("Error occurred:", e);
}
