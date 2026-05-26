import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const CONFIRM_PHRASE = 'DELETE';

export const DeleteAccountButton: React.FC = () => {
  const { signOut, session } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const confirmed = input === CONFIRM_PHRASE;

  const handleDelete = async () => {
    if (!confirmed || !session) return;
    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke('delete-account', {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (error) throw error;
      await signOut();
      navigate('/auth');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Account deletion failed';
      toast.error(message);
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={(o) => { if (!loading) { setOpen(o); if (!o) setInput(''); } }}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="lg" className="w-full">
          <Trash2 className="w-5 h-5 mr-2" />
          Delete Account
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete your account?</AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <span className="block">
              This permanently deletes your account, child data, signals, sleep logs, and all other records.
              <strong> This cannot be undone.</strong>
            </span>
            <span className="block pt-2">
              Type <strong>DELETE</strong> to confirm.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="DELETE"
          disabled={loading}
          autoCapitalize="characters"
          className="mt-2"
        />

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            disabled={!confirmed || loading}
            onClick={handleDelete}
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Trash2 className="w-4 h-4 mr-2" />
            )}
            Delete permanently
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
