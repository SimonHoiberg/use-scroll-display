const { execSync } = require('child_process');
const fs = require('fs');

const package = require('../package.json');

const peerDeps = package.peerDependencies;

Object.entries(peerDeps).forEach(([peerPackage, version]) => {
  const cmd = `yarn add ${peerPackage}@${version}`;
  execSync(cmd);
});

fs.writeFileSync('package.json', JSON.stringify(package, null, 2), 'utf-8');
