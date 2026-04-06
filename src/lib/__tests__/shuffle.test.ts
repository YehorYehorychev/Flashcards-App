import { shuffled } from '../shuffle';

/**
 * Basic unit test for the shuffle logic.
 * Ensures the output is a new array and contains the same elements.
 */
function testShuffle() {
  const original = [1, 2, 3, 4, 5];
  const result = shuffled(original);

  console.assert(result !== original, 'Should return a new array');
  console.assert(result.length === original.length, 'Should have the same length');
  console.assert(
    [...result].sort().join(',') === [...original].sort().join(','),
    'Should contain the same elements'
  );

  // Note: Randomness is hard to test deterministically without a seed, 
  // but we can check if it's likely shuffled for larger arrays.
  const largeOriginal = Array.from({ length: 100 }, (_, i) => i);
  const largeResult = shuffled(largeOriginal);
  console.assert(
    largeResult.join(',') !== largeOriginal.join(','),
    'Should likely be shuffled for large arrays'
  );

  console.log('✅ Shuffle unit tests passed!');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  testShuffle();
}
