import { readFileSync, writeFileSync, existsSync, unlinkSync, copyFileSync, mkdirSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const wranglerPath = join(process.cwd(), 'dist', 'server', 'wrangler.json');
const deployConfigPath = join(process.cwd(), '.wrangler', 'deploy', 'config.json');
const serverDir = join(process.cwd(), 'dist', 'server');
const clientDir = join(process.cwd(), 'dist', 'client');

function copyDir(src, dest) {
  if (!existsSync(dest)) mkdirSync(dest, { recursive: true });
  for (const item of readdirSync(src)) {
    const srcPath = join(src, item);
    const destPath = join(dest, item);
    if (statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

try {
  if (existsSync(wranglerPath)) {
    const content = readFileSync(wranglerPath, 'utf-8');
    const config = JSON.parse(content);

    if (config.kv_namespaces) {
      config.kv_namespaces = config.kv_namespaces.filter(kv => kv.id);
    }
    if (config.previews?.kv_namespaces) {
      config.previews.kv_namespaces = config.previews.kv_namespaces.filter(kv => kv.id);
    }

    if (config.assets && config.assets.binding === 'ASSETS') {
      delete config.assets;
    }

    const unsupportedFields = [
      'definedEnvironments', 'ai_search_namespaces', 'ai_search',
      'agent_memory', 'secrets_store_secrets', 'artifacts',
      'unsafe_hello_world', 'flagship', 'worker_loaders',
      'ratelimits', 'vpc_services', 'vpc_networks', 'python_modules', 'previews'
    ];
    for (const field of unsupportedFields) {
      delete config[field];
    }

    if (config.dev) {
      delete config.dev.enable_containers;
      delete config.dev.generate_types;
    }

    writeFileSync(wranglerPath, JSON.stringify(config, null, 2));
    console.log('Fixed dist/server/wrangler.json');
  }

  if (existsSync(deployConfigPath)) {
    unlinkSync(deployConfigPath);
    console.log('Removed .wrangler/deploy/config.json redirect');
  }

  if (existsSync(serverDir)) {
    copyDir(serverDir, clientDir);
    console.log('Copied dist/server to dist/client');
  }

  const entryPath = join(clientDir, 'entry.mjs');
  const workerPath = join(clientDir, '_worker.js');
  if (existsSync(entryPath) && !existsSync(workerPath)) {
    copyFileSync(entryPath, workerPath);
    console.log('Created _worker.js from entry.mjs');
  }

  console.log('Wrangler config fixed for Cloudflare Pages deployment');
} catch (err) {
  console.error('Error fixing wrangler config:', err.message);
  process.exit(1);
}
