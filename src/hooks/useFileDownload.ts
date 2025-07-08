
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useFileDownload = () => {
  const handleFileDownload = useCallback(async (fileName: string, displayName: string) => {
    console.log(`Attempting to download: ${fileName}`);
    
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
  }, []);

  return { handleFileDownload };
};
