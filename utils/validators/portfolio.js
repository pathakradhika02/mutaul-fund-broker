exports.createPortfolioValidator = async (req, res, next) => {
    const { userId, fundId, fundName, units, currentValue } = req.body;
    try {
        if (!userId) return res.status(400).json({ error: 'UserId is required' });
        if (!fundId) return res.status(400).json({ error: 'Fund ID is required' });
        if (!fundName) return res.status(400).json({ error: 'Fund name is required' });
        if (!units) return res.status(400).json({ error: 'Units is required' });
        if (!currentValue) return res.status(400).json({ error: 'Current value is required' });

        next();
    } catch (err) {
        return res.status(500).json({ error: 'Add to portfolio failed', details: err.message });
    }
};