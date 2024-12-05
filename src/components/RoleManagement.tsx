import React, { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
} from '@mui/material';

interface Permission {
  id: string;
  name: string;
  description: string;
}

interface Role {
  id: string;
  name: string;
  permissions: Permission[];
}

const availablePermissions: Permission[] = [
  { id: '1', name: 'create_user', description: 'Can create users' },
  { id: '2', name: 'edit_user', description: 'Can edit users' },
  { id: '3', name: 'delete_user', description: 'Can delete users' },
  { id: '4', name: 'view_users', description: 'Can view users' },
  { id: '5', name: 'manage_roles', description: 'Can manage roles' },
];

const mockRoles: Role[] = [
  {
    id: '1',
    name: 'admin',
    permissions: availablePermissions,
  },
  {
    id: '2',
    name: 'user',
    permissions: [availablePermissions[3]],
  },
];

export const RoleManagement: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [open, setOpen] = useState(false);
  const [newRole, setNewRole] = useState({
    name: '',
    permissions: [] as string[],
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewRole({ name: '', permissions: [] });
  };

  const handleAddRole = () => {
    const role: Role = {
      id: (roles.length + 1).toString(),
      name: newRole.name,
      permissions: availablePermissions.filter((p) =>
        newRole.permissions.includes(p.id)
      ),
    };
    setRoles([...roles, role]);
    handleClose();
  };

  const handleDeleteRole = (id: string) => {
    setRoles(roles.filter((role) => role.id !== id));
  };

  const handlePermissionChange = (permissionId: string) => {
    setNewRole((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter((id) => id !== permissionId)
        : [...prev.permissions, permissionId],
    }));
  };

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <h2>Role Management</h2>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Add Role
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Role Name</TableCell>
              <TableCell>Permissions</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>{role.name}</TableCell>
                <TableCell>
                  {role.permissions.map((p) => p.name).join(', ')}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteRole(role.id)}
                    disabled={role.name === 'admin'}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Role</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              label="Role Name"
              value={newRole.name}
              onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
              fullWidth
            />
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Permissions:
            </Typography>
            {availablePermissions.map((permission) => (
              <FormControlLabel
                key={permission.id}
                control={
                  <Checkbox
                    checked={newRole.permissions.includes(permission.id)}
                    onChange={() => handlePermissionChange(permission.id)}
                  />
                }
                label={`${permission.name} - ${permission.description}`}
              />
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddRole} disabled={!newRole.name}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
