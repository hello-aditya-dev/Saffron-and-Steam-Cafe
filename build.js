const { execSync } = require('child_process');

try {
  execSync('npx next build', {
    stdio: 'inherit',
    env: { ...process.env, NODE_OPTIONS: '--max-old-space-size=4096' },
  });
} catch (error) {
  console.error('\n======= BUILD ERROR CAPTURED =======');
  if (error.stdout) console.error('STDOUT:', error.stdout.toString());
  if (error.stderr) console.error('STDERR:', error.stderr.toString());
  if (error.message) console.error('MESSAGE:', error.message);
  console.error('======= END ERROR =======\n');
  process.exit(1);
}