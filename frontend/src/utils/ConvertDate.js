const makeDate = (addedDate) => {
    const date = new Date(addedDate);
    const options = {
      // weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };

    return date.toLocaleString('en-IN', options);
}

export {
    makeDate
}