export const debounce = (f, ms) => {

    let isCooldown = false;
  
    return (...args) => {
      if (isCooldown) {
        return;
      }
  
      f(...args);
  
      isCooldown = true;
  
      setTimeout(() => {
        isCooldown = false;
      }, ms);
    };
  }