# Month Range Picker React

Month range picker is a react UI component which is easily customizable and has no depedency except react. Example of code for using the package is given below. Keep Scrolling :)

### Input Box

<div style="display:flex;flex-direction:row">
<img src="https://raw.githubusercontent.com/TakiTazwar/month-range-react/main/demo/asset/input_box.png" alt="text_box"/>
</div>

### Start Date

<img src="https://raw.githubusercontent.com/TakiTazwar/month-range-react/main/demo/asset/start_date.png" alt="start_month"/>

### Hovering Effect

<img src="https://raw.githubusercontent.com/TakiTazwar/month-range-react/main/demo/asset/hover_range.png" alt="hover_month"/>

### Activating Apply

<img src="https://raw.githubusercontent.com/TakiTazwar/month-range-react/main/demo/asset/end_date.png" alt="hover_month"/>


## Add Compnent

```
import { MonthRangePicker } from "month-range-picker-react";
import { useState } from "react";

function App() {
  const [userState, setUserState] = useState(null);
  return (
    <div className="App">
      <MonthRangePicker
        getDateRangeState={setUserState}
        applyFunc={() => console.log("Apply from parent")}
        cancelFunc={() => console.log("Cancel from parent")}
        containerWidth="400px"
        darkTheme={true}
      />
    </div>
  );
}

export default App;

```
## Props
All props are optional.
- getdateRangeState - function can be passed in which the current state of the picker can be saved
- applyFunc - a callback can be passed to add event with apply button
- cancelFunc - a callback can be passed to add event with cancel button
- containerWidth - width measurement in css can be passed. If not the default will be 400px
- darkMode - a boolean value to active or deactive the dark mode

## Version 1.1 - Dark Mode

### Input Box

<div style="display:flex;flex-direction:row">
<img src="https://raw.githubusercontent.com/TakiTazwar/month-range-react/main/demo/asset/dark_input_box.png" alt="text_box"/>
</div>

### Start Date

<img src="https://raw.githubusercontent.com/TakiTazwar/month-range-react/main/demo/asset/dark_start_date.png" alt="start_month"/>

### Hovering Effect

<img src="https://raw.githubusercontent.com/TakiTazwar/month-range-react/main/demo/asset/dark_hover.png" alt="hover_month"/>

### Activating Apply

<img src="https://raw.githubusercontent.com/TakiTazwar/month-range-react/main/demo/asset/dark_end_date.png" alt="hover_month"/>
