const fs = require('fs');
const content = fs.readFileSync('src/pages/integrations.astro', 'utf8');

const scriptContent = content.split('<script is:inline>')[1].split('</script>')[0];

const { JSDOM } = require('jsdom');
const dom = new JSDOM(content);
const window = dom.window;
const document = window.document;

try {
  console.log("Calling window.openSettingsModal('fb-3')");
  window.openSettingsModal('fb-3');
  console.log("Success fb-3!");
  
  console.log("Calling window.openSettingsModal('th-1')");
  window.openSettingsModal('th-1');
  console.log("Success th-1!");
} catch (e) {
  console.error("Error occurred:", e);
}
require('fs').writeFileSync('scriptContent.js', scriptContent);
