const mc = require('minecraft-protocol');
const express = require('express');

function connectBot() {
  const client = mc.createClient({
    host: 'HomeEmpire.aternos.me',   // ← Replace with your Aternos IP
    port: 23396,              // ← Default port; change if needed
    username: 'HOMEY',      // ← Change username (may require real account for premium)
    version: false            // Auto-detect version (or specify like '1.20.4' if needed)
  });

  client.on('connect', () => {
    console.log('✅ Bot connected to server.');
  });

  client.on('end', () => {
    console.log('⚠️ Bot disconnected. Reconnecting...');
    setTimeout(connectBot, 5000);  // Reconnect after 5 sec
  });

  client.on('error', (err) => {
    console.log('❌ Bot Error:', err);
  });
}

connectBot();  // Start the bot

// ✅ Keep-Alive Webserver (for UptimeRobot)
const app = express();
app.get('/', (req, res) => res.send('AFK Bot is running!'));
app.listen(3000, () => console.log('🌐 Keep-alive webserver running.'));
