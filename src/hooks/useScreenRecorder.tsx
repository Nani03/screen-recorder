import { useState, useRef, useCallback } from 'react';

interface ScreenRecorderHook {
  startRecording: () => Promise<void>;
  stopRecording: () => void;
  isRecording: boolean;
  isLoading: boolean;
  error: string | null;
}

export const useScreenRecorder = (): ScreenRecorderHook => {
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      // Handle user cancellation from browser popup
      screenStream.getVideoTracks()[0].onended = () => {
        setIsRecording(false);
        setIsLoading(false);
        mediaRecorderRef.current?.stop();
      };

      const audioStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const combinedStream = new MediaStream([
        ...screenStream.getVideoTracks(),
        ...audioStream.getAudioTracks(),
      ]);

      mediaRecorderRef.current = new MediaRecorder(combinedStream, {
        mimeType: 'video/webm',
      });

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        chunksRef.current = [];
        const dataDownloadUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = dataDownloadUrl;
        a.download = `${window.prompt('File name', 'video')}.webm`;
        a.click();
        URL.revokeObjectURL(dataDownloadUrl);
        setIsRecording(false);
      };

      mediaRecorderRef.current.start(250);
      setIsRecording(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start recording');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const stopRecording = useCallback(() => {
    mediaRecorderRef.current?.stop();
  }, []);

  return {
    startRecording,
    stopRecording,
    isRecording,
    isLoading,
    error,
  };
};