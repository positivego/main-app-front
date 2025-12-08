export const deepClone = (obj: any) => {
  return JSON.parse(JSON.stringify(obj));
};

export const getFormDataByObj = (obj: Record<string, any>): FormData => {
  const formData = new FormData();

  const appendFormData = (key: string, value: any) => {
    if (value === null || value === undefined) return;

    console.log({ key, value });

    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item instanceof File || item instanceof Blob) {
          formData.append(key, item);
        } else {
          console.log({ item });
          formData.append(key, item.toString());
        }
      });
    } else if (key === "name") {
      formData.append(key, JSON.stringify(value));
    } else if (value instanceof File || value instanceof Blob) {
      formData.append(key, value);
    } else if (typeof value === "object") {
      // Рекурсивно, но без углубления в файлы
      Object.entries(value).forEach(([nestedKey, nestedVal]) => {
        appendFormData(nestedKey, nestedVal); // << ключ без префикса
      });
    } else {
      formData.append(key, value.toString());
    }
  };

  Object.entries(obj).forEach(([key, value]) => {
    if (key === "images" && !Array.isArray(value)) {
      // Не сериализуем images как объект, а обрабатываем поля отдельно
      Object.entries(value).forEach(([fileKey, fileValue]) => {
        appendFormData(fileKey, fileValue);
      });
    } else {
      appendFormData(`${key}`, value);
    }
  });

  console.log({ formData });
  return formData;
};
