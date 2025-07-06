
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DatabaseInspector = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Fetching all users from database...');
      
      const { data, error: fetchError } = await supabase
        .from('users')
        .select('*');
        
      if (fetchError) {
        console.error('Error fetching users:', fetchError);
        setError(fetchError.message);
      } else {
        console.log('Users fetched:', data);
        setUsers(data || []);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('Unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addTestUser = async () => {
    setLoading(true);
    try {
      const { data, error: insertError } = await supabase
        .from('users')
        .insert([
          { email: 'tom.abregu@gmail.com' }
        ])
        .select();
        
      if (insertError) {
        console.error('Error inserting user:', insertError);
        setError(insertError.message);
      } else {
        console.log('User inserted:', data);
        fetchUsers(); // Refresh the list
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('Unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Card className="m-4">
      <CardHeader>
        <CardTitle>Database Inspector - Users Table</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={fetchUsers} disabled={loading}>
            {loading ? 'Loading...' : 'Refresh Users'}
          </Button>
          <Button onClick={addTestUser} disabled={loading} variant="outline">
            Add Test User (tom.abregu@gmail.com)
          </Button>
        </div>
        
        {error && (
          <div className="p-3 bg-red-100 border border-red-300 rounded text-red-700">
            Error: {error}
          </div>
        )}
        
        <div>
          <h3 className="font-semibold mb-2">Users in Database ({users.length}):</h3>
          {users.length === 0 ? (
            <p className="text-gray-500">No users found in database</p>
          ) : (
            <div className="space-y-2">
              {users.map((user, index) => (
                <div key={index} className="p-2 bg-gray-100 rounded">
                  <strong>ID:</strong> {user.id} <br />
                  <strong>Email:</strong> {user.email} <br />
                  <strong>Created:</strong> {user.created_at}
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DatabaseInspector;
