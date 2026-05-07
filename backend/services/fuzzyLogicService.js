const { getLinearMembership, getReverseLinearMembership } = require('../utils/fuzzyHelpers');

const calculateFuzzyScore = (rating, year) => {
    const currentYear = new Date().getFullYear();
    const age = currentYear - year;

    // Fuzzy Set: Highly Rated (Rating 0-10 mapped to 0-1)
    const ratingScore = getLinearMembership(rating, 5, 9); 

    // Fuzzy Set: Recent (Age 0-10 years mapped to 1-0)
    const recencyScore = getReverseLinearMembership(age, 1, 15);

    // Weighted average (70% weight on rating, 30% on recency)
    return ((ratingScore * 0.7) + (recencyScore * 0.3)).toFixed(2);
};

module.exports = { calculateFuzzyScore };