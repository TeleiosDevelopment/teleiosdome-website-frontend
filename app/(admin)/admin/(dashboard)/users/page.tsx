"use client";
import React, {useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import DataTable, {Column} from '@/app/(admin)/admin/components/DataTable';
import DynamicFormModal, {FieldSchema} from '@/app/(admin)/admin/components/DynamicFormModal';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

type ApiResponse = { success: boolean; message?: string; data?: User | User[] };

interface User {
    id: string;
    username: string;
    email: string;
    role: string;
    password?: string;
}

const userColumns: Column<User>[] = [
    { header: 'Username', accessor: 'username' },
    { header: 'Email', accessor: 'email' },
    { header: 'Role', accessor: 'role' },
];

const userFields: FieldSchema[] = [
    { name: 'username', label: 'Username', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    {
      name: 'role',
      label: 'Role',
      type: 'select',
        options: [
            { label: 'Admin', value: 'admin' },
            { label: 'Receptionist', value: 'receptionist' }
        ]
    },
    { name: 'password', label: 'Password', type: 'password'},
];

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState<Partial<User> | null>(null);

    const fetchUsers = async (): Promise<void> => {
        setLoading(true);
        try {
            const token = Cookies.get('access_token');
            const headers: HeadersInit = { Accept: 'application/json' };
            if (token) {
              headers['Authorization'] = `Bearer ${token}`;
            }

            const res = await fetch(`${API_BASE_URL}/api/users`, {
                method: 'GET',
                headers,
            });
            if (!res.ok) {
                const errorText = await res.text();
                console.error(`Failed to fetch users: ${res.status} ${res.statusText} - ${errorText}`);
                return;
            }
            const jsonRes = await res.json();
            const raw = Array.isArray(jsonRes.data) ? jsonRes.data : [];
            const data: User[] = raw.map((item: { id: string; username: string; email: string; role: string }) => ({
              id: item.id,
              username: item.username,
              email: item.email,
              role: item.role,
            }));
            setUsers(data);
        } catch (error) {
            console.error(error);
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void fetchUsers();
    }, []);

    function handleAdd() {
        setEditingItem(null);
        setShowModal(true);
    }

    function handleEdit(row: User) {
        setEditingItem(row);
        setShowModal(true);
    }

    async function handleDelete(row: User) {
        if (confirm('Are you sure you want to delete this user?')) {
            const token = Cookies.get('access_token');
            const headers: HeadersInit = {};
            if (token) {
              headers['Authorization'] = `Bearer ${token}`;
            }
            await fetch(`${API_BASE_URL}/api/users/${row.id}`, {
                method: 'DELETE',
                headers,
            });
            setUsers(prev => prev.filter(u => u.id !== row.id));
        }
    }

    async function handleSubmit(data: Partial<User>): Promise<ApiResponse> {
        if (!data.password && !data.id) {
            return { success: false, message: 'Password is required for new users' };
        }
        const payload = { ...data }; // hash the password in the API route

        const method = data.id ? 'PUT' : 'POST';
        const endpoint = data.id
            ? `${API_BASE_URL}/api/users/${data.id}`
            : `${API_BASE_URL}/api/users`;

        const token = Cookies.get('access_token');
        const headers: HeadersInit = {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        };
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const res = await fetch(endpoint, {
            method,
            headers,
            body: JSON.stringify(payload),
        });

        if (res.ok) {
            const jsonRes = await res.json();
            const saved: User = jsonRes.data;
            const newUser: User = {
              id: saved.id,
              username: saved.username,
              email: saved.email,
              role: saved.role,
            };
            setUsers(prev =>
              method === 'POST'
                ? [...prev, newUser]
                : prev.map(u => u.id === newUser.id ? newUser : u)
            );
            setShowModal(false);
            await fetchUsers();
            return { success: true, data: newUser };
        } else {
            return { success: false, message: 'Failed to save user' };
        }
    }

    if (loading) return <div>Loading users...</div>;
    if (users.length === 0) return <div>No users found.</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-semibold">Users</h1>
            <DataTable
                columns={userColumns}
                data={users}
                showAdd
                showEdit
                showDelete
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onRefresh={fetchUsers}
            />
            <DynamicFormModal
                visible={showModal}
                title={editingItem?.id ? 'Edit User' : 'New User'}
                fields={userFields}
                initialData={editingItem || {}}
                onSubmitAction={handleSubmit}
                onCloseAction={() => setShowModal(false)}
            />
        </div>
    );
}