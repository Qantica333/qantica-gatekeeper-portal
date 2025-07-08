
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useFileDownload = () => {
  const { isAuthenticated, userEmail } = useAuth();

  const handleFileDownload = useCallback(async (fileName: string, displayName: string) => {
    console.log(`Attempting to download: ${fileName}`);
    
    if (!isAuthenticated || !userEmail) {
      alert('You must be logged in to download files.');
      return;
    }
    
    try {
      // First, record the download attempt
      const { error: trackingError } = await supabase
        .from('downloads')
        .insert({
          email: userEmail,
          file_name: fileName,
          ip_address: await getClientIP()
        });

      if (trackingError) {
        console.error('Error tracking download:', trackingError);
        // Continue with download even if tracking fails
      }

      // Then attempt to download the file
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
  }, [isAuthenticated, userEmail]);

  const getClientIP = async (): Promise<string | null> => {
    try {
      const { data, error } = await supabase.rpc('get_client_ip');
      if (error) {
        console.error('Error getting client IP:', error);
        return null;
      }
      return data;
    } catch (err) {
      console.error('Exception getting client IP:', err);
      return null;
    }
  };

  return { handleFileDownload };
};
