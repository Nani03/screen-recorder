# Screen Recorder Library

A lightweight and versatile React library for screen recording, offering both a customizable component and a powerful hook. With the useScreenRecorder hook, you gain complete control over styling and functionality, enabling you to tailor the recording experience to your specific needs. Whether you need a ready-to-use component or want to build your own custom solution, this library provides the flexibility and simplicity to get started quickly. Perfect for developers looking to integrate seamless screen recording capabilities into their React applications.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

### Disclaimer

This software is provided "as is", without warranty of any kind. The authors are not liable for any damages or issues arising from its use.

## Installation

```bash
npm install screen-recorder
# or
yarn add screen-recorder

```

## Using the Hook

```js
import { useScreenRecorder } from 'screen-recorder';

function App() {
  const { startRecording, stopRecording, isRecording, isLoading, error } =
    useScreenRecorder();

  return (
    <div>
      {error && <p>Error: {error}</p>}
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
    </div>
  );
}

## Using the Component

import { ScreenRecorder } from 'screen-recorder';

function App() {
  return (
    <div>
    //exaple usage with custom classess that you can append
     <ScreenRecorder
        className="custom-container"
        buttonClassName="custom-button"
        errorClassName="custom-error"
        statusClassName="custom-status"
        buttonText={{
          start: "Start",
          stop: "Stop",
          loading: "Loading...",
        }}
      />
    </div>
  );
}

```

## Customization for component
Props for ScreenRecorder
| Prop             | Type   | Default                          | Description                          |
|-------------------|--------|----------------------------------|--------------------------------------|
| `className`       | string | `""`                            | Custom class for the container.      |
| `buttonClassName` | string | `""`                            | Custom class for the button.         |
| `buttonText`      | object | `{ start, stop, loading }`      | Text for the button states.          |
| `errorClassName`  | string | `""`                            | Custom class for the error message.  |
| `statusClassName` | string | `""`                            | Custom class for the status message. |
