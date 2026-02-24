import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter } from '@/components/ui/alert-dialog';
import { Users, Plus, Search, Trash2 } from 'lucide-react';
import { demoUsers } from '@/data/mock-data';
import { useToast } from '@/hooks/use-toast';

const ManageUsers = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState(demoUsers);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [showAdd, setShowAdd] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState('student');

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const roleColors = {
    admin: 'bg-destructive/10 text-destructive',
    instructor: 'bg-primary/10 text-primary',
    student: 'bg-info/10 text-info',
    content_creator: 'bg-accent/10 text-accent-foreground',
  };

  const handleAddUser = () => {
    if (!newName.trim() || !newEmail.trim()) return;
    const newUser = {
      id: `u${Date.now()}`,
      name: newName,
      email: newEmail,
      role: newRole,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setUsers(prev => [...prev, newUser]);
    setShowAdd(false);
    setNewName('');
    setNewEmail('');
    setNewRole('student');
    toast({ title: 'User Created', description: `${newName} has been added as ${newRole}.` });
  };

  const handleDelete = (userId) => {
    const user = users.find(u => u.id === userId);
    setUserToDelete(user);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      setUsers(prev => prev.filter(u => u.id !== userToDelete.id));
      toast({ title: 'User Removed', description: `${userToDelete.name} has been removed.` });
      setShowDeleteConfirm(false);
      setUserToDelete(null);
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h1 className="heading-lg text-gradient flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Users className="h-6 w-6 text-primary" />
            </div>
            Manage Users
          </h1>
          <p className="text-muted-foreground text-lg mt-2">{users.length} users on the platform</p>
        </div>
        <Button size="lg" onClick={() => setShowAdd(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Search users by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="instructor">Instructor</SelectItem>
            <SelectItem value="student">Student</SelectItem>
            <SelectItem value="content_creator">Content Creator</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="card-base">
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">Name</th>
                  <th className="text-left py-3 px-2">Email</th>
                  <th className="text-left py-3 px-2">Role</th>
                  <th className="text-left py-3 px-2">Joined</th>
                  <th className="text-left py-3 px-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-8 text-muted-foreground">
                      No users found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filtered.map(user => (
                    <tr key={user.id} className="border-b hover:bg-accent/50 transition">
                      <td className="py-3 px-2 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        {user.name}
                      </td>
                      <td className="py-3 px-2">{user.email}</td>
                      <td className="py-3 px-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${roleColors[user.role]}`}>
                          {user.role.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-muted-foreground">{user.createdAt}</td>
                      <td className="py-3 px-2">
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(user.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Enter full name"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Enter email"
              />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Select value={newRole} onValueChange={setNewRole}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="instructor">Instructor</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="content_creator">Content Creator</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
            <Button onClick={handleAddUser}>Add User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <strong>{userToDelete?.name}</strong>? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete User
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ManageUsers;
