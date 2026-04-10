export const getPercentageMeta = (value: number | null) => {
  if (value === null || value === 0) {
    return {
      class: "",
      icon: "",
    };
  }

  if (value > 0) {
    return {
      class: "positive",
      icon: "bx bx-caret-up",
    };
  }

  return {
    class: "negative",
    icon: "bx bx-caret-down",
  };
};
