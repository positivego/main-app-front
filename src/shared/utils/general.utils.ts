export const deepClone = (obj: any) => {
  return JSON.parse(JSON.stringify(obj));
};

export const getFormDataByObj = (obj: any): FormData => {
  const formData = new FormData();

  Object.entries(obj).forEach(([key, value]) => {
    console.log({ key, value });

    if (Array.isArray(value)) {
      value.forEach((item) => {
        formData.append(`${key}`, item);
      });
    } else if (value instanceof File) {
      formData.append(key, value);
    } else if (value !== undefined && value !== null) {
      formData.append(key, value.toString());
    }
  });

  return formData;
};
