interface IUseImageUploadReturns {
  uploadRestroLogo: (file: File) => Promise<string | null>;
  uploadMenuItemImage: (
    file: File,
    restroName: string
  ) => Promise<string | null>;
}

export const useImageUpload = (): IUseImageUploadReturns => {
  return {
    uploadRestroLogo: async (file) => {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "flavourFleetPreset");
      data.append(
        "cloud_name",
        process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || ""
      );
      data.append("folder", "restaurnat/logo");

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: data,
          }
        );
        const res = await response.json();
        return res.url;
        return res;
      } catch (error) {}
    },
    uploadMenuItemImage: async (file, restroName) => {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "flavourFleetPreset");
      data.append(
        "cloud_name",
        process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || ""
      );
      data.append("folder", `menuitem/${restroName}`);

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: data,
          }
        );
        const res = await response.json();
        return res.url;
      } catch (error) {}
    },
  };
};
