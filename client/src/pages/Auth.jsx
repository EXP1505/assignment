import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'user',
    });
    const navigate = useNavigate();

    const { username, email, password, role } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = isLogin
                ? 'http://localhost:5000/api/auth/login'
                : 'http://localhost:5000/api/auth/register';

            const payload = isLogin
                ? { username, password, role }
                : { username, email, password };

            const res = await axios.post(url, payload);

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data));

            navigate('/dashboard');
        } catch (err) {
            console.error(err.response?.data?.message || err.message);
            alert(err.response?.data?.message || 'Error occurred');
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated Background Blobs */}
            <div className="absolute top-0 left-[-10%] w-96 h-96 bg-brand-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute top-0 right-[-10%] w-96 h-96 bg-brand-accent rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-brand-danger rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

            <Card className="w-full max-w-md p-8 relative z-10 animate-fade-in border-t border-l border-white/20 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60 bg-gray-900/50">
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <p className="text-slate-400">
                        {isLogin ? 'Enter your credentials to access your dashboard' : 'Join us to track crypto prices'}
                    </p>
                </div>

                <form onSubmit={onSubmit}>
                    <Input
                        label="Username"
                        name="username"
                        value={username}
                        onChange={onChange}
                        placeholder="johndoe"
                        required
                    />

                    {!isLogin && (
                        <Input
                            label="Email"
                            type="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            placeholder="user@example.com"
                            required
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        />
                    )}

                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        placeholder="••••••••"
                        required
                    />

                    {isLogin && (
                        <div className="mb-6 relative">
                            <label className="block text-sm font-medium text-slate-300 mb-1 ml-1">Login As</label>
                            <select
                                name="role"
                                value={role}
                                onChange={onChange}
                                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all duration-300 appearance-none cursor-pointer"
                            >
                                <option value="user" className="bg-slate-800 text-white">User</option>
                                <option value="admin" className="bg-slate-800 text-white">Admin</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400 top-6">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    )}

                    <Button type="submit" className="w-full mt-4" variant="primary">
                        {isLogin ? 'Login' : 'Sign Up'}
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-slate-400 text-sm">
                        {isLogin ? "Don't have an account? " : 'Already have an account? '}
                        <button
                            className="text-brand-accent hover:text-cyan-400 font-semibold transition-colors"
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin ? 'Register' : 'Login'}
                        </button>
                    </p>
                </div>
            </Card>

            {/* Footer / Branding */}
            <div className="absolute bottom-4 text-slate-600 text-xs text-center w-full">
                &copy; 2026 CryptoAlert Pro. Secure & Scalable.
            </div>
        </div>
    );
};

export default Auth;
