exports.registerValidator = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) res.status(400).json({ error: 'Email and password are required' });
        if (password.length < 6) res.status(400).json({ error: 'Password must be at least 6 characters long' });
        if (!email.includes('@') || !email.includes('.')) return res.status(400).json({ error: 'Invalid email address' });

        next();
    } catch (err) {
        return res.status(500).json({ error: 'Registration failed', details: err.message });
    }
};

exports.loginValidator = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });

        next();
    } catch (err) {
        console.log(err);
        
        return res.status(500).json({ error: 'Login failed', details: err.message });
    }
};