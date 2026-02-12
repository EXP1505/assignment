import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const Dashboard = () => {
    const [alerts, setAlerts] = useState([]);
    const [newAlert, setNewAlert] = useState({
        symbol: '',
        targetPrice: '',
        condition: 'above',
    });
    const [showCreateModal, setShowCreateModal] = useState(false);
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            navigate('/');
            return;
        }
        fetchAlerts();
    }, [token, navigate]);

    const fetchAlerts = async () => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            const res = await axios.get('http://localhost:5000/api/alerts', config);
            setAlerts(res.data);
        } catch (err) {
            console.error(err);
            if (err.response?.status === 401) {
                localStorage.removeItem('token');
                navigate('/');
            }
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            await axios.post('http://localhost:5000/api/alerts', newAlert, config);
            setNewAlert({ symbol: '', targetPrice: '', condition: 'above' });
            fetchAlerts();
            setShowCreateModal(false);
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || 'Error creating alert');
        }
    };

    const handleDelete = async (id) => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            await axios.delete(`http://localhost:5000/api/alerts/${id}`, config);
            fetchAlerts();
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || 'Error deleting alert');
        }
    };

    const canDelete = (alertUser) => {
        if (user.role === 'admin') return true;
        const alertUserId = alertUser._id || alertUser;
        return String(alertUserId) === user._id;
    };

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
            {/* Navbar */}
            <nav className="bg-slate-900/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center animate-fade-in">
                            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                                CryptoAlert
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-medium text-white">{user?.username}</p>
                                <p className="text-xs text-slate-400 uppercase">{user?.role}</p>
                            </div>
                            <Button
                                variant="ghost"
                                onClick={() => {
                                    localStorage.removeItem('token');
                                    localStorage.removeItem('user');
                                    navigate('/');
                                }}
                                className="text-sm"
                            >
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">My Alerts</h1>
                        <p className="text-slate-400">Manage your price targets efficiently.</p>
                    </div>
                    <Button onClick={() => setShowCreateModal(!showCreateModal)}>
                        {showCreateModal ? 'Close Form' : '+ New Alert'}
                    </Button>
                </div>

                {/* Create Form (Conditional) */}
                {showCreateModal && (
                    <Card className="mb-8 p-6 bg-slate-800/80 border-slate-700 animate-slide-down">
                        <h3 className="text-xl font-semibold mb-4 text-cyan-400">Set New Target</h3>
                        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                            <Input
                                label="Symbol (e.g. BTC)"
                                value={newAlert.symbol}
                                onChange={(e) => setNewAlert({ ...newAlert, symbol: e.target.value.toUpperCase() })}
                                placeholder="BTC"
                                required
                            />
                            <Input
                                label="Target Price ($)"
                                type="number"
                                value={newAlert.targetPrice}
                                onChange={(e) => setNewAlert({ ...newAlert, targetPrice: e.target.value })}
                                placeholder="50000"
                                required
                            />
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-slate-300 mb-1 ml-1">Condition</label>
                                <select
                                    value={newAlert.condition}
                                    onChange={(e) => setNewAlert({ ...newAlert, condition: e.target.value })}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 transition-all"
                                >
                                    <option value="above">Above Price</option>
                                    <option value="below">Below Price</option>
                                </select>
                            </div>
                            <Button type="submit" variant="primary" className="mb-4 h-[50px]">
                                Create Alert
                            </Button>
                        </form>
                    </Card>
                )}

                {/* Stats / Alerts Grid */}
                {alerts.length === 0 ? (
                    <div className="text-center py-20 bg-slate-800/30 rounded-3xl border border-dashed border-slate-700">
                        <p className="text-slate-500 text-lg">No alerts found. Start by creating one!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {alerts.map((alert) => (
                            <Card key={alert._id} className="relative group hover:border-cyan-500/50 transition-colors duration-300 p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white">{alert.symbol}</h3>
                                        <p className="text-sm text-slate-400">Targeting USD</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${alert.condition === 'above' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                                        }`}>
                                        {alert.condition.toUpperCase()}
                                    </span>
                                </div>

                                <div className="mb-6">
                                    <p className="text-4xl font-mono font-light text-slate-200">
                                        ${alert.targetPrice.toLocaleString()}
                                    </p>
                                </div>

                                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                                    <div className="text-xs text-slate-500">
                                        Created by <span className="text-slate-300">{typeof alert.user === 'object' ? alert.user.username : 'You'}</span>
                                    </div>

                                    {canDelete(alert.user) && (
                                        <Button
                                            variant="danger"
                                            onClick={() => handleDelete(alert._id)}
                                            className="py-1 px-3 text-xs opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                                        >
                                            Delete
                                        </Button>
                                    )}
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
