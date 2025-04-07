import React from "react";
import { useScreenRecorder } from "../hooks/useScreenRecorder";

export interface ScreenRecorderProps {
  className?: string;
  buttonClassName?: string;
  buttonText?: {
    start?: string;
    stop?: string;
    loading?: string;
  };
  errorClassName?: string;
  statusClassName?: string;
}

export const ScreenRecorder: React.FC<ScreenRecorderProps> = ({
  className = "",
  buttonClassName = "",
  buttonText = {
    start: "Start Recording",
    stop: "Stop Recording",
    loading: "Initializing...",
  },
  errorClassName = "",
  statusClassName = "",
}) => {
  const { startRecording, stopRecording, isRecording, isLoading, error } =
    useScreenRecorder();

  const handleClick = async () => {
    if (isRecording) {
      stopRecording();
    } else {
      await startRecording();
    }
  };

  return (
    <div className={className}>
      {error && <div className={errorClassName}>{error}</div>}

      <button
        onClick={handleClick}
        disabled={isLoading}
        className={`${buttonClassName} ${
          isLoading ? "loading" : isRecording ? "recording" : "idle"
        }`}
      >
        {isLoading
          ? buttonText.loading
          : isRecording
          ? buttonText.stop
          : buttonText.start}
      </button>

      {isRecording && (
        <div className={statusClassName}>
          Recording in progress... Click to stop.
        </div>
      )}
    </div>
  );
};
