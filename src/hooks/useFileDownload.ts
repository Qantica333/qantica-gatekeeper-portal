
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '../contexts/AuthContext';

export const useFileDownload = () => {
  const { userEmail } = useAuth();

  const handleFileDownload = useCallback(async (fileName: string, displayName: string) => {
    console.log(`Attempting to download: ${fileName}`);
    
    if (!userEmail) {
      alert('You must be logged in to download files.');
      return;
    }
    
    try {
      const { data, error } = await supabase.storage
        .from('files')
        .download(fileName);

      console.log('Download response:', { data, error });

      if (error) {
        console.error('Download error:', error);
        alert(`Error downloading ${displayName}: ${error.message}`);
        return;
      }
      
      if (!data) {
        console.error('No data received');
        alert(`No file data received for ${displayName}`);
        return;
      }

      // Record the download in the database
      try {
        const { error: recordError } = await supabase.rpc('record_download', {
          p_email: userEmail,
          p_file_name: fileName
        });

        if (recordError) {
          console.error('Error recording download:', recordError);
          // Don't block the download if recording fails
        } else {
          console.log('Download recorded successfully');
        }
      } catch (recordErr) {
        console.error('Exception recording download:', recordErr);
        // Don't block the download if recording fails
      }

      // Create blob URL and trigger download
      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      console.log(`Successfully downloaded: ${fileName}`);
    } catch (err) {
      console.error('Download exception:', err);
      alert(`Failed to download ${displayName}. Please try again.`);
    }
  }, [userEmail]);

  return { handleFileDownload };
};
