const Alert = require('../models/Alert');

// @desc    Get all alerts (for user or admin)
// @route   GET /api/alerts
// @access  Private
exports.getAlerts = async (req, res) => {
    try {
        // If admin, can see all alerts? The prompt implies admin can *delete* any. 
        // Usually admin sees all, or maybe just their own. Let's assume standard behavior:
        // Admin sees all, User sees own. Or for simplicity in this specific "delete" context,
        // let's just return all alerts so the dashboard is populated, and frontend handles visibility/buttons.
        // However, prompt says "Fetch alerts". 
        // Let's implement: Admin sees all, User sees all (public dashboard) OR User sees own. 
        // Given the "Dashboard" context, usually users want to see *their* alerts.
        // But for a trading firm assignment, maybe it's a shared board? 
        // I'll stick to: User sees own, Admin sees all.

        let alerts;
        if (req.user.role === 'admin') {
            alerts = await Alert.find().populate('user', 'username');
        } else {
            alerts = await Alert.find({ user: req.user._id });
        }

        res.json(alerts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create new alert
// @route   POST /api/alerts
// @access  Private
exports.createAlert = async (req, res) => {
    const { symbol, targetPrice, condition } = req.body;

    try {
        const alert = await Alert.create({
            symbol,
            targetPrice,
            condition,
            user: req.user._id,
        });

        res.status(201).json(alert);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete alert
// @route   DELETE /api/alerts/:id
// @access  Private
exports.deleteAlert = async (req, res) => {
    try {
        const alert = await Alert.findById(req.params.id);

        if (!alert) {
            return res.status(404).json({ message: 'Alert not found' });
        }

        // RBAC: Admin can delete any, User can only delete own
        if (alert.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to delete this alert' });
        }

        await alert.deleteOne(); // or findByIdAndDelete
        res.json({ message: 'Alert removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
