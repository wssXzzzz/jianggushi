const MAX_EDGE = 720;

function loadImage(sourceUrl: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new window.Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("照片读取失败"));
    image.src = sourceUrl;
  });
}

function applyStorybookFilter(frame: ImageData) {
  const { data, width, height } = frame;
  const luminance = new Float32Array(width * height);

  for (let pixel = 0; pixel < luminance.length; pixel += 1) {
    const offset = pixel * 4;
    luminance[pixel] = data[offset] * 0.299 + data[offset + 1] * 0.587 + data[offset + 2] * 0.114;
  }

  for (let y = 1; y < height - 1; y += 1) {
    for (let x = 1; x < width - 1; x += 1) {
      const pixel = y * width + x;
      const offset = pixel * 4;
      const edgeX = luminance[pixel + 1] - luminance[pixel - 1];
      const edgeY = luminance[pixel + width] - luminance[pixel - width];
      const edgeInk = Math.min(0.5, Math.max(0, (Math.hypot(edgeX, edgeY) - 24) / 115));

      data[offset] = Math.max(0, Math.round((data[offset] + 7) / 28) * 28 * (1 - edgeInk));
      data[offset + 1] = Math.max(0, Math.round((data[offset + 1] + 3) / 28) * 28 * (1 - edgeInk));
      data[offset + 2] = Math.max(0, Math.round(data[offset + 2] / 28) * 28 * (1 - edgeInk));
    }
  }

  return frame;
}

export async function createStorybookPortrait(sourceUrl: string) {
  const image = await loadImage(sourceUrl);
  const scale = Math.min(1, MAX_EDGE / Math.max(image.naturalWidth, image.naturalHeight));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
  const context = canvas.getContext("2d", { willReadFrequently: true });

  if (!context) throw new Error("浏览器不支持本地图片处理");
  context.filter = "saturate(1.3) contrast(1.1) brightness(1.04)";
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  context.filter = "none";
  context.putImageData(applyStorybookFilter(context.getImageData(0, 0, canvas.width, canvas.height)), 0, 0);
  context.globalCompositeOperation = "soft-light";
  context.fillStyle = "rgba(255, 226, 169, 0.16)";
  context.fillRect(0, 0, canvas.width, canvas.height);

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("卡通角色生成失败")), "image/webp", 0.9);
  });
}
