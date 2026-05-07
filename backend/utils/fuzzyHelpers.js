/**
 * Linear Membership Function
 * Returns a value between 0 and 1 based on where 'x' falls between 'a' and 'b'
 */
const getLinearMembership = (x, a, b) => {
    if (x <= a) return 0;
    if (x >= b) return 1;
    return (x - a) / (b - a);
};

/**
 * Reverse Linear Membership (for things like "Age" where smaller is better)
 */
const getReverseLinearMembership = (x, a, b) => {
    if (x <= a) return 1;
    if (x >= b) return 0;
    return (b - x) / (b - a);
};

module.exports = {
    getLinearMembership,
    getReverseLinearMembership
};