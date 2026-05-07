/**
 * Advanced Fuzzy Logic Engine
 * Calculates a match score based on three-way variable weighting:
 * 1. Rating vs Quality Preference
 * 2. Runtime vs Time Available
 * 3. Mood-based priority balancing
 */

const calculateFuzzyScore = (movie, prefs) => {
  // Normalize inputs
  const rating = parseFloat(movie.imdbRating) || 0;
  const runtime = parseInt(movie.runtime) || 0;
  
  // Extract user preferences with defaults
  const userTimeLimit = parseInt(prefs.timeAvailable) || 120;
  const minQualityBar = parseFloat(prefs.minRating) || 6.0;
  const mood = prefs.mood || 'casual';

  /** * 1. QUALITY MEMBERSHIP (Fuzzy Rating)
   * We calculate how much the movie satisfies the user's quality demand.
   */
  let qualityScore = 0;
  if (rating >= minQualityBar) {
    // If it's above the bar, we scale it between 0.7 and 1.0
    qualityScore = 0.7 + (0.3 * (rating / 10));
  } else {
    // If it's below the bar, we apply a "Fuzzy Penalty"
    // The further below the bar it is, the lower the score drops.
    const penalty = (minQualityBar - rating) / 10;
    qualityScore = Math.max(0, 0.5 - penalty);
  }

  /** * 2. TEMPORAL MEMBERSHIP (Fuzzy Runtime)
   * We calculate how well the movie fits into the user's schedule.
   */
  let temporalScore = 0;
  if (runtime <= userTimeLimit) {
    // Perfect fit. We give a small bonus if the movie 
    // actually uses the time well (not too short).
    const usageRatio = runtime / userTimeLimit;
    temporalScore = 0.8 + (0.2 * usageRatio);
  } else {
    // Over the limit. We apply a penalty based on how many 
    // minutes the user would have to "overstay."
    const overage = runtime - userTimeLimit;
    // Drops score by 0.1 for every 15 minutes over
    temporalScore = Math.max(0, 0.7 - (overage / 150));
  }

  /** * 3. MOOD-BASED WEIGHTING (Inference)
   * We decide which factor is more important based on the mood.
   */
  let finalMatch = 0;
  
  if (mood === 'casual') {
    // CASUAL: Time fit is 70% of the decision, Quality is 30%
    finalMatch = (temporalScore * 0.7) + (qualityScore * 0.3);
  } else {
    // INTENSE: Quality is 70% of the decision, Time fit is 30%
    finalMatch = (qualityScore * 0.7) + (temporalScore * 0.3);
  }

  // Return score as a decimal (0 to 1)
  return parseFloat(finalMatch.toFixed(4));
};

module.exports = { calculateFuzzyScore };