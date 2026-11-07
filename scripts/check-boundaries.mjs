import fs from 'node:fs';
import path from 'node:path';

const packagesDir = path.resolve('packages');
const packages = fs.readdirSync(packagesDir);

const prohibitedRules = {
  contracts: ['react', 'react-dom', '@opsweave/db', '@opsweave/ai', '@opsweave/graph-core', '@opsweave/ingestion', '@opsweave/web', '@opsweave/api'],
  'graph-core': ['react', 'react-dom', '@opsweave/db', '@opsweave/web', '@opsweave/api'],
  ingestion: ['react', 'react-dom', '@opsweave/web', '@opsweave/api'],
  ai: ['react', 'react-dom', '@opsweave/web', '@opsweave/api'],
  db: ['react', 'react-dom', '@opsweave/web', '@opsweave/api'],
};

let hasErrors = false;

for (const pkg of packages) {
  const pkgJsonPath = path.join(packagesDir, pkg, 'package.json');
  if (!fs.existsSync(pkgJsonPath)) continue;

  const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
  const allDeps = {
    ...pkgJson.dependencies,
    ...pkgJson.devDependencies,
  };

  const prohibited = prohibitedRules[pkg] || [];
  for (const p of prohibited) {
    if (allDeps[p]) {
      console.error(`❌ Boundary violation in packages/${pkg}: Prohibited dependency "${p}" found!`);
      hasErrors = true;
    }
  }
}

if (hasErrors) {
  process.exit(1);
} else {
  console.log('✅ All package boundary dependency checks passed.');
}

