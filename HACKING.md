# Hacking it
 After using the Applet, you may want to change some settings. You can do so by editing `applet.js`, lines 14-17:
```javascript
const BRIGHT_MIN = 50;
const BRIGHT_MAX = 150;
const BRIGHT_STEP = 5;
const BRIGHT_START = 100;
```
- BRIGHT_MIN:   Minimum value
- BRIGHT_MAX:   Maximum value, unless rounded past
- BRIGHT_STEP:  Step between values
- BRIGHT_START: Value to set slider (and system) at immediate

After changing these values, restart Cinnamon by pressing <kbd>Alt</kbd>+<kbd>F2</kbd>, then <kbd>r</kbd> <kbd>↵</kbd>
