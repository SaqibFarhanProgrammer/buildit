import crypto from 'crypto';

type CloudinaryUploadResult = {
  secure_url: string;
  public_id: string;
  width?: number;
  height?: number;
  bytes?: number;
};

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is missing`);
  return value;
}

function sha1(input: string) {
  return crypto.createHash('sha1').update(input).digest('hex');
}

function makeSignature(params: Record<string, string | number>, apiSecret: string) {
  const toSign = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`)
    .join('&');

  return sha1(`${toSign}${apiSecret}`);
}

export async function uploadAvatarToCloudinary(args: {
  file: File;
  userId: string;
}): Promise<CloudinaryUploadResult> {
  const cloudName = requireEnv('CLOUDINERY_CLOUD_NAME');
  const apiKey = requireEnv('CLOUDINERY_API_KEY');
  const apiSecret = requireEnv('CLOUDINERY_API_SECRET');

  const timestamp = Math.floor(Date.now() / 1000);
  const folder = 'buildit/avatars';
  const public_id = args.userId;

  console.log('[cloudinary-service] Preparing upload', {
    userId: args.userId,
    fileType: args.file.type,
    fileSize: args.file.size,
    cloudName,
    folder,
  });

  const signature = makeSignature(
    {
      folder,
      public_id,
      timestamp,
    },
    apiSecret
  );

  const form = new FormData();
  form.append('file', args.file);
  form.append('api_key', apiKey);
  form.append('timestamp', String(timestamp));
  form.append('folder', folder);
  form.append('public_id', public_id);
  form.append('signature', signature);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: 'POST',
      body: form,
    }
  );

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    console.error('[cloudinary-service] Upload request failed', {
      status: res.status,
      body: text,
    });
    throw new Error(`Cloudinary upload failed (${res.status}): ${text}`);
  }

  const json = (await res.json()) as CloudinaryUploadResult;
  console.log('[cloudinary-service] Upload success', {
    publicId: json.public_id,
    hasSecureUrl: Boolean(json.secure_url),
  });
  return json;
}

