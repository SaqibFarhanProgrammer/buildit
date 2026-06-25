import { connectDB } from '@/core/db/DbConnection';
import { User } from '@/models/User.model';
import { IsUserAuthenticate } from '@/utils/AuthRequest';
import { NextRequest, NextResponse } from 'next/server';
import { uploadAvatarToCloudinary } from '@/services/cloudinary/cloudinaryUpload';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const userId = await IsUserAuthenticate(request);
    if (!userId) {
      console.error('[avatar-route] Unauthorized upload attempt');
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const form = await request.formData();
    const file = form.get('file');

    if (!(file instanceof File)) {
      console.error('[avatar-route] Missing or invalid file payload');
      return NextResponse.json({ message: 'Missing file' }, { status: 400 });
    }

    const allowedTypes = new Set([
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
    ]);
    const maxBytes = 2 * 1024 * 1024;

    if (!allowedTypes.has(file.type)) {
      console.error('[avatar-route] Invalid image type', { type: file.type });
      return NextResponse.json(
        { message: 'Only JPG, PNG, GIF or WEBP images are allowed' },
        { status: 400 }
      );
    }

    if (file.size > maxBytes) {
      console.error('[avatar-route] File too large', { size: file.size });
      return NextResponse.json(
        { message: 'Image must be smaller than 2MB' },
        { status: 400 }
      );
    }

    const result = await uploadAvatarToCloudinary({ file, userId });

    const updated = await User.findByIdAndUpdate(
      userId,
      { image: result.secure_url },
      { new: true }
    )
      .select('name email image createdAt profile')
      .lean();

    return NextResponse.json({
      message: 'Avatar updated',
      imageUrl: result.secure_url,
      user: updated,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Server Error';
    console.error('[avatar-route] Upload failed', error);
    return NextResponse.json({ message }, { status: 500 });
  }
}
