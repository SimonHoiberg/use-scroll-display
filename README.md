# use-scroll-display
> Slim React Hook for showing elements on scroll as they enter the viewport

## Install

```console
npm i use-scroll-display
```
or
```console
yarn add use-scroll-display
```

## Usage

### Basic usage
```jsx
import React from 'react';
import useScrollDisplay from 'use-scroll-display';

const App = () => {
   const [displayRef, hasDisplayed] = useScrollDisplay();

   // true if element has been displayed, false otherwise
   console.log(hasDisplayed);

   return (
      <div ref={displayRef}>
         Appears when entering the viewport
      </div>
   );
}
```

### Custom offset

You can set the offset by passing a parameter.  
It defaults to `200`

```javascript
const [displayRef] = useScrollDisplay(350);
```

## Styles and animations
Currently, only one animation is supported.  
More will be added later.
