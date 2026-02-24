import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookOpen } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await register(name, email, password, role);
    setLoading(false);
    if (result.success) {
      navigate('/dashboard');
      return;
    }
    setError(result.message || 'Registration failed.');
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left panel - Gradient hero */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero text-white flex-col justify-between p-12">
        <div>
          <h1 className="flex items-center gap-3 text-4xl font-bold font-display">
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            Academix
          </h1>
          <p className="mt-8 text-lg text-white/80 leading-relaxed max-w-md">
            Join thousands of learners worldwide. Create your account today and start your journey toward mastery and success.
          </p>
        </div>
        <div className="text-sm text-white/60">
          <p>© 2026 Academix. Empowering learners worldwide.</p>
        </div>
      </div>

      {/* Right panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <Card className="w-full max-w-md shadow-elevated border-0">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl font-display">
              Create Account
            </CardTitle>
            <CardDescription className="text-base">
              Join Academix and start learning
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-medium">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Jane Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="focus-ring"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="font-medium">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="focus-ring"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="font-medium">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="focus-ring"
                  required
                  minLength={6}
                />
                <p className="text-xs text-muted-foreground">Minimum 6 characters</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="font-medium">I am a...</Label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-ring"
                >
                  <option value="student">Student</option>
                  <option value="instructor">Instructor</option>
                  <option value="content_creator">Content Creator</option>
                </select>
              </div>

              {error && (
                <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3">
                  <p className="text-sm text-destructive font-medium">{error}</p>
                </div>
              )}

              <Button type="submit" className="w-full h-10 text-base font-semibold" disabled={loading}>
                {loading ? 'Creating account...' : 'Create Account'}
                {!loading && <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t text-center text-sm">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-primary hover:text-primary/80 transition-colors">
                Sign in here
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
