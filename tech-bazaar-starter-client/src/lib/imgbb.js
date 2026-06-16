export const uploadImageToImgBB = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (!data.success) {
      throw new Error("Image upload failed");
    }

    return data.data.url;
  } catch (error) {
    console.error("ImgBB Upload Error:", error);
    throw error;
  }
};